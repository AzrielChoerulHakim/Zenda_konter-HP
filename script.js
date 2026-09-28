const products = [
  {
    name: "Galaxy S Series",
    tag: "FLAGSHIP",
    category: "flagship",
    theme: "dark",
    visual: "device",
    desc: "Untuk kamu yang mengejar performa, kamera, dan pengalaman Galaxy kelas atas."
  },
  {
    name: "Galaxy Z Fold",
    tag: "FOLDABLE",
    category: "foldable",
    theme: "dark",
    visual: "fold",
    desc: "Layar luas yang bisa dilipat untuk produktivitas dan multitasking dalam satu perangkat."
  },
  {
    name: "Galaxy Z Flip",
    tag: "FOLDABLE",
    category: "foldable",
    theme: "soft",
    visual: "flip",
    desc: "Ringkas, ekspresif, dan mudah dibawa dengan desain lipat yang ikonik."
  },
  {
    name: "Galaxy A Series",
    tag: "VALUE",
    category: "value",
    theme: "green",
    visual: "device",
    desc: "Pilihan seimbang untuk kebutuhan harian, baterai, kamera, dan aktivitas sosial."
  },
  {
    name: "Galaxy FE",
    tag: "PERFORMANCE VALUE",
    category: "value",
    theme: "",
    visual: "device",
    desc: "Karakter flagship dengan pendekatan harga yang lebih rasional."
  },
  {
    name: "Galaxy Entry Series",
    tag: "ESSENTIAL",
    category: "value",
    theme: "soft",
    visual: "device",
    desc: "Untuk kebutuhan komunikasi dan aplikasi sehari-hari dengan fokus pada fungsi esensial."
  }
];

const grid = document.querySelector("#productGrid");
const filters = document.querySelectorAll(".filter");

function visualMarkup(type) {
  if (type === "fold") return '<div class="fold-device"></div>';
  if (type === "flip") return '<div class="flip-device"></div>';
  return '<div class="device"></div>';
}

function renderProducts(filter = "all") {
  const list = filter === "all" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = list.map((p, i) => `
    <article class="product-card reveal visible" style="transition-delay:${i * 60}ms">
      <div class="product-visual ${p.theme}">
        ${visualMarkup(p.visual)}
      </div>
      <div class="product-copy">
        <div class="product-topline">
          <span class="product-tag">${p.tag}</span>
        </div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <a href="#kontak" class="product-link">Cek ketersediaan <span>→</span></a>
      </div>
    </article>
  `).join("");
}

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const toast = document.querySelector("#toast");
document.querySelector(".contact-placeholder").addEventListener("click", () => {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();