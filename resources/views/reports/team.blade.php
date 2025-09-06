<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório da Equipe - BBKits</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            margin: 0;
            padding: 15px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 3px solid #10b981;
            padding-bottom: 15px;
        }
        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #10b981;
            margin-bottom: 5px;
        }
        .subtitle {
            color: #666;
            font-size: 13px;
        }
        .info-section {
            margin-bottom: 20px;
            background: #f8f9fa;
            padding: 12px;
            border-radius: 5px;
            text-align: center;
        }
        .info-item {
            display: inline-block;
            margin: 0 15px;
        }
        .info-label {
            font-weight: bold;
            color: #555;
        }
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 25px;
        }
        .summary-card {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 12px;
            text-align: center;
        }
        .summary-card .value {
            font-size: 16px;
            font-weight: bold;
            color: #10b981;
            margin-bottom: 4px;
        }
        .summary-card .label {
            font-size: 9px;
            color: #666;
            text-transform: uppercase;
        }
        .top-performer {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 25px;
            text-align: center;
        }
        .top-performer .crown {
            font-size: 24px;
            margin-bottom: 8px;
        }
        .top-performer .name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .top-performer .achievement {
            font-size: 12px;
            opacity: 0.9;
        }
        .team-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            font-size: 9px;
        }
        .team-table th,
        .team-table td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
        }
        .team-table th {
            background: #10b981;
            color: white;
            font-weight: bold;
            font-size: 8px;
        }
        .team-table td {
            font-size: 9px;
        }
        .monetary {
            text-align: right;
        }
        .center {
            text-align: center;
        }
        .rank-1 { background: #fef3c7; }
        .rank-2 { background: #e5e7eb; }
        .rank-3 { background: #fed7aa; }
        .level-badge {
            padding: 2px 6px;
            border-radius: 10px;
            font-size: 8px;
            font-weight: bold;
            text-align: center;
        }
        .level-iniciante {
            background: #dcfce7;
            color: #166534;
        }
        .level-intermediaria {
            background: #dbeafe;
            color: #1e40af;
        }
        .level-avancada {
            background: #ede9fe;
            color: #7c3aed;
        }
        .level-elite {
            background: #fce7f3;
            color: #be185d;
        }
        .commission-rate {
            text-align: center;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 8px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">BBKits</div>
        <div class="subtitle">Relatório Geral da Equipe de Vendas</div>
    </div>

    <div class="info-section">
        <div class="info-item">
            <span class="info-label">Período:</span> {{ $month_name }}
        </div>
        <div class="info-item">
            <span class="info-label">Gerado em:</span> {{ $generated_at }}
        </div>
    </div>

    <div class="summary-cards">
        <div class="summary-card">
            <div class="value">{{ $team_summary['total_sellers'] }}</div>
            <div class="label">Vendedoras Ativas</div>
        </div>
        <div class="summary-card">
            <div class="value">{{ $team_summary['total_sales'] }}</div>
            <div class="label">Total de Vendas</div>
        </div>
        <div class="summary-card">
            <div class="value">R$ {{ number_format($team_summary['total_revenue'], 0, ',', '.') }}</div>
            <div class="label">Receita Total</div>
        </div>
        <div class="summary-card">
            <div class="value">R$ {{ number_format($team_summary['total_commissions'], 0, ',', '.') }}</div>
            <div class="label">Comissões Pagas</div>
        </div>
    </div>

    @if($team_summary['top_performer'])
    <div class="top-performer">
        <div class="crown">👑</div>
        <div class="name">{{ $team_summary['top_performer']->name }}</div>
        <div class="achievement">
            Vendedora do Mês com R$ {{ number_format($team_summary['top_performer']->total_revenue, 2, ',', '.') }} em vendas
        </div>
    </div>
    @endif

    @if($team_data->count() > 0)
    <table class="team-table">
        <thead>
            <tr>
                <th>Pos.</th>
                <th>Vendedora</th>
                <th>Email</th>
                <th>Nível</th>
                <th>Vendas</th>
                <th>Aprovadas</th>
                <th>Receita Total</th>
                <th>Base Comissão</th>
                <th>Taxa</th>
                <th>Comissão</th>
            </tr>
        </thead>
        <tbody>
            @foreach($team_data as $index => $seller)
            <tr class="{{ $index < 3 ? 'rank-' . ($index + 1) : '' }}">
                <td class="center">
                    @if($index === 0)
                        🥇
                    @elseif($index === 1)
                        🥈
                    @elseif($index === 2)
                        🥉
                    @else
                        {{ $index + 1 }}º
                    @endif
                </td>
                <td>{{ $seller->name }}</td>
                <td>{{ $seller->email }}</td>
                <td class="center">
                    @php
                        $rate = $seller->commission_rate * 100; // Convert to percentage
                        if ($rate >= 4) {
                            $levelClass = 'level-elite';
                            $levelText = 'Elite';
                        } elseif ($rate >= 3) {
                            $levelClass = 'level-avancada';
                            $levelText = 'Avançada';
                        } elseif ($rate >= 2) {
                            $levelClass = 'level-intermediaria';
                            $levelText = 'Intermediária';
                        } else {
                            $levelClass = 'level-iniciante';
                            $levelText = 'Iniciante';
                        }
                    @endphp
                    <span class="level-badge {{ $levelClass }}">{{ $levelText }}</span>
                </td>
                <td class="center">{{ $seller->total_sales ?? 0 }}</td>
                <td class="center">{{ $seller->approved_sales ?? 0 }}</td>
                <td class="monetary">R$ {{ number_format($seller->total_revenue ?? 0, 2, ',', '.') }}</td>
                <td class="monetary">R$ {{ number_format($seller->commission_base ?? 0, 2, ',', '.') }}</td>
                <td class="commission-rate">{{ number_format(($seller->commission_rate ?? 0) * 100, 1) }}%</td>
                <td class="monetary">R$ {{ number_format($seller->commission_earned ?? 0, 2, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr style="background: #f8f9fa; font-weight: bold; border-top: 2px solid #10b981;">
                <td colspan="4" style="text-align: right; padding-right: 10px;">TOTAIS:</td>
                <td class="center">{{ $team_summary['total_sales'] }}</td>
                <td class="center">{{ $team_summary['total_approved_sales'] }}</td>
                <td class="monetary">R$ {{ number_format($team_summary['total_revenue'], 2, ',', '.') }}</td>
                <td class="monetary">-</td>
                <td class="center">-</td>
                <td class="monetary">R$ {{ number_format($team_summary['total_commissions'], 2, ',', '.') }}</td>
            </tr>
        </tfoot>
    </table>

    <div style="margin-top: 20px; background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 6px; padding: 12px;">
        <h4 style="margin: 0 0 8px 0; color: #0369a1; font-size: 11px;">📈 Insights da Equipe</h4>
        <div style="font-size: 9px; color: #0c4a6e;">
            <div>• Média de vendas por vendedora: {{ $team_summary['avg_sales_per_seller'] }} vendas</div>
            <div>• Taxa de aprovação geral: {{ $team_summary['total_sales'] > 0 ? number_format(($team_summary['total_approved_sales'] / $team_summary['total_sales']) * 100, 1) : 0 }}%</div>
            <div>• Ticket médio: R$ {{ $team_summary['total_approved_sales'] > 0 ? number_format($team_summary['total_revenue'] / $team_summary['total_approved_sales'], 2, ',', '.') : '0,00' }}</div>
        </div>
    </div>
    @else
    <div style="text-align: center; padding: 30px; background: #f8f9fa; border-radius: 8px;">
        <p style="color: #666; font-size: 12px;">Nenhuma venda foi registrada pela equipe no período selecionado.</p>
    </div>
    @endif

    <div class="footer">
        <p>Este relatório foi gerado automaticamente pelo Sistema BBKits</p>
        <p>BBKits - Bolsas Premium para Maternidade | Relatório Confidencial</p>
    </div>
</body>
</html>