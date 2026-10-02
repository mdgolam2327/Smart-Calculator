// ======================================
// SmartCalc Hub Path Engine
// Production Ready
// ======================================

const CURRENT_PATH = window.location.pathname;

const SUB_FOLDERS = [

    "calculators"

];

function getBasePrefix(){

    const parts = CURRENT_PATH.split("/");

    const currentFolder =
        parts[parts.length - 2];

    if(SUB_FOLDERS.includes(currentFolder)){

        return "../";

    }

    return "";

}

// ===============================
// Header Initialization
// ===============================

function initHeader() {

    if(window.headerInitialized){

        return;

    }

    window.headerInitialized = true;

    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (!menuBtn || !closeBtn || !sidebar || !overlay) {
        console.error("Header elements not found.");
        return;
    }

    // Open Sidebar
    menuBtn.addEventListener("click", () => {

        sidebar.classList.add("active");
        overlay.classList.add("active");

        document.body.style.overflow = "hidden";

    });

    // Close Sidebar
    function closeSidebar() {

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

        document.body.style.overflow = "";

    }

    closeBtn.addEventListener("click", closeSidebar);

    overlay.addEventListener("click", closeSidebar);

    // ESC key support
    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            closeSidebar();

        }

    });

    // ==============================
    // Auto Fix Header Links
    // ==============================

    function setupHeaderLinks() {

        const path =
            window.location.pathname;

        const parts =
            path.split("/").filter(Boolean);

        let prefix = "";

        if (parts.includes("calculators")) {

            prefix = "../";

        }

        document
            .querySelectorAll("[data-link]")
            .forEach(link => {

                link.href =
                    prefix +
                    link.dataset.link;

            });

    }

    function setupActiveLink(){

        const currentPage =
            window.location.pathname
            .split("/")
            .pop();

        document
        .querySelectorAll("[data-link]")
        .forEach(link=>{

            const targetPage =
                link.dataset.link
                .split("/")
                .pop();

            if(targetPage===currentPage){

                link.classList.add("active");

            }

        });

    }

    setupHeaderLinks();
    setupActiveLink();

    document
    .querySelectorAll("[data-link]")
    .forEach(link=>{

        link.addEventListener(
            "click",
            function(e){

                const currentPage =
                    window.location.pathname
                    .split("/")
                    .pop();

                const targetPage =
                    link.dataset.link
                    .split("/")
                    .pop();

                if(
                    currentPage===targetPage
                ){

                    e.preventDefault();

                }

                closeSidebar();

            }

        );

    });

}