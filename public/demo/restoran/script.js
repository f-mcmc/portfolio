(function () {
  "use strict";

  const site = window.SITE;
  const formatSum = (n) => n.toLocaleString("ru-RU").replace(/ /g, " ") + " so'm";
  const phoneHref = "tel:" + site.phone.replace(/[^\d+]/g, "");

  // ---- Fill text from config ----
  const values = {
    name: site.name,
    tagline: site.tagline,
    hours: site.hours,
    address: site.address,
    phone: site.phone,
    telegramText: "@" + site.telegram,
    minOrderText: site.minOrder > 0 ? formatSum(site.minOrder) : "Yo'q",
  };
  const hrefs = { phoneHref, telegramHref: "https://t.me/" + site.telegram };
  document.querySelectorAll("[data-config]").forEach((el) => {
    const v = values[el.dataset.config];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll("[data-config-href]").forEach((el) => {
    const v = hrefs[el.dataset.configHref];
    if (v) el.setAttribute("href", v);
  });
  const map = document.querySelector("[data-config-src='mapSrc']");
  if (map) map.src = `https://maps.google.com/maps?q=${site.map.lat},${site.map.lng}&z=16&output=embed`;
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  document.title = `${site.name} — milliy taomlar va yetkazib berish`;

  // ---- Menu ----
  const tabsEl = document.querySelector(".tabs");
  const listEl = document.querySelector(".dishes");
  let active = 0;

  function renderTabs() {
    tabsEl.innerHTML = "";
    site.menu.forEach((group, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tab";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", String(i === active));
      b.textContent = group.category;
      b.addEventListener("click", () => {
        active = i;
        renderTabs();
        renderDishes();
      });
      tabsEl.appendChild(b);
    });
  }

  function renderDishes() {
    listEl.innerHTML = "";
    site.menu[active].items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "dish";
      li.innerHTML = `
        <div class="dish__text">
          <h3></h3>
          <p></p>
        </div>
        <div class="dish__buy">
          <span class="dish__price"></span>
          <button type="button" class="add">Qo'shish</button>
        </div>`;
      li.querySelector("h3").textContent = item.name;
      li.querySelector("p").textContent = item.desc;
      li.querySelector(".dish__price").textContent = formatSum(item.price);
      const btn = li.querySelector(".add");
      btn.setAttribute("aria-label", `${item.name} — savatga qo'shish`);
      btn.addEventListener("click", () => {
        addToCart(item);
        btn.textContent = "Qo'shildi ✓";
        setTimeout(() => (btn.textContent = "Qo'shish"), 1200);
      });
      listEl.appendChild(li);
    });
  }

  // ---- Cart ----
  const cart = new Map(); // name -> { item, qty }
  const cartEl = document.getElementById("cart");
  const backdrop = document.querySelector(".cart-backdrop");
  const openBtn = document.querySelector(".cart-btn");
  const countEl = document.querySelector(".cart-btn__count");
  const itemsEl = cartEl.querySelector(".cart__items");
  const emptyEl = cartEl.querySelector(".cart__empty");
  const formEl = cartEl.querySelector(".cart__form");
  const totalEl = cartEl.querySelector("[data-total]");
  const minEl = cartEl.querySelector(".cart__min");
  const errorEl = cartEl.querySelector(".cart__error");

  const total = () => [...cart.values()].reduce((s, r) => s + r.item.price * r.qty, 0);

  function addToCart(item) {
    const row = cart.get(item.name);
    if (row) row.qty += 1;
    else cart.set(item.name, { item, qty: 1 });
    renderCart();
  }

  function changeQty(name, delta) {
    const row = cart.get(name);
    if (!row) return;
    row.qty += delta;
    if (row.qty <= 0) cart.delete(name);
    renderCart();
  }

  function renderCart() {
    const count = [...cart.values()].reduce((s, r) => s + r.qty, 0);
    countEl.textContent = String(count);
    emptyEl.hidden = cart.size > 0;
    formEl.hidden = cart.size === 0;
    itemsEl.innerHTML = "";
    cart.forEach(({ item, qty }, name) => {
      const li = document.createElement("li");
      li.className = "cart-row";
      li.innerHTML = `
        <div><strong></strong><span></span></div>
        <div class="qty">
          <button type="button" data-d="-1" aria-label="Kamaytirish">−</button>
          <output></output>
          <button type="button" data-d="1" aria-label="Ko'paytirish">+</button>
        </div>`;
      li.querySelector("strong").textContent = name;
      li.querySelector("span").textContent = formatSum(item.price * qty);
      li.querySelector("output").textContent = String(qty);
      li.querySelectorAll("button").forEach((b) =>
        b.addEventListener("click", () => changeQty(name, Number(b.dataset.d))),
      );
      itemsEl.appendChild(li);
    });
    const sum = total();
    totalEl.textContent = formatSum(sum);
    const short = site.minOrder - sum;
    minEl.hidden = !(site.minOrder > 0 && short > 0);
    minEl.textContent = short > 0 ? `Minimal buyurtmagacha yana ${formatSum(short)} qoldi.` : "";
  }

  function openCart() {
    cartEl.hidden = false;
    backdrop.hidden = false;
    openBtn.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => cartEl.classList.add("is-open"));
    cartEl.querySelector(".cart__close").focus();
  }

  function closeCart() {
    cartEl.classList.remove("is-open");
    openBtn.setAttribute("aria-expanded", "false");
    backdrop.hidden = true;
    setTimeout(() => (cartEl.hidden = true), 200);
    openBtn.focus();
  }

  openBtn.addEventListener("click", openCart);
  backdrop.addEventListener("click", closeCart);
  cartEl.querySelector(".cart__close").addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !cartEl.hidden) closeCart();
  });

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(formEl);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const address = String(data.get("address") || "").trim();
    const sum = total();

    let error = "";
    if (!name || !phone || !address) error = "Ism, telefon va manzilni to'ldiring.";
    else if (phone.replace(/\D/g, "").length < 9) error = "Telefon raqamini to'liq yozing.";
    else if (site.minOrder > 0 && sum < site.minOrder) error = `Minimal buyurtma — ${formatSum(site.minOrder)}.`;
    errorEl.hidden = !error;
    errorEl.textContent = error;
    if (error) return;

    const lines = [...cart.values()].map(({ item, qty }) => `• ${item.name} × ${qty} — ${formatSum(item.price * qty)}`);
    const text = [
      `Yangi buyurtma (${site.name})`,
      "",
      ...lines,
      "",
      `Jami: ${formatSum(sum)}`,
      `Ism: ${name}`,
      `Telefon: ${phone}`,
      `Manzil: ${address}`,
    ].join("\n");

    window.open(`https://t.me/${site.telegram}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });

  renderTabs();
  renderDishes();
  renderCart();
})();
