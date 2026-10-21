// Data Menu dengan Harga Berbentuk Angka (agar mudah dihitung totalnya)
const menuData = [
    { id: 1, nama: "Kopi Susu Gula Aren", kategori: "kopi", harga: 22000, deskripsi: "Espresso dengan fresh milk dan gula aren asli.", gambar: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80" },
    { id: 2, nama: "Americano Ice", kategori: "kopi", harga: 18000, deskripsi: "Kopi hitam murni dengan es segar.", gambar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80" },
    { id: 3, nama: "Nasi Goreng Spesial", kategori: "makanan", harga: 28000, deskripsi: "Nasi goreng telur mata sapi dan ayam.", gambar: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=80" },
    { id: 4, nama: "Mie Goreng Rempah", kategori: "makanan", harga: 25000, deskripsi: "Mie goreng khas kafe bumbu rempah.", gambar: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80" },
    { id: 5, nama: "French Fries", kategori: "cemilan", harga: 15000, deskripsi: "Kentang goreng renyah bumbu gurih.", gambar: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80" },
    { id: 6, nama: "Roti Bakar Coklat Keju", kategori: "cemilan", harga: 20000, deskripsi: "Roti panggang selai cokelat & keju.", gambar: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80" }
];

let cart = []; // Array untuk menampung item yang dipilih

const menuContainer = document.getElementById("menuContainer");
const searchBox = document.getElementById("searchBox");
const filterBtns = document.querySelectorAll(".filter-btn");
const cartList = document.getElementById("cartList");
const totalPriceEl = document.getElementById("totalPrice");
const customerNameInput = document.getElementById("customerName");
const tableNumberInput = document.getElementById("tableNumber");
const waCheckoutBtn = document.getElementById("waCheckoutBtn");

// Nomor WhatsApp Kasir (Ganti dengan nomor WhatsApp kafe tujuan pesanan, misal: 6281234567890)
const nomorWhatsAppKafe = "6281234567890"; 

// Fungsi Menampilkan Menu
function tampilkanMenu(dataMenu) {
    menuContainer.innerHTML = "";
    if (dataMenu.length === 0) {
        menuContainer.innerHTML = `<p style="text-align:center; color:#777;">Menu tidak ditemukan.</p>`;
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
                <div class="menu-footer">
                    <span class="menu-price">Rp ${item.harga.toLocaleString('id-ID')}</span>
                    <button class="add-btn" onclick="tambahKeKeranjang(${item.id})">+ Tambah</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

// Fungsi Tambah ke Keranjang
window.tambahKeKeranjang = function(id) {
    const itemPilihan = menuData.find(item => item.id === id);
    const itemDiKeranjang = cart.find(item => item.id === id);

    if (itemDiKeranjang) {
        itemDiKeranjang.qty += 1;
    } else {
        cart.push({ ...itemPilihan, qty: 1 });
    }
    updateKeranjang();
};

// Fungsi Perbarui Tampilan Keranjang & Total
function updateKeranjang() {
    if (cart.length === 0) {
        cartList.innerHTML = `<p class="empty-cart">Belum ada menu yang dipilih.</p>`;
        totalPriceEl.innerText = "Rp 0";
        waCheckoutBtn.disabled = true;
        return;
    }

    cartList.innerHTML = "";
    let totalHarga = 0;

    cart.forEach(item => {
        totalHarga += item.harga * item.qty;
        const cartItemEl = document.createElement("div");
        cartItemEl.classList.add("cart-item");
        cartItemEl.innerHTML = `
            <span>${item.nama} (${item.qty}x)</span>
            <span>Rp ${(item.harga * item.qty).toLocaleString('id-ID')}</span>
        `;
        cartList.appendChild(cartItemEl);
    });

    totalPriceEl.innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;
    waCheckoutBtn.disabled = false;
}

// Event Tombol Kirim ke WhatsApp
waCheckoutBtn.addEventListener("click", () => {
    const nama = customerNameInput.value.trim();
    const meja = tableNumberInput.value.trim();

    if (!nama || !meja) {
        alert("Mohon isi Nama Pemesan dan Nomor Meja terlebih dahulu!");
        return;
    }

    // Susun Teks Pesanan untuk WhatsApp
    let pesan = `Halo Kak, saya mau pesan menu berikut:\n\n`;
    pesan += `👤 *Nama:* ${nama}\n`;
    pesan += `🪑 *No. Meja:* ${meja}\n`;
    pesan += `----------------------------------\n`;

    let totalHarga = 0;
    cart.forEach(item => {
        let subtotal = item.harga * item.qty;
        totalHarga += subtotal;
        pesan += `▪️ ${item.nama} (${item.qty}x) = Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });

    pesan += `----------------------------------\n`;
    pesan += `💰 *Total Pembayaran: Rp ${totalHarga.toLocaleString('id-ID')}*\n\n`;
    pesan += `Mohon segera diproses ya, terima kasih!`;

    // Encode teks agar aman dibaca URL WhatsApp
    const pesanEncoded = encodeURIComponent(pesan);
    const urlWhatsApp = `https://wa.me/${nomorWhatsAppKafe}?text=${pesanEncoded}`;

    // Buka WhatsApp di tab/aplikasi baru
    window.open(urlWhatsApp, "_blank");
});

// Jalankan saat pertama kali dibuka
tampilkanMenu(menuData);

// Fitur Filter Kategori
filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        filterBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        const kategori = e.target.getAttribute("data-category");

        if (kategori === "semua") {
            tampilkanMenu(menuData);
        } else {
            tampilkanMenu(menuData.filter(item => item.kategori === kategori));
        }
    });
});

// Fitur Live Search
searchBox.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    tampilkanMenu(menuData.filter(item => 
        item.nama.toLowerCase().includes(keyword) || item.deskripsi.toLowerCase().includes(keyword)
    ));
});
