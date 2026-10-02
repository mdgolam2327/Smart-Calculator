/* =========================================================
   SMART-CALCULATOR
   AREA CALCULATOR
   area.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DOM ELEMENTS
    ====================================================== */

    const shapeSelect = document.getElementById("shapeSelect");
    const unitSelect = document.getElementById("unitSelect");

    const shapeInputs = document.getElementById("shapeInputs");

    const calculateBtn =
        document.getElementById("calculateAreaBtn");

    const resetBtn =
        document.getElementById("resetAreaBtn");

    const areaResult =
        document.getElementById("areaResult");

    const calculationSteps =
        document.getElementById("calculationSteps");

    const resultMessage =
        document.getElementById("resultMessage");

    const shapeDiagram =
        document.getElementById("shapeDiagram");

    const diagramExplanation =
        document.getElementById("diagramExplanation");

    const currentShapeTitle =
        document.getElementById("currentShapeTitle");

    const currentShapeExplanation =
        document.getElementById("currentShapeExplanation");


    /* =====================================================
       SHAPE DATA
    ====================================================== */

    const shapeData = {

        square: {

            name: "Square",

            inputs: [
                {
                    id: "side",
                    label: "Side",
                    symbol: "s",
                    hint: "Enter the length of one side."
                }
            ],

            formula: "A = s²",

            variables: [
                ["s", "Side length"]
            ]

        },


        rectangle: {

            name: "Rectangle",

            inputs: [
                {
                    id: "length",
                    label: "Length",
                    symbol: "l",
                    hint: "Enter the longer dimension."
                },
                {
                    id: "width",
                    label: "Width",
                    symbol: "w",
                    hint: "Enter the shorter dimension."
                }
            ],

            formula: "A = l × w",

            variables: [
                ["l", "Length"],
                ["w", "Width"]
            ]

        },


        triangle: {

            name: "Triangle",

            inputs: [
                {
                    id: "base",
                    label: "Base",
                    symbol: "b",
                    hint: "The side selected as the base."
                },
                {
                    id: "height",
                    label: "Height",
                    symbol: "h",
                    hint: "Perpendicular distance from base to opposite vertex."
                }
            ],

            formula: "A = ½ × b × h",

            variables: [
                ["b", "Base"],
                ["h", "Perpendicular height"]
            ]

        },


        circle: {

            name: "Circle",

            inputs: [
                {
                    id: "radius",
                    label: "Radius",
                    symbol: "r",
                    hint: "Distance from the center to the edge."
                }
            ],

            formula: "A = πr²",

            variables: [
                ["r", "Radius"],
                ["π", "Pi ≈ 3.14159265359"]
            ]

        },


        parallelogram: {

            name: "Parallelogram",

            inputs: [
                {
                    id: "base",
                    label: "Base",
                    symbol: "b",
                    hint: "Length of the selected base."
                },
                {
                    id: "height",
                    label: "Height",
                    symbol: "h",
                    hint: "Perpendicular height to the base."
                }
            ],

            formula: "A = b × h",

            variables: [
                ["b", "Base"],
                ["h", "Perpendicular height"]
            ]

        },


        trapezoid: {

            name: "Trapezoid",

            inputs: [
                {
                    id: "base1",
                    label: "Base 1",
                    symbol: "a",
                    hint: "Length of the first parallel side."
                },
                {
                    id: "base2",
                    label: "Base 2",
                    symbol: "b",
                    hint: "Length of the second parallel side."
                },
                {
                    id: "height",
                    label: "Height",
                    symbol: "h",
                    hint: "Perpendicular distance between the two bases."
                }
            ],

            formula: "A = ½ × (a + b) × h",

            variables: [
                ["a", "First parallel base"],
                ["b", "Second parallel base"],
                ["h", "Perpendicular height"]
            ]

        },


        rhombus: {

            name: "Rhombus",

            inputs: [
                {
                    id: "diagonal1",
                    label: "Diagonal 1",
                    symbol: "d₁",
                    hint: "Length of the first diagonal."
                },
                {
                    id: "diagonal2",
                    label: "Diagonal 2",
                    symbol: "d₂",
                    hint: "Length of the second diagonal."
                }
            ],

            formula: "A = ½ × d₁ × d₂",

            variables: [
                ["d₁", "First diagonal"],
                ["d₂", "Second diagonal"]
            ]

        },


        kite: {

            name: "Kite",

            inputs: [
                {
                    id: "diagonal1",
                    label: "Diagonal 1",
                    symbol: "d₁",
                    hint: "Length of the first diagonal."
                },
                {
                    id: "diagonal2",
                    label: "Diagonal 2",
                    symbol: "d₂",
                    hint: "Length of the second diagonal."
                }
            ],

            formula: "A = ½ × d₁ × d₂",

            variables: [
                ["d₁", "First diagonal"],
                ["d₂", "Second diagonal"]
            ]

        },


        ellipse: {

            name: "Ellipse",

            inputs: [
                {
                    id: "semiMajor",
                    label: "Semi-major Axis",
                    symbol: "a",
                    hint: "Half of the longest diameter."
                },
                {
                    id: "semiMinor",
                    label: "Semi-minor Axis",
                    symbol: "b",
                    hint: "Half of the shortest diameter."
                }
            ],

            formula: "A = πab",

            variables: [
                ["a", "Semi-major axis"],
                ["b", "Semi-minor axis"]
            ]

        },


        sector: {

            name: "Circle Sector",

            inputs: [
                {
                    id: "radius",
                    label: "Radius",
                    symbol: "r",
                    hint: "Distance from center to the arc."
                },
                {
                    id: "angle",
                    label: "Central Angle",
                    symbol: "θ",
                    hint: "Angle of the sector in degrees (0–360°)."
                }
            ],

            formula: "A = (θ / 360) × πr²",

            variables: [
                ["r", "Radius"],
                ["θ", "Central angle in degrees"]
            ]

        },


        polygon: {

            name: "Regular Polygon",

            inputs: [
                {
                    id: "sides",
                    label: "Number of Sides",
                    symbol: "n",
                    hint: "Enter 3 or more sides."
                },
                {
                    id: "sideLength",
                    label: "Side Length",
                    symbol: "s",
                    hint: "Length of each equal side."
                }
            ],

            formula: "A = n × s² / (4 × tan(π/n))",

            variables: [
                ["n", "Number of sides"],
                ["s", "Length of each side"]
            ]

        }

    };


    /* =====================================================
       INITIALIZE
    ====================================================== */

    renderShape(shapeSelect.value);

    updateShapeCards(shapeSelect.value);


    /* =====================================================
       SHAPE SELECT CHANGE
    ====================================================== */

    shapeSelect.addEventListener("change", () => {

        const shape = shapeSelect.value;

        renderShape(shape);

        updateShapeCards(shape);

        clearResult();

    });


    /* =====================================================
       SHAPE CARDS
    ====================================================== */

    document.querySelectorAll(".shape-card").forEach(card => {

        card.addEventListener("click", () => {

            const shape = card.dataset.shape;

            if (!shape || !shapeData[shape]) {
                return;
            }

            shapeSelect.value = shape;

            renderShape(shape);

            updateShapeCards(shape);

            clearResult();

            const calculatorSection =
                document.querySelector(".area-calculator-section");

            if (calculatorSection) {

                calculatorSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       CALCULATE BUTTON
    ====================================================== */

    calculateBtn.addEventListener("click", calculateArea);


    /* =====================================================
       RESET BUTTON
    ====================================================== */

    resetBtn.addEventListener("click", () => {

        renderShape(shapeSelect.value);

        clearResult();

    });


    /* =====================================================
       RENDER SHAPE
    ====================================================== */

    function renderShape(shape) {

        if (!shapeData[shape]) {
            return;
        }

        renderInputs(shape);

        renderDiagram(shape);

        renderExplanation(shape);

    }


    /* =====================================================
       RENDER INPUTS
    ====================================================== */

    function renderInputs(shape) {

        shapeInputs.innerHTML = "";

        const data = shapeData[shape];

        /* ---------------------------------------------
           TRIANGLE METHOD SELECTOR
        --------------------------------------------- */

        if (shape === "triangle") {

            const methodWrapper =
                document.createElement("div");

            methodWrapper.className = "input-group";

            methodWrapper.innerHTML = `
                <label for="triangleMethod">
                    Calculation Method
                </label>

                <select id="triangleMethod">

                    <option value="baseHeight">
                        Base & Height
                    </option>

                    <option value="heron">
                        Three Sides (Heron's Formula)
                    </option>

                </select>
            `;

            shapeInputs.appendChild(methodWrapper);


            renderTriangleInputs("baseHeight");

            const triangleMethod =
                document.getElementById("triangleMethod");

            triangleMethod.addEventListener("change", () => {

                renderTriangleInputs(triangleMethod.value);

                renderDiagram("triangle");

            });

            return;
        }


        /* ---------------------------------------------
           NORMAL INPUTS
        --------------------------------------------- */

        data.inputs.forEach(input => {

            const wrapper =
                document.createElement("div");

            wrapper.className = "shape-input";

            wrapper.innerHTML = `
                <label for="${input.id}">
                    ${input.label} (${input.symbol})
                </label>

                <input
                    type="number"
                    id="${input.id}"
                    placeholder="Enter ${input.label.toLowerCase()}"
                    min="0"
                    step="any"
                    inputmode="decimal"
                >

                <span class="input-hint">
                    ${input.hint}
                </span>
            `;

            shapeInputs.appendChild(wrapper);

        });

    }


    /* =====================================================
       TRIANGLE INPUTS
    ====================================================== */

    function renderTriangleInputs(method) {

        const existing =
            document.getElementById("triangleInputs");

        if (existing) {
            existing.remove();
        }


        const wrapper =
            document.createElement("div");

        wrapper.id = "triangleInputs";


        if (method === "heron") {

            wrapper.innerHTML = `

                ${createInputHTML(
                "sideA",
                "Side A",
                "a",
                "Length of the first side."
            )}

                ${createInputHTML(
                "sideB",
                "Side B",
                "b",
                "Length of the second side."
            )}

                ${createInputHTML(
                "sideC",
                "Side C",
                "c",
                "Length of the third side."
            )}

                <div class="input-hint">
                    All three side lengths must satisfy the
                    triangle inequality.
                </div>

            `;

        } else {

            wrapper.innerHTML = `

                ${createInputHTML(
                "base",
                "Base",
                "b",
                "The side selected as the base."
            )}

                ${createInputHTML(
                "height",
                "Height",
                "h",
                "Perpendicular distance from the base to the opposite vertex."
            )}

            `;

        }

        shapeInputs.appendChild(wrapper);

    }


    /* =====================================================
       CREATE INPUT HTML
    ====================================================== */

    function createInputHTML(
        id,
        label,
        symbol,
        hint
    ) {

        return `
            <div class="shape-input">

                <label for="${id}">
                    ${label} (${symbol})
                </label>

                <input
                    type="number"
                    id="${id}"
                    placeholder="Enter ${label.toLowerCase()}"
                    min="0"
                    step="any"
                    inputmode="decimal"
                >

                <span class="input-hint">
                    ${hint}
                </span>

            </div>
        `;

    }


    /* =====================================================
       CALCULATE AREA
    ====================================================== */

    function calculateArea() {

        const shape = shapeSelect.value;
        const unit = unitSelect.value;

        let result;

        try {

            switch (shape) {

                case "square":
                    result = calculateSquare(unit);
                    break;

                case "rectangle":
                    result = calculateRectangle(unit);
                    break;

                case "triangle":
                    result = calculateTriangle(unit);
                    break;

                case "circle":
                    result = calculateCircle(unit);
                    break;

                case "parallelogram":
                    result = calculateParallelogram(unit);
                    break;

                case "trapezoid":
                    result = calculateTrapezoid(unit);
                    break;

                case "rhombus":
                    result = calculateRhombus(unit);
                    break;

                case "kite":
                    result = calculateKite(unit);
                    break;

                case "ellipse":
                    result = calculateEllipse(unit);
                    break;

                case "sector":
                    result = calculateSector(unit);
                    break;

                case "polygon":
                    result = calculatePolygon(unit);
                    break;

                default:
                    throw new Error("Unsupported shape.");

            }


            /* =========================================
               SHOW RESULT
            ========================================= */

            showResult(result, unit, shape);


            /* =========================================
               CREATE HISTORY TEXT
            ========================================= */

            let historyText =
                `Area Calculator
Shape: ${shapeData[shape].name}
Result: ${format(result.area)} ${squareUnit(unit)}`;


            /* =========================================
               SQUARE
            ========================================= */

            if (shape === "square") {

                historyText +=
                    `\nSide: ${document.getElementById("side").value} ${unit}`;

            }


            /* =========================================
               RECTANGLE
            ========================================= */

            else if (shape === "rectangle") {

                historyText +=
                    `\nLength: ${document.getElementById("length").value} ${unit}
Width: ${document.getElementById("width").value} ${unit}`;

            }


            /* =========================================
               TRIANGLE
            ========================================= */

            else if (shape === "triangle") {

                const method =
                    document.getElementById("triangleMethod")?.value;


                if (method === "heron") {

                    historyText +=
                        `\nMethod: Heron's Formula
Side A: ${document.getElementById("sideA").value} ${unit}
Side B: ${document.getElementById("sideB").value} ${unit}
Side C: ${document.getElementById("sideC").value} ${unit}`;

                }

                else {

                    historyText +=
                        `\nMethod: Base & Height
Base: ${document.getElementById("base").value} ${unit}
Height: ${document.getElementById("height").value} ${unit}`;

                }

            }


            /* =========================================
               CIRCLE
            ========================================= */

            else if (shape === "circle") {

                historyText +=
                    `\nRadius: ${document.getElementById("radius").value} ${unit}`;

            }


            /* =========================================
               PARALLELOGRAM
            ========================================= */

            else if (shape === "parallelogram") {

                historyText +=
                    `\nBase: ${document.getElementById("base").value} ${unit}
Height: ${document.getElementById("height").value} ${unit}`;

            }


            /* =========================================
               TRAPEZOID
            ========================================= */

            else if (shape === "trapezoid") {

                historyText +=
                    `\nBase 1: ${document.getElementById("base1").value} ${unit}
Base 2: ${document.getElementById("base2").value} ${unit}
Height: ${document.getElementById("height").value} ${unit}`;

            }


            /* =========================================
               RHOMBUS
            ========================================= */

            else if (shape === "rhombus") {

                historyText +=
                    `\nDiagonal 1: ${document.getElementById("diagonal1").value} ${unit}
Diagonal 2: ${document.getElementById("diagonal2").value} ${unit}`;

            }


            /* =========================================
               KITE
            ========================================= */

            else if (shape === "kite") {

                historyText +=
                    `\nDiagonal 1: ${document.getElementById("diagonal1").value} ${unit}
Diagonal 2: ${document.getElementById("diagonal2").value} ${unit}`;

            }


            /* =========================================
               ELLIPSE
            ========================================= */

            else if (shape === "ellipse") {

                historyText +=
                    `\nSemi-major Axis: ${document.getElementById("semiMajor").value} ${unit}
Semi-minor Axis: ${document.getElementById("semiMinor").value} ${unit}`;

            }


            /* =========================================
               SECTOR
            ========================================= */

            else if (shape === "sector") {

                historyText +=
                    `\nRadius: ${document.getElementById("radius").value} ${unit}
Angle: ${document.getElementById("angle").value}°`;

            }


            /* =========================================
               POLYGON
            ========================================= */

            else if (shape === "polygon") {

                historyText +=
                    `\nNumber of Sides: ${document.getElementById("sides").value}
Side Length: ${document.getElementById("sideLength").value} ${unit}`;

            }


            /* =========================================
               SAVE TO HISTORY
            ========================================= */

            if (
                typeof saveHistory === "function"
            ) {

                saveHistory(historyText);

                if (
                    typeof loadHistory === "function"
                ) {

                    loadHistory();

                }

            }


        } catch (error) {

            showError(error.message);

        }

    }


    /* =====================================================
       SQUARE
    ====================================================== */

    function calculateSquare(unit) {

        const side =
            getPositiveNumber("side");

        const area =
            side * side;

        return {

            area,

            steps: [

                `Area = side × side`,

                `Area = ${format(side)} × ${format(side)}`,

                `Area = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       RECTANGLE
    ====================================================== */

    function calculateRectangle(unit) {

        const length =
            getPositiveNumber("length");

        const width =
            getPositiveNumber("width");

        const area =
            length * width;

        return {

            area,

            steps: [

                `Area = length × width`,

                `Area = ${format(length)} × ${format(width)}`,

                `Area = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       TRIANGLE
    ====================================================== */

    function calculateTriangle(unit) {

        const method =
            document.getElementById("triangleMethod")?.value
            || "baseHeight";


        /* ---------------------------------------------
           BASE + HEIGHT
        --------------------------------------------- */

        if (method === "baseHeight") {

            const base =
                getPositiveNumber("base");

            const height =
                getPositiveNumber("height");

            const area =
                0.5 * base * height;

            return {

                area,

                steps: [

                    `Area = ½ × base × height`,

                    `Area = ½ × ${format(base)} × ${format(height)}`,

                    `Area = ${format(0.5 * base)} × ${format(height)}`,

                    `Area = ${format(area)} ${squareUnit(unit)}`

                ]

            };

        }


        /* ---------------------------------------------
           HERON'S FORMULA
        --------------------------------------------- */

        const a =
            getPositiveNumber("sideA");

        const b =
            getPositiveNumber("sideB");

        const c =
            getPositiveNumber("sideC");


        /* Triangle inequality */

        if (
            a + b <= c ||
            a + c <= b ||
            b + c <= a
        ) {

            throw new Error(
                "These three side lengths cannot form a valid triangle."
            );

        }


        const semiPerimeter =
            (a + b + c) / 2;


        const areaSquared =
            semiPerimeter *
            (semiPerimeter - a) *
            (semiPerimeter - b) *
            (semiPerimeter - c);


        const area =
            Math.sqrt(areaSquared);


        return {

            area,

            steps: [

                `s = (a + b + c) / 2`,

                `s = (${format(a)} + ${format(b)} + ${format(c)}) / 2`,

                `s = ${format(semiPerimeter)}`,

                `A = √[s(s-a)(s-b)(s-c)]`,

                `A = √[${format(semiPerimeter)} × (${format(semiPerimeter)} - ${format(a)}) × (${format(semiPerimeter)} - ${format(b)}) × (${format(semiPerimeter)} - ${format(c)})]`,

                `A = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       CIRCLE
    ====================================================== */

    function calculateCircle(unit) {

        const radius =
            getPositiveNumber("radius");

        const area =
            Math.PI * radius * radius;

        return {

            area,

            steps: [

                `Area = π × radius²`,

                `Area = π × ${format(radius)}²`,

                `Area = ${Math.PI.toFixed(8)} × ${format(radius * radius)}`,

                `Area = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       PARALLELOGRAM
    ====================================================== */

    function calculateParallelogram(unit) {

        const base =
            getPositiveNumber("base");

        const height =
            getPositiveNumber("height");

        const area =
            base * height;

        return {

            area,

            steps: [

                `Area = base × height`,

                `Area = ${format(base)} × ${format(height)}`,

                `Area = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       TRAPEZOID
    ====================================================== */

    function calculateTrapezoid(unit) {

        const base1 =
            getPositiveNumber("base1");

        const base2 =
            getPositiveNumber("base2");

        const height =
            getPositiveNumber("height");

        const area =
            0.5 * (base1 + base2) * height;

        return {

            area,

            steps: [

                `Area = ½ × (a + b) × h`,

                `Area = ½ × (${format(base1)} + ${format(base2)}) × ${format(height)}`,

                `Area = ½ × ${format(base1 + base2)} × ${format(height)}`,

                `Area = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       RHOMBUS
    ====================================================== */

    function calculateRhombus(unit) {

        const d1 =
            getPositiveNumber("diagonal1");

        const d2 =
            getPositiveNumber("diagonal2");

        const area =
            0.5 * d1 * d2;

        return {

            area,

            steps: [

                `Area = ½ × d₁ × d₂`,

                `Area = ½ × ${format(d1)} × ${format(d2)}`,

                `Area = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       KITE
    ====================================================== */

    function calculateKite(unit) {

        const d1 =
            getPositiveNumber("diagonal1");

        const d2 =
            getPositiveNumber("diagonal2");

        const area =
            0.5 * d1 * d2;

        return {

            area,

            steps: [

                `Area = ½ × d₁ × d₂`,

                `Area = ½ × ${format(d1)} × ${format(d2)}`,

                `Area = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       ELLIPSE
    ====================================================== */

    function calculateEllipse(unit) {

        const a =
            getPositiveNumber("semiMajor");

        const b =
            getPositiveNumber("semiMinor");

        const area =
            Math.PI * a * b;

        return {

            area,

            steps: [

                `Area = π × a × b`,

                `Area = π × ${format(a)} × ${format(b)}`,

                `Area = ${Math.PI.toFixed(8)} × ${format(a * b)}`,

                `Area = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       SECTOR
    ====================================================== */

    function calculateSector(unit) {

        const radius =
            getPositiveNumber("radius");

        const angle =
            getPositiveNumber("angle");


        if (angle > 360) {

            throw new Error(
                "The sector angle cannot be greater than 360°."
            );

        }


        const area =
            (angle / 360) *
            Math.PI *
            radius *
            radius;


        return {

            area,

            steps: [

                `Area = (θ / 360) × πr²`,

                `Area = (${format(angle)} / 360) × π × ${format(radius)}²`,

                `Area = ${format(angle / 360)} × π × ${format(radius * radius)}`,

                `Area = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       REGULAR POLYGON
    ====================================================== */

    function calculatePolygon(unit) {

        const sides =
            getPositiveNumber("sides");

        const sideLength =
            getPositiveNumber("sideLength");


        if (!Number.isInteger(sides)) {

            throw new Error(
                "The number of sides must be a whole number."
            );

        }


        if (sides < 3) {

            throw new Error(
                "A polygon must have at least 3 sides."
            );

        }


        const area =
            (
                sides *
                sideLength *
                sideLength
            ) /
            (
                4 *
                Math.tan(Math.PI / sides)
            );


        return {

            area,

            steps: [

                `Area = n × s² / [4 × tan(π/n)]`,

                `Area = ${format(sides)} × ${format(sideLength)}² / [4 × tan(π/${format(sides)})]`,

                `Area = ${format(area)} ${squareUnit(unit)}`

            ]

        };

    }


    /* =====================================================
       GET POSITIVE NUMBER
    ====================================================== */

    function getPositiveNumber(id) {

        const element =
            document.getElementById(id);

        if (!element) {

            throw new Error(
                "Required input could not be found."
            );

        }


        const value =
            parseFloat(element.value);


        if (!Number.isFinite(value) || value <= 0) {

            element.classList.add("input-error");

            element.focus();

            throw new Error(
                "Please enter a valid positive number."
            );

        }


        element.classList.remove("input-error");

        return value;

    }


    /* =====================================================
       SHOW RESULT
    ====================================================== */

    function showResult(result, unit, shape) {

        const unitText =
            squareUnit(unit);

        const areaValue =
            `${format(result.area)} ${unitText}`;

        const shapeName =
            shapeData[shape].name;


        /* =========================================
           EXISTING RESULT DISPLAY
        ========================================= */

        areaResult.textContent =
            areaValue;


        /* =========================================
           CALCULATION STEPS
        ========================================= */

        calculationSteps.innerHTML =
            result.steps
                .map((step, index) => {

                    return `
                    <div class="calculation-step">

                        <span class="step-number">
                            ${index + 1}
                        </span>

                        <span class="step-text">
                            ${escapeHTML(step)}
                        </span>

                    </div>
                `;

                })
                .join("");


        /* =========================================
           RESULT MESSAGE
        ========================================= */

        resultMessage.classList.remove("error");

        resultMessage.innerHTML = `
        The area of the
        <strong>
            ${shapeName}
        </strong>
        is
        <strong>
            ${areaValue}
        </strong>.
    `;


        /* =========================================
           COMPLETE RESULT FOR
           COPY / SHARE / PDF
        ========================================= */

        const resultBox =
            document.getElementById("result");


        if (!resultBox) {
            return;
        }


        /*
           Convert calculation steps into
           plain readable text.
        */

        const stepsText =
            result.steps
                .map((step, index) => {

                    return `${index + 1}. ${step}`;

                })
                .join("\n");


        /* =========================================
           COMPLETE RESULT CONTENT
        ========================================= */

        resultBox.innerHTML = `

        <div class="area-share-result">


            <div class="result-card">

                <div class="result-title">
                    Area Calculator
                </div>

                <div class="result-value">
                    ${shapeName}
                </div>

            </div>


            <div class="result-card">

                <div class="result-title">
                    Final Area
                </div>

                <div class="result-value">
                    ${areaValue}
                </div>

            </div>


            <div class="result-card">

                <div class="result-title">
                    Calculation
                </div>

                <div class="result-calculation">

                    ${result.steps
                .map((step, index) => {

                    return `
                                <div>
                                    <strong>
                                        ${index + 1}.
                                    </strong>
                                    ${escapeHTML(step)}
                                </div>
                            `;

                })
                .join("")
            }

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


        </div>


        <div class="result-actions">


            <button
                type="button"
                class="copy-btn"
                onclick="copyResult()">

                📋 Copy Result

            </button>


            <button
                type="button"
                class="share-btn"
                onclick="shareResult()">

                📤 Share Result

            </button>


            <button
                type="button"
                class="pdf-btn"
                onclick="downloadPDF()">

                📄 Download PDF

            </button>


        </div>

    `;

    }


    /* =====================================================
       ERROR
    ====================================================== */

    function showError(message) {

        areaResult.textContent = "—";

        calculationSteps.innerHTML = `
            <div class="calculation-step">

                <span class="step-number">
                    !
                </span>

                <span class="step-text">
                    ${escapeHTML(message)}
                </span>

            </div>
        `;


        resultMessage.classList.add("error");

        resultMessage.innerHTML =
            escapeHTML(message);

    }


    /* =====================================================
       CLEAR RESULT
    ====================================================== */

    function clearResult() {

        areaResult.textContent = "—";


        calculationSteps.innerHTML =
            "Enter the required values and click \"Calculate Area\".";


        resultMessage.classList.remove("error");


        resultMessage.innerHTML =
            "Your calculated area will appear here.";

    }


    /* =====================================================
       UPDATE SHAPE CARDS
    ====================================================== */

    function updateShapeCards(activeShape) {

        document
            .querySelectorAll(".shape-card")
            .forEach(card => {

                card.classList.toggle(
                    "active",
                    card.dataset.shape === activeShape
                );

            });

    }


    /* =====================================================
       UNIT
    ====================================================== */

    function squareUnit(unit) {

        const units = {

            mm: "mm²",

            cm: "cm²",

            m: "m²",

            km: "km²",

            in: "in²",

            ft: "ft²",

            yd: "yd²"

        };

        return units[unit] || `${unit}²`;

    }


    /* =====================================================
       NUMBER FORMAT
    ====================================================== */

    function format(value) {

        if (!Number.isFinite(value)) {
            return "0";
        }


        if (Number.isInteger(value)) {
            return value.toLocaleString("en-US");
        }


        return value.toLocaleString(
            "en-US",
            {
                maximumFractionDigits: 10
            }
        );

    }


    /* =====================================================
       ESCAPE HTML
    ====================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       DIAGRAM RENDERER
    ====================================================== */

    function renderDiagram(shape) {

        let svg = "";

        let explanation = "";


        switch (shape) {

            /* ---------------------------------------------
               SQUARE
            --------------------------------------------- */

            case "square":

                svg = `

                    <svg
                        viewBox="0 0 360 300"
                        aria-label="Square diagram"
                    >

                        <rect
                            x="90"
                            y="45"
                            width="180"
                            height="180"
                            fill="#dbeafe"
                            stroke="#2563eb"
                            stroke-width="5"
                        />

                        <line
                            x1="90"
                            y1="245"
                            x2="270"
                            y2="245"
                            stroke="#17365d"
                            stroke-width="2"
                        />

                        <text
                            x="180"
                            y="275"
                            text-anchor="middle"
                            font-size="20"
                        >
                            s
                        </text>

                        <text
                            x="180"
                            y="140"
                            text-anchor="middle"
                            font-size="18"
                        >
                            Square
                        </text>

                    </svg>

                `;

                explanation = `
                    <strong>s</strong> represents the length of
                    one side. All four sides of a square are equal.
                `;

                break;


            /* ---------------------------------------------
               RECTANGLE
            --------------------------------------------- */

            case "rectangle":

                svg = `

                    <svg
                        viewBox="0 0 360 300"
                        aria-label="Rectangle diagram"
                    >

                        <rect
                            x="55"
                            y="70"
                            width="250"
                            height="140"
                            fill="#dbeafe"
                            stroke="#2563eb"
                            stroke-width="5"
                        />

                        <text
                            x="180"
                            y="245"
                            text-anchor="middle"
                            font-size="20"
                        >
                            l = length
                        </text>

                        <text
                            x="320"
                            y="145"
                            text-anchor="middle"
                            font-size="20"
                            transform="rotate(90 320 145)"
                        >
                            w = width
                        </text>

                    </svg>

                `;

                explanation = `
                    <strong>l</strong> is the length and
                    <strong>w</strong> is the width.
                    Area is length multiplied by width.
                `;

                break;


            /* ---------------------------------------------
               TRIANGLE
            --------------------------------------------- */

            case "triangle":

                svg = `

                    <svg
                        viewBox="0 0 400 330"
                        aria-label="Triangle with base and height"
                    >

                        <!-- Triangle -->
                        <polygon
                            points="55,260 345,260 205,50"
                            fill="#dbeafe"
                            stroke="#2563eb"
                            stroke-width="5"
                        />

                        <!-- Height -->
                        <line
                            x1="205"
                            y1="50"
                            x2="205"
                            y2="260"
                            stroke="#2563eb"
                            stroke-width="3"
                            stroke-dasharray="8 6"
                        />

                        <!-- Right angle -->
                        <path
                            d="M205 260 L205 242 L223 242"
                            fill="none"
                            stroke="#17365d"
                            stroke-width="2"
                        />

                        <!-- Side a -->
                        <text
                            x="115"
                            y="155"
                            font-size="21"
                        >
                            a
                        </text>

                        <!-- Side b -->
                        <text
                            x="285"
                            y="155"
                            font-size="21"
                        >
                            b
                        </text>

                        <!-- Base c -->
                        <text
                            x="200"
                            y="295"
                            text-anchor="middle"
                            font-size="21"
                        >
                            c = base
                        </text>

                        <!-- Height -->
                        <text
                            x="218"
                            y="160"
                            font-size="20"
                        >
                            h
                        </text>

                    </svg>

                `;

                explanation = `
                    <strong>c</strong> is the base in this diagram.
                    <strong>h</strong> is the perpendicular height.
                    <strong>a</strong> and <strong>b</strong> are the
                    other two sides. The dashed line shows the
                    perpendicular height.
                `;

                break;


            /* ---------------------------------------------
               CIRCLE
            --------------------------------------------- */

            case "circle":

                svg = `

                    <svg
                        viewBox="0 0 360 300"
                        aria-label="Circle radius diagram"
                    >

                        <circle
                            cx="180"
                            cy="145"
                            r="95"
                            fill="#ede9fe"
                            stroke="#7c3aed"
                            stroke-width="5"
                        />

                        <circle
                            cx="180"
                            cy="145"
                            r="5"
                            fill="#17365d"
                        />

                        <line
                            x1="180"
                            y1="145"
                            x2="275"
                            y2="145"
                            stroke="#17365d"
                            stroke-width="3"
                        />

                        <text
                            x="225"
                            y="132"
                            font-size="20"
                        >
                            r
                        </text>

                        <text
                            x="180"
                            y="280"
                            text-anchor="middle"
                            font-size="20"
                        >
                            Radius
                        </text>

                    </svg>

                `;

                explanation = `
                    <strong>r</strong> is the radius, measured
                    from the center of the circle to its edge.
                `;

                break;


            /* ---------------------------------------------
               PARALLELOGRAM
            --------------------------------------------- */

            case "parallelogram":

                svg = `

                    <svg
                        viewBox="0 0 380 300"
                        aria-label="Parallelogram diagram"
                    >

                        <polygon
                            points="80,230 290,230 330,80 120,80"
                            fill="#dbeafe"
                            stroke="#2563eb"
                            stroke-width="5"
                        />

                        <line
                            x1="120"
                            y1="80"
                            x2="120"
                            y2="230"
                            stroke="#2563eb"
                            stroke-width="3"
                            stroke-dasharray="7 6"
                        />

                        <text
                            x="185"
                            y="260"
                            font-size="20"
                        >
                            b = base
                        </text>

                        <text
                            x="132"
                            y="160"
                            font-size="20"
                        >
                            h
                        </text>

                    </svg>

                `;

                explanation = `
                    <strong>b</strong> is the base and
                    <strong>h</strong> is the perpendicular height.
                    The slanted side is not used directly in the
                    area formula.
                `;

                break;


            /* ---------------------------------------------
               TRAPEZOID
            --------------------------------------------- */

            case "trapezoid":

                svg = `

                    <svg
                        viewBox="0 0 400 300"
                        aria-label="Trapezoid diagram"
                    >

                        <polygon
                            points="95,70 305,70 350,235 50,235"
                            fill="#dbeafe"
                            stroke="#2563eb"
                            stroke-width="5"
                        />

                        <line
                            x1="305"
                            y1="70"
                            x2="305"
                            y2="235"
                            stroke="#2563eb"
                            stroke-width="3"
                            stroke-dasharray="7 6"
                        />

                        <text
                            x="200"
                            y="55"
                            text-anchor="middle"
                            font-size="20"
                        >
                            a
                        </text>

                        <text
                            x="200"
                            y="270"
                            text-anchor="middle"
                            font-size="20"
                        >
                            b
                        </text>

                        <text
                            x="316"
                            y="155"
                            font-size="20"
                        >
                            h
                        </text>

                    </svg>

                `;

                explanation = `
                    <strong>a</strong> and <strong>b</strong> are
                    the two parallel bases. <strong>h</strong> is
                    the perpendicular distance between them.
                `;

                break;


            /* ---------------------------------------------
               RHOMBUS
            --------------------------------------------- */

            case "rhombus":

                svg = `

                    <svg
                        viewBox="0 0 360 300"
                        aria-label="Rhombus diagonals diagram"
                    >

                        <polygon
                            points="180,40 310,150 180,260 50,150"
                            fill="#ede9fe"
                            stroke="#7c3aed"
                            stroke-width="5"
                        />

                        <line
                            x1="50"
                            y1="150"
                            x2="310"
                            y2="150"
                            stroke="#7c3aed"
                            stroke-width="3"
                            stroke-dasharray="7 5"
                        />

                        <line
                            x1="180"
                            y1="40"
                            x2="180"
                            y2="260"
                            stroke="#7c3aed"
                            stroke-width="3"
                            stroke-dasharray="7 5"
                        />

                        <text
                            x="180"
                            y="285"
                            text-anchor="middle"
                            font-size="20"
                        >
                            d₁
                        </text>

                        <text
                            x="195"
                            y="155"
                            font-size="20"
                        >
                            d₂
                        </text>

                    </svg>

                `;

                explanation = `
                    The area of a rhombus is half the product
                    of its two diagonals, <strong>d₁</strong>
                    and <strong>d₂</strong>.
                `;

                break;


            /* ---------------------------------------------
               KITE
            --------------------------------------------- */

            case "kite":

                svg = `

                    <svg
                        viewBox="0 0 360 300"
                        aria-label="Kite diagonals diagram"
                    >

                        <polygon
                            points="180,35 285,125 180,265 75,125"
                            fill="#fce7f3"
                            stroke="#db2777"
                            stroke-width="5"
                        />

                        <line
                            x1="180"
                            y1="35"
                            x2="180"
                            y2="265"
                            stroke="#db2777"
                            stroke-width="3"
                            stroke-dasharray="7 5"
                        />

                        <line
                            x1="75"
                            y1="125"
                            x2="285"
                            y2="125"
                            stroke="#db2777"
                            stroke-width="3"
                            stroke-dasharray="7 5"
                        />

                        <text
                            x="195"
                            y="155"
                            font-size="20"
                        >
                            d₁
                        </text>

                        <text
                            x="180"
                            y="110"
                            text-anchor="middle"
                            font-size="20"
                        >
                            d₂
                        </text>

                    </svg>

                `;

                explanation = `
                    The two diagonals <strong>d₁</strong> and
                    <strong>d₂</strong> intersect inside the kite.
                    Area is half their product.
                `;

                break;


            /* ---------------------------------------------
               ELLIPSE
            --------------------------------------------- */

            case "ellipse":

                svg = `

                    <svg
                        viewBox="0 0 420 300"
                        aria-label="Ellipse semi axes diagram"
                    >

                        <ellipse
                            cx="210"
                            cy="145"
                            rx="145"
                            ry="85"
                            fill="#d1fae5"
                            stroke="#059669"
                            stroke-width="5"
                        />

                        <circle
                            cx="210"
                            cy="145"
                            r="4"
                            fill="#17365d"
                        />

                        <line
                            x1="210"
                            y1="145"
                            x2="355"
                            y2="145"
                            stroke="#059669"
                            stroke-width="3"
                        />

                        <line
                            x1="210"
                            y1="145"
                            x2="210"
                            y2="60"
                            stroke="#059669"
                            stroke-width="3"
                        />

                        <text
                            x="280"
                            y="132"
                            font-size="20"
                        >
                            a
                        </text>

                        <text
                            x="220"
                            y="100"
                            font-size="20"
                        >
                            b
                        </text>

                    </svg>

                `;

                explanation = `
                    <strong>a</strong> is the semi-major axis and
                    <strong>b</strong> is the semi-minor axis.
                    They are half of the major and minor diameters.
                `;

                break;


            /* ---------------------------------------------
               SECTOR
            --------------------------------------------- */

            case "sector":

                svg = `

                    <svg
                        viewBox="0 0 360 300"
                        aria-label="Circle sector diagram"
                    >

                        <path
                            d="M180 150 L300 150 A120 120 0 0 0 240 46 Z"
                            fill="#ffedd5"
                            stroke="#ea580c"
                            stroke-width="5"
                        />

                        <line
                            x1="180"
                            y1="150"
                            x2="300"
                            y2="150"
                            stroke="#ea580c"
                            stroke-width="3"
                        />

                        <line
                            x1="180"
                            y1="150"
                            x2="240"
                            y2="46"
                            stroke="#ea580c"
                            stroke-width="3"
                        />

                        <text
                            x="235"
                            y="165"
                            font-size="20"
                        >
                            r
                        </text>

                        <text
                            x="213"
                            y="125"
                            font-size="20"
                        >
                            θ
                        </text>

                    </svg>

                `;

                explanation = `
                    A sector is a portion of a circle.
                    <strong>r</strong> is the radius and
                    <strong>θ</strong> is the central angle in degrees.
                `;

                break;


            /* ---------------------------------------------
               POLYGON
            --------------------------------------------- */

            case "polygon":

                svg = `

                    <svg
                        viewBox="0 0 360 300"
                        aria-label="Regular polygon diagram"
                    >

                        <polygon
                            points="
                                180,35
                                285,100
                                260,225
                                100,225
                                75,100
                            "
                            fill="#dbeafe"
                            stroke="#2563eb"
                            stroke-width="5"
                        />

                        <line
                            x1="180"
                            y1="145"
                            x2="180"
                            y2="35"
                            stroke="#2563eb"
                            stroke-width="3"
                            stroke-dasharray="7 5"
                        />

                        <text
                            x="195"
                            y="90"
                            font-size="20"
                        >
                            apothem
                        </text>

                        <text
                            x="180"
                            y="260"
                            text-anchor="middle"
                            font-size="20"
                        >
                            regular polygon
                        </text>

                    </svg>

                `;

                explanation = `
                    A regular polygon has equal sides and equal
                    angles. The calculator uses the number of sides
                    <strong>n</strong> and side length <strong>s</strong>.
                `;

                break;

        }


        shapeDiagram.innerHTML = svg;

        diagramExplanation.innerHTML =
            explanation;

    }


    /* =====================================================
       SHAPE EXPLANATION
    ====================================================== */

    function renderExplanation(shape) {

        const data =
            shapeData[shape];


        currentShapeTitle.textContent =
            `How to Calculate the Area of a ${data.name}`;


        let variablesHTML = "";


        data.variables.forEach(variable => {

            variablesHTML += `

                <div class="variable-item">

                    <div class="variable-symbol">
                        ${variable[0]}
                    </div>

                    <div class="variable-description">
                        ${variable[1]}
                    </div>

                </div>

            `;

        });


        let description = "";


        switch (shape) {

            case "square":

                description = `
                    <p>
                        A square is a four-sided shape in which
                        all four sides are equal. To find its area,
                        multiply the side length by itself.
                    </p>

                    <div class="formula-box">

                        <div class="formula-label">
                            Formula
                        </div>

                        <div class="formula">
                            A = s²
                        </div>

                    </div>

                    <h4>What do the symbols mean?</h4>

                    <div class="variable-list">
                        ${variablesHTML}
                    </div>

                    <div class="example-box">

                        <strong>Example</strong>

                        <p>
                            If the side of a square is 5 m:
                        </p>

                        <div class="example-calculation">
                            A = 5 × 5<br>
                            A = 25 m²
                        </div>

                    </div>
                `;

                break;


            case "rectangle":

                description = `
                    <p>
                        The area of a rectangle is found by
                        multiplying its length by its width.
                    </p>

                    <div class="formula-box">

                        <div class="formula-label">
                            Formula
                        </div>

                        <div class="formula">
                            A = l × w
                        </div>

                    </div>

                    <h4>What do the symbols mean?</h4>

                    <div class="variable-list">
                        ${variablesHTML}
                    </div>

                    <div class="example-box">

                        <strong>Example</strong>

                        <p>
                            Length = 10 m and Width = 5 m.
                        </p>

                        <div class="example-calculation">
                            A = 10 × 5<br>
                            A = 50 m²
                        </div>

                    </div>
                `;

                break;


            case "triangle":

                description = `
                    <p>
                        A triangle has three sides. When the base
                        and perpendicular height are known, its area
                        can be calculated using half of the product
                        of the base and height.
                    </p>

                    <div class="formula-box">

                        <div class="formula-label">
                            Base & Height Formula
                        </div>

                        <div class="formula">
                            A = ½ × b × h
                        </div>

                    </div>

                    <h4>Understanding the triangle diagram</h4>

                    <p>
                        In the diagram above, the side selected as
                        the <strong>base</strong> is represented by
                        <strong>c</strong>. The dashed line labelled
                        <strong>h</strong> is the perpendicular
                        height. The other two sides are represented
                        by <strong>a</strong> and <strong>b</strong>.
                    </p>

                    <div class="variable-list">

                        <div class="variable-item">
                            <div class="variable-symbol">
                                a
                            </div>
                            <div class="variable-description">
                                First sloping side
                            </div>
                        </div>

                        <div class="variable-item">
                            <div class="variable-symbol">
                                b
                            </div>
                            <div class="variable-description">
                                Second sloping side
                            </div>
                        </div>

                        <div class="variable-item">
                            <div class="variable-symbol">
                                c
                            </div>
                            <div class="variable-description">
                                Selected base
                            </div>
                        </div>

                        <div class="variable-item">
                            <div class="variable-symbol">
                                h
                            </div>
                            <div class="variable-description">
                                Perpendicular height
                            </div>
                        </div>

                    </div>

                    <div class="example-box">

                        <strong>Example</strong>

                        <p>
                            Base = 10 m and Height = 5 m.
                        </p>

                        <div class="example-calculation">
                            A = ½ × b × h<br>
                            A = ½ × 10 × 5<br>
                            A = 25 m²
                        </div>

                    </div>

                    <h4>What if all three sides are known?</h4>

                    <p>
                        If the three side lengths are known but the
                        perpendicular height is not known, select
                        <strong>"Three Sides (Heron's Formula)"</strong>
                        from the calculator.
                    </p>

                    <div class="formula-box">

                        <div class="formula-label">
                            Heron's Formula
                        </div>

                        <div class="formula">
                            A = √[s(s-a)(s-b)(s-c)]
                        </div>

                    </div>

                    <p>
                        First, the semi-perimeter is calculated:
                    </p>

                    <div class="formula-box">

                        <div class="formula">
                            s = (a + b + c) / 2
                        </div>

                    </div>

                `;

                break;


            case "circle":

                description = `
                    <p>
                        The area of a circle represents the total
                        surface enclosed by its circular boundary.
                        The radius is the distance from the center
                        to the edge.
                    </p>

                    <div class="formula-box">

                        <div class="formula-label">
                            Formula
                        </div>

                        <div class="formula">
                            A = πr²
                        </div>

                    </div>

                    <h4>Variables</h4>

                    <div class="variable-list">
                        ${variablesHTML}
                    </div>

                    <div class="example-box">

                        <strong>Example</strong>

                        <p>
                            If radius = 7 m:
                        </p>

                        <div class="example-calculation">
                            A = π × 7²<br>
                            A = π × 49<br>
                            A ≈ 153.94 m²
                        </div>

                    </div>

                    <p>
                        The calculator uses JavaScript's
                        <strong>Math.PI</strong> value for π.
                    </p>
                `;

                break;


            case "parallelogram":

                description = `
                    <p>
                        The area of a parallelogram is calculated by
                        multiplying its base by its perpendicular
                        height.
                    </p>

                    <div class="formula-box">
                        <div class="formula">
                            A = b × h
                        </div>
                    </div>

                    <div class="variable-list">
                        ${variablesHTML}
                    </div>

                    <p>
                        Notice that the slanted side is not used
                        directly in the area calculation.
                    </p>
                `;

                break;


            case "trapezoid":

                description = `
                    <p>
                        A trapezoid has two parallel sides called
                        bases. Its area is half the sum of the two
                        bases multiplied by the perpendicular height.
                    </p>

                    <div class="formula-box">
                        <div class="formula">
                            A = ½ × (a + b) × h
                        </div>
                    </div>

                    <div class="variable-list">
                        ${variablesHTML}
                    </div>

                    <div class="example-box">

                        <strong>Example</strong>

                        <div class="example-calculation">
                            a = 8 m<br>
                            b = 12 m<br>
                            h = 5 m<br><br>

                            A = ½ × (8 + 12) × 5<br>
                            A = 50 m²
                        </div>

                    </div>
                `;

                break;


            case "rhombus":

                description = `
                    <p>
                        A rhombus has four equal sides. Its area can
                        be calculated using the lengths of its two
                        diagonals.
                    </p>

                    <div class="formula-box">
                        <div class="formula">
                            A = ½ × d₁ × d₂
                        </div>
                    </div>

                    <div class="variable-list">
                        ${variablesHTML}
                    </div>
                `;

                break;


            case "kite":

                description = `
                    <p>
                        The area of a kite is calculated from its two
                        diagonals. The diagonals cross inside the kite.
                    </p>

                    <div class="formula-box">
                        <div class="formula">
                            A = ½ × d₁ × d₂
                        </div>
                    </div>

                    <div class="variable-list">
                        ${variablesHTML}
                    </div>
                `;

                break;


            case "ellipse":

                description = `
                    <p>
                        An ellipse has a major axis and a minor axis.
                        The calculator asks for the corresponding
                        semi-major and semi-minor axes.
                    </p>

                    <div class="formula-box">
                        <div class="formula">
                            A = πab
                        </div>
                    </div>

                    <div class="variable-list">
                        ${variablesHTML}
                    </div>

                    <p>
                        Remember that <strong>a</strong> and
                        <strong>b</strong> are half of the full
                        diameters, not the full diameters.
                    </p>
                `;

                break;


            case "sector":

                description = `
                    <p>
                        A sector is a portion of a circle bounded by
                        two radii and an arc. Its area depends on the
                        radius and the central angle.
                    </p>

                    <div class="formula-box">
                        <div class="formula">
                            A = (θ / 360) × πr²
                        </div>
                    </div>

                    <div class="variable-list">
                        ${variablesHTML}
                    </div>

                    <p>
                        The angle must be between 0° and 360°.
                    </p>
                `;

                break;


            case "polygon":

                description = `
                    <p>
                        A regular polygon has equal side lengths and
                        equal interior angles. Examples include
                        regular pentagons, hexagons and octagons.
                    </p>

                    <div class="formula-box">
                        <div class="formula">
                            A = n × s² / [4 × tan(π/n)]
                        </div>
                    </div>

                    <div class="variable-list">
                        ${variablesHTML}
                    </div>

                    <div class="example-box">

                        <strong>Example</strong>

                        <p>
                            A regular hexagon has 6 sides.
                        </p>

                        <div class="example-calculation">
                            n = 6<br>
                            s = side length<br><br>

                            A = 6 × s² /
                            [4 × tan(π/6)]
                        </div>

                    </div>
                `;

                break;

        }


        currentShapeExplanation.innerHTML =
            description;

    }


});