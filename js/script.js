
// ---- Settings you may need to change ----
const RECIPIENT_EMAIL = "branch@example.com"; // TODO: replace with the branch email address
const FORMSPREE_URL = "";                     // TODO: paste your Formspree endpoint, e.g. https://formspree.io/f/xxxxxxxx

// ---- Sample product data (prices are illustrative) ----
const PRODUCTS = [
  { name: "Bananas (1 kg)", category: "Fresh Produce", price: 24.99, stock: "in" },
  { name: "Red Apples (1.5 kg bag)", category: "Fresh Produce", price: 44.99, stock: "in" },
  { name: "Baby Spinach (200 g)", category: "Fresh Produce", price: 29.99, stock: "low" },
  { name: "Tomatoes (1 kg)", category: "Fresh Produce", price: 27.99, stock: "in" },
  { name: "Brown Bread (700 g)", category: "Bakery", price: 18.99, stock: "in" },
  { name: "Chocolate Croissant", category: "Bakery", price: 14.99, stock: "low" },
  { name: "Vanilla Cupcakes (6 pack)", category: "Bakery", price: 49.99, stock: "out" },
  { name: "Full Cream Milk (2 L)", category: "Dairy", price: 36.99, stock: "in" },
  { name: "Cheddar Cheese (400 g)", category: "Dairy", price: 69.99, stock: "in" },
  { name: "Maize Meal (5 kg)", category: "Pantry", price: 59.99, stock: "in" },
  { name: "Rooibos Tea (80 bags)", category: "Pantry", price: 39.99, stock: "low" },
  { name: "Dishwashing Liquid (750 ml)", category: "Household", price: 32.99, stock: "in" }
];
const STOCK_LABEL = { in: "In stock", low: "Low stock", out: "Out of stock" };
const money = (n) => "R" + n.toFixed(2);

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initAccordion();
  initTabs();
  initLightbox();
  initCatalogue();
  initMap();
  initEnquiry();
  initContact();
});

/* ===== Navigation: toggle, aria-expanded, close on select, active page ===== */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "✕ Close" : "☰ Menu";
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); toggle.focus(); }
  });

  const here = location.pathname.split("/").pop() || "index.html";
  nav.querySelectorAll("a").forEach((a) => {
    const current = a.getAttribute("href") === here;
    a.classList.toggle("active", current);
    if (current) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

/* ===== Accordion (one panel open at a time) ===== */
function initAccordion() {
  document.querySelectorAll(".accordion").forEach((acc) => {
    const triggers = acc.querySelectorAll(".accordion-trigger");
    triggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const wasOpen = btn.getAttribute("aria-expanded") === "true";
        triggers.forEach((b) => {
          b.setAttribute("aria-expanded", "false");
          document.getElementById(b.getAttribute("aria-controls")).hidden = true;
        });
        if (!wasOpen) {
          btn.setAttribute("aria-expanded", "true");
          document.getElementById(btn.getAttribute("aria-controls")).hidden = false;
        }
      });
    });
  });
}

/* ===== Tabs (click and arrow keys) ===== */
function initTabs() {
  document.querySelectorAll(".tabs").forEach((box) => {
    const tabs = [...box.querySelectorAll('[role="tab"]')];
    const select = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      tab.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        let next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (next) { e.preventDefault(); select(next); }
      });
    });
  });
}

/* ===== Gallery lightbox ===== */
function initLightbox() {
  const thumbs = document.querySelectorAll(".gallery button");
  if (!thumbs.length) return;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Enlarged image");
  box.innerHTML = '<button class="lightbox-close" aria-label="Close enlarged image">&times;</button><figure><img alt="" /><figcaption></figcaption></figure>';
  document.body.appendChild(box);

  const img = box.querySelector("img");
  const caption = box.querySelector("figcaption");
  const closeBtn = box.querySelector(".lightbox-close");
  let opener = null;

  const open = (btn) => {
    const small = btn.querySelector("img");
    img.src = small.src;
    img.alt = small.alt;
    caption.textContent = small.alt;
    opener = btn;
    box.hidden = false;
    document.body.classList.add("no-scroll");
    closeBtn.focus();
  };
  const close = () => {
    box.hidden = true;
    document.body.classList.remove("no-scroll");
    if (opener) opener.focus();
  };
  thumbs.forEach((btn) => btn.addEventListener("click", () => open(btn)));
  closeBtn.addEventListener("click", close);
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => { if (!box.hidden && e.key === "Escape") close(); });
}

/* ===== Dynamic product catalogue: load, search, filter, sort ===== */
function initCatalogue() {
  const list = document.getElementById("product-list");
  if (!list) return;
  const search = document.getElementById("search");
  const category = document.getElementById("category");
  const sort = document.getElementById("sort");
  const count = document.getElementById("result-count");

  [...new Set(PRODUCTS.map((p) => p.category))].forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    category.appendChild(opt);
  });

  function render() {
    const term = search.value.trim().toLowerCase();
    const results = PRODUCTS
      .filter((p) => (!category.value || p.category === category.value) && p.name.toLowerCase().includes(term))
      .sort((a, b) => {
        if (sort.value === "price-asc") return a.price - b.price;
        if (sort.value === "price-desc") return b.price - a.price;
        return a.name.localeCompare(b.name);
      });

    list.replaceChildren();
    results.forEach((p) => {
      const li = document.createElement("li");
      li.className = "product-card";
      const h = document.createElement("h3");
      h.textContent = p.name;
      const cat = document.createElement("p");
      cat.className = "muted";
      cat.textContent = p.category;
      const price = document.createElement("p");
      price.className = "price";
      price.textContent = money(p.price);
      const badge = document.createElement("span");
      badge.className = "badge badge-" + p.stock;
      badge.textContent = STOCK_LABEL[p.stock];
      li.append(h, cat, price, badge);
      list.appendChild(li);
    });
    count.textContent = results.length
      ? results.length + (results.length === 1 ? " product found" : " products found")
      : "No products match your search. Try a different word or category.";
  }
  [search, category, sort].forEach((el) => el.addEventListener("input", render));
  render();
}

/* ===== Interactive Leaflet map with both branches ===== */
function initMap() {
  const el = document.getElementById("map");
  if (!el) return;
  if (typeof L === "undefined") {
    el.textContent = "The map could not load. Please check your internet connection and refresh the page.";
    return;
  }
  // Coordinates are approximate – adjust them if a marker looks off.
  const branches = [
    { name: "Branch 1 – Mbombela", pos: [-25.4557548, 30.9547223], address: "Madiba Dr, Riverside Mall, Mbombela, 1201", tel: "087 750 3053" },
    { name: "Branch 2 – Barberton", pos: [-25.7870599773359, 31.04928207519594], address: "Shop 17, Cnr of Hillary and, Jock of the Bushveld Shopping Centre, General St, Barberton, 1300", tel: "013 712 4602" }
  ];
  const map = L.map(el);
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, OpenStreetMap contributors"
  }).addTo(map);

  const markers = branches.map((b) => {
    const popup = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = b.name;
    popup.append(strong, document.createElement("br"), b.address, document.createElement("br"), "Tel: " + b.tel);
    return L.marker(b.pos, { title: b.name, alt: b.name }).addTo(map).bindPopup(popup);
  });
  map.fitBounds(branches.map((b) => b.pos), { padding: [40, 40] });

  document.querySelectorAll("[data-branch]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.branch);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      map.flyTo(branches[i].pos, 15);
      markers[i].openPopup();
    });
  });
}

/* ===== Shared form validation ===== */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+27|0)[1-9]\d{8}$/;
const NAME_RE = /^[A-Za-z][A-Za-z\s'.-]{1,59}$/;

function fieldError(el) {
  const v = el.value.trim();
  switch (el.name) {
    case "name":
      if (!v) return "Enter your full name.";
      if (!NAME_RE.test(v)) return "Use 2 to 60 letters. Spaces, apostrophes, full stops and hyphens are allowed.";
      break;
    case "email":
      if (!v) return "Enter your email address.";
      if (!EMAIL_RE.test(v)) return "Enter a valid email address, like name@example.com.";
      break;
    case "phone":
      if (v && !PHONE_RE.test(v.replace(/[\s-]/g, ""))) return "Enter a valid South African number, like 082 123 4567 or +27 82 123 4567.";
      break;
    case "enquiry-type":
    case "message-type":
      if (!v) return "Choose an option from the list.";
      break;
    case "product":
      if (!v) return "Choose a product.";
      break;
    case "quantity": {
      const n = Number(v);
      if (!v || !Number.isInteger(n) || n < 1 || n > 50) return "Enter a whole number from 1 to 50.";
      break;
    }
    case "message":
      if (v.length < 10) return "Write at least 10 characters so we can help you.";
      if (v.length > 500) return "Keep your message to 500 characters or fewer.";
      break;
  }
  return "";
}

function showError(el, msg) {
  let span = document.getElementById(el.id + "-error");
  if (!span) {
    span = document.createElement("span");
    span.id = el.id + "-error";
    span.className = "field-error";
    span.setAttribute("role", "alert");
    el.insertAdjacentElement("afterend", span);
    el.setAttribute("aria-describedby", span.id);
  }
  span.textContent = msg;
  el.classList.toggle("invalid", Boolean(msg));
  el.setAttribute("aria-invalid", msg ? "true" : "false");
}

function validateForm(form) {
  let first = null;
  form.querySelectorAll("input, select, textarea").forEach((el) => {
    if (el.closest("[hidden]")) return;
    const msg = fieldError(el);
    showError(el, msg);
    if (msg && !first) first = el;
  });
  if (first) first.focus();
  return !first;
}

function liveValidate(form) {
  form.querySelectorAll("input, select, textarea").forEach((el) => {
    el.addEventListener("blur", () => { if (!el.closest("[hidden]")) showError(el, fieldError(el)); });
  });
  const msg = form.elements.message;
  const counter = form.querySelector(".char-count");
  if (msg && counter) {
    const update = () => { counter.textContent = msg.value.length + " / 500 characters"; };
    msg.addEventListener("input", update);
    update();
  }
}

function setStatus(el, text, isError) {
  el.textContent = text;
  el.classList.toggle("error", Boolean(isError));
}

/* ===== Enquiry form: validate, send with fetch (AJAX), show a response ===== */
function initEnquiry() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;
  const type = form.elements["enquiry-type"];
  const productFields = document.getElementById("product-fields");
  const productSelect = form.elements.product;
  const status = document.getElementById("form-status");
  const result = document.getElementById("enquiry-result");
  const resultText = document.getElementById("enquiry-result-text");

  PRODUCTS.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.textContent = p.name + " – " + money(p.price);
    productSelect.appendChild(opt);
  });
  type.addEventListener("change", () => { productFields.hidden = type.value !== "product"; });
  liveValidate(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    result.hidden = true;
    if (!validateForm(form)) {
      setStatus(status, "Some fields need attention. Check the messages in red.", true);
      return;
    }
    setStatus(status, "Sending your enquiry…", false);
    try {
      const reply = enquiryReply(form);
      if (FORMSPREE_URL) {
        const res = await fetch(FORMSPREE_URL, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 600)); // demo mode until FORMSPREE_URL is set
      }
      resultText.textContent = reply;
      result.hidden = false;
      result.focus();
      setStatus(status, "", false);
      form.reset();
      productFields.hidden = true;
      form.elements.message.dispatchEvent(new Event("input"));
    } catch {
      setStatus(status, "Your enquiry did not send. Check your connection and try again, or call the branch.", true);
    }
  });
}

function enquiryReply(form) {
  const first = form.elements.name.value.trim().split(/\s+/)[0];
  const t = form.elements["enquiry-type"].value;
  if (t === "product") {
    const p = PRODUCTS.find((x) => x.name === form.elements.product.value);
    const qty = Number(form.elements.quantity.value);
    const total = money(p.price * qty);
    const availability = {
      in: "It is in stock at our branches.",
      low: "Stock is low, so please call the branch to reserve " + qty + ".",
      out: "It is out of stock right now. We can usually order it in within 2 to 3 days."
    }[p.stock];
    return "Thanks " + first + "! " + qty + " × " + p.name + " comes to an estimated " + total + ". " + availability;
  }
  if (t === "service") return "Thanks " + first + "! Our departments trade Mon–Sat 08:00–20:00 and Sun 09:00–18:00. A team member will email you with availability and costs within 1 business day.";
  if (t === "promotion") return "Thanks " + first + "! Specials change regularly, and Smart Shopper members earn extra savings. We will email you the current promotions within 1 business day.";
  return "Thanks " + first + "! We have your enquiry and will reply by email within 1 business day.";
}

/* ===== Contact form: validate, compile an email, let the customer send it ===== */
function initContact() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("contact-status");
  const preview = document.getElementById("email-preview");
  const pre = document.getElementById("email-text");
  const sendLink = document.getElementById("send-email");
  liveValidate(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    preview.hidden = true;
    if (!validateForm(form)) {
      setStatus(status, "Some fields need attention. Check the messages in red.", true);
      return;
    }
    setStatus(status, "", false);
    const d = Object.fromEntries(new FormData(form));
    const subject = "[" + d["message-type"] + "] Message from " + d.name.trim();
    const body =
      "Name: " + d.name.trim() + "\n" +
      "Email: " + d.email.trim() + "\n" +
      "Phone: " + (d.phone.trim() || "Not provided") + "\n" +
      "Message type: " + d["message-type"] + "\n\n" +
      d.message.trim();
    pre.textContent = "To: " + RECIPIENT_EMAIL + "\nSubject: " + subject + "\n\n" + body;
    sendLink.href = "mailto:" + RECIPIENT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    preview.hidden = false;
    preview.focus();
  });
}