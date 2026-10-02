function calculateSIP() {

    let monthlyInvestment = parseFloat(
        document.getElementById("monthlyInvestment").value
    );

    let annualReturn = parseFloat(
        document.getElementById("annualReturn").value
    );

    let years = parseFloat(
        document.getElementById("years").value
    );

    if (
        isNaN(monthlyInvestment) ||
        isNaN(annualReturn) ||
        isNaN(years)
    ) {
        document.getElementById("result").innerHTML =
        "Please enter All values";
        return;
    }

    let monthlyRate =
        annualReturn / 12 / 100;

    let months =
        years * 12;

    let futureValue =
        monthlyInvestment *
        (
            (Math.pow(1 + monthlyRate, months) - 1)
            / monthlyRate
        ) *
        (1 + monthlyRate);

    let investedAmount =
        monthlyInvestment * months;

    let estimatedReturns =
        futureValue - investedAmount;

    document.getElementById("result").innerHTML =

    `<div class="result-card">
        <div class="result-title">
            Invested Amount
        </div>
        <div class="result-value">
            ₹${investedAmount.toFixed(2)}
        </div>
    </div>

    <div class="result-card">
        <div class="result-title">
            Estimated Returns
        </div>
        <div class="result-value">
            ₹${estimatedReturns.toFixed(2)}
        </div>
    </div>

    <div class="result-card">
        <div class="result-title">
            Total Value
        </div>
        <div class="result-value">
            ₹${futureValue.toFixed(2)}
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
    `SIP Calculator

    Invested Amount: ₹${investedAmount.toFixed(2)}
    Total Value: ₹${futureValue.toFixed(2)}

    ${getTimestamp()}`
    );

}