function calculateDiscount() {

    let originalPrice = parseFloat(
        document.getElementById("originalPrice").value
    );

    let discountPercent = parseFloat(
        document.getElementById("discountPercent").value
    );

    if (
        isNaN(originalPrice) ||
        isNaN(discountPercent)
    ) {
        document.getElementById("result").innerHTML =
            "Please enter all values";
        return;
    }

    let discountAmount =
        (originalPrice * discountPercent) / 100;

    let finalPrice =
        originalPrice - discountAmount;

    document.getElementById("result").innerHTML =

    `<div class="result-card">
        <div class="result-title">
            You Save
        </div>
        <div class="result-value">
            ₹${discountAmount.toFixed(2)}
        </div>
    </div>

    <div class="result-card">
        <div class="result-title">
            Final Price
        </div>
        <div class="result-value">
            ₹${finalPrice.toFixed(2)}
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
    `Discount Calculator

    You Save: ₹${discountAmount.toFixed(2)}
    Final Price: ₹${finalPrice.toFixed(2)}

    ${getTimestamp()}`
    );

}