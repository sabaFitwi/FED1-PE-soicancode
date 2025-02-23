import { displayError } from "./component/displayError.js";

const singleBlogPage = document.querySelector(".single-blog-page");
const title = document.querySelector("title");
const localStorageKey = "data";

function getPost() {
  const savedPosts = localStorage.getItem(localStorageKey);

  if (savedPosts) {
    try {
      let posts = JSON.parse(savedPosts);
      if (!Array.isArray(posts)) {
        posts = [posts];
      }
      getPostDetail(posts);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      singleBlogPage.innerHTML = displayError("Invalid data format.");
      singleBlogPage.classList.add("error");
    }
  } else {
    singleBlogPage.innerHTML = displayError(
      "No posts found in localStorage."
    );
    singleBlogPage.classList.add("error");
  }
}

function getPostDetail(posts) {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const postId = params.get("id");
  const post = posts.find(({ id }) => id == postId);

  if (!post) {
    singleBlogPage.innerHTML = displayError("Post not found.");
    return;
  }

  title.innerHTML = `Tech-Blog | ${post.title}`;

  singleBlogPage.innerHTML = `
    <section class="banner">
      <div style="background-image: url(${
        post.media.url
      })" class="bannerImage" alt="${post.media.alt}"></div>
      <div class="banner__content banner-single-page">
        <h1>${post.title}</h1>
        <div class="article_wrapper">
          <span class="article_author">${post.author.name}</span>
          <span class="article_date">${new Date(
            post.created
          ).toLocaleDateString()}</span>
        </div>
      </div>
    </section>
    <div class="detail_width">    
      <div class="detail-wrapper">
        <div class="detail_page_image left-side">
          <img alt="${post.media.alt}" src="${post.media.url}" />
        </div>
        <p class="detail_blog first-detail-blog-p">${post.body}</p>
        <p class="detail_blog">${post.body}</p>
        <div class="detail_page_image right-side">
          <img alt="${post.media.alt}" src="${post.media.url}" />
        </div>
        <p class="detail_blog first-detail-blog-p">${post.body}</p> 
        <p class="detail_blog">${post.body}</p>   
      </div>
    </div>`;

  createImageResize();
}

function createImageResize() {
  const singlePageImages = document.querySelectorAll(
    ".detail_page_image img"
  );
  const bigImage = document.querySelector(".big-size_image");
  singlePageImages.forEach((image) => {
    image.onclick = function () {
      const bigImageSrc = document.querySelector(
        ".big-size_image img"
      );
      bigImage.style.display = "block";
      bigImageSrc.src = image.getAttribute("src");
    };
  });
  window.addEventListener("mouseup", function (event) {
    const bigImageSrc = document.querySelector(".big-size_image img");
    if (
      event.target != bigImageSrc &&
      event.target.parentNode != bigImageSrc
    ) {
      bigImage.style.display = "none";
    }
  });
}

getPost();
