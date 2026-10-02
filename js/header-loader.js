(function () {

    const path = window.location.pathname;

    // page কি subfolder-এর ভিতরে?
    const parts = path.split("/").filter(Boolean);

    let prefix = "";

    if (parts.includes("calculators")) {

        prefix = "../";

    }

    fetch(prefix + "components/header.html")

        .then(res => {

            if (!res.ok) {

                throw new Error("Header not found");

            }

            return res.text();

        })

        .then(html => {

            const header =
                document.getElementById("header");

            if (!header) return;

            header.innerHTML = html;

            if (typeof initHeader === "function") {

                initHeader();

            }

        })

        .catch(error => {

            console.error(
                "Header Load Failed:",
                
                error
            );

        });

})();