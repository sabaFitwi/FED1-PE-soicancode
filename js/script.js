const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

//scroll down animation
const elements = document.querySelectorAll(".scroll-down");
window.addEventListener("scroll", slideUp);
function slideUp() {
  for (var i = 0; i < elements.length; i++) {
    const element = elements[i];
    const distInView =
      element.getBoundingClientRect().top - window.innerHeight + 60;
    if (distInView < 0) {
      element.classList.add("inView");
    } else {
      element.classList.remove("inView");
    }
  }
}
slideUp();
