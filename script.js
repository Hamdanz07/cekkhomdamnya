document.addEventListener('DOMContentLoaded', () => {
    // === A. FUNGSI UTAMA ===

    // Data Bank (Contoh Sederhana)
    const dataBank = {
        pujian: {
            resmi: [
                "Saya sangat mengagumi *etos kerja* dan dedikasi Anda. Itu benar-benar menginspirasi.",
                "Cara Anda menganalisis situasi menunjukkan *kecerdasan* yang luar biasa. Saya terkesan.",
                "Anda memiliki *aura positif* yang menenangkan. Sangat menyenangkan bisa berinteraksi dengan Anda."
            ],
            santai: [
                "Senyum kamu hari ini beneran bikin suasana jadi hangat. *Good vibe* banget!",
                "Pilihan baju kamu keren deh, *stylenya* unik dan pas. Selera kamu oke juga ya.",
                "Kamu kelihatan *all out* banget di acara tadi, keren! Aku suka energi positifmu."
            ],
            humor: [
                "Aku tebak kamu pasti kerja di Google. Soalnya di matamu ada *semua yang aku cari* (Maaf, *cringe* dikit 😅).",
                "Kamu tau nggak kenapa aku mau kenalan? Soalnya *vibe* kamu se-ceria *notifikasi Shopee flash sale*.",
            ]
        },
        icebreaker: {
            resmi: [
                "Maaf mengganggu sebentar, saya ingin bertanya tentang [Topik Spesifik/Acara]. By the way, nama saya [Nama Anda].",
                "Saya perhatikan Anda [Aksi Positif yang Dilakukan]. Itu sangat menarik, boleh saya tahu lebih banyak tentang hal itu?",
            ],
            santai: [
                "Hai, aku suka [Detail Kecil tentang Mereka/Lingkungan]. Lumayan ya hari ini, btw aku [Nama Anda].",
                "Gila, kopi di sini enak banget ya? Kamu udah coba yang rasa [Sebutkan Rasa]? Aku [Nama Anda], salam kenal.",
            ],
            followup: [
                "Semoga harimu menyenangkan. Aku masih kepikiran obrolan kita soal [Topik]. Gimana kelanjutannya menurut kamu?",
                "Hei [Nama], cuma mau bilang senang bisa kenalan. Kalau lagi senggang, mau ngopi santai sambil lanjut ngobrolin [Hobi Mereka]?",
            ]
        }
    };

    // Fungsi untuk mendapatkan kalimat acak
    function getGeneratedOutput() {
        const fokus = document.getElementById('fokusInteraksi').value;
        const gaya = document.getElementById('gayaBahasa').value;
        const nama = document.getElementById('namaInput').value.trim();

        // Tentukan kategori data (Pujian atau Icebreaker/Follow-up)
        const category = (fokus === 'pujian') ? dataBank.pujian : dataBank.icebreaker;
        
        // Sesuaikan kunci gaya untuk mencari data
        const styleKey = (fokus === 'pujian') ? gaya : fokus; 
        
        // Jika fokus bukan pujian, kita tetap menggunakan data icebreaker
        const dataSet = category[gaya] || category.santai; // Ambil data berdasarkan gaya
        
        if (!dataSet) return "Data tidak ditemukan. Coba kombinasi lain.";
        
        const randomIndex = Math.floor(Math.random() * dataSet.length);
        let result = dataSet[randomIndex];

        // Tambahkan nama di awal (jika ada)
        if (nama) {
            result = `${nama}, ${result.charAt(0).toLowerCase() + result.slice(1)}`;
        } else {
            result = result.charAt(0).toUpperCase() + result.slice(1);
        }

        return result;
    }

    // Fungsi untuk membuat proposal rencana kencan
    function getDraftRencana() {
        const tgl = document.getElementById('tgl').value.trim();
        const tempat = document.getElementById('tempat').value.trim();
        const catatan = document.getElementById('catatan').value.trim();
        const ideDasar = document.getElementById('ideDasar').options[document.getElementById('ideDasar').selectedIndex].text;

        if (!tgl || !tempat) {
            return "Mohon isi Hari/Tanggal dan Lokasi.";
        }

        let draft = `Hai! 👋\n\n`;
        draft += `Aku mau menawarkan ide kencan:\n`;
        draft += `**Apa:** ${ideDasar}\n`;
        draft += `**Kapan:** ${tgl}\n`;
        draft += `**Di mana:** ${tempat}\n\n`;

        if (catatan) {
            draft += `**Catatan (Pilihan/Respek):** ${catatan}\n\n`;
        } else {
            draft += `**Catatan (Pilihan/Respek):** Kita bisa tentukan detailnya nanti. Jika kamu ada ide atau preferensi lain, sangat boleh diajukan!\n\n`;
        }

        draft += `Gimana menurutmu? Kalau OK, kabari ya. Kalau kamu kurang nyaman/sibuk, bebas bilang aja. 😊`;

        return draft;
    }


    // === B. PENGATUR EVENT LISTENER ===

    // 1. Generator Kalimat
    const btnBuatDraft = document.getElementById('buatDraft');
    const outputGenerated = document.getElementById('outputGenerated');
    const btnSalinOutput = document.getElementById('salinOutput');

    btnBuatDraft.addEventListener('click', () => {
        const output = getGeneratedOutput();
        outputGenerated.textContent = output;
        btnSalinOutput.disabled = false;
    });

    btnSalinOutput.addEventListener('click', () => {
        navigator.clipboard.writeText(outputGenerated.textContent)
            .then(() => {
                btnSalinOutput.textContent = 'Tersalin! ✅';
                setTimeout(() => {
                    btnSalinOutput.textContent = 'Salin Draf';
                }, 2000);
            })
            .catch(err => {
                console.error('Gagal menyalin: ', err);
                alert('Gagal menyalin teks.');
            });
    });
    
    // 2. Draft Rencana Kencan
    const btnBuatDraftRencana = document.getElementById('buatDraftRencana');
    const draftOutput = document.getElementById('draftOutput');
    const btnSalinDraftRencana = document.getElementById('salinDraftRencana');
    const formRencana = document.getElementById('formRencana');

    btnBuatDraftRencana.addEventListener('click', (e) => {
        e.preventDefault();
        const output = getDraftRencana();
        draftOutput.textContent = output;
        
        // Hanya aktifkan tombol salin jika output bukan pesan error (misal: "Mohon isi...")
        if (!output.startsWith("Mohon isi")) {
            btnSalinDraftRencana.disabled = false;
        } else {
             alert(output); // Tampilkan alert jika ada error validasi
        }
    });

    btnSalinDraftRencana.addEventListener('click', () => {
        navigator.clipboard.writeText(draftOutput.textContent)
            .then(() => {
                btnSalinDraftRencana.textContent = 'Tersalin! ✅';
                setTimeout(() => {
                    btnSalinDraftRencana.textContent = 'Salin Proposal';
                }, 2000);
            })
            .catch(err => {
                console.error('Gagal menyalin: ', err);
                alert('Gagal menyalin teks.');
            });
    });

    // 3. Toggle Tema (Dark/Light Mode)
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️' : '🌓';
    });

    // Muat Tema dari Local Storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌓';
    }
});
