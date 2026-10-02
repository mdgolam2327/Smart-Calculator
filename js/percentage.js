function calculatePercentage() {

    let value = parseFloat(
        document.getElementById("value").value
    );

    let total = parseFloat(
        document.getElementById("total").value
    );

    if (isNaN(value) || isNaN(total)) {
        document.getElementById("result").innerHTML =
            "Please enter both numbers";
        return;
    }

    if (total === 0) {
        document.getElementById("result").innerHTML =
            "Total cannot be zero";
        return;
    }

    let percentage = (value / total) * 100;

    document.getElementById("result").innerHTML =

    `<div class="result-card">
        <div class="result-title">
            Percentage
        </div>
        <div class="result-value">
            ${percentage.toFixed(2)}%
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
    `Percentage Calculator

    Result: ${percentage.toFixed(2)}%

    ${getTimestamp()}`
    );
}