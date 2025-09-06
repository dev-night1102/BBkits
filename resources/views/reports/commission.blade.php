<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Comissões - BBKits</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #8b5cf6;
            padding-bottom: 20px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #8b5cf6;
            margin-bottom: 5px;
        }
        .subtitle {
            color: #666;
            font-size: 14px;
        }
        .info-section {
            margin-bottom: 25px;
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .info-item {
            margin-bottom: 8px;
        }
        .info-label {
            font-weight: bold;
            color: #555;
        }
        .commission-summary {
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
        }
        .commission-summary .total {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .commission-summary .subtitle {
            font-size: 14px;
            opacity: 0.9;
        }
        .commission-breakdown {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin-bottom: 30px;
        }
        .breakdown-card {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
        }
        .breakdown-card .value {
            font-size: 16px;
            font-weight: bold;
            color: #8b5cf6;
            margin-bottom: 5px;
        }
        .breakdown-card .label {
            font-size: 11px;
            color: #666;
            text-transform: uppercase;
        }
        .commission-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .commission-table th,
        .commission-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .commission-table th {
            background: #8b5cf6;
            color: white;
            font-weight: bold;
            font-size: 11px;
        }
        .commission-table td {
            font-size: 10px;
        }
        .monetary {
            text-align: right;
        }
        .commission-rate {
            text-align: center;
            font-weight: bold;
        }
        .tier-info {
            background: #ede9fe;
            border: 1px solid #c4b5fd;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }
        .tier-info h4 {
            color: #7c3aed;
            margin: 0 0 10px 0;
            font-size: 14px;
        }
        .tier-list {
            font-size: 11px;
            color: #5b21b6;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">BBKits</div>
        <div class="subtitle">Relatório Detalhado de Comissões</div>
    </div>

    <div class="info-section">
        <div class="info-grid">
            <div>
                <div class="info-item">
                    <span class="info-label">Vendedora:</span> {{ $user->name }}
                </div>
                <div class="info-item">
                    <span class="info-label">Email:</span> {{ $user->email }}
                </div>
            </div>
            <div>
                <div class="info-item">
                    <span class="info-label">Período:</span> {{ $month_name }}
                </div>
                <div class="info-item">
                    <span class="info-label">Gerado em:</span> {{ $generated_at }}
                </div>
            </div>
        </div>
    </div>

    <div class="commission-summary">
        <div class="total">R$ {{ number_format($total_commission, 2, ',', '.') }}</div>
        <div class="subtitle">Comissão Total do Período</div>
    </div>

    <div class="commission-breakdown">
        <div class="breakdown-card">
            <div class="value">R$ {{ number_format($total_commission_base, 2, ',', '.') }}</div>
            <div class="label">Base para Comissão</div>
        </div>
        <div class="breakdown-card">
            <div class="value">{{ number_format($commission_rate * 100, 1) }}%</div>
            <div class="label">Taxa de Comissão</div>
        </div>
        <div class="breakdown-card">
            <div class="value">{{ count($commission_details) }}</div>
            <div class="label">Vendas Comissionáveis</div>
        </div>
    </div>

    <div class="tier-info">
        <h4>📊 Tabela de Comissões BBKits</h4>
        <div class="tier-list">
            <div>• <strong>0% comissão:</strong> Base inferior a R$ {{ number_format($commission_ranges->first()->min_amount ?? 40000, 0, ',', '.') }}</div>
            @foreach($commission_ranges as $range)
                <div>• <strong>{{ $range->percentage }}% comissão:</strong> 
                    Base 
                    @if($range->max_amount)
                        entre R$ {{ number_format($range->min_amount, 0, ',', '.') }} e R$ {{ number_format($range->max_amount, 0, ',', '.') }}
                    @else
                        igual ou superior a R$ {{ number_format($range->min_amount, 0, ',', '.') }}
                    @endif
                </div>
            @endforeach
        </div>
    </div>

    @if(count($commission_details) > 0)
    <table class="commission-table">
        <thead>
            <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th>Valor Recebido</th>
                <th>Desconto Frete</th>
                <th>Base Comissão</th>
                <th>Taxa</th>
                <th>Valor Comissão</th>
            </tr>
        </thead>
        <tbody>
            @foreach($commission_details as $detail)
            <tr>
                <td>{{ \Carbon\Carbon::parse($detail['sale']->payment_date)->format('d/m/Y') }}</td>
                <td>{{ $detail['sale']->client_name }}</td>
                <td class="monetary">R$ {{ number_format($detail['sale']->received_amount, 2, ',', '.') }}</td>
                <td class="monetary">R$ {{ number_format($detail['sale']->shipping_amount, 2, ',', '.') }}</td>
                <td class="monetary">R$ {{ number_format($detail['commission_base'], 2, ',', '.') }}</td>
                <td class="commission-rate">{{ number_format($detail['commission_rate'] * 100, 1) }}%</td>
                <td class="monetary">R$ {{ number_format($detail['commission_amount'], 2, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr style="background: #f8f9fa; font-weight: bold;">
                <td colspan="4" style="text-align: right; padding-right: 15px;">TOTAIS:</td>
                <td class="monetary">R$ {{ number_format($total_commission_base, 2, ',', '.') }}</td>
                <td class="commission-rate">-</td>
                <td class="monetary">R$ {{ number_format($total_commission, 2, ',', '.') }}</td>
            </tr>
        </tfoot>
    </table>
    @else
    <div style="text-align: center; padding: 40px; background: #f8f9fa; border-radius: 8px;">
        <p style="color: #666; font-size: 14px;">Nenhuma venda comissionável encontrada para o período selecionado.</p>
        <p style="color: #888; font-size: 12px;">Lembre-se: Para gerar comissões, é necessário atingir pelo menos R$ {{ number_format($commission_ranges->first()->min_amount ?? 40000, 0, ',', '.') }} em vendas aprovadas no mês.</p>
    </div>
    @endif

    <div class="footer">
        <p>Este relatório foi gerado automaticamente pelo Sistema BBKits</p>
        <p>BBKits - Bolsas Premium para Maternidade</p>
    </div>
</body>
</html>