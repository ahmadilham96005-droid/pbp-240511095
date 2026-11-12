/* ==========================================
   AUTORENT PRO - JAVASCRIPT (script.js)
   ========================================== */

// --- STATE DATA ---
let vehicles = [
  { id: 1, name: "Toyota Avanza", type: "Mobil", plat: "B 1234 XYZ", tarif: 350000, status: "Tersedia" },
  { id: 2, name: "Honda Civic Turbo", type: "Mobil", plat: "D 5678 ABC", tarif: 750000, status: "Tersedia" },
  { id: 3, name: "Honda BeAT FI", type: "Motor", plat: "F 9876 DEF", tarif: 80000, status: "Tersedia" },
  { id: 4, name: "Yamaha NMAX 155", type: "Motor", plat: "B 4321 GHI", tarif: 120000, status: "Disewa" }
];

let customers = [
  { id: 1, name: "Budi Santoso", nik: "3201123456780001", phone: "081234567890", address: "Jl. Merdeka No. 10, Jakarta" },
  { id: 2, name: "Siti Aminah", nik: "3271987654320002", phone: "089876543210", address: "Jl. Sudirman No. 45, Bandung" }
];

let drivers = [
  { id: 1, name: "Joko Widodo", sim: "SIM A - 9801", tarif: 150000, status: "Tersedia" },
  { id: 2, name: "Asep Saepudin", sim: "SIM A - 4521", tarif: 120000, status: "Tersedia" }
];

let transactions = [
  { id: "TRX-001", customer: "Budi Santoso", vehicle: "Yamaha NMAX 155", duration: "3 Hari", driver: "Tanpa Supir", total: 360000, status: "Aktif" }
];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
  renderVehicles();
  renderCustomers();
  renderDrivers();
  renderTransactions();
  populateDropdowns();
  setupNavigation();
});

// --- NAVIGATION SWITCHING ---
function setupNavigation() {
  const menuLinks = document.querySelectorAll(".sidebar-menu a");
  const sections = document.querySelectorAll(".view-section");
  const pageTitle = document.getElementById("page-title");
  const pageSubtitle = document.getElementById("page-subtitle");

  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      menuLinks.forEach(l => l.parentElement.classList.remove("active"));
      link.parentElement.classList.add("active");

      const target = link.getAttribute("data-target");
      sections.forEach(sec => sec.classList.remove("active"));
      document.getElementById(target).classList.add("active");

      // Update Header Title
      if (target === "dashboard") {
        pageTitle.innerText = "Dashboard Overview";
        pageSubtitle.innerText = "Ringkasan data operasional rental kendaraan";
      } else if (target === "vehicles") {
        pageTitle.innerText = "Kelola Kendaraan";
        pageSubtitle.innerText = "Tambah, edit, dan pantau ketersediaan armada mobil & motor";
      } else if (target === "customers") {
        pageTitle.innerText = "Data Pelanggan";
        pageSubtitle.innerText = "Daftar penyewa kendaraan terdaftar";
      } else if (target === "drivers") {
        pageTitle.innerText = "Data Supir (Driver)";
        pageSubtitle.innerText = "Kelola ketersediaan supir profesional";
      } else if (target === "transactions") {
        pageTitle.innerText = "Proses Transaksi Sewa";
        pageSubtitle.innerText = "Input pesanan sewa baru dan cetak kuitansi";
      }
    });
  });
}

// --- RENDER FUNCTIONS ---
function renderDashboard() {
  document.getElementById("total-vehicles").innerText = vehicles.length;
  const rentedCount = vehicles.filter(v => v.status === "Disewa").length;
  document.getElementById("total-rented").innerText = rentedCount;
  document.getElementById("total-customers").innerText = customers.length;
  
  const totalRevenue = transactions.reduce((acc, curr) => acc + curr.total, 0);
  document.getElementById("total-revenue").innerText = "Rp " + totalRevenue.toLocaleString('id-ID');
}

function renderVehicles() {
  const tbody = document.getElementById("vehicle-table-body");
  tbody.innerHTML = "";
  vehicles.forEach((v, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${v.name}</strong></td>
        <td>${v.type}</td>
        <td>${v.plat}</td>
        <td>Rp ${v.tarif.toLocaleString('id-ID')} / hari</td>
        <td><span class="badge ${v.status === 'Tersedia' ? 'available' : 'rented'}">${v.status}</span></td>
      </tr>
    `;
  });
}

function renderCustomers() {
  const tbody = document.getElementById("customer-table-body");
  tbody.innerHTML = "";
  customers.forEach((c, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${c.name}</strong></td>
        <td>${c.nik}</td>
        <td>${c.phone}</td>
        <td>${c.address}</td>
      </tr>
    `;
  });
}

function renderDrivers() {
  const tbody = document.getElementById("driver-table-body");
  tbody.innerHTML = "";
  drivers.forEach((d, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${d.name}</strong></td>
        <td>${d.sim}</td>
        <td>Rp ${d.tarif.toLocaleString('id-ID')} / hari</td>
        <td><span class="badge available">${d.status}</span></td>
      </tr>
    `;
  });
}

function renderTransactions() {
  const tbody = document.getElementById("transaction-table-body");
  tbody.innerHTML = "";
  transactions.forEach((t) => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${t.id}</strong></td>
        <td>${t.customer}</td>
        <td>${t.vehicle}</td>
        <td>${t.duration}</td>
        <td>Rp ${t.total.toLocaleString('id-ID')}</td>
        <td><span class="badge active">${t.status}</span></td>
      </tr>
    `;
  });
}

function populateDropdowns() {
  const vSelect = document.getElementById("input-vehicle");
  vSelect.innerHTML = `<option value="">-- Pilih Kendaraan --</option>`;
  vehicles.filter(v => v.status === "Tersedia").forEach(v => {
    vSelect.innerHTML += `<option value="${v.id}" data-tarif="${v.tarif}">${v.name} (${v.type} - ${v.plat}) - Rp ${v.tarif.toLocaleString('id-ID')}/hari</option>`;
  });

  const cSelect = document.getElementById("input-customer");
  cSelect.innerHTML = `<option value="">-- Pilih Pelanggan --</option>`;
  customers.forEach(c => {
    cSelect.innerHTML += `<option value="${c.name}">${c.name} (${c.phone})</option>`;
  });

  const dSelect = document.getElementById("input-driver");
  dSelect.innerHTML = `<option value="0">Tanpa Supir (Lepas Kunci)</option>`;
  drivers.filter(d => d.status === "Tersedia").forEach(d => {
    dSelect.innerHTML += `<option value="${d.id}" data-tarif="${d.tarif}">${d.name} - Rp ${d.tarif.toLocaleString('id-ID')}/hari</option>`;
  });
}

// --- LOGIN & LOGOUT HANDLER ---
function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  if(user) {
    document.getElementById("login-modal").classList.add("hidden");
    document.getElementById("user-display-name").innerText = user.toUpperCase();
  }
}

function handleLogout() {
  document.getElementById("login-modal").classList.remove("hidden");
}

// --- FORM SUBMISSIONS ---
function handleAddVehicle(e) {
  e.preventDefault();
  const name = document.getElementById("v-name").value;
  const type = document.getElementById("v-type").value;
  const plat = document.getElementById("v-plat").value;
  const tarif = parseInt(document.getElementById("v-tarif").value);

  vehicles.push({ id: vehicles.length + 1, name, type, plat, tarif, status: "Tersedia" });
  renderVehicles();
  populateDropdowns();
  renderDashboard();
  e.target.reset();
  alert("Kendaraan berhasil ditambahkan!");
}

function handleAddCustomer(e) {
  e.preventDefault();
  const name = document.getElementById("c-name").value;
  const nik = document.getElementById("c-nik").value;
  const phone = document.getElementById("c-phone").value;
  const address = document.getElementById("c-address").value;

  customers.push({ id: customers.length + 1, name, nik, phone, address });
  renderCustomers();
  populateDropdowns();
  renderDashboard();
  e.target.reset();
  alert("Data pelanggan berhasil disimpan!");
}

function handleTransaction(e) {
  e.preventDefault();
  const customer = document.getElementById("input-customer").value;
  const vehicleOpt = document.getElementById("input-vehicle").selectedOptions[0];
  const driverOpt = document.getElementById("input-driver").selectedOptions[0];
  const duration = parseInt(document.getElementById("input-duration").value);

  if(!customer || !vehicleOpt.value) {
    alert("Harap pilih pelanggan dan kendaraan terlebih dahulu!");
    return;
  }

  const vehicleTarif = parseInt(vehicleOpt.getAttribute("data-tarif"));
  const driverTarif = driverOpt.value !== "0" ? parseInt(driverOpt.getAttribute("data-tarif")) : 0;
  
  const total = (vehicleTarif + driverTarif) * duration;
  const trxId = "TRX-00" + (transactions.length + 1);

  // Simpan transaksi
  transactions.push({
    id: trxId,
    customer: customer,
    vehicle: vehicleOpt.text.split(" (")[0],
    duration: duration + " Hari",
    driver: driverOpt.value !== "0" ? driverOpt.text.split(" -")[0] : "Tanpa Supir",
    total: total,
    status: "Aktif"
  });

  // Tampilkan Nota Kuitansi di Modal
  document.getElementById("receipt-id").innerText = trxId;
  document.getElementById("receipt-customer").innerText = customer;
  document.getElementById("receipt-vehicle").innerText = vehicleOpt.text;
  document.getElementById("receipt-duration").innerText = duration + " Hari";
  document.getElementById("receipt-total").innerText = "Rp " + total.toLocaleString('id-ID');
  
  document.getElementById("receipt-modal").classList.remove("hidden");

  renderTransactions();
  renderDashboard();
  e.target.reset();
}

function closeReceipt() {
  document.getElementById("receipt-modal").classList.add("hidden");
}