document.addEventListener("DOMContentLoaded", () => {

    const needle =
        document.getElementById("gaugeNeedle");

    if (needle) {

        needle.style.transform =
            "rotate(-90deg)";

    }

});

function calculateBMI() {

    const age =
        parseInt(
            document.getElementById("age").value
        );

    const gender =
        document.getElementById("gender").value;

    const weight =
        parseFloat(
            document.getElementById("weight").value
        );

    const heightCm =
        parseFloat(
            document.getElementById("height").value
        );

    if (
        !age ||
        !gender ||
        !weight ||
        !heightCm
    ) {

        alert(
            "Please fill all fields."
        );

        return;

    }

    if (
        age <= 0 ||
        weight <= 0 ||
        heightCm <= 0
    ) {

        alert(
            "Please enter valid values."
        );

        return;

    }

    const heightM =
        heightCm / 100;

    const bmi =
        weight /
        (
            heightM *
            heightM
        );

    const bmiRounded =
        bmi.toFixed(1);

    let category = "";
    let categoryClass = "";
    let tips = [];

    if (bmi < 18.5) {

        category =
            "Underweight";

        categoryClass =
            "underweight";

        tips = [

            "Increase calorie intake",

            "Eat protein-rich foods",

            "Strength training is recommended",

            "Consult a healthcare professional if needed"

        ];

    }

    else if (bmi < 25) {

        category =
            "Normal Weight";

        categoryClass =
            "normal";

        tips = [

            "Maintain your current lifestyle",

            "Exercise regularly",

            "Continue balanced nutrition",

            "Stay hydrated"

        ];

    }

    else if (bmi < 30) {

        category =
            "Overweight";

        categoryClass =
            "overweight";

        tips = [

            "Reduce excess calorie intake",

            "Increase daily physical activity",

            "Avoid sugary beverages",

            "Monitor weight regularly"

        ];

    }

    else {

        category =
            "Obese";

        categoryClass =
            "obese";

        tips = [

            "Consult a healthcare professional",

            "Follow a structured weight-loss plan",

            "Exercise consistently",

            "Focus on long-term lifestyle changes"

        ];

    }

    document.getElementById(
        "bmiScore"
    ).textContent =
        bmiRounded;

    const categoryBox =
        document.getElementById(
            "bmiCategory"
        );

    categoryBox.textContent =
        category;

    categoryBox.className =
        "bmi-category " +
        categoryClass;

    const healthyMin =
        (
            18.5 *
            heightM *
            heightM
        ).toFixed(1);

    const healthyMax =
        (
            24.9 *
            heightM *
            heightM
        ).toFixed(1);

    document.getElementById(
        "healthyWeight"
    ).innerHTML =
        `<strong>Healthy Weight Range:</strong>
        ${healthyMin} kg - ${healthyMax} kg`;

    const bmiPrime =
        (
            bmi / 25
        ).toFixed(2);

    document.getElementById(
        "bmiPrime"
    ).innerHTML =
        `<strong>BMI Prime:</strong>
        ${bmiPrime}`;

    const ponderalIndex =
        (
            weight /
            (
                heightM *
                heightM *
                heightM
            )
        ).toFixed(2);

    document.getElementById(
        "ponderalIndex"
    ).innerHTML =
        `<strong>Ponderal Index:</strong>
        ${ponderalIndex}`;

    const tipsBox =
        document.getElementById(
            "healthTips"
        );

    tipsBox.innerHTML =

        `<h2>Health Recommendations</h2>

        <ul>

            ${tips.map(tip =>
                `<li>${tip}</li>`
            ).join("")}

        </ul>`;

    updateGauge(bmi);

    const historyText =

`BMI: ${bmiRounded}
Category: ${category}
Weight: ${weight} kg
Height: ${heightCm} cm`;

    if (
        typeof saveHistory ===
        "function"
    ) {

        saveHistory(
            historyText
        );

        loadHistory();

    }

    document.getElementById(
        "actionButtons"
    ).classList.add(
        "show"
    );

}

function updateGauge(bmi) {

    const needle =
        document.getElementById(
            "gaugeNeedle"
        );

    if (!needle)
        return;

    let angle;

    if (bmi <= 15) {

        angle = -90;

    }

    else if (bmi >= 40) {

        angle = 90;

    }

    else {

        angle =
            (
                (
                    bmi - 15
                ) /
                (
                    40 - 15
                )
            ) * 180 - 90;

    }

    needle.style.transform =
        `rotate(${angle}deg)`;

}