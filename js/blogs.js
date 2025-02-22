import { displayError } from "./component/displayError.js";

const blogCardWrapper = document.querySelector(".blog-wrapper");
const loaderButton = document.querySelector(".button-loadmore");

const url =
  "https://v2.api.noroff.dev/blog/posts/9bf37ee1-1a4f-4540-bca8-95e1425579f1";

async function getPost(baseUrl) {
  blogCardWrapper.innerHTML = `<div class="loader"></div>`;

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    generateHtml(data.data); // Pass the data array to generateHtml
  } catch (error) {
    console.error("Error fetching posts:", error);
    blogCardWrapper.innerHTML = displayError(
      "An error occurred. Please try again"
    );

    blogCardWrapper.classList.add("error");
    loaderButton.style.display = "none";
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

getPost(url);

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
