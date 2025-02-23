import { displayError } from "./component/displayError.js";

const blogCardWrapper = document.querySelector(".blog-wrapper");
const loaderButton = document.querySelector(".button-loadmore");

const localStorageKey = "data";

function loadPostsFromLocalStorage() {
  const savedPosts = localStorage.getItem(localStorageKey);

  if (savedPosts) {
    try {
      let posts = JSON.parse(savedPosts);
      if (!Array.isArray(posts)) {
        posts = [posts];
      }
      generateHtml(posts);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      blogCardWrapper.innerHTML = displayError(
        "Invalid data format."
      );
    }
  } else {
    blogCardWrapper.innerHTML = displayError(
      "No posts found in localStorage."
    );
  }
}

function generateHtml(results) {
  blogCardWrapper.innerHTML = "";

  if (results) {
    results.forEach(function (result) {
      blogCardWrapper.innerHTML += `<div class="all blogs_card" data-category="${result.tags.join(
        ", "
      )}">
                                      <a href="single-post.html?id=${
                                        result.id
                                      }">
                                        <div class="blogs_card-banner">
                                          <p class="category-tag">${result.tags.join(
                                            ", "
                                          )}</p>
                                          <img
                                          class="banner-img"
                                          src="${result.media.url}"
                                          alt="${result.media.alt}"
                                          />
                                        </div>
                                        <div class="blogs_card-body">
                                          <h2 class="blog-title">${
                                            result.title
                                          }</h2>
                                          <p class="blog-description">${
                                            result.body
                                          }</p>
                                          <a href="single-post.html?id=${
                                            result.id
                                          }" class="link-style-readMore">Read More >></a>
                                        <div class="blogs_card-profile">
                                          <img
                                            class="profile-img"
                                            src="${
                                              result.author.avatar.url
                                            }"
                                            alt="${
                                              result.author.avatar.alt
                                            }"
                                          />
                                        <div class="blogs_card-profile-info">
                                          <h3 class="profile-name">${
                                            result.author.name
                                          }</h3>
                                          <p class="profile-followers">${
                                            result.author.bio
                                          }</p>
                                        </div>
                                        </div>
                                      </div></a>
                                    </div>`;
    });
  } else {
    blogCardWrapper.classList.remove("error");
  }
}

// Load posts from localStorage
loadPostsFromLocalStorage();

// Sort by date
const sortButtons = document.querySelectorAll(".sort-button");
sortButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const sortType = event.target.dataset.sort;
    sortPosts(sortType);
  });
});

function sortPosts(sortType) {
  const posts = [...document.querySelectorAll(".blogs_card")];
  posts.sort((a, b) => {
    const dateA = new Date(
      a.querySelector(".post-created").textContent
    );
    const dateB = new Date(
      b.querySelector(".post-created").textContent
    );
    return sortType === "latest" ? dateB - dateA : dateA - dateB;
  });

  blogCardWrapper.innerHTML = "";
  posts.forEach((post) => blogCardWrapper.appendChild(post));
}

let loadMoreBtn = document.querySelector(".button-loadmore button");
let currentPosts = 10;

loadMoreBtn.onclick = () => {
  let postSection = [
    ...document.querySelectorAll(".blog-wrapper .blogs_card"),
  ];

  for (var i = currentPosts; i < currentPosts + 10; i++) {
    if (postSection[i]) {
      postSection[i].style.display = "inline-block";
    }
  }
  currentPosts += 10;

  if (currentPosts >= postSection.length) {
    loadMoreBtn.style.display = "none";
  }
};
