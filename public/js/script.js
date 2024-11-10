/////////////////////////////////////////////////
// Set current year

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();

yearEl.textContent = currentYear;

/////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    // Scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }

    // Close the mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

////////////////////////////////////////////////
// Sticky header

window.addEventListener("scroll", function () {
  if (window.scrollY >= 720) {
    document.body.classList.add("sticky");
  } else {
    document.body.classList.remove("sticky");
  }
});

////////////////////////////////////////////////
// Sign up functionality

const signUpBtn = document.getElementById("signupBTN");
const nameEle = document.getElementById("name");
const emailEle = document.getElementById("email");
const whereEle = document.getElementById("where");
const passwdEle = document.getElementById("passwd")
const signUp = async () => {
  console.log("bruh");
  const name = nameEle.value;
  const email = emailEle.value;
  const where = whereEle.value;
  const pass = passwdEle.value


  try {
    if (name && email && where && pass) {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, where , pass}),
      });

      const data = await response.json();
      if (response.ok) {
        alert(typeof data === "string" ? data : JSON.stringify(data.data));
      } else {
        alert("Error: " + data.data);
      }
    } else {
      alert("Enter All Fields");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
};

signUpBtn.addEventListener("click", () => {
  signUp();
});
