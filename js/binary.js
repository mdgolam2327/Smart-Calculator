/* =========================================================
   BINARY CALCULATOR
   SmartCalc Hub
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const calculationType =
    document.getElementById("calculationType");

const calculationOperation =
    document.getElementById("calculationOperation");

const operationSelectorGroup =
    document.getElementById(
        "operationSelectorGroup"
    );

const calculatorWorkspace =
    document.getElementById(
        "calculatorWorkspace"
    );

const resultSection =
    document.getElementById(
        "resultSection"
    );

const calculatorResult =
    document.getElementById(
        "calculatorResult"
    );

const shareBinaryResult =
    document.getElementById(
        "shareBinaryResult"
    );

const calculationExplanation =
    document.getElementById(
        "calculationExplanation"
    );

const explanationContent =
    document.getElementById(
        "explanationContent"
    );


/* =========================================================
   OPERATION DATA
========================================================= */

const binaryOperations = {

    conversion: {

        binaryToDecimal: "Binary → Decimal",

        decimalToBinary: "Decimal → Binary",

        binaryToOctal: "Binary → Octal",

        binaryToHex: "Binary → Hexadecimal",

        octalToBinary: "Octal → Binary",

        hexToBinary: "Hexadecimal → Binary"

    },


    arithmetic: {

        addition: "Binary Addition",

        subtraction: "Binary Subtraction",

        multiplication: "Binary Multiplication",

        division: "Binary Division"

    },


    bitwise: {

        and: "Bitwise AND",

        or: "Bitwise OR",

        xor: "Bitwise XOR",

        not: "Bitwise NOT"

    },


    complement: {

        ones: "1's Complement",

        twos: "2's Complement"

    }

};


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeBinaryCalculator();

        initializeFAQ();

    }
);


/* =========================================================
   INITIALIZE BINARY CALCULATOR
========================================================= */

function initializeBinaryCalculator() {

    if (!calculationType) {
        return;
    }


    calculationType.addEventListener(
        "change",
        handleCalculationTypeChange
    );


    calculationOperation.addEventListener(
        "change",
        handleOperationChange
    );


    if (shareBinaryResult) {

        shareBinaryResult.addEventListener(
            "click",
            shareBinaryCalculation
        );

    }

}


/* =========================================================
   FIRST SELECT CHANGE
========================================================= */

function handleCalculationTypeChange() {

    const type =
        calculationType.value;


    calculationOperation.innerHTML =
        `<option value="">
            Select Operation
        </option>`;


    resetCalculator();


    if (!type) {

        operationSelectorGroup.style.display =
            "none";

        return;

    }


    const operations =
        binaryOperations[type];


    Object.entries(operations)
        .forEach(
            ([value, label]) => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    value;

                option.textContent =
                    label;

                calculationOperation
                    .appendChild(option);

            }
        );


    operationSelectorGroup.style.display =
        "block";

}


/* =========================================================
   SECOND SELECT CHANGE
========================================================= */

function handleOperationChange() {

    const type =
        calculationType.value;

    const operation =
        calculationOperation.value;


    resetResult();


    if (!type || !operation) {

        showWorkspacePlaceholder();

        return;

    }


    renderCalculator(
        type,
        operation
    );

}


/* =========================================================
   RESET CALCULATOR
========================================================= */

function resetCalculator() {

    calculatorWorkspace.innerHTML = `
        <div class="workspace-placeholder">

            <div class="placeholder-icon">
                🔢
            </div>

            <h3>
                Choose a Calculation
            </h3>

            <p>
                Select a calculation type and
                operation above to start.
            </p>

        </div>
    `;

    resetResult();

}


/* =========================================================
   SHOW PLACEHOLDER
========================================================= */

function showWorkspacePlaceholder() {

    calculatorWorkspace.innerHTML = `
        <div class="workspace-placeholder">

            <div class="placeholder-icon">
                🔢
            </div>

            <h3>
                Choose a Calculation
            </h3>

            <p>
                Select an operation to start.
            </p>

        </div>
    `;

}


/* =========================================================
   RESET RESULT
========================================================= */

function resetResult() {

    if (resultSection) {

        resultSection.style.display =
            "none";

    }


    if (calculatorResult) {

        calculatorResult.innerHTML =
            "";

    }


    if (calculationExplanation) {

        calculationExplanation.style.display =
            "none";

    }


    if (explanationContent) {

        explanationContent.innerHTML =
            "";

    }


    if (shareBinaryResult) {

        shareBinaryResult.style.display =
            "none";

    }

}


/* =========================================================
   RENDER CALCULATOR
========================================================= */

function renderCalculator(
    type,
    operation
) {

    let html = "";


    if (type === "conversion") {

        html =
            renderConversionCalculator(
                operation
            );

    }


    else if (type === "arithmetic") {

        html =
            renderArithmeticCalculator(
                operation
            );

    }


    else if (type === "bitwise") {

        html =
            renderBitwiseCalculator(
                operation
            );

    }


    else if (type === "complement") {

        html =
            renderComplementCalculator(
                operation
            );

    }


    calculatorWorkspace.innerHTML =
        html;


    attachCalculateEvent();

}


/* =========================================================
   CONVERSION CALCULATOR
========================================================= */

function renderConversionCalculator(
    operation
) {

    let title =
        binaryOperations
            .conversion[operation];


    let label =
        "";

    let placeholder =
        "";

    let inputMode =
        "text";


    switch (operation) {

        case "binaryToDecimal":

            label =
                "Binary Number";

            placeholder =
                "Example: 101101";

            break;


        case "decimalToBinary":

            label =
                "Decimal Number";

            placeholder =
                "Example: 45";

            inputMode =
                "number";

            break;


        case "binaryToOctal":

            label =
                "Binary Number";

            placeholder =
                "Example: 101101";

            break;


        case "binaryToHex":

            label =
                "Binary Number";

            placeholder =
                "Example: 101101";

            break;


        case "octalToBinary":

            label =
                "Octal Number";

            placeholder =
                "Example: 55";

            break;


        case "hexToBinary":

            label =
                "Hexadecimal Number";

            placeholder =
                "Example: 2D";

            break;

    }


    return `

        <div
            class="dynamic-calculator-card"
            data-type="conversion"
            data-operation="${operation}"
        >

            <h3>
                ${title}
            </h3>


            <div class="input-group">

                <label for="binaryInput1">

                    ${label}

                </label>

                <input
                    type="${inputMode}"
                    id="binaryInput1"
                    class="binary-input"
                    placeholder="${placeholder}"
                    autocomplete="off"
                    spellcheck="false"
                >

            </div>


            <div
                id="inputError"
                class="validation-message"
            ></div>


            <button
                type="button"
                class="calculate-btn"
                id="calculateBinaryBtn"
            >

                Calculate

            </button>

        </div>

    `;

}


/* =========================================================
   ARITHMETIC CALCULATOR
========================================================= */

function renderArithmeticCalculator(
    operation
) {

    const title =
        binaryOperations
            .arithmetic[operation];


    return `

        <div
            class="dynamic-calculator-card"
            data-type="arithmetic"
            data-operation="${operation}"
        >

            <h3>
                ${title}
            </h3>


            <div class="input-group">

                <label for="binaryInput1">

                    First Binary Number

                </label>

                <input
                    type="text"
                    id="binaryInput1"
                    class="binary-input"
                    placeholder="Example: 1011"
                    autocomplete="off"
                    spellcheck="false"
                >

            </div>


            <div class="input-group">

                <label for="binaryInput2">

                    Second Binary Number

                </label>

                <input
                    type="text"
                    id="binaryInput2"
                    class="binary-input"
                    placeholder="Example: 1101"
                    autocomplete="off"
                    spellcheck="false"
                >

            </div>


            <div
                id="inputError"
                class="validation-message"
            ></div>


            <button
                type="button"
                class="calculate-btn"
                id="calculateBinaryBtn"
            >

                Calculate

            </button>

        </div>

    `;

}


/* =========================================================
   BITWISE CALCULATOR
========================================================= */

function renderBitwiseCalculator(
    operation
) {

    const title =
        binaryOperations
            .bitwise[operation];


    const secondInput =
        operation === "not"
            ? ""
            : `

                <div class="input-group">

                    <label for="binaryInput2">

                        Second Binary Number

                    </label>

                    <input
                        type="text"
                        id="binaryInput2"
                        class="binary-input"
                        placeholder="Example: 1101"
                        autocomplete="off"
                        spellcheck="false"
                    >

                </div>

            `;


    return `

        <div
            class="dynamic-calculator-card"
            data-type="bitwise"
            data-operation="${operation}"
        >

            <h3>
                ${title}
            </h3>


            <div class="input-group">

                <label for="binaryInput1">

                    Binary Number

                </label>

                <input
                    type="text"
                    id="binaryInput1"
                    class="binary-input"
                    placeholder="Example: 1011"
                    autocomplete="off"
                    spellcheck="false"
                >

            </div>


            ${secondInput}


            <div
                id="inputError"
                class="validation-message"
            ></div>


            <button
                type="button"
                class="calculate-btn"
                id="calculateBinaryBtn"
            >

                Calculate

            </button>

        </div>

    `;

}


/* =========================================================
   COMPLEMENT CALCULATOR
========================================================= */

function renderComplementCalculator(
    operation
) {

    const title =
        binaryOperations
            .complement[operation];


    return `

        <div
            class="dynamic-calculator-card"
            data-type="complement"
            data-operation="${operation}"
        >

            <h3>
                ${title}
            </h3>


            <div class="input-group">

                <label for="binaryInput1">

                    Binary Number

                </label>

                <input
                    type="text"
                    id="binaryInput1"
                    class="binary-input"
                    placeholder="Example: 101101"
                    autocomplete="off"
                    spellcheck="false"
                >

            </div>


            <div
                id="inputError"
                class="validation-message"
            ></div>


            <button
                type="button"
                class="calculate-btn"
                id="calculateBinaryBtn"
            >

                Calculate

            </button>

        </div>

    `;

}


/* =========================================================
   ATTACH CALCULATE EVENT
========================================================= */

function attachCalculateEvent() {

    const button =
        document.getElementById(
            "calculateBinaryBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        calculateSelectedOperation
    );

}


/* =========================================================
   MAIN CALCULATION
========================================================= */

function calculateSelectedOperation() {

    const card =
        document.querySelector(
            ".dynamic-calculator-card"
        );


    if (!card) {
        return;
    }


    const type =
        card.dataset.type;

    const operation =
        card.dataset.operation;


    const input1 =
        document.getElementById(
            "binaryInput1"
        )?.value.trim();


    const input2 =
        document.getElementById(
            "binaryInput2"
        )?.value.trim();


    clearValidation();


    try {

        let result;


        if (type === "conversion") {

            result =
                performConversion(
                    operation,
                    input1
                );

        }


        else if (type === "arithmetic") {

            result =
                performArithmetic(
                    operation,
                    input1,
                    input2
                );

        }


        else if (type === "bitwise") {

            result =
                performBitwise(
                    operation,
                    input1,
                    input2
                );

        }


        else if (type === "complement") {

            result =
                performComplement(
                    operation,
                    input1
                );

        }


        displayCalculationResult(
            result,
            type,
            operation,
            input1,
            input2
        );

    }

    catch (error) {

        showValidationError(
            error.message
        );

    }

}


/* =========================================================
   VALIDATION
========================================================= */

function validateBinary(value) {

    if (!value) {

        throw new Error(
            "Please enter a binary number."
        );

    }


    if (!/^[01]+$/.test(value)) {

        throw new Error(
            "Invalid binary number. Use only 0 and 1."
        );

    }


    return value;

}


function validateDecimal(value) {

    if (!value) {

        throw new Error(
            "Please enter a decimal number."
        );

    }


    if (!/^\d+$/.test(value)) {

        throw new Error(
            "Please enter a valid non-negative decimal number."
        );

    }


    return value;

}


function validateOctal(value) {

    if (!value) {

        throw new Error(
            "Please enter an octal number."
        );

    }


    if (!/^[0-7]+$/.test(value)) {

        throw new Error(
            "Invalid octal number. Use digits from 0 to 7 only."
        );

    }


    return value;

}


function validateHex(value) {

    if (!value) {

        throw new Error(
            "Please enter a hexadecimal number."
        );

    }


    if (!/^[0-9a-fA-F]+$/.test(value)) {

        throw new Error(
            "Invalid hexadecimal number."
        );

    }


    return value.toUpperCase();

}


/* =========================================================
   CONVERSION
========================================================= */

function performConversion(
    operation,
    input
) {

    switch (operation) {


        case "binaryToDecimal": {

            const binary =
                validateBinary(input);

            const decimal =
                parseInt(
                    binary,
                    2
                );


            return {

                value:
                    decimal.toString(),

                display:
                    `${binary}₂ = ${decimal}₁₀`,

                steps:
                    binaryToDecimalSteps(
                        binary
                    ),

                explanation:
                    `
                    <div class="explanation-card">

                        <h3>
                            Binary to Decimal Conversion
                        </h3>

                        <p>
                            Each binary digit is multiplied
                            by a corresponding power of 2.
                            The powers start from 0 at the
                            rightmost digit.
                        </p>

                    </div>
                    `

            };

        }


        case "decimalToBinary": {

            const decimalString =
                validateDecimal(input);

            const decimal =
                Number(decimalString);


            const binary =
                decimal.toString(2);


            return {

                value:
                    binary,

                display:
                    `${decimal}₁₀ = ${binary}₂`,

                steps:
                    decimalToBinarySteps(
                        decimal
                    ),

                explanation:
                    `
                    <div class="explanation-card">

                        <h3>
                            Decimal to Binary Conversion
                        </h3>

                        <p>
                            The decimal number is repeatedly
                            divided by 2. The remainders are
                            read from bottom to top to obtain
                            the binary number.
                        </p>

                    </div>
                    `

            };

        }


        case "binaryToOctal": {

            const binary =
                validateBinary(input);


            const decimal =
                parseInt(
                    binary,
                    2
                );


            const octal =
                decimal.toString(8);


            return {

                value:
                    octal,

                display:
                    `${binary}₂ = ${octal}₈`,

                steps:
                    binaryToOctalSteps(
                        binary
                    ),

                explanation:
                    `
                    <div class="explanation-card">

                        <h3>
                            Binary to Octal Conversion
                        </h3>

                        <p>
                            Binary digits are grouped into
                            groups of three from the right.
                            Each group represents one octal digit.
                        </p>

                    </div>
                    `

            };

        }


        case "binaryToHex": {

            const binary =
                validateBinary(input);


            const decimal =
                parseInt(
                    binary,
                    2
                );


            const hex =
                decimal
                    .toString(16)
                    .toUpperCase();


            return {

                value:
                    hex,

                display:
                    `${binary}₂ = ${hex}₁₆`,

                steps:
                    binaryToHexSteps(
                        binary
                    ),

                explanation:
                    `
                    <div class="explanation-card">

                        <h3>
                            Binary to Hexadecimal Conversion
                        </h3>

                        <p>
                            Binary digits are grouped into
                            groups of four from the right.
                            Each group represents one
                            hexadecimal digit.
                        </p>

                    </div>
                    `

            };

        }


        case "octalToBinary": {

            const octal =
                validateOctal(input);


            const decimal =
                parseInt(
                    octal,
                    8
                );


            const binary =
                decimal.toString(2);


            return {

                value:
                    binary,

                display:
                    `${octal}₈ = ${binary}₂`,

                steps:
                    octalToBinarySteps(
                        octal
                    ),

                explanation:
                    `
                    <div class="explanation-card">

                        <h3>
                            Octal to Binary Conversion
                        </h3>

                        <p>
                            Every octal digit can be represented
                            using exactly three binary bits.
                        </p>

                    </div>
                    `

            };

        }


        case "hexToBinary": {

            const hex =
                validateHex(input);


            const decimal =
                parseInt(
                    hex,
                    16
                );


            const binary =
                decimal.toString(2);


            return {

                value:
                    binary,

                display:
                    `${hex}₁₆ = ${binary}₂`,

                steps:
                    hexToBinarySteps(
                        hex
                    ),

                explanation:
                    `
                    <div class="explanation-card">

                        <h3>
                            Hexadecimal to Binary Conversion
                        </h3>

                        <p>
                            Every hexadecimal digit can be
                            represented using exactly four
                            binary bits.
                        </p>

                    </div>
                    `

            };

        }

    }

}


/* =========================================================
   BINARY ARITHMETIC
========================================================= */

function performArithmetic(
    operation,
    input1,
    input2
) {

    const a =
        validateBinary(input1);

    const b =
        validateBinary(input2);


    const decimalA =
        BigInt(
            "0b" + a
        );

    const decimalB =
        BigInt(
            "0b" + b
        );


    let result;


    switch (operation) {


        case "addition":

            result =
                decimalA + decimalB;

            break;


        case "subtraction":

            if (decimalA < decimalB) {

                throw new Error(
                    "For this calculator, the first binary number must be greater than or equal to the second number."
                );

            }

            result =
                decimalA - decimalB;

            break;


        case "multiplication":

            result =
                decimalA * decimalB;

            break;


        case "division":

            if (decimalB === 0n) {

                throw new Error(
                    "Binary division by zero is not allowed."
                );

            }

            result =
                decimalA / decimalB;

            break;

    }


    const binaryResult =
        result.toString(2);


    return {

        value:
            binaryResult,

        display:
            `${a} ${getArithmeticSymbol(operation)} ${b} = ${binaryResult}₂`,

        steps:
            arithmeticSteps(
                operation,
                a,
                b,
                binaryResult
            ),

        explanation:
            arithmeticExplanation(
                operation
            )

    };

}


/* =========================================================
   BITWISE OPERATIONS
========================================================= */

function performBitwise(
    operation,
    input1,
    input2
) {

    const a =
        validateBinary(input1);


    const decimalA =
        BigInt(
            "0b" + a
        );


    let result;


    if (
        operation !== "not"
    ) {

        const b =
            validateBinary(input2);


        const decimalB =
            BigInt(
                "0b" + b
            );


        switch (operation) {

            case "and":

                result =
                    decimalA & decimalB;

                break;


            case "or":

                result =
                    decimalA | decimalB;

                break;


            case "xor":

                result =
                    decimalA ^ decimalB;

                break;

        }


        const width =
            Math.max(
                a.length,
                input2.length
            );


        const paddedA =
            a.padStart(
                width,
                "0"
            );


        const paddedB =
            input2.padStart(
                width,
                "0"
            );


        const binaryResult =
            result
                .toString(2)
                .padStart(
                    width,
                    "0"
                );


        return {

            value:
                binaryResult,

            display:
                `${paddedA} ${getBitwiseSymbol(operation)} ${paddedB} = ${binaryResult}₂`,

            steps:
                bitwiseSteps(
                    operation,
                    paddedA,
                    paddedB,
                    binaryResult
                ),

            explanation:
                bitwiseExplanation(
                    operation
                )

        };

    }


    /* =========================
       BITWISE NOT
    ========================= */

    const binaryResult =
        a
            .split("")
            .map(
                bit =>
                    bit === "0"
                        ? "1"
                        : "0"
            )
            .join("");


    return {

        value:
            binaryResult,

        display:
            `NOT ${a} = ${binaryResult}₂`,

        steps: [

            `Original: ${a}`,

            `Invert every bit: ${binaryResult}`

        ],

        explanation:
            `
            <div class="explanation-card">

                <h3>
                    Bitwise NOT
                </h3>

                <p>
                    NOT changes every binary bit to
                    its opposite value.
                </p>

                <p>
                    0 becomes 1 and 1 becomes 0.
                </p>

            </div>
            `

    };

}


/* =========================================================
   COMPLEMENT
========================================================= */

function performComplement(
    operation,
    input
) {

    const binary =
        validateBinary(input);


    const ones =
        binary
            .split("")
            .map(
                bit =>
                    bit === "0"
                        ? "1"
                        : "0"
            )
            .join("");


    if (operation === "ones") {

        return {

            value:
                ones,

            display:
                `1's Complement of ${binary} = ${ones}`,

            steps: [

                `Original binary number: ${binary}`,

                `Change every 0 to 1 and every 1 to 0.`,

                `1's Complement: ${ones}`

            ],

            explanation:
                `
                <div class="explanation-card">

                    <h3>
                        How 1's Complement Works
                    </h3>

                    <p>
                        To calculate the 1's complement,
                        simply invert every bit.
                    </p>

                    <div class="binary-expression">
                        ${binary}
                        ↓
                        ${ones}
                    </div>

                </div>
                `

        };

    }


    /* =========================
       TWO'S COMPLEMENT
    ========================= */

    const decimal =
        BigInt(
            "0b" + ones
        );


    const twos =
        (
            decimal + 1n
        )
        .toString(2)
        .padStart(
            binary.length,
            "0"
        );


    return {

        value:
            twos,

        display:
            `2's Complement of ${binary} = ${twos}`,

        steps: [

            `Original binary number: ${binary}`,

            `1's Complement: ${ones}`,

            `Add 1: ${ones} + 1`,

            `2's Complement: ${twos}`

        ],

        explanation:
            `
            <div class="explanation-card">

                <h3>
                    How 2's Complement Works
                </h3>

                <p>
                    The 2's complement is calculated
                    in two steps:
                </p>

                <ol>

                    <li>
                        Find the 1's complement.
                    </li>

                    <li>
                        Add 1 to the result.
                    </li>

                </ol>

                <div class="binary-expression">
                    ${binary}
                    ↓
                    ${ones}
                    ↓
                    ${twos}
                </div>

            </div>
            `

    };

}


/* =========================================================
   BINARY → DECIMAL STEPS
========================================================= */

function binaryToDecimalSteps(
    binary
) {

    const steps = [];

    const length =
        binary.length;


    let expressionParts = [];

    let total = 0;


    binary
        .split("")
        .forEach(
            (bit, index) => {

                const power =
                    length - 1 - index;

                const value =
                    Number(bit) *
                    Math.pow(
                        2,
                        power
                    );


                total += value;


                expressionParts.push(
                    `(${bit} × 2^${power})`
                );

                steps.push(
                    `${bit} × 2^${power} = ${value}`
                );

            }
        );


    steps.push(
        `Add all values: ${expressionParts.join(" + ")}`
    );


    steps.push(
        `Decimal result = ${total}`
    );


    return steps;

}


/* =========================================================
   DECIMAL → BINARY STEPS
========================================================= */

function decimalToBinarySteps(
    decimal
) {

    if (decimal === 0) {

        return [
            "0 ÷ 2 = 0 remainder 0",
            "Binary result = 0"
        ];

    }


    const steps = [];

    let number =
        decimal;


    while (number > 0) {

        const quotient =
            Math.floor(
                number / 2
            );

        const remainder =
            number % 2;


        steps.push(
            `${number} ÷ 2 = ${quotient} remainder ${remainder}`
        );


        number =
            quotient;

    }


    steps.push(
        "Read the remainders from bottom to top."
    );


    steps.push(
        `Binary result = ${decimal.toString(2)}`
    );


    return steps;

}


/* =========================================================
   BINARY → OCTAL STEPS
========================================================= */

function binaryToOctalSteps(
    binary
) {

    let padded =
        binary;


    while (
        padded.length % 3 !== 0
    ) {

        padded =
            "0" + padded;

    }


    const groups = [];


    for (
        let i = 0;
        i < padded.length;
        i += 3
    ) {

        groups.push(
            padded.substring(
                i,
                i + 3
            )
        );

    }


    const steps = [

        `Pad the binary number with zeros if necessary: ${padded}`,

        `Group the bits into groups of 3: ${groups.join(" | ")}`

    ];


    groups.forEach(
        group => {

            steps.push(
                `${group}₂ = ${parseInt(group, 2)}₈`
            );

        }
    );


    steps.push(
        `Octal result = ${parseInt(binary, 2).toString(8)}`
    );


    return steps;

}


/* =========================================================
   BINARY → HEX STEPS
========================================================= */

function binaryToHexSteps(
    binary
) {

    let padded =
        binary;


    while (
        padded.length % 4 !== 0
    ) {

        padded =
            "0" + padded;

    }


    const groups = [];


    for (
        let i = 0;
        i < padded.length;
        i += 4
    ) {

        groups.push(
            padded.substring(
                i,
                i + 4
            )
        );

    }


    const steps = [

        `Pad the binary number with zeros if necessary: ${padded}`,

        `Group the bits into groups of 4: ${groups.join(" | ")}`

    ];


    groups.forEach(
        group => {

            const value =
                parseInt(
                    group,
                    2
                );


            steps.push(
                `${group}₂ = ${value.toString(16).toUpperCase()}₁₆`
            );

        }
    );


    steps.push(
        `Hexadecimal result = ${parseInt(binary, 2).toString(16).toUpperCase()}`
    );


    return steps;

}


/* =========================================================
   OCTAL → BINARY STEPS
========================================================= */

function octalToBinarySteps(
    octal
) {

    const steps = [];


    octal
        .split("")
        .forEach(
            digit => {

                const binary =
                    parseInt(
                        digit,
                        8
                    )
                    .toString(2)
                    .padStart(
                        3,
                        "0"
                    );


                steps.push(
                    `${digit}₈ = ${binary}₂`
                );

            }
        );


    steps.push(
        `Binary result = ${parseInt(octal, 8).toString(2)}`
    );


    return steps;

}


/* =========================================================
   HEX → BINARY STEPS
========================================================= */

function hexToBinarySteps(
    hex
) {

    const steps = [];


    hex
        .split("")
        .forEach(
            digit => {

                const binary =
                    parseInt(
                        digit,
                        16
                    )
                    .toString(2)
                    .padStart(
                        4,
                        "0"
                    );


                steps.push(
                    `${digit}₁₆ = ${binary}₂`
                );

            }
        );


    steps.push(
        `Binary result = ${parseInt(hex, 16).toString(2)}`
    );


    return steps;

}


/* =========================================================
   ARITHMETIC STEPS
========================================================= */

function arithmeticSteps(
    operation,
    a,
    b,
    result
) {

    const symbol =
        getArithmeticSymbol(
            operation
        );


    const steps = [];


    steps.push(
        `First binary number: ${a}`
    );


    steps.push(
        `Second binary number: ${b}`
    );


    steps.push(
        `Operation: ${a} ${symbol} ${b}`
    );


    if (operation === "addition") {

        steps.push(
            "Add the binary digits from right to left."
        );

        steps.push(
            "Remember: 1 + 1 = 10₂, so a carry is produced."
        );

    }


    else if (operation === "subtraction") {

        steps.push(
            "Subtract the binary digits from right to left."
        );

        steps.push(
            "Borrow from the next position whenever necessary."
        );

    }


    else if (operation === "multiplication") {

        steps.push(
            "Multiply using binary multiplication rules."
        );

        steps.push(
            "Shift the partial result according to the position of each 1."
        );

    }


    else if (operation === "division") {

        steps.push(
            "Perform binary long division."
        );

        steps.push(
            "The result shown is the integer quotient."
        );

    }


    steps.push(
        `Result: ${result}`
    );


    return steps;

}


/* =========================================================
   ARITHMETIC EXPLANATION
========================================================= */

function arithmeticExplanation(
    operation
) {

    let title = "";
    let text = "";


    switch (operation) {

        case "addition":

            title =
                "Binary Addition";

            text = `
                Binary addition follows rules similar
                to decimal addition, but it uses only
                0 and 1.

                The important rule is:

                1 + 1 = 10₂

                The 0 is written in the current position
                and 1 is carried to the next position.
            `;

            break;


        case "subtraction":

            title =
                "Binary Subtraction";

            text = `
                Binary subtraction is performed from
                right to left.

                When 0 - 1 occurs, we borrow 1 from
                the next position. In binary, the
                borrowed value represents 10₂.
            `;

            break;


        case "multiplication":

            title =
                "Binary Multiplication";

            text = `
                Binary multiplication uses only four
                basic rules:

                0 × 0 = 0
                0 × 1 = 0
                1 × 0 = 0
                1 × 1 = 1

                Partial products are shifted according
                to their positions and then added.
            `;

            break;


        case "division":

            title =
                "Binary Division";

            text = `
                Binary division works similarly to
                decimal long division.

                The divisor is compared with portions
                of the dividend, and the quotient bits
                are determined one position at a time.
            `;

            break;

    }


    return `

        <div class="explanation-card">

            <h3>
                ${title}
            </h3>

            <p>
                ${text.replace(/\n/g, "<br>")}
            </p>

        </div>

    `;

}


/* =========================================================
   BITWISE STEPS
========================================================= */

function bitwiseSteps(
    operation,
    a,
    b,
    result
) {

    const symbol =
        getBitwiseSymbol(
            operation
        );


    const steps = [

        `Align the binary numbers:`,
        
        `${a}`,

        `${symbol}`,

        `${b}`,

        `Apply the ${getBitwiseName(operation)} rule to each bit position.`,

        `Result: ${result}`

    ];


    return steps;

}


/* =========================================================
   BITWISE EXPLANATION
========================================================= */

function bitwiseExplanation(
    operation
) {

    const rules = {

        and:
            "AND produces 1 only when both corresponding bits are 1.",

        or:
            "OR produces 1 when at least one of the corresponding bits is 1.",

        xor:
            "XOR produces 1 when the corresponding bits are different."

    };


    return `

        <div class="explanation-card">

            <h3>
                Bitwise ${getBitwiseName(operation)}
            </h3>

            <p>
                ${rules[operation]}
            </p>

            <div class="binary-expression">

                ${getBitwiseTable(operation)}

            </div>

        </div>

    `;

}


/* =========================================================
   BITWISE TRUTH TABLE
========================================================= */

function getBitwiseTable(
    operation
) {

    if (operation === "and") {

        return `
            0 AND 0 = 0<br>
            0 AND 1 = 0<br>
            1 AND 0 = 0<br>
            1 AND 1 = 1
        `;

    }


    if (operation === "or") {

        return `
            0 OR 0 = 0<br>
            0 OR 1 = 1<br>
            1 OR 0 = 1<br>
            1 OR 1 = 1
        `;

    }


    return `
        0 XOR 0 = 0<br>
        0 XOR 1 = 1<br>
        1 XOR 0 = 1<br>
        1 XOR 1 = 0
    `;

}


/* =========================================================
   SYMBOL HELPERS
========================================================= */

function getArithmeticSymbol(
    operation
) {

    const symbols = {

        addition: "+",

        subtraction: "−",

        multiplication: "×",

        division: "÷"

    };


    return symbols[operation] || "";

}


function getBitwiseSymbol(
    operation
) {

    const symbols = {

        and: "AND",

        or: "OR",

        xor: "XOR"

    };


    return symbols[operation] || "";

}


function getBitwiseName(
    operation
) {

    const names = {

        and: "AND",

        or: "OR",

        xor: "XOR"

    };


    return names[operation] || "";

}


/* =========================================================
   DISPLAY RESULT
========================================================= */

function displayCalculationResult(
    result,
    type,
    operation,
    input1,
    input2
) {

    if (!resultSection) {
        return;
    }


    resultSection.style.display =
        "block";


    calculatorResult.innerHTML = `

        <div class="result-title">

            Result

        </div>


        <div class="result-value">

            ${escapeHTML(
                result.value
            )}

        </div>


        <div class="result-description">

            ${escapeHTML(
                result.display
            )}

        </div>

    `;


    renderSteps(
        result.steps
    );


    if (result.explanation) {

        calculationExplanation.style.display =
            "block";

        explanationContent.innerHTML =
            result.explanation;

    }


    if (shareBinaryResult) {

        shareBinaryResult.style.display =
            "block";

    }


    saveBinaryHistory(
        type,
        operation,
        input1,
        input2,
        result
    );


    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   RENDER STEPS
========================================================= */

function renderSteps(
    steps
) {

    if (!steps || !steps.length) {
        return;
    }


    const stepsHTML = steps
        .map(
            (step, index) => `

                <div class="calculation-step">

                    <span class="step-number">
                        ${index + 1}
                    </span>

                    <span class="step-text">
                        ${escapeHTML(step)}
                    </span>

                </div>

            `
        )
        .join("");


    explanationContent.innerHTML += `

        <div class="explanation-card">

            <h3>
                Step-by-Step Calculation
            </h3>

            <div class="calculation-steps">

                ${stepsHTML}

            </div>

        </div>

    `;

}


/* =========================================================
   SAVE BINARY HISTORY
========================================================= */

function saveBinaryHistory(
    type,
    operation,
    input1,
    input2,
    result
) {

    const operationName =
        binaryOperations[type][operation];


    let historyText =

        `Binary Calculator

Calculation:
${operationName}

Input:
${input1}`;


    if (input2) {

        historyText +=
            `

Second Input:
${input2}`;

    }


    historyText +=

        `

Result:
${result.value}

${getTimestamp()}`;


    if (
        typeof saveHistory ===
        "function"
    ) {

        saveHistory(
            historyText
        );

    }

}


/* =========================================================
   SHARE RESULT
========================================================= */

function shareBinaryCalculation() {

    if (
        !calculatorResult ||
        !calculatorResult.innerText.trim()
    ) {

        alert(
            "Please calculate first."
        );

        return;

    }


    const type =
        calculationType.value;

    const operation =
        calculationOperation.value;


    const card =
        document.querySelector(
            ".dynamic-calculator-card"
        );


    const input1 =
        card?.querySelector(
            "#binaryInput1"
        )?.value.trim() || "";


    const input2 =
        card?.querySelector(
            "#binaryInput2"
        )?.value.trim() || "";


    const operationName =
        binaryOperations[type][operation];


    const resultText =
        calculatorResult.innerText.trim();


    const explanationText =
        explanationContent
            ? explanationContent.innerText.trim()
            : "";


    let shareText =

`SmartCalc Hub
Binary Calculator

Calculation:
${operationName}

Input:
${input1}`;


    if (input2) {

        shareText +=
            `

Second Input:
${input2}`;

    }


    shareText +=

`

Result:
${resultText}


Explanation:
${explanationText}

Calculator:
${window.location.href}`;


    if (
        navigator.share
    ) {

        navigator.share({

            title:
                "Binary Calculator Result",

            text:
                shareText,

            url:
                window.location.href

        })
        .catch(
            error => {

                if (
                    error.name !==
                    "AbortError"
                ) {

                    fallbackShare(
                        shareText
                    );

                }

            }
        );

    }

    else {

        fallbackShare(
            shareText
        );

    }

}


/* =========================================================
   SHARE FALLBACK
========================================================= */

function fallbackShare(
    text
) {

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(text)
            .then(
                () => {

                    alert(
                        "Sharing is not supported on this device. The calculation has been copied instead."
                    );

                }
            )
            .catch(
                () => {

                    alert(
                        "Unable to share the calculation."
                    );

                }
            );

    }

    else {

        alert(
            "Sharing is not supported on this browser."
        );

    }

}


/* =========================================================
   VALIDATION ERROR
========================================================= */

function showValidationError(
    message
) {

    const error =
        document.getElementById(
            "inputError"
        );


    if (error) {

        error.textContent =
            message;

    }


    const input1 =
        document.getElementById(
            "binaryInput1"
        );


    if (input1) {

        input1.classList.add(
            "input-error"
        );

    }


    const input2 =
        document.getElementById(
            "binaryInput2"
        );


    if (input2) {

        input2.classList.add(
            "input-error"
        );

    }

}


function clearValidation() {

    const error =
        document.getElementById(
            "inputError"
        );


    if (error) {

        error.textContent =
            "";

    }


    document
        .querySelectorAll(
            ".input-error"
        )
        .forEach(
            input => {

                input.classList.remove(
                    "input-error"
                );

            }
        );

}


/* =========================================================
   FAQ
========================================================= */

function initializeFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );


    questions.forEach(
        question => {

            question.addEventListener(
                "click",
                function () {

                    const item =
                        this.parentElement;


                    item.classList.toggle(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}