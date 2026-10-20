(function () {
  "use strict";

  const site = window.SITE;
  const sum = (n) => n.toLocaleString("ru-RU").replace(/ /g, " ") + " so'm";
  const pad = (n) => String(n).padStart(2, "0");

  // ---- Text from config ----
  const values = {
    name: site.name,
    kind: site.kind,
    tagline: site.tagline,
    address: site.address,
    phone: site.phone,
    hours: `Har kuni ${pad(site.openHour)}:00 – ${pad(site.closeHour)}:00`,
    instagramText: "@" + site.instagram,
  };
  const hrefs = {
    phone: "tel:" + site.phone.replace(/[^\d+]/g, ""),
    instagram: "https://instagram.com/" + site.instagram,
  };
  document.querySelectorAll("[data-config]").forEach((el) => {
    const v = values[el.dataset.config];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll("[data-href]").forEach((el) => {
    const v = hrefs[el.dataset.href];
    if (v) el.setAttribute("href", v);
  });
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  document.querySelector(".map").src = `https://maps.google.com/maps?q=${site.map.lat},${site.map.lng}&z=16&output=embed`;
  document.title = `${site.name} ${site.kind} — onlayn yozilish`;

  // ---- Prices ----
  const priceList = document.querySelector(".price-list");
  site.services.forEach((s) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="price-list__name"></span><span class="price-list__dur"></span><span class="price-list__price"></span>`;
    li.querySelector(".price-list__name").textContent = s.name;
    li.querySelector(".price-list__dur").textContent = s.duration;
    li.querySelector(".price-list__price").textContent = sum(s.price);
    priceList.appendChild(li);
  });

  // ---- Masters ----
  const masterList = document.querySelector(".master-list");
  site.masters.forEach((m) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="master__initial" aria-hidden="true"></span><strong></strong><span></span>`;
    li.querySelector(".master__initial").textContent = m.name.charAt(0);
    li.querySelector("strong").textContent = m.name;
    li.querySelector("span:last-child").textContent = m.role;
    masterList.appendChild(li);
  });

  // ---- Booking form ----
  const form = document.querySelector(".book-form");
  const err = form.querySelector(".form-error");
  const serviceSel = form.elements.namedItem("service");
  const masterSel = form.elements.namedItem("master");
  const dateInput = form.elements.namedItem("date");
  const timeSel = form.elements.namedItem("time");

  site.services.forEach((s, i) => serviceSel.add(new Option(`${s.name} — ${sum(s.price)}`, String(i))));
  masterSel.add(new Option("Farqi yo'q", ""));
  site.masters.forEach((m, i) => masterSel.add(new Option(m.name, String(i))));

  const localToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  dateInput.min = localToday();
  dateInput.value = localToday();

  function fillTimes() {
    const prev = timeSel.value;
    timeSel.innerHTML = "";
    const isToday = dateInput.value === localToday();
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes() + 30;
    for (let m = site.openHour * 60; m < site.closeHour * 60; m += site.stepMinutes) {
      if (isToday && m < nowMin) continue;
      const t = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
      timeSel.add(new Option(t, t));
    }
    if (timeSel.options.length === 0) timeSel.add(new Option("Bugun bo'sh vaqt yo'q", ""));
    if ([...timeSel.options].some((o) => o.value === prev)) timeSel.value = prev;
  }
  dateInput.addEventListener("change", fillTimes);
  fillTimes();
  // Bugungi ish vaqti tugagan bo'lsa, ertangi kunni tanlab qo'yamiz
  if (!timeSel.value) {
    const t = new Date(Date.now() + 86400000);
    dateInput.value = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
    fillTimes();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements.namedItem("name").value.trim();
    const phone = form.elements.namedItem("phone").value.trim();
    let message = "";
    if (!timeSel.value) message = "Boshqa kunni tanlang.";
    else if (!name) message = "Ismingizni yozing.";
    else if (phone.replace(/\D/g, "").length < 9) message = "Telefon raqamini to'liq yozing.";
    err.hidden = !message;
    err.textContent = message;
    if (message) return;

    const service = site.services[Number(serviceSel.value)];
    const master = masterSel.value === "" ? "Farqi yo'q" : site.masters[Number(masterSel.value)].name;
    const text = [
      `Yozilish so'rovi (${site.name})`,
      "",
      `Xizmat: ${service.name} — ${sum(service.price)}`,
      `Usta: ${master}`,
      `Vaqt: ${dateInput.value}, ${timeSel.value}`,
      `Ism: ${name}`,
      `Telefon: ${phone}`,
    ].join("\n");
    window.open(`https://t.me/${site.telegram}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
})();
