<?php

namespace App\Services;

use App\Models\Sale;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class TinyErpService
{
    protected $baseUrl;
    protected $token;
    protected $format;

    public function __construct()
    {
        $this->baseUrl = config('services.tiny_erp.base_url', 'https://api.tiny.com.br/api2');
        $this->token = config('services.tiny_erp.token');
        $this->format = 'JSON';
    }

    /**
     * Generate invoice in Tiny ERP
     */
    public function generateInvoice(Sale $sale)
    {
        try {
            Log::info('Generating Tiny ERP invoice', ['sale_id' => $sale->id]);

            $invoiceData = $this->prepareInvoiceData($sale);
            
            $response = Http::timeout(30)->post($this->baseUrl . '/nota.fiscal.incluir.php', [
                'token' => $this->token,
                'formato' => $this->format,
                'nota' => json_encode($invoiceData)
            ]);

            if ($response->successful()) {
                $result = $response->json();
                
                if (isset($result['retorno']['status']) && $result['retorno']['status'] === 'OK') {
                    $invoiceId = $result['retorno']['registros'][0]['nota_fiscal']['id'] ?? null;
                    $invoiceNumber = $result['retorno']['registros'][0]['nota_fiscal']['numero'] ?? null;
                    
                    // Update sale with invoice information
                    $sale->update([
                        'tiny_erp_invoice_id' => $invoiceId,
                        'invoice_number' => $invoiceNumber ?: $this->generateFallbackInvoiceNumber($sale),
                        'invoice_generated_at' => now(),
                        'tiny_erp_status' => 'invoice_generated'
                    ]);
                    
                    Log::info('Tiny ERP invoice generated successfully', [
                        'sale_id' => $sale->id,
                        'invoice_id' => $invoiceId,
                        'invoice_number' => $invoiceNumber
                    ]);
                    
                    return [
                        'success' => true,
                        'invoice_id' => $invoiceId,
                        'invoice_number' => $invoiceNumber,
                        'message' => 'Nota fiscal gerada com sucesso no Tiny ERP'
                    ];
                } else {
                    $error = $result['retorno']['erros'][0]['erro'] ?? 'Erro desconhecido';
                    Log::error('Tiny ERP invoice generation failed', [
                        'sale_id' => $sale->id,
                        'error' => $error,
                        'response' => $result
                    ]);
                    
                    return $this->handleInvoiceFailure($sale, $error);
                }
            } else {
                Log::error('Tiny ERP API request failed', [
                    'sale_id' => $sale->id,
                    'status' => $response->status(),
                    'response' => $response->body()
                ]);
                
                return $this->handleInvoiceFailure($sale, 'Falha na comunicação com Tiny ERP');
            }
        } catch (\Exception $e) {
            Log::error('Tiny ERP invoice generation exception', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return $this->handleInvoiceFailure($sale, $e->getMessage());
        }
    }

    /**
     * Generate shipping label through Tiny ERP
     */
    public function generateShippingLabel(Sale $sale)
    {
        try {
            Log::info('Generating Tiny ERP shipping label', ['sale_id' => $sale->id]);

            // First ensure we have an invoice
            if (!$sale->tiny_erp_invoice_id) {
                $invoiceResult = $this->generateInvoice($sale);
                if (!$invoiceResult['success']) {
                    return $invoiceResult;
                }
                $sale->refresh();
            }

            $shippingData = $this->prepareShippingData($sale);
            
            $response = Http::timeout(30)->post($this->baseUrl . '/etiqueta.incluir.php', [
                'token' => $this->token,
                'formato' => $this->format,
                'etiqueta' => json_encode($shippingData)
            ]);

            if ($response->successful()) {
                $result = $response->json();
                
                if (isset($result['retorno']['status']) && $result['retorno']['status'] === 'OK') {
                    $shippingId = $result['retorno']['registros'][0]['etiqueta']['id'] ?? null;
                    $trackingCode = $result['retorno']['registros'][0]['etiqueta']['codigo_rastreamento'] ?? null;
                    $labelUrl = $result['retorno']['registros'][0]['etiqueta']['url_etiqueta'] ?? null;
                    
                    // Generate fallback tracking code if not provided
                    if (!$trackingCode) {
                        $trackingCode = 'BB' . str_pad($sale->id, 6, '0', STR_PAD_LEFT) . 'BR';
                    }
                    
                    // Update sale with shipping information
                    $sale->update([
                        'tiny_erp_shipping_id' => $shippingId,
                        'tracking_code' => $trackingCode,
                        'shipping_label_url' => $labelUrl,
                        'shipping_label_generated_at' => now(),
                        'order_status' => 'shipped',
                        'shipped_at' => now(),
                        'tiny_erp_status' => 'shipping_generated'
                    ]);
                    
                    Log::info('Tiny ERP shipping label generated successfully', [
                        'sale_id' => $sale->id,
                        'shipping_id' => $shippingId,
                        'tracking_code' => $trackingCode
                    ]);
                    
                    return [
                        'success' => true,
                        'shipping_id' => $shippingId,
                        'tracking_code' => $trackingCode,
                        'label_url' => $labelUrl,
                        'message' => 'Etiqueta de envio gerada com sucesso no Tiny ERP'
                    ];
                } else {
                    $error = $result['retorno']['erros'][0]['erro'] ?? 'Erro desconhecido';
                    Log::error('Tiny ERP shipping label generation failed', [
                        'sale_id' => $sale->id,
                        'error' => $error,
                        'response' => $result
                    ]);
                    
                    return $this->handleShippingFailure($sale, $error);
                }
            } else {
                Log::error('Tiny ERP shipping API request failed', [
                    'sale_id' => $sale->id,
                    'status' => $response->status(),
                    'response' => $response->body()
                ]);
                
                return $this->handleShippingFailure($sale, 'Falha na comunicação com Tiny ERP');
            }
        } catch (\Exception $e) {
            Log::error('Tiny ERP shipping label generation exception', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return $this->handleShippingFailure($sale, $e->getMessage());
        }
    }

    /**
     * Sync order status with Tiny ERP
     */
    public function syncOrderStatus(Sale $sale)
    {
        try {
            if (!$sale->tiny_erp_invoice_id) {
                return ['success' => false, 'message' => 'Pedido não sincronizado com Tiny ERP'];
            }

            $response = Http::timeout(30)->post($this->baseUrl . '/nota.fiscal.obter.php', [
                'token' => $this->token,
                'formato' => $this->format,
                'id' => $sale->tiny_erp_invoice_id
            ]);

            if ($response->successful()) {
                $result = $response->json();
                
                if (isset($result['retorno']['status']) && $result['retorno']['status'] === 'OK') {
                    $invoiceData = $result['retorno']['nota_fiscal'];
                    $status = $invoiceData['situacao'] ?? '';
                    
                    // Update local status based on Tiny ERP status
                    $this->updateLocalStatusFromTinyErp($sale, $status);
                    
                    return [
                        'success' => true,
                        'tiny_status' => $status,
                        'message' => 'Status sincronizado com sucesso'
                    ];
                }
            }
            
            return ['success' => false, 'message' => 'Erro ao sincronizar status'];
        } catch (\Exception $e) {
            Log::error('Tiny ERP status sync exception', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return ['success' => false, 'message' => 'Erro ao sincronizar status: ' . $e->getMessage()];
        }
    }

    /**
     * Prepare invoice data for Tiny ERP
     */
    private function prepareInvoiceData(Sale $sale)
    {
        return [
            'nota_fiscal' => [
                'natureza_operacao' => 'Venda de mercadoria',
                'data_emissao' => now()->format('d/m/Y'),
                'data_entrada_saida' => now()->format('d/m/Y'),
                'tipo_documento' => 'S', // Saída
                'finalidade_emissao' => '1', // NF-e normal
                'cliente' => [
                    'codigo' => 'BB' . str_pad($sale->id, 6, '0', STR_PAD_LEFT),
                    'razao_social' => $sale->client_name,
                    'nome_fantasia' => $sale->client_name,
                    'tipo_pessoa' => 'F', // Física
                    'cpf_cnpj' => $this->formatCpfCnpj($sale->client_cpf),
                    'ie' => '',
                    'endereco' => $sale->delivery_address ?? 'Não informado',
                    'numero' => $sale->delivery_number ?? 'S/N',
                    'complemento' => $sale->delivery_complement ?? '',
                    'bairro' => $sale->delivery_neighborhood ?? 'Centro',
                    'cidade' => $sale->delivery_city ?? 'Não informado',
                    'uf' => $sale->delivery_state ?? 'SP',
                    'cep' => $this->formatCep($sale->delivery_zipcode),
                    'fone' => $this->formatPhone($sale->client_phone),
                    'email' => $sale->client_email ?? ''
                ],
                'itens' => [
                    [
                        'item' => [
                            'codigo' => 'BORDADO-' . $sale->id,
                            'descricao' => 'Bordado Personalizado - ' . ($sale->child_name ?? 'Produto BBKits'),
                            'unidade' => 'UN',
                            'quantidade' => 1,
                            'valor_unitario' => number_format($sale->total_amount - $sale->shipping_amount, 2, '.', ''),
                            'tipo' => 'P', // Produto
                            'origem' => 0, // Nacional
                            'situacao_tributaria' => '102', // Simples Nacional
                            'ncm' => '58050000' // NCM para bordados
                        ]
                    ]
                ],
                'parcelas' => [
                    [
                        'parcela' => [
                            'dias' => 0,
                            'data' => now()->format('d/m/Y'),
                            'valor' => number_format($sale->total_amount, 2, '.', ''),
                            'obs' => 'Pagamento via ' . $sale->payment_method,
                            'forma_pagamento' => $this->mapPaymentMethod($sale->payment_method)
                        ]
                    ]
                ],
                'obs' => $this->generateInvoiceObservations($sale),
                'obs_internas' => 'Pedido BBKits #' . $sale->id . ' - Token: ' . $sale->unique_token
            ]
        ];
    }

    /**
     * Prepare shipping data for Tiny ERP
     */
    private function prepareShippingData(Sale $sale)
    {
        return [
            'etiqueta' => [
                'id_nota_fiscal' => $sale->tiny_erp_invoice_id,
                'servico_envio' => 'correios_pac', // Default to PAC
                'remetente' => [
                    'nome' => 'BBKits',
                    'endereco' => config('services.tiny_erp.sender_address', 'Rua BBKits, 123'),
                    'numero' => config('services.tiny_erp.sender_number', '123'),
                    'bairro' => config('services.tiny_erp.sender_neighborhood', 'Centro'),
                    'cidade' => config('services.tiny_erp.sender_city', 'São Paulo'),
                    'uf' => config('services.tiny_erp.sender_state', 'SP'),
                    'cep' => config('services.tiny_erp.sender_zipcode', '01000-000'),
                    'fone' => config('services.tiny_erp.sender_phone', '(11) 99999-9999')
                ],
                'destinatario' => [
                    'nome' => $sale->client_name,
                    'endereco' => $sale->delivery_address ?? 'Endereço não informado',
                    'numero' => $sale->delivery_number ?? 'S/N',
                    'complemento' => $sale->delivery_complement ?? '',
                    'bairro' => $sale->delivery_neighborhood ?? 'Centro',
                    'cidade' => $sale->delivery_city ?? 'São Paulo',
                    'uf' => $sale->delivery_state ?? 'SP',
                    'cep' => $this->formatCep($sale->delivery_zipcode),
                    'fone' => $this->formatPhone($sale->client_phone)
                ],
                'volumes' => [
                    [
                        'volume' => [
                            'tipo' => 'Caixa',
                            'quantidade' => 1,
                            'peso' => 0.2, // 200g default weight
                            'comprimento' => 20, // cm
                            'largura' => 15, // cm
                            'altura' => 5, // cm
                            'valor_declarado' => number_format($sale->total_amount, 2, '.', '')
                        ]
                    ]
                ]
            ]
        ];
    }

    /**
     * Handle invoice generation failure
     */
    private function handleInvoiceFailure(Sale $sale, $error)
    {
        // Generate fallback invoice number for internal use
        $fallbackInvoiceNumber = $this->generateFallbackInvoiceNumber($sale);
        
        $sale->update([
            'invoice_number' => $fallbackInvoiceNumber,
            'invoice_generated_at' => now(),
            'tiny_erp_status' => 'invoice_failed',
            'tiny_erp_error' => $error
        ]);
        
        return [
            'success' => false,
            'fallback_invoice' => $fallbackInvoiceNumber,
            'error' => $error,
            'message' => 'Erro no Tiny ERP, mas nota interna gerada: ' . $fallbackInvoiceNumber
        ];
    }

    /**
     * Handle shipping generation failure
     */
    private function handleShippingFailure(Sale $sale, $error)
    {
        // Generate fallback tracking code
        $fallbackTracking = 'BB' . str_pad($sale->id, 6, '0', STR_PAD_LEFT) . 'BR';
        
        $sale->update([
            'tracking_code' => $fallbackTracking,
            'order_status' => 'shipped',
            'shipped_at' => now(),
            'tiny_erp_status' => 'shipping_failed',
            'tiny_erp_error' => $error
        ]);
        
        return [
            'success' => false,
            'fallback_tracking' => $fallbackTracking,
            'error' => $error,
            'message' => 'Erro no Tiny ERP, mas código interno gerado: ' . $fallbackTracking
        ];
    }

    /**
     * Generate fallback invoice number
     */
    private function generateFallbackInvoiceNumber(Sale $sale)
    {
        return 'NF-' . date('Y') . '-' . str_pad($sale->id, 6, '0', STR_PAD_LEFT);
    }

    /**
     * Update local status based on Tiny ERP status
     */
    private function updateLocalStatusFromTinyErp(Sale $sale, $tinyStatus)
    {
        $statusMap = [
            'A' => 'payment_approved', // Autorizada
            'C' => 'shipped', // Cancelada (shipped for simplicity)
            'E' => 'shipped', // Enviada
            'P' => 'pending_payment', // Pendente
        ];
        
        if (isset($statusMap[$tinyStatus])) {
            $sale->update([
                'order_status' => $statusMap[$tinyStatus],
                'tiny_erp_sync_at' => now()
            ]);
        }
    }

    /**
     * Format CPF/CNPJ for Tiny ERP
     */
    private function formatCpfCnpj($cpfCnpj)
    {
        return preg_replace('/[^0-9]/', '', $cpfCnpj ?? '');
    }

    /**
     * Format CEP for Tiny ERP
     */
    private function formatCep($cep)
    {
        $cep = preg_replace('/[^0-9]/', '', $cep ?? '');
        return strlen($cep) >= 8 ? $cep : '01000000';
    }

    /**
     * Format phone for Tiny ERP
     */
    private function formatPhone($phone)
    {
        return preg_replace('/[^0-9]/', '', $phone ?? '');
    }

    /**
     * Map payment method to Tiny ERP format
     */
    private function mapPaymentMethod($paymentMethod)
    {
        $methodMap = [
            'pix' => '17', // PIX
            'transferencia' => '03', // Transferência bancária
            'cartao' => '01', // Cartão de crédito
            'boleto' => '15', // Boleto bancário
            'dinheiro' => '01' // Dinheiro
        ];
        
        return $methodMap[strtolower($paymentMethod)] ?? '99'; // Outros
    }

    /**
     * Generate invoice observations
     */
    private function generateInvoiceObservations(Sale $sale)
    {
        $obs = [];
        $obs[] = 'Bordado Personalizado BBKits';
        
        if ($sale->child_name) {
            $obs[] = 'Nome: ' . $sale->child_name;
        }
        
        if ($sale->embroidery_position) {
            $obs[] = 'Posição: ' . $sale->embroidery_position;
        }
        
        if ($sale->embroidery_color) {
            $obs[] = 'Cor: ' . $sale->embroidery_color;
        }
        
        if ($sale->embroidery_font) {
            $obs[] = 'Fonte: ' . $sale->embroidery_font;
        }
        
        $obs[] = 'Pedido: ' . $sale->unique_token;
        
        return implode(' | ', $obs);
    }

    /**
     * Test Tiny ERP connection
     */
    public function testConnection()
    {
        try {
            $response = Http::timeout(10)->post($this->baseUrl . '/info.php', [
                'token' => $this->token,
                'formato' => $this->format
            ]);

            if ($response->successful()) {
                $result = $response->json();
                return [
                    'success' => true,
                    'message' => 'Conexão com Tiny ERP estabelecida com sucesso',
                    'data' => $result
                ];
            }
            
            return [
                'success' => false,
                'message' => 'Falha na conexão com Tiny ERP: ' . $response->status()
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erro de conexão: ' . $e->getMessage()
            ];
        }
    }
}