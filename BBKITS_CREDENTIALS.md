# BBKits System - Login Credentials

## 🔑 Test Accounts

### 👑 Administrator
- **Email:** admin@bbkits.com
- **Password:** admin123
- **Permissions:** Full system access, approve/reject sales, view team reports

### 💰 Financeiro
- **Email:** financeiro@bbkits.com  
- **Password:** financeiro123
- **Permissions:** Approve/reject sales, view financial reports

### 🛍️ Vendedoras (Sales Representatives)

| Name | Email | Password |
|------|-------|----------|
| Maria Silva | maria@bbkits.com | vendedora123 |
| Ana Santos | ana@bbkits.com | vendedora123 |
| Juliana Costa | juliana@bbkits.com | vendedora123 |
| Carla Oliveira | carla@bbkits.com | vendedora123 |
| Patricia Lima | patricia@bbkits.com | vendedora123 |

**Vendedora Permissions:** Register sales, view own sales, generate personal reports

## 📊 Sample Data

The database includes:
- **~80 sales** across the last 3 months
- **Various statuses:** pending, approved, rejected
- **Different payment methods:** PIX, boleto, cartão, dinheiro
- **Commission tier testing:** Maria Silva has high-value sales to test all commission levels
- **Realistic client names** and payment amounts

## 🔄 Database Reset

To reset the database with fresh sample data:
```bash
./reset-db.sh
```

Or manually:
```bash
php artisan migrate:fresh
php artisan db:seed
```

## 🎯 Testing Scenarios

### Commission Tiers
- Login as **Maria Silva** (maria@bbkits.com) to see high commission earnings
- She has sales totaling R$ 65,000+ to test all commission brackets:
  - 2% for R$ 40,000-49,999
  - 3% for R$ 50,000-59,999  
  - 4% for R$ 60,000+

### Admin Functions
- Login as **admin@bbkits.com** to:
  - Approve/reject pending sales
  - View team performance dashboard
  - Generate team PDF reports
  - See gamification rankings

### Sales Management
- Login as any vendedora to:
  - Register new sales
  - Edit pending sales
  - Delete pending sales
  - Generate personal PDF reports
  - View gamification progress

## 🚀 System Features

✅ **Completed Features:**
- Role-based authentication (admin/financeiro/vendedora)
- Sales registration with file upload
- Commission calculation (2%/3%/4% tiers)
- Admin approval workflow
- Gamification system (levels, achievements, rankings)
- PDF report generation
- Portuguese language interface
- BBKits branding
- Delete functionality for pending sales

🔄 **Remaining Features:**
- Excel export functionality
- Notifications system  
- Mobile responsive optimization