/*
  ============================================================
  SAYTNI SOZLASH — faqat shu faylni o'zgartirasiz.
  Matn, narx, telefon, Telegram va menyu shu yerda.
  ============================================================
*/
window.SITE = {
  name: "Bahor Choyxona",
  tagline: "Toshkent, Chilonzor · 1998-yildan beri",
  hours: "09:00 – 23:00",
  address: "Toshkent, Chilonzor tumani, Bunyodkor ko'chasi 12",
  phone: "+998 90 123 45 67",

  // Buyurtmalar keladigan Telegram username (@ belgisisiz)
  telegram: "bahor_choyxona",

  // Minimal buyurtma summasi (so'mda). Kerak bo'lmasa 0 qiling.
  minOrder: 60000,

  // Xaritadagi joy: Google Maps'dan koordinata (kenglik, uzunlik)
  map: { lat: 41.2856, lng: 69.2034 },

  // Menyu: har bir bo'lim va undagi taomlar
  menu: [
    {
      category: "Palov",
      items: [
        { name: "Choyxona palov", desc: "Qo'y go'shti, sariq sabzi, no'xat, bedana tuxumi", price: 45000 },
        { name: "To'y oshi", desc: "Katta qozon palovi, qazi bilan", price: 55000 },
        { name: "Samarqand palov", desc: "Qavat-qavat, go'sht ustida", price: 50000 },
      ],
    },
    {
      category: "Somsa va non",
      items: [
        { name: "Tandir somsa", desc: "Mol go'shti va dumba, tandirda", price: 12000 },
        { name: "Qovoq somsa", desc: "Mavsumiy, yog'li qovoq bilan", price: 9000 },
        { name: "Patir non", desc: "Issiq, kunjutli", price: 8000 },
      ],
    },
    {
      category: "Shashlik",
      items: [
        { name: "Qo'y go'shti shashlik", desc: "1 six, piyoz va ko'kat bilan", price: 22000 },
        { name: "Jigar shashlik", desc: "1 six, dumba bilan", price: 18000 },
        { name: "Tovuq qanoti", desc: "1 six, achchiq sous", price: 16000 },
      ],
    },
    {
      category: "Sho'rva va lag'mon",
      items: [
        { name: "Mastava", desc: "Guruch, go'sht, sabzavot, qatiq bilan", price: 32000 },
        { name: "Qovurma lag'mon", desc: "Qo'lda cho'zilgan xamir", price: 42000 },
        { name: "Shurpa", desc: "Qo'y go'shti, kartoshka, sabzi", price: 38000 },
      ],
    },
    {
      category: "Ichimliklar",
      items: [
        { name: "Ko'k choy", desc: "Choynak", price: 6000 },
        { name: "Kompot", desc: "1 litr, uy usulida", price: 15000 },
        { name: "Ayron", desc: "0,5 litr", price: 10000 },
      ],
    },
  ],
};
