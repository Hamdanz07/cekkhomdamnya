// ===== Helper: copy to clipboard =====
async function copyText(elId, btnId){
  const el = document.getElementById(elId);
  const btn = document.getElementById(btnId);
  if(!el || !el.textContent.trim()) return;
  try{
    await navigator.clipboard.writeText(el.textContent.trim());
    const prev = btn.textContent;
    btn.textContent = "Tersalin!";
    setTimeout(()=>btn.textContent = prev, 1200);
  }catch{
    alert("Gagal menyalin. Izinkan clipboard ya.");
  }
}

// ===== Theme toggle (dark/light) =====
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", ()=>{
  document.documentElement.classList.toggle("light");
});

// ======== PUJIAN ========
const namaInput = document.getElementById("namaInput");
const gayaPujian = document.getElementById("gayaPujian");
const outputPujian = document.getElementById("outputPujian");
const btnPujian = document.getElementById("buatPujian");
const btnSalinPujian = document.getElementById("salinPujian");

const pujianMap = {
  ringan: [
    "Senyummu bikin suasana jadi lebih ringan.",
    "Cara kamu menyimak itu bikin orang merasa dihargai.",
    "Gaya kamu sederhana tapi berkelas, enak dilihat."
  ],
  tulus: [
    "Aku kagum sama cara kamu menghormati orang lain.",
    "Kamu terlihat tulus dan hangat; itu langka dan berharga.",
    "Percaya dirimu terasa natural, bikin nyaman."
  ],
  humor: [
    "Kamu itu kombinasi langka: asyik diajak ngobrol, bonusnya bikin betah 😊",
    "Sejujurnya, vibe kamu kayak lagu enak—susah nggak diulang.",
    "Garing dikit gapapa, yang penting kamu lucu asli, bukan settingan 😄"
  ]
};

btnPujian?.addEventListener("click", ()=>{
  const nama = (namaInput.value || "").trim();
  const gaya = gayaPujian.value || "ringan";
  const list = pujianMap[gaya];
  const text = list[Math.floor(Math.random()*list.length)];
  const withName = nama ? `${nama}, ${text}` : text;
  outputPujian.textContent = withName;
  btnSalinPujian.disabled = false;
});
btnSalinPujian?.addEventListener("click", ()=>copyText("outputPujian","salinPujian"));

// ======== ICEBREAKER ========
const outputIce = document.getElementById("outputIce");
const btnIce = document.getElementById("buatIce");
const btnSalinIce = document.getElementById("salinIce");
const situasi = document.getElementById("situasi");
const suasana = document.getElementById("suasana");

const icePool = [
  {situasi:"chat", suasana:"santai", text:"Aku lagi cari rekomendasi lagu enak buat kerja. Kamu punya andalan?"},
  {situasi:"chat", suasana:"ceria",  text:"Kalau hari ini dikasih satu ‘power’, kamu pilih bisa teleport atau baca pikiran?"},
  {situasi:"chat", suasana:"dewasa", text:"Aku suka cara kamu menyampaikan pendapat. Topik apa yang lagi kamu senangi akhir-akhir ini?"},
  {situasi:"ketemu", suasana:"santai", text:"Halo, aku [nama]. Boleh duduk sini? Janji nggak ganggu, cuma pengen kenalan :)"},
  {situasi:"ketemu", suasana:"ceria",  text:"Random banget, tapi kalau es krim cuma boleh satu rasa seumur hidup—kamu pilih apa?"},
  {situasi:"ketemu", suasana:"dewasa", text:"Kamu terlihat nyaman di sini. Apa kamu sering datang? Aku boleh tanya rekomendasi?"},
  {situasi:"dm", suasana:"santai", text:"Hai, aku nemu postinganmu tentang [topik]. Insight-nya menarik. Boleh aku tanya hal kecil?"},
  {situasi:"dm", suasana:"ceria",  text:"Baru lihat story kamu dan itu wholesome bgt. Ada cerita di baliknya?"},
  {situasi:"dm", suasana:"dewasa", text:"Aku ingin ngobrol singkat soal [topik]. Kalau kamu keberatan, feel free bilang ya—aku hormati."},
  {situasi:"kelas", suasana:"santai", text:"Tugas [mata kuliah] lumayan menantang ya. Kamu ada trik biar lebih gampang?"},
  {situasi:"kelas", suasana:"ceria",  text:"Tim kopi atau teh pas begadang ngerjain tugas? Aku lagi butuh ide."},
  {situasi:"kelas", suasana:"dewasa", text:"Aku suka caramu presentasi tadi—ringkas & jelas. Mau diskusi lanjut habis kelas?"}
];

btnIce?.addEventListener("click", ()=>{
  const s = situasi.value, u = suasana.value;
  const candidates = icePool.filter(i=>i.situasi===s && i.suasana===u);
  const pick = candidates[Math.floor(Math.random()*candidates.length)];
  outputIce.textContent = pick.text;
  btnSalinIce.disabled = false;
});
btnSalinIce?.addEventListener("click", ()=>copyText("outputIce","salinIce"));

// ======== IDE KENCAN ========
const budget = document.getElementById("budget");
const mood = document.getElementById("mood");
const listIde = document.getElementById("listIde");
const btnIde = document.getElementById("buatIde");

const ide = [
  {title:"Taman Kota + Piknik Hemat", mood:"tenang", budget:"hemat", note:"Bawa teh/kopi sendiri, kartu UNO, dan playlist."},
  {title:"Jelajah Street Food", mood:"kuliner", budget:"hemat", note:"Tentukan 3 spot dalam 1 km, kasih rating bareng."},
  {title:"Workshop DIY Mini", mood:"kreatif", budget:"sedang", note:"Lukis totebag/gelas di studio lokal."},
  {title:"Museum & Ngopi", mood:"tenang", budget:"sedang", note:"Cari pameran temporer, ngobrol soal karya favorit."},
  {title:"Fun Sport Bareng", mood:"aktif", budget:"sedang", note:"Badminton/bowling, kalah traktir camilan."},
  {title:"Kelas Masak Berdua", mood:"kreatif", budget:"bebas", note:"Pilih cuisine favoritnya; pulang bawa resep."},
  {title:"Dinner View Kota", mood:"tenang", budget:"bebas

