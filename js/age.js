function calculateAge() {

    let dob = document.getElementById("dob").value;

    if (!dob) {

        document.getElementById("result").innerHTML =

        `<div class="result-card">

            <div class="result-title">
                ⚠️ Error
            </div>

            <div class="result-value">
                Please select your Date of Birth
            </div>

        </div>`;

        return;
    }

    let birthDate = new Date(dob);
    let today = new Date();

    let years =
        today.getFullYear() -
        birthDate.getFullYear();

    let months =
        today.getMonth() -
        birthDate.getMonth();

    let days =
        today.getDate() -
        birthDate.getDate();

    if (days < 0) {

        months--;

        let previousMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            ).getDate();

        days += previousMonth;

    }

    if (months < 0) {

        years--;

        months += 12;

    }

    let totalDays =
        Math.floor(
            (today - birthDate) /
            (1000 * 60 * 60 * 24)
        );

    let totalWeeks =
        Math.floor(totalDays / 7);

    let totalMonths =
        years * 12 + months;

    let totalHours =
        totalDays * 24;

    let weekday =
        birthDate.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );

    let zodiac =
        getZodiacSign(
            birthDate.getDate(),
            birthDate.getMonth() + 1
        );

    let nextBirthday =
        new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );

    if (nextBirthday < today) {

        nextBirthday.setFullYear(
            today.getFullYear() + 1
        );

    }

    let birthdayCountdown =
        Math.ceil(
            (nextBirthday - today) /
            (1000 * 60 * 60 * 24)
        );

        let birthdayMessage = "";

        if (
            today.getDate() === birthDate.getDate() &&
            today.getMonth() === birthDate.getMonth()
        ) {

            birthdayMessage =

            `<div class="birthday-card">

                <h2>🎉 Happy Birthday! 🎂</h2>

                <p>
                    Have a wonderful year ahead! 🎁
                </p>

            </div>`;

        }

    document.getElementById("result").innerHTML =

    `<div class="result-card">

        <div class="result-title">
            🎂 Your Age
        </div>

        <div class="result-value">
            ${years} Years, ${months} Months, ${days} Days
        </div>

    </div>

    <div class="result-card">

        <div class="result-title">
            📊 Age Details
        </div>

        <div class="result-value">

            ${totalMonths} Months, ${totalWeeks} Weeks, ${totalDays} Days, ${totalHours} Hours

        </div>

    </div>

    <div class="result-card">

        <div class="result-title">
            🎉 Next Birthday
        </div>

        <div class="result-value">
            ${birthdayCountdown} Days Remaining
        </div>

    </div>

    <div class="result-card">

        <div class="result-title">
            📅 Born On
        </div>

        <div class="result-value">
            ${weekday}
        </div>

    </div>

    <div class="result-card">

        <div class="result-title">
            ♈ Zodiac Sign
        </div>

        <div class="result-value">
            ${zodiac}
        </div>

    </div>

    <div class="result-card">

        <div class="result-title">
            🕒 Calculated On
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
        
        `Age Calculator
        
        Age:
        ${years} Years
        ${months} Months
        ${days} Days

        Born On:
        ${weekday}

        Zodiac:
        ${zodiac}

        Next Birthday:
        ${birthdayCountdown} Days Remaining

        ${getTimestamp()}`

    );

}

function getZodiacSign(day, month) {

    if ((month == 3 && day >= 21) || (month == 4 && day <= 19))
        return "♈ Aries";

    if ((month == 4 && day >= 20) || (month == 5 && day <= 20))
        return "♉ Taurus";

    if ((month == 5 && day >= 21) || (month == 6 && day <= 20))
        return "♊ Gemini";

    if ((month == 6 && day >= 21) || (month == 7 && day <= 22))
        return "♋ Cancer";

    if ((month == 7 && day >= 23) || (month == 8 && day <= 22))
        return "♌ Leo";

    if ((month == 8 && day >= 23) || (month == 9 && day <= 22))
        return "♍ Virgo";

    if ((month == 9 && day >= 23) || (month == 10 && day <= 22))
        return "♎ Libra";

    if ((month == 10 && day >= 23) || (month == 11 && day <= 21))
        return "♏ Scorpio";

    if ((month == 11 && day >= 22) || (month == 12 && day <= 21))
        return "♐ Sagittarius";

    if ((month == 12 && day >= 22) || (month == 1 && day <= 19))
        return "♑ Capricorn";

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18))
        return "♒ Aquarius";

    return "♓ Pisces";

}