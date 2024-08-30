document.addEventListener("DOMContentLoaded", function() {
    fetch('../header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load Footer
    fetch('../footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

function reveal(thispass) {
  let answer = thispass.getAttribute('data-div')
  var x = document.getElementById(answer);
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
//    document.title = 'Physics Notes: ' + (location.pathname.substring(location.pathname.lastIndexOf("/") + 1)).replace('.html','').replace('-',' ').replace('-',' ').toUpperCase()

document.addEventListener("DOMContentLoaded", function() {
    const breadcrumbContainer = document.querySelector("#breadcrumb");
    const pathArray = window.location.pathname.split("/").filter(e => e);

    // If there is more than one element, assume the last one is the file
    let file = pathArray.length > 1 ? pathArray.pop() : '';
    let breadcrumbHTML = '<nav aria-label="breadcrumb"><ul class="breadcrumb">';

    let pathURL = "";
    pathArray.forEach(function(part, index) {
        pathURL += "/" + part;
        let partFormatted = part.replace(/-/g, ' ');  // Replace dashes with spaces
        breadcrumbHTML += '<li><a href="' + pathURL + '">' + partFormatted.charAt(0).toUpperCase() + partFormatted.slice(1) + '</a></li>';
    });

    // Use the document title as the last breadcrumb item and replace dashes
    if (file) {
        let pageTitle = document.title.replace(/-/g, ' ');  // Replace dashes with spaces
        breadcrumbHTML += '<li>' + pageTitle + '</li>';
    }

    breadcrumbHTML += '</ul></nav>';
    breadcrumbContainer.innerHTML = breadcrumbHTML;
});


document.addEventListener("DOMContentLoaded", function() {
                renderMathInElement(document.body, {
                // customised options
                // • auto-render specific keys, e.g.:
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            // • rendering keys, e.g.:
            throwOnError : false
            });
            });
