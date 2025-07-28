const barangays = [
                        "Brgy. Aurora", "Brgy. Ba-ay", "Brgy. Balite", "Brgy. Balud", "Brgy. Barobaybay",
                        "Brgy. Binaliw", "Brgy. Bonifacio", "Brgy. Buenavista", "Brgy. Bugko",
                        "Brgy. Cabacungan", "Brgy. Cacaransan", "Brgy. Cag-abaca", "Brgy. Cagbayang",
                        "Brgy. Caglanipao Norte", "Brgy. Caglanipao Sur", "Brgy. Cagmanipes Sur",
                        "Brgy. Cagnipa", "Brgy. Cag-olango", "Brgy. Cahumpan", "Brgy. Calanyugan",
                        "Brgy. Calapi", "Brgy. Cal-igang", "Brgy. Casandig I", "Brgy. Cogon",
                        "Brgy. Colab-Og", "Brgy. Danao I", "Brgy. Dona Pulqueria", "Brgy. Garcia",
                        "Brgy. Geratag", "Brgy. Happy Valley", "Brgy. Ibol", "Brgy. Ilo",
                        "Brgy. Inoraguiao", "Brgy. Jamoog", "Brgy. Jimautan", "Brgy. Lagundi",
                        "Brgy. Lao angan", "Brgy. Lapaan", "Brgy. Libertad", "Brgy. Longsob",
                        "Brgy. Lulugayan", "Brgy. Mabuhay", "Brgy. Malaga", "Brgy. Malajog",
                        "Brgy. Malayog", "Brgy. Malino", "Brgy. Malopalo", "Brgy. Manguino-o",
                        "Brgy. McKinley", "Brgy. Naga", "Brgy. New Mahayag", "Brgy. New Rizal",
                        "Brgy. NHA Site I", "Brgy. Obayan", "Brgy. Old Mahayag", "Brgy. Palale",
                        "Brgy. Panlayahan", "Brgy. Pasigay", "Brgy. Pena I", "Brgy. Pilar",
                        "Brgy. Placer", "Brgy. Pologon", "Brgy. Roxas", "Brgy. Salvacion",
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
      if (mode === 'manual') {
        const site = document.getElementById("site2").value || "N/A";
        const from = document.getElementById("billFrom2").value;
        const to = document.getElementById("billTo2").value;
        const period = (from && to) ? `${formatDate(from)} to ${formatDate(to)}` : "N/A";
        const rate = parseFloat(document.getElementById("inputRate").value);
        const subCurr = parseFloat(document.getElementById("subCurr2").value);
        const subPrev = parseFloat(document.getElementById("subPrev2").value);
        if (isNaN(rate) || isNaN(subCurr) || isNaN(subPrev) || subCurr < subPrev) {
          alert("Please enter valid values."); return;
        }
        const usage = (subCurr - subPrev).toFixed(1);
        const amount = (usage * rate).toFixed(2);
        document.getElementById("billSlip").innerHTML = `
          <h3 style="text-align:center;">${site.toUpperCase()} - ELECTRIC BILL COMPUTATION</h3>
          <p><strong>Billing Period:</strong> ${period}</p>
          <table class="bill-table">
            <tr><td>Rate per kWh</td><td>₱${rate.toFixed(2)}</td></tr>
            <tr><td>Submeter Current Reading</td><td>${subCurr}</td></tr>
            <tr><td>Submeter Previous Reading</td><td>${subPrev}</td></tr>
            <tr><td>Total Usage (kWh)</td><td>${usage}</td></tr>
            <tr><td class="highlight">Bill Amount to Pay: </td> <td class="highlight">₱${amount}</td></tr>
          </table>`;
      } else {
        const site = document.getElementById("site").value || "N/A";
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
        const mainUsed = (mainCurr - mainPrev);
        const rate = (mainBill / mainUsed).toFixed(2);
        const subUsed = (subCurr - subPrev).toFixed(1);
        const amount = (subUsed * rate).toFixed(2);
        document.getElementById("billSlip").innerHTML = `
          <h3 style="text-align:center;">${site.toUpperCase()} - ELECTRIC BILL COMPUTATION</h3>
          <p><strong>Billing Period:</strong> ${period}</p>
          <table class="bill-table">
            <tr><th colspan="2">Main Meter</th></tr>
            <tr><td>Current Reading</td><td>${mainCurr}</td></tr>
            <tr><td>Previous Reading</td><td>${mainPrev}</td></tr>
            <tr><td>Usage (kWh)</td><td>${mainUsed}</td></tr>
            <tr><td>Total Bill Amount</td><td>₱${mainBill.toFixed(2)}</td></tr>
            <tr><td>Rate per kWh</td><td>₱${rate}</td></tr>
            <tr><th colspan="2">Submeter</th></tr>
            <tr><td>Current Reading</td><td>${subCurr}</td></tr>
            <tr><td>Previous Reading</td><td>${subPrev}</td></tr>
            <tr><td>Total Usage (kWh)</td><td>${subUsed}</td></tr>
            <tr><td class="highlight">Bill Amount to Pay: </td><td class="highlight">₱${amount}</td></tr>
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
      document.getElementById("site").value = "";
      document.getElementById("billFrom").value = "";
      document.getElementById("billTo").value = "";
    }