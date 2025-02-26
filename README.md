# Turquoisse Learning Platform

Turquoisse, modern ve interaktif bir online eğitim platformudur. Platform, teknoloji ve yazılım geliştirme alanlarında kapsamlı kurslar sunmaktadır.

## 🚀 Özellikler

- **Dinamik Kurs Kataloğu**: Frontend, Backend, Cloud, DevOps ve Security kategorilerinde zengin içerik
- **Arama Fonksiyonu**: Gelişmiş arama özelliği ile içeriklere hızlı erişim
- **Responsive Tasarım**: Her cihazda optimum kullanıcı deneyimi
- **Modern UI/UX**: Material-UI ile geliştirilmiş çağdaş arayüz
- **İnteraktif İçerik**: Video, metin ve uygulamalı öğrenme materyalleri

## 🛠️ Teknolojiler

- **Frontend**:
  - React.js
  - Material-UI
  - React Router
  - Context API

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## 🔧 Kurulum

### Frontend Kurulumu

```bash
# Proje dizinine git
cd turquoisse

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm start
```

### Backend Kurulumu

```bash
# Backend dizinine git
cd backend

# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur ve gerekli değişkenleri ekle
cp .env.example .env

# Geliştirme sunucusunu başlat
npm run dev
```

## 🌐 Ortam Değişkenleri

Backend için `.env` dosyasında aşağıdaki değişkenleri tanımlayın:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/turquoisse
```
