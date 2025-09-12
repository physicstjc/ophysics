// Add at the top of the file
let firebaseInitialized = false;

// Firebase initialization function
async function initializeFirebase() {
    if (firebaseInitialized) return;
    
    try {
        const firebaseConfig = {
            apiKey: "AIzaSyAw7lB80VMS6O-4A7qoXD03BVEHRNpnFXY",
            authDomain: "ophysics-82e70.firebaseapp.com",
            projectId: "ophysics-82e70",
            storageBucket: "ophysics-82e70.appspot.com",
            messagingSenderId: "369961557546",
            appId: "ophysics-82e70"
        };

        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getAuth, GoogleAuthProvider } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
        const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

        const app = initializeApp(firebaseConfig);
        window.auth = getAuth(app);
        window.db = getFirestore(app);
        window.googleProvider = new GoogleAuthProvider();
        
        firebaseInitialized = true;
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }
}

// Make toggleMenu function globally accessible
function toggleMenu() {
    const menu = document.querySelector('.top-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Make it globally accessible
window.toggleMenu = toggleMenu;

// Add this import at the top
import { initAuthListener } from './auth.js';

document.addEventListener("DOMContentLoaded", function() {
    // Initialize Firebase first
    initializeFirebase();
    
    fetch('../header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // After header is loaded, set up the menu toggle event listener
            const menuIcon = document.querySelector('.menu-icon');
            if (menuIcon) {
                menuIcon.addEventListener('click', toggleMenu);
            }
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load Footer
    fetch('../footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
    
    // Initialize authentication listener
    initAuthListener();
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

    // Function to convert text to Title Case
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    // If there is more than one element, assume the last one is the file
    let file = pathArray.length > 1 ? pathArray.pop() : '';
    let breadcrumbHTML = '<nav aria-label="breadcrumb"><ul class="breadcrumb">';

    let pathURL = "";
    pathArray.forEach(function(part, index) {
        pathURL += "/" + part;
        let partFormatted = toTitleCase(part.replace(/-/g, ' '));  // Replace dashes with spaces and convert to Title Case
        breadcrumbHTML += '<li><a href="' + pathURL + '">' + partFormatted + '</a></li>';
    });

    // Use the document title as the last breadcrumb item and replace dashes
    if (file) {
        let pageTitle = toTitleCase(document.title.replace(/-/g, ' '));  // Replace dashes with spaces and convert to Title Case
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

function toggleMenu() {
        var menu = document.querySelector('.top-menu');
        menu.classList.toggle('responsive');
}

const accordions = document.getElementsByClassName("accordion");

for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

        function updateProgressBar() {
            const progressBar = document.getElementById('progress-bar');
            const total = problems.length;
            let completed = 0;
            attemptedProblems.forEach(problem => {
                if (problem) completed++;
            });
            const percentage = Math.round((completed / total) * 100);
            progressBar.style.width = `${percentage}%`;
            progressBar.innerText = `${percentage}% Completed`;
        }
