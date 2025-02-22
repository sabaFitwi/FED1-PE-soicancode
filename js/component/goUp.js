const backToTop = document.querySelector("#backToTop");
backToTop.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.onscroll = function () {
  if (window.scrollY > 400) {
    backToTop.style.opacity = 1;
  } else {
    backToTop.style.opacity = 0;
  }
};
