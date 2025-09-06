#!/bin/bash

echo "🔄 Resetting BBKits Database..."

# Drop all tables and recreate
php artisan migrate:fresh

# Seed with sample data
php artisan db:seed

echo ""
echo "✅ Database reset complete!"
echo ""
echo "🔑 Login Credentials:"
echo "📋 Admin: admin@bbkits.com / admin123"
echo "💰 Financeiro: financeiro@bbkits.com / financeiro123"
echo "🛍️ Vendedoras:"
echo "   - maria@bbkits.com / vendedora123"
echo "   - ana@bbkits.com / vendedora123"
echo "   - juliana@bbkits.com / vendedora123"
echo "   - carla@bbkits.com / vendedora123"
echo "   - patricia@bbkits.com / vendedora123"
echo ""
echo "📊 Sample data includes:"
echo "   - 7 users (1 admin, 1 finance, 5 vendedoras)"
echo "   - ~80 sales across 3 months"
echo "   - Various statuses (pending, approved, rejected)"
echo "   - High-value sales to test commission tiers"
echo ""