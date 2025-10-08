
// Waits for the DOM to load before running
document.addEventListener("DOMContentLoaded", () => {
  // Loads the navbar.html with a http request
  fetch("/navbar.html")
    // Extracts the html and returns plain text
    .then(nav => nav.text())
    // Takes the plain HTML text and inserts it into the page
    .then(html => {
      document.getElementById("navbar").innerHTML = html;

      // Highlight current page
      // Gets current url but takes away the "main domain" and removes "/" (index.html)
      const currentPage = window.location.pathname.split("/").pop();
      console.log(currentPage);
      // Selects all links inside the list
      document.querySelectorAll(".navbar a").forEach(link => {
        //takes the path inside of the <a> tag and removes "\" in the beginning so it matches currentPage
        let href = link.getAttribute("href").slice(1);
        //Adds a class to the <a> tagg that has the same href as the currentPage
        if (href === currentPage) {
          link.classList.add("active");
        }
      });
    });
});
