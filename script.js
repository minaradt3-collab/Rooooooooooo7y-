// 📸 EDIT THESE: your photos together. Put the pictures inside a folder called "photos".
// Add or remove lines freely. They alternate left / right automatically.
const PHOTOS = [
  { src: "photos/1.jpg", text: "You in red, me just staring" },
  { src: "photos/2.jpg", text: "My princess and her throne" },
  { src: "photos/3.jpg", text: "That smile, every single time" },
  { src: "photos/4.jpg", text: "Sunshine looks better with you" },
  { src: "photos/5.jpg", text: "Being silly under our sky" }
];

// ✏️ EDIT THESE: the lines that get typed under her name
const LINES = [
  "Some people light up a room.",
  "You light up my whole sky.",
  "This one's for you, Sodo. 💛"
];

const sky = document.getElementById("sky");
const song = document.getElementById("song");

// twinkling stars
for (let i = 0; i < 40; i++) {
  const s = document.createElement("i");
  s.className = "star";
  s.style.top = Math.random() * 100 + "%";
  s.style.left = Math.random() * 100 + "%";
  s.style.animationDelay = Math.random() * 3 + "s";
  sky.appendChild(s);
}

// one floating lantern (or teddy)
function launch(teddy) {
  const el = document.createElement("div");
  const size = teddy ? 30 + Math.random() * 20 : 22 + Math.random() * 26;
  el.className = teddy ? "teddy" : "lantern";
  if (teddy) el.textContent = "🧸";
  el.style.setProperty("--s", size + "px");
  el.style.setProperty("--d", 11 + Math.random() * 9 + "s");
  el.style.left = Math.random() * 94 + "%";
  sky.appendChild(el);
  el.addEventListener("animationend", (e) => { if (e.animationName === "rise") el.remove(); });
}

// ambient: a lantern every moment, a teddy now and then
setInterval(() => launch(false), 1200);
setInterval(() => launch(true), 5000);
for (let i = 0; i < 6; i++) setTimeout(() => launch(false), i * 250);


// build the zig-zag gallery
const tl = document.getElementById("timeline");
PHOTOS.forEach((p, i) => {
  const side = i % 2 === 0 ? "left" : "right";
  const m = document.createElement("div");
  m.className = "moment " + side;
  m.innerHTML =
    '<div class="float" style="animation-delay:' + (i * 0.7) + 's">' +
      '<figure class="polaroid">' +
        '<div class="ph"><img src="' + p.src + '" alt="" loading="lazy" onerror="this.style.display=\'none\'"></div>' +
        '<figcaption class="script">' + p.text + '</figcaption>' +
        '<span class="pin">🧸</span>' +
      '</figure>' +
    '</div>';
  m.querySelector(".polaroid").addEventListener("click", function () {
    this.classList.remove("pop"); void this.offsetWidth; this.classList.add("pop");
    for (let k = 0; k < 4; k++) setTimeout(() => launch(k % 2 === 0), k * 120);
  });
  tl.appendChild(m);
});

// typewriter
function typeLines() {
  const box = document.getElementById("typed");
  let line = 0, ch = 0, out = "";
  (function step() {
    if (line >= LINES.length) return;
    out += LINES[line][ch++] || "";
    box.textContent = out;
    if (ch >= LINES[line].length) { line++; ch = 0; out += "\n"; box.style.whiteSpace = "pre-line"; setTimeout(step, 700); }
    else setTimeout(step, 55);
  })();
}

// scroll reveal
const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.2 });

// open button: starts the song (phones only allow sound after a tap)
document.getElementById("openBtn").addEventListener("click", () => {
  song.volume = 0.8;
  song.play().catch(() => {});
  document.getElementById("intro").classList.add("hide");
  document.getElementById("main").hidden = false;
  document.querySelectorAll(".reveal, .moment").forEach((el) => io.observe(el));
  setTimeout(typeLines, 600);
  setTimeout(() => document.getElementById("intro").remove(), 1100);
});

// final wish
document.getElementById("wishBtn").addEventListener("click", () => {
  for (let i = 0; i < 24; i++) setTimeout(() => launch(i % 5 === 0), i * 120);
  document.getElementById("wishMsg").hidden = false;
});
