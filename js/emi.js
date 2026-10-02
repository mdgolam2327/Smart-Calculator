function calculateEMI() {

    let principal = parseFloat(
        document.getElementById("loanAmount").value
    );

    let annualRate = parseFloat(
        document.getElementById("interestRate").value
    );

    let years = parseFloat(
        document.getElementById("loanTenure").value
    );

    if (
        isNaN(principal) ||
        isNaN(annualRate) ||
        isNaN(years)
    ) {
        document.getElementById("result").innerHTML =
        "Please enter All values";
        return;
    }

    let monthlyRate = annualRate / 12 / 100;
    let months = years * 12;

    let emi =
        principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months) /
        (Math.pow(1 + monthlyRate, months) - 1);

    let yearlyPayment = emi * 12;
    let totalPayment = emi * months;
    let totalInterest = totalPayment - principal;

    document.getElementById("result").innerHTML =

    `<div class="result-card">
        <div class="result-title">
            Monthly EMI
        </div>
        <div class="result-value">
            ₹${emi.toFixed(2)}
        </div>
    </div>

    <div class="result-card">
        <div class="result-title">
            Yearly Payment
        </div>
        <div class="result-value">
            ₹${yearlyPayment.toFixed(2)}
        </div>
    </div>

    <div class="result-card">
        <div class="result-title">
            Total Payment
        </div>
        <div class="result-value">
            ₹${totalPayment.toFixed(2)}
        </div>
    </div>

    <div class="result-card">
        <div class="result-title">
            Total Interest
        </div>
        <div class="result-value">
            ₹${totalInterest.toFixed(2)}
        </div>
    </div>

    <div class="result-card">

        <div class="result-title">
            Calculated On
        </div>

        <div class="result-value">
            ${getTimestamp()}
        </div>

    </div>

    <button
        class="copy-btn"
        onclick="copyResult()">
        📋 Copy Result
    </button>

    <button
        class="share-btn"
        onclick="shareResult()">
        📤 Share Result
    </button>

    <button
        class="pdf-btn"
        onclick="downloadPDF()">
        📄 Download PDF
    </button>`;

    saveHistory(
    `EMI Calculator

    Monthly EMI: ₹${emi.toFixed(2)}
    Total Payment: ₹${totalPayment.toFixed(2)}

    ${getTimestamp()}`
    );

}