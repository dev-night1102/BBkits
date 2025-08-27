<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Teste PDF - BBKits</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            margin: 20px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #ec4899;
            padding-bottom: 20px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #ec4899;
            margin-bottom: 10px;
        }
        .content {
            line-height: 1.6;
        }
        .test-text {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">BBKits</div>
        <div>Teste de Geração de PDF</div>
    </div>

    <div class="content">
        <h2>Teste de Fontes e Caracteres</h2>
        
        <div class="test-text">
            <p><strong>Texto normal:</strong> Este é um teste para verificar se as fontes estão funcionando corretamente.</p>
            
            <p><strong>Caracteres especiais:</strong> çãõáéíóúâêîôûàèùü</p>
            
            <p><strong>Números:</strong> 1234567890</p>
            
            <p><strong>Símbolos:</strong> R$ 1.250,00 - 100% - @ # $ % & * ( ) + = { } [ ] | \ : ; " ' < > , . ? /</p>
            
            <p><strong>Texto em português:</strong> 
                A comissão será calculada mensalmente sobre o valor líquido das vendas aprovadas.
                Os níveis de comissão são: 2% para vendas entre R$ 40.000,00 e R$ 49.999,99;
                3% para vendas entre R$ 50.000,00 e R$ 59.999,99; e 4% para vendas acima de R$ 60.000,00.
            </p>
        </div>

        <h3>Informações do Sistema</h3>
        <ul>
            <li>Data de geração: {{ now()->format('d/m/Y H:i:s') }}</li>
            <li>Versão do Laravel: {{ app()->version() }}</li>
            <li>Ambiente: {{ app()->environment() }}</li>
        </ul>
    </div>
</body>
</html>