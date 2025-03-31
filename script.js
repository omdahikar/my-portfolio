document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
            closeMobileMenu();
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    const highlightNav = () => {
        let current = "";
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href").substring(1) === current);
        });
    };
    window.addEventListener("scroll", highlightNav);

    // Close menu when clicking on links
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });
    
    // Form submission handling
    const form = document.querySelector(".contact-form");
    form.addEventListener("submit", sendEmail);

    // Show login modal when clicking "Get in Touch" or "Contact Me"
    document.querySelectorAll(".cta-button, a[href='#connect']").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            if (!sessionStorage.getItem("userEmail")) {
                document.getElementById("loginModal").style.display = "flex";
            } else {
                document.getElementById("connectContent").style.display = "block";
                document.getElementById("connect").scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Handle login
    document.getElementById("loginForm").addEventListener("submit", handleLogin);

    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        if (password === "connect123") {
            sessionStorage.setItem("userEmail", email);
            document.getElementById("loginModal").style.display = "none";
            document.getElementById("connectContent").style.display = "block";
            document.getElementById("connect").scrollIntoView({ behavior: "smooth" });
        } else {
            document.getElementById("loginMessage").textContent = "Invalid credentials";
        }
    }

    // Email function
    function sendEmail(e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const message = document.getElementById("message").value.trim();
        const userEmail = sessionStorage.getItem("userEmail") || "No email provided";

        if (!name || !message) {
            alert("Please fill in all fields before sending the message.");
            return;
        }

        const mailtoLink = `mailto:omdahikar36@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`
        )}`;

        window.location.href = mailtoLink;
        form.reset();
        alert("Thank you for your message! Opening your email client...");
    }

    // Close login modal
    document.querySelector(".close-btn").addEventListener("click", () => {
        document.getElementById("loginModal").style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === document.getElementById("loginModal")) {
            document.getElementById("loginModal").style.display = "none";
        }
    });

    // Check login status on page load
    if (sessionStorage.getItem("userEmail")) {
        document.getElementById("connectContent").style.display = "block";
    }
});
