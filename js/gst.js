function calculateGST() {

    let amount = parseFloat(
        document.getElementById("amount").value
    );

    let gst = parseFloat(
        document.getElementById("gst").value
    );

    if (isNaN(amount) || isNaN(gst)) {
        document.getElementById("result").innerHTML =
            "Please enter all values";
        return;
    }

    let gstAmount = (amount * gst) / 100;
    let totalAmount = amount + gstAmount;

    document.getElementById("result").innerHTML =

    `<div class="result-card">
        <div class="result-title">
            GST Amount
        </div>
        <div class="result-value">
            ₹${gstAmount.toFixed(2)}
        </div>
    </div>

    <div class="result-card">
        <div class="result-title">
            Total Amount
        </div>
        <div class="result-value">
            ₹${totalAmount.toFixed(2)}
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
    `GST Calculator

    GST Amount: ₹${gstAmount.toFixed(2)}
    Total Amount: ₹${totalAmount.toFixed(2)}
    
    ${getTimestamp()}`
    );

}