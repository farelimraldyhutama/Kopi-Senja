// Data Menu (Disimpan dalam bentuk Array of Objects tanpa database)
const menuData = [
    {
        nama: "Kopi Susu Gula Aren",
        kategori: "kopi",
        harga: "Rp 22.000",
        deskripsi: "Espresso dipadu dengan fresh milk dan manisnya gula aren asli.",
        gambar: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80"
    },
    {
        nama: "Americano Ice",
        kategori: "kopi",
        harga: "Rp 18.000",
        deskripsi: "Kopi hitam murni dengan es segar, cocok untuk pencinta kopi kuat.",
        gambar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"
    },
    {
        nama: "Nasi Goreng Spesial",
        kategori: "makanan",
        harga: "Rp 28.000",
        deskripsi: "Nasi goreng dengan telur mata sapi, suwiran ayam, dan kerupuk.",
        gambar: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=80"
    },
    {
        nama: "Mie Goreng Rempah",
        kategori: "makanan",
        harga: "Rp 25.000",
        deskripsi: "Mie goreng khas kafe dengan racikan bumbu rempah pilihan.",
        gambar: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80"
    },
    {
        nama: "French Fries",
        kategori: "cemilan",
        harga: "Rp 15.000",
        deskripsi: "Kentang goreng renyah dengan taburan bumbu gurih.",
        gambar: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80"
    },
    {
        nama: "Roti Bakar Coklat Keju",
        kategori: "cemilan",
        harga: "Rp 20.000",
        deskripsi: "Roti panggang tebal dengan selai cokelat melimpah dan keju parut.",
        gambar: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80"
    }
];

// Elemen HTML yang akan dimanipulasi
const menuContainer = document.getElementById("menuContainer");
const searchBox = document.getElementById("searchBox");
const filterBtns = document.querySelectorAll(".filter-btn");

// Fungsi untuk menampilkan daftar menu ke halaman web
function tampilkanMenu(dataMenu) {
    menuContainer.innerHTML = ""; // Kosongkan kontainer terlebih dahulu

    if (dataMenu.length === 0) {
        menuContainer.innerHTML = `<p style="text-align:center; color:#777; margin-top:20px;">Menu tidak ditemukan.</p>`;
        return;
    }

    dataMenu.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("menu-card");

        card.innerHTML = `
            <img src="${item.gambar}" alt="${item.nama}" class="menu-img">
            <div class="menu-info">
                <div>
                    <h3 class="menu-title">${item.nama}</h3>
                    <p class="menu-desc">${item.deskripsi}</p>
                </div>
                <div class="menu-price">${item.harga}</div>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

// Menampilkan semua menu saat pertama kali halaman dibuka
tampilkanMenu(menuData);

// Fitur Filter Kategori saat tombol diklik
filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        // Hapus class 'active' dari semua tombol, lalu tambahkan ke tombol yang diklik
        filterBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");

        const kategori = e.target.getAttribute("data-category");

        if (kategori === "semua") {
            tampilkanMenu(menuData);
        } else {
            const menuFiltered = menuData.filter(item => item.kategori === kategori);
            tampilkanMenu(menuFiltered);
        }
    });
});

// Fitur Pencarian Real-Time (Live Search)
searchBox.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    
    const menuSearched = menuData.filter(item => {
        return item.nama.toLowerCase().includes(keyword) || item.deskripsi.toLowerCase().includes(keyword);
    });

    tampilkanMenu(menuSearched);
});
