document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link[data-page]");
    const content = document.getElementById("main-content");

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const page = link.getAttribute("data-page");

            fetch(page)
                .then(res => res.text())
                .then(data => {
                    content.innerHTML = data;
                })
                .catch(err => {
                    content.innerHTML = `<div class="alert alert-danger">Error loading page: ${page}</div>`;
                });
        });
    });
});
