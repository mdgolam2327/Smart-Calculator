const display = document.getElementById("display");

let angleMode = "DEG";
let memory = 0;
let lastAnswer = 0;

// -----------------------------
// Button Events
// -----------------------------

document.querySelectorAll("[data-value]").forEach(btn => {

    btn.addEventListener("click", () => {

        insertValue(btn.dataset.value);

    });

});

document.querySelectorAll("[data-func]").forEach(btn => {

    btn.addEventListener("click", () => {

        insertFunction(btn.dataset.func);

    });

});

document.querySelectorAll("[data-action]").forEach(btn => {

    btn.addEventListener("click", () => {

        handleAction(btn.dataset.action);

    });

});

document.getElementById("equalBtn")
    .addEventListener("click", calculate);

// -----------------------------
// Insert Value
// -----------------------------

function insertValue(value) {

    display.value += value;

}

// -----------------------------
// Insert Function
// -----------------------------

function insertFunction(func) {

    switch (func) {

        case "nCr":

            if (shiftMode) {

                display.value += "nPr(";

            }

            else {

                display.value += "nCr(";

            }

            break;

        case "sin":

            if (shiftMode) {

                display.value += "asin(";

            }

            else {

                display.value += "sin(";

            }

            break;

        case "cos":

            if (shiftMode) {
                display.value += "acos(";
            }

            else {
                display.value += "cos(";
            }

            break;

        case "tan":

            if (shiftMode) {
                display.value += "atan(";
            }

            else {
                display.value += "tan(";
            }

            break;

        case "log":

            if (shiftMode) {

                display.value += "10^(";

            }

            else {

                display.value += "log(";

            }

            break;

        case "ln":

            if (shiftMode) {

                display.value += "exp(";

            }

            else {

                display.value += "ln(";

            }

            break;

        case "sqrt":

            if (shiftMode) {

                display.value += "cbrt(";

            }

            else {

                display.value += "sqrt(";

            }

            break;

    }

    if (shiftMode) {

        toggleShift();

    }

}

// -----------------------------
// Handle Buttons
// -----------------------------

function handleAction(action) {

    switch (action) {

        case "clear":

            display.value = "";

            break;

        case "delete":

            display.value =
                display.value.slice(0, -1);

            break;

        case "ans":

            display.value += lastAnswer;

            break;

        case "angle":

            toggleAngle();

            break;

        case "square":

            display.value += "^2";

            break;

        case "cube":

            display.value += "^3";

            break;

        case "inverse":

            display.value += "^-1";

            break;

        case "mc":

            memory = 0;

            updateMemoryStatus();

            break;

        case "mr":

            display.value += memory;

            break;

        case "mplus":

            memory += Number(lastAnswer);

            updateMemoryStatus();

            break;

        case "mminus":

            memory -= Number(lastAnswer);

            updateMemoryStatus();

            break;

        case "shift":

            toggleShift();

            break;

    }

}

// -----------------------------
// Degree / Radian
// -----------------------------

function toggleAngle() {

    angleMode =
        angleMode === "DEG"
            ? "RAD"
            : "DEG";

    document.getElementById("angleMode")
        .textContent = angleMode;

}

// -----------------------------
// Memory Indicator
// -----------------------------

function updateMemoryStatus() {

    document.getElementById("memoryStatus")
        .textContent =
        memory !== 0
            ? "M"
            : "";

}

// -----------------------------
// Answer Indicator
// -----------------------------

function updateAnsStatus() {

    document.getElementById("ansStatus")
        .textContent =
        lastAnswer !== 0
            ? "ANS"
            : "";

}

function formatNCR(exp) {

    exp = exp.replace(
        /(\d+)\s*nCr\s*(\d+)/g,
        "nCr($1,$2)"
    );

    exp = exp.replace(
        /(\d+)\s*nPr\s*(\d+)/g,
        "nPr($1,$2)"
    );

    return exp;

}

function convertNCR(exp) {

    exp = exp.replace(

        /nCr\((\d+),(\d+)\)/g,

        (_, n, r) => {

            return combination(n, r);

        }

    );

    exp = exp.replace(

        /nPr\((\d+),(\d+)\)/g,

        (_, n, r) => {

            return permutation(n, r);

        }

    );

    return exp;

}

// ==========================================
// Calculate Engine
// ==========================================

function calculate() {

    try {

        let exp = display.value.trim();

        if (exp === "") return;

        exp = formatNCR(exp);

        exp = convertNCR(exp);

        // --------------------------
        // Constants
        // --------------------------

        exp = exp.replace(/π/g, Math.PI);

        exp = exp.replace(/\be\b/g, Math.E);

        // --------------------------
        // Power
        // --------------------------

        exp = exp.replace(/\^/g, "**");

        // --------------------------
        // Percentage
        // --------------------------

        exp = exp.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

        // --------------------------
        // Square Root
        // --------------------------

        exp = exp.replace(/sqrt\(/g, "Math.sqrt(");

        // --------------------------
        // Cube Root
        // --------------------------

        exp = exp.replace(/cbrt\(/g, "Math.cbrt(");

        // --------------------------
        // Log Base 10
        // --------------------------

        exp = exp.replace(/log\(/g, "Math.log10(");

        // --------------------------
        // Natural Log
        // --------------------------

        exp = exp.replace(/ln\(/g, "Math.log(");

        // 10^x

        exp = exp.replace(

            /10\^\((.*?)\)/g,

            (_, n) => {

                return Math.pow(10, Number(n));

            }

        );

        // e^x

        exp = exp.replace(

            /exp\((.*?)\)/g,

            (_, n) => {

                return Math.exp(Number(n));

            }

        );

        // --------------------------
        // EXP
        // Example:
        // 5EXP3 = 5e3
        // --------------------------

        exp = exp.replace(
            /(\d+(\.\d+)?)EXP(\d+(\.\d+)?)/g,
            "$1e$3"
        );

        // --------------------------
        // Square
        // --------------------------

        exp = exp.replace(
            /(\d+(\.\d+)?)\*\*2/g,
            (_, n) => {

                return Math.pow(Number(n), 2);

            }
        );

        // --------------------------
        // Cube
        // --------------------------

        exp = exp.replace(
            /(\d+(\.\d+)?)\*\*3/g,
            (_, n) => {

                return Math.pow(Number(n), 3);

            }
        );

        // --------------------------
        // Inverse
        // --------------------------

        exp = exp.replace(

            /(\d+(\.\d+)?)\*\*-1/g,

            (_, n) => {

                return 1 / Number(n);

            }

        );

        exp = calculateTrig(exp);

        exp = parseFactorial(exp);

        // --------------------------
        // Evaluate
        // --------------------------

        let result = eval(exp);

        if (!isFinite(result)) {

            throw Error();

        }

        result = Number(result.toFixed(12));

        lastAnswer = result;

        updateAnsStatus();

        updateMemoryStatus();

        display.value = result;

        saveHistory(result);

    }

    catch {

        display.value = "Error";

    }

}

// ==========================================
// Factorial
// ==========================================

function factorial(n) {

    n = Number(n);

    if (n < 0) return NaN;

    if (!Number.isInteger(n)) return NaN;

    if (n === 0 || n === 1)
        return 1;

    let result = 1;

    for (let i = 2; i <= n; i++) {

        result *= i;

    }

    return result;

}

//===========================================
//Combination/nCr
//===========================================

function combination(n, r) {

    n = Number(n);

    r = Number(r);

    if (r > n || r < 0) {

        return NaN;

    }

    return factorial(n) / (factorial(r) * factorial(n - r));

}

//===========================================
//Permutation/pCr
//===========================================

function permutation(n, r) {

    n = Number(n);

    r = Number(r);

    if (r > n || r < 0) {

        return NaN;

    }

    return factorial(n) / factorial(n - r);

}

// ==========================================
// Convert Degree / Radian
// ==========================================

function toRadians(value) {

    return value * Math.PI / 180;

}

function toDegrees(value) {

    return value * 180 / Math.PI;

}

// ==========================================
// Trigonometric Functions
// ==========================================

function calculateTrig(exp) {

    // -----------------------
    // sin⁻¹
    // -----------------------

    exp = exp.replace(/asin\((.*?)\)/g,

        (_, num) => {

            let value = Math.asin(Number(num));

            if (angleMode === "DEG") {

                value = toDegrees(value);

            }

            return value;

        }

    );

    // -----------------------
    // cos⁻¹
    // -----------------------

    exp = exp.replace(/acos\((.*?)\)/g,

        (_, num) => {

            let value = Math.acos(Number(num));

            if (angleMode === "DEG") {

                value = toDegrees(value);

            }

            return value;

        }

    );

    // -----------------------
    // tan⁻¹
    // -----------------------

    exp = exp.replace(/atan\((.*?)\)/g,

        (_, num) => {

            let value = Math.atan(Number(num));

            if (angleMode === "DEG") {

                value = toDegrees(value);

            }

            return value;

        }

    );

    // -----------------------
    // sin()
    // -----------------------

    exp = exp.replace(/sin\((.*?)\)/g,

        (_, num) => {

            let value = Number(num);

            if (angleMode === "DEG") {

                value = toRadians(value);

            }

            return Math.sin(value);

        }

    );

    // -----------------------
    // cos()
    // -----------------------

    exp = exp.replace(/cos\((.*?)\)/g,

        (_, num) => {

            let value = Number(num);

            if (angleMode === "DEG") {

                value = toRadians(value);

            }

            return Math.cos(value);

        }

    );

    // -----------------------
    // tan()
    // -----------------------

    exp = exp.replace(/tan\((.*?)\)/g,

        (_, num) => {

            let value = Number(num);

            if (angleMode === "DEG") {

                value = toRadians(value);

            }

            return Math.tan(value);

        }

    );

    return exp;

}

// ==========================================
// Factorial Parser
// ==========================================

function parseFactorial(exp) {

    return exp.replace(

        /(\d+)!/g,

        (_, num) => {

            return factorial(num);

        }

    );

}

function insertNCR() {

    if (shiftMode) {

        display.value += " nPr ";

    } else {

        display.value += " nCr ";

    }

}

// ===========================
// Clear Display
// ===========================

function clearDisplay() {

    display.value = "";

}

// ===========================
// Delete Last Character
// ===========================

function deleteLast() {

    display.value = display.value.slice(0, -1);

}

// ==========================================
// Keyboard Support
// ==========================================

document.addEventListener("keydown", function (e) {

    const key = e.key;

    // Number
    if (/[0-9]/.test(key)) {

        display.value += key;

        return;

    }

    // Operators
    if (["+", "-", "*", "/", "(", ")", ".", "%"].includes(key)) {

        display.value += key;

        return;

    }

    // Enter = Calculate
    if (key === "Enter") {

        e.preventDefault();

        calculate();

        return;

    }

    // Backspace
    if (key === "Backspace") {

        e.preventDefault();

        deleteLast();

        return;

    }

    // Delete

    if (key === "Delete") {

        clearDisplay();

        return;

    }

    // Escape

    if (key === "Escape") {

        clearDisplay();

        return;

    }

});


// ==========================================
// Copy Result
// ==========================================

function copyResult() {

    if (display.value === "") return;

    navigator.clipboard.writeText(display.value);

    alert("Result Copied");

}


// ==========================================
// Share Result
// ==========================================

async function shareResult() {

    if (display.value === "") return;

    if (navigator.share) {

        await navigator.share({

            title: "Scientific Calculator",

            text: "Result : " + display.value

        });

    }

}


// ==========================================
// Download PDF
// ==========================================

function downloadPDF() {

    const win = window.open();

    win.document.write(

        "<h2>Scientific Calculator Result</h2>"

    );

    win.document.write(

        "<h1>" + display.value + "</h1>"

    );

    win.print();

}


// ==========================================
// Save History
// ==========================================

function saveHistory(result) {

    let history =

        JSON.parse(

            localStorage.getItem(

                "scientificHistory"

            )

        ) || [];

    history.unshift({

        expression: display.value,

        answer: result,

        date: new Date().toLocaleString()

    });

    if (history.length > 30) {

        history.pop();

    }

    localStorage.setItem(

        "scientificHistory",

        JSON.stringify(history)

    );

}


// ==========================================
// Show History
// ==========================================

function getHistory() {

    return JSON.parse(

        localStorage.getItem(

            "scientificHistory"

        )

    ) || [];

}

// ==========================================
// Final Utilities
// ==========================================

// Format Result
function formatResult(value) {

    if (typeof value !== "number") {

        value = Number(value);

    }

    if (!isFinite(value)) {

        return "Math Error";

    }

    // Remove -0
    if (Object.is(value, -0)) {

        value = 0;

    }

    // Scientific Notation
    if (Math.abs(value) >= 1e12) {

        return value.toExponential(8);

    }

    // Small Number
    if (value !== 0 && Math.abs(value) < 1e-10) {

        return value.toExponential(8);

    }

    return Number(value.toFixed(10));

}



// ==========================================
// Replace Display Result
// ==========================================

function showResult(result) {

    result = formatResult(result);

    display.value = result;

}



// ==========================================
// Check Brackets
// ==========================================

function checkBrackets(exp) {

    let count = 0;

    for (let ch of exp) {

        if (ch === "(") {

            count++;

        }

        if (ch === ")") {

            count--;

        }

        if (count < 0) {

            return false;

        }

    }

    return count === 0;

}



// ==========================================
// Auto Close Brackets
// ==========================================

function autoCloseBrackets() {

    let open =

        (display.value.match(/\(/g) || []).length;

    let close =

        (display.value.match(/\)/g) || []).length;

    while (close < open) {

        display.value += ")";

        close++;

    }

}



// ==========================================
// Prevent Double Operator
// ==========================================

function cleanOperators() {

    display.value =

        display.value.replace(

            /(\+|\-|\*|\/){2,}/g,

            (match) => {

                return match.slice(-1);

            }

        );

}



// ==========================================
// Auto Fix Before Calculate
// ==========================================

function prepareExpression() {

    cleanOperators();

    autoCloseBrackets();

}



// ==========================================
// Update calculate()
// ==========================================

const oldCalculate = calculate;

calculate = function () {

    prepareExpression();

    oldCalculate();

    if (display.value !== "Error") {

        showResult(display.value);

    }

};



// ==========================================
// Initial Status
// ==========================================

updateMemoryStatus();

updateAnsStatus();



// ==========================================
// Calculator Ready
// ==========================================

console.log(

    "Scientific Calculator Pro Loaded"

);

// ===========================
// SHIFT MODE
// ===========================

let shiftMode = false;

function toggleShift() {

    shiftMode = !shiftMode;

    const btn = document.getElementById("shiftBtn");

    btn.classList.toggle("active");

    if (shiftMode) {

        document.getElementById("nCrBtn").innerText = "nPr";

        document.getElementById("sinBtn").innerText = "sin⁻¹";
        document.getElementById("cosBtn").innerText = "cos⁻¹";
        document.getElementById("tanBtn").innerText = "tan⁻¹";

        document.getElementById("logBtn").innerText = "10ˣ";
        document.getElementById("lnBtn").innerText = "eˣ";

        document.getElementById("sqrtBtn").innerText = "³√";

    }

    else {

        document.getElementById("nCrBtn").innerText = "nCr";

        document.getElementById("sinBtn").innerText = "sin";
        document.getElementById("cosBtn").innerText = "cos";
        document.getElementById("tanBtn").innerText = "tan";

        document.getElementById("logBtn").innerText = "log";
        document.getElementById("lnBtn").innerText = "ln";

        document.getElementById("sqrtBtn").innerText = "√";

    }

}