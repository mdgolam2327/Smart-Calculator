document.addEventListener("DOMContentLoaded", function () {

    // Accordion
    const buttons =
        document.querySelectorAll(".accordion-btn");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const content =
                this.nextElementSibling;

            if (content.style.maxHeight) {

                content.style.maxHeight = null;

            } else {

                content.style.maxHeight =
                    content.scrollHeight + "px";

            }

        });

    });

    // Search
    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            let filter =
                this.value.toLowerCase();

            let accordions =
                document.querySelectorAll(".accordion");

            accordions.forEach(accordion => {

                let content =
                    accordion.querySelector(
                        ".accordion-content"
                    );

                let links =
                    content.querySelectorAll("a");

                let found = false;

                links.forEach(link => {

                    let text =
                        link.textContent.toLowerCase();

                    if (text.includes(filter)) {

                        link.style.display = "block";

                        found = true;

                    } else {

                        link.style.display = "none";

                    }

                });

                if (filter !== "") {

                    if (found) {

                        accordion.style.display =
                            "block";

                        content.style.maxHeight =
                            content.scrollHeight + "px";

                    } else {

                        accordion.style.display =
                            "none";

                    }

                } else {

                    accordion.style.display =
                        "block";

                    content.style.maxHeight =
                        null;

                    links.forEach(link => {

                        link.style.display =
                            "block";

                    });

                }

            });

        });

    }

    // Load Saved Theme
    let savedTheme =
        localStorage.getItem("theme");

    const toggle =
        document.getElementById(
            "themeToggle"
        );

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        if (toggle) {
            toggle.checked = true;
        }

    }

    //Load Calculation History
    loadHistory();

    });

function shareResult() {

    let result =
        document.getElementById("result")
        .innerText;

    if (!result.trim()) {
        alert("Please calculate first");
        return;
    }

    let shareText =
`Result from SmartCalc Hub

${result}

Calculator Link:
${window.location.href}`;

    if (navigator.share) {

        navigator.share({
            title: document.title,
            text: shareText,
            url: window.location.href
        });

    } else {

        navigator.clipboard.writeText(
            shareText
        );

        alert(
            "Sharing not supported. Result copied."
        );
    }

}

function copyResult() {

    let result =
        document.getElementById("result")
        .innerText;

    navigator.clipboard.writeText(result);

    alert("✅ Result Copied Successfully");

}

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}

function downloadPDF() {

    let result =
        document.getElementById("result")
        .innerText;

    if (!result.trim()) {
        alert("Please calculate first");
        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SmartCalc Hub", 20, 20);

    doc.setFontSize(12);

    let lines =
        doc.splitTextToSize(result, 170);

    doc.text(lines, 20, 40);

    doc.save("SmartCalcHub-Result.pdf");
}

function getTimestamp() {

    return new Date().toLocaleString();

}

function saveHistory(result) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "calcHistory"
            )
        ) || [];

    history.unshift(result);

    history = history.slice(0, 10);

    localStorage.setItem(
        "calcHistory",
        JSON.stringify(history)
    );

}

function loadHistory() {

    let history =
        JSON.parse(
            localStorage.getItem(
                "calcHistory"
            )
        ) || [];

    let box =
        document.getElementById(
            "history"
        );

    if (!box) return;

    if (history.length === 0) {

        box.innerHTML =
            "<p>No calculations yet.</p>";

        return;
    }

    box.innerHTML = "";

    history.forEach(item => {

        box.innerHTML +=
        `<div class="history-item">
            ${item}
        </div>`;

    });

}

function clearHistory() {

    localStorage.removeItem(
        "calcHistory"
    );

    loadHistory();

}