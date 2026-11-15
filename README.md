# Murodulloh — portfolio

Sayt va Telegram bot xizmatlari uchun portfoliyo. Uch tilda: o'zbek (`/`), rus (`/ru/`), ingliz (`/en/`).

Next.js (static export) + TypeScript strict + Tailwind CSS v4.

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # tayyor sayt out/ papkasida
```

## Matn, narx va loyihalarni o'zgartirish

Hammasi bitta faylda: `src/content/site.ts`.

- `TELEGRAM_USERNAME` — Telegram username
- `services.items` — xizmatlar va narxlar (har bir tilda alohida)
- `repos` + `work.items` — loyihalar (faqat github.com/f-mcmc; `syne` va `K-house` ataylab kiritilmagan)

## Vercel'ga chiqarish

1. Bu papkani GitHub'da yangi repo qilib push qiling.
2. vercel.com → Add New → Project → shu repo'ni tanlang → Deploy.
   Framework avtomatik "Next.js" bo'ladi, boshqa sozlama kerak emas.
