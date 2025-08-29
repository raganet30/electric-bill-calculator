const barangays = [
  "Brgy. Aurora", "Brgy. Ba-ay", "Brgy. Bahay", "Brgy. Balite", "Brgy. Balud", "Brgy. Barobaybay",
  "Brgy. Binaliw", "Brgy. Bonifacio", "Brgy. Buenavista", "Brgy. Bugko",
  "Brgy. Cabacungan", "Brgy. Cacaransan", "Brgy. Cag-abaca", "Brgy. Cagbayang", "Brgy. Cagbilwang",
  "Brgy. Caglanipao Norte", "Brgy. Caglanipao Sur", "Brgy. Cagmanipes Sur",
  "Brgy. Cagnipa", "Brgy. Cag-olango", "Brgy. Cahumpan", "Brgy. Calanyugan",
  "Brgy. Calapi", "Brgy. Cal-igang", "Brgy. Casandig I", "Brgy. Cogon",
  "Brgy. Colab-Og", "Brgy. Danao I", "Brgy. Dona Pulqueria", "Brgy. Garcia", "Brgy. Gajo",
  "Brgy. Geratag", "Brgy. Guin-on", "Brgy. Happy Valley", "Brgy. Ibol", "Brgy. Ilo",
  "Brgy. Inoraguiao", "Brgy. Jamoog", "Brgy. Jimautan", "Brgy. Lagundi",
  "Brgy. Lao angan", "Brgy. Lapaan", "Brgy. Libertad", "Brgy. Longsob",
  "Brgy. Lulugayan", "Brgy. Mabuhay", "Brgy. Malaga", "Brgy. Malajog",
  "Brgy. Malayog", "Brgy. Malino", "Brgy. Malopalo", "Brgy. Manguino-o",
  "Brgy. McKinley", "Brgy. Naga", "Brgy. New Mahayag", "Brgy. New Rizal",
  "Brgy. NHA Site I", "Brgy. Obayan", "Brgy. Old Mahayag", "Brgy. Palale",
  "Brgy. Panlayahan", "Brgy. Pasigay", "Brgy. Peña I", "Brgy. Pilar",
  "Brgy. Placer", "Brgy. Pologon", "Brgy. Roxas", "Brgy. Saljag Main", "Brgy. Saljag Ext.", "Brgy. Salvacion",
  "Brgy. San Agustin", "Brgy. San Juan", "Brgy. San Miguel", "Brgy. San Roque",
  "Brgy. San Rufino",
  "Brgy. Seven Hills", "Brgy. Sinidman Oriental", "Brgy. Somoge", "Brgy. Tagnao",
  "Brgy. Tambongan", "Brgy. Tarabucan", "Brgy. Tigbawon", "Brgy. Tinaplacan",
  "Brgy. Veriato", "Brgy. Washington"
];
function populateBarangays() {
  ["site", "site2"].forEach(id => {
    const select = document.getElementById(id);
    barangays.forEach(brgy => {
      const option = document.createElement("option");
      option.value = brgy;
      option.textContent = brgy;
      select.appendChild(option);
    });
  });
}
function switchTab(tabId) {
  document.querySelectorAll(".form-section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  const activeBtn = Array.from(document.querySelectorAll(".tab-btn")).find(btn => btn.textContent.includes(tabId.includes("main") ? "Main" : "Manual"));
  if (activeBtn) activeBtn.classList.add("active");
}
function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
function generateBill(mode) {
  // Helper rounding function: rounds to 2 decimals reliably
  function roundToTwo(num) {
    return (Math.round(num * 100 + 1e-10) / 100).toFixed(2);
  }

  // Helper rounding function: rounds to 1 decimal
  function roundToOne(num) {
    return (Math.round(num * 10 + 1e-10) / 10).toFixed(1);
  }

  // IF MANUAL BILLING
  if (mode === 'manual') {
    const site = document.getElementById("site2").value || document.getElementById("otherSite2").value || "N/A";
    const from = document.getElementById("billFrom2").value;
    const to = document.getElementById("billTo2").value;
    const period = (from && to) ? `${formatDate(from)} to ${formatDate(to)}` : "N/A";

    const rate = parseFloat(document.getElementById("inputRate").value);
    const subCurr = parseFloat(document.getElementById("subCurr2").value);
    const subPrev = parseFloat(document.getElementById("subPrev2").value);

    if (isNaN(rate) || isNaN(subCurr) || isNaN(subPrev) || subCurr < subPrev) {
      alert("Please enter valid values."); return;
    }

    const usage = roundToOne(subCurr - subPrev);
    const amount = roundToTwo(usage * rate);

    const formattedAmount = new Intl.NumberFormat('en-PH', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(amount);

    document.getElementById("billSlip").innerHTML = `
      <h3 style="text-align:center;">${site.toUpperCase()} - ELECTRIC BILL COMPUTATION</h3>
      <p><strong>Billing Period:</strong> ${period}</p>
      <table class="bill-table">
        <tr><td>Rate per kWh</td><td>₱${roundToTwo(rate)}</td></tr>
        <tr><td>Submeter Current Reading</td><td>${subCurr}</td></tr>
        <tr><td>Submeter Previous Reading</td><td>${subPrev}</td></tr>
        <tr><td>Total Usage (kWh)</td><td>${usage}</td></tr>
        <tr><td class="highlight">Bill Amount to Pay: </td> <td class="highlight">₱${formattedAmount}</td></tr>
      </table>`;
  } else {
    // IF MAIN BILLING
    const site = document.getElementById("site").value || document.getElementById("otherSite").value || "N/A";
    const from = document.getElementById("billFrom").value;
    const to = document.getElementById("billTo").value;
    const period = (from && to) ? `${formatDate(from)} to ${formatDate(to)}` : "N/A";

    const mainCurr = parseFloat(document.getElementById("mainCurr").value);
    const mainPrev = parseFloat(document.getElementById("mainPrev").value);
    const mainBill = parseFloat(document.getElementById("mainBill").value);
    const subCurr = parseFloat(document.getElementById("subCurr").value);
    const subPrev = parseFloat(document.getElementById("subPrev").value);

    if ([mainCurr, mainPrev, mainBill, subCurr, subPrev].some(val => isNaN(val)) || mainCurr < mainPrev || subCurr < subPrev) {
      alert("Please enter valid values."); return;
    }

    const mainUsed = mainCurr - mainPrev;
    const rawRate = mainBill / mainUsed;
    const rate = roundToTwo(rawRate);

    const subUsed = roundToOne(subCurr - subPrev);
    const amount = roundToTwo(subUsed * rate);

    const formattedAmount = new Intl.NumberFormat('en-PH', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(amount);

    document.getElementById("billSlip").innerHTML = `
      <h3 style="text-align:center;">${site.toUpperCase()} - ELECTRIC BILL COMPUTATION</h3>
      <p><strong>Billing Period:</strong> ${period}</p>
      <table class="bill-table">
        <tr><th colspan="2">Main Meter</th></tr>
        <tr><td>Current Reading</td><td>${mainCurr}</td></tr>
        <tr><td>Previous Reading</td><td>${mainPrev}</td></tr>
        <tr><td>Usage (kWh)</td><td>${mainUsed}</td></tr>
        <tr><td>Total Current Bill </td><td>₱${new Intl.NumberFormat('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(mainBill)}</td></tr>
        <tr><td>Rate per kWh</td><td>₱${rate}</td></tr>
        <tr><th colspan="2">Submeter</th></tr>
        <tr><td>Current Reading</td><td>${subCurr}</td></tr>
        <tr><td>Previous Reading</td><td>${subPrev}</td></tr>
        <tr><td>Total Usage (kWh)</td><td>${subUsed}</td></tr>
        <tr><td class="highlight">Bill Amount to Pay: </td><td class="highlight">₱${formattedAmount}</td></tr>
      </table>`;
  }

  document.getElementById("modal").style.display = "block";
}


function closeModal() {
  document.getElementById("modal").style.display = "none";
}
window.onload = populateBarangays;

function clearMainForm() {
  document.querySelectorAll("#mainForm input").forEach(input => {
    input.value = "";
  });
  document.getElementById("site").value = "";
  document.getElementById("billFrom").value = "";
  document.getElementById("billTo").value = "";
}

function clearManualForm() {
  document.querySelectorAll('#manualForm input').forEach(el => el.value = '');
  document.getElementById("site2").value = "";
  document.getElementById("billFrom").value = "";
  document.getElementById("billTo").value = "";
}


// function for screenshot
function copyModalImage() {
  const modalContent = document.querySelector('.modal-content');

  html2canvas(modalContent).then(canvas => {
    canvas.toBlob(blob => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]).then(() => {
        alert("Screenshot copied to clipboard!");
      }).catch(err => {
        alert("Failed to copy. Please try again.");
        console.error(err);
      });
    });
  });
}
