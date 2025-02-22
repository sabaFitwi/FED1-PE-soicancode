import { displayError } from "./component/displayError.js";

const postContainer = document.querySelector(".content");
const apiKey = "9bf37ee1-1a4f-4540-bca8-95e1425579f1";
const url = `https://v2.api.noroff.dev/blog/posts/${apiKey}`;

async function getPost() {
  postContainer.innerHTML = `<div class="loader"></div>`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Noroff-API-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    generateHtml(data);
    console.log("Blog Post Data:", data);
  } catch (error) {
    console.error("Fetch Error:", error);
    postContainer.innerHTML = displayError(
      "An error occurred. Please try again"
    );
    postContainer.classList.add("error");
  }
}

function generateHtml(results) {
  postContainer.innerHTML = "";

  if (results.length > 0) {
    results.forEach((result) => {
      postContainer.innerHTML += `
        <div class="all blogs_card item">       
          <div class="blogs_card-banner">
            <img class="banner-img" src="${result.media.url}" alt="${
        result.media.alt || "Blog Image"
      }" />
          </div>
          <div class="blogs_card-body">
            <h2 class="blog-title">${result.title}</h2>
            <p class="blog-description">${result.body}</p>
            <p class="blog-tags">${result.tags.join(", ")}</p>
            <a href="single-post.html?id=${
              result.id
            }" class="link-style-readMore">Read More >></a>
          </div>
        </div>`;
    });
  } else {
    postContainer.innerHTML = displayError("No blog posts found.");
  }
}

getPost();

// ----- Carousel Scroll -----
const flexGap = 16;
const slider = document.querySelector(".slider"),
  content = document.querySelector(".content"),
  right = document.querySelector("#right"),
  left = document.querySelector("#left");

let width = slider.offsetWidth;

left.addEventListener("click", () => {
  slider.scrollBy(-(width + flexGap), 0);
  if (slider.scrollLeft - width - flexGap <= 0) {
    left.style.display = "none";
  }
  if (
    !content.scrollWidth - width - flexGap <=
    slider.scrollLeft + width
  ) {
    right.style.display = "flex";
  }
});

right.addEventListener("click", () => {
  slider.scrollBy(width + flexGap, 0);
  if (slider.scrollWidth !== 0) {
    left.style.display = "flex";
  }
  if (
    content.scrollWidth - width - flexGap <=
    slider.scrollLeft + width
  ) {
    right.style.display = "none";
  }
});

window.addEventListener("resize", () => (width = slider.offsetWidth));

// ----- Text Typing Effect -----
const texts = ["Innovate", "Explore", "Disrupt"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function type() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  document.querySelector(
    ".banner__content .text-typing"
  ).textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
  }
  setTimeout(type, 500);
}

type();
