function calculateFD() {

    let principal = parseFloat(
        document.getElementById("principal").value
    );

    let rate = parseFloat(
        document.getElementById("rate").value
    );

    let time = parseFloat(
        document.getElementById("time").value
    );

    if (
        isNaN(principal) ||
        isNaN(rate) ||
        isNaN(time)
    ) {
        document.getElementById("result").innerHTML =
            "Please enter all values";
        return;
    }

    let maturityAmount =
        principal *
        Math.pow(
            (1 + rate / 100),
            time
        );

    let interestEarned =
        maturityAmount - principal;

     document.getElementById("result").innerHTML =

    `<div class="result-card">
        <div class="result-title">
            Deposit Amount
        </div>
        <div class="result-value">
            ₹${principal.toFixed(2)}
        </div>
    </div>

    <div class="result-card">
        <div class="result-title">
            Interest Earned
        </div>
        <div class="result-value">
            ₹${interestEarned.toFixed(2)}
        </div>
    </div>

    <div class="result-card">
        <div class="result-title">
            Maturity Amount
        </div>
        <div class="result-value">
            ₹${maturityAmount.toFixed(2)}
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
    `FD Calculator
    Deposit Amount: ₹${principal.toFixed(2)}
    Maturity Amount: ₹${maturityAmount.toFixed(2)}
    
    ${getTimestamp()}`
    );

}