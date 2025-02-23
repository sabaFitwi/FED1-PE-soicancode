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
      renderPosts(posts);
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

function renderPosts(posts) {
  blogCardWrapper.innerHTML = "";

  if (posts.length > 0) {
    posts.forEach((post) => {
      blogCardWrapper.innerHTML += `<div class="all blogs_card" data-category="${post.tags.join(
        ", "
      )}">
                                      <a href="single-post.html?id=${
                                        post.id
                                      }">
                                        <div class="blogs_card-banner">
                                          <p class="category-tag">${post.tags.join(
                                            ", "
                                          )}</p>
                                          <img
                                          class="banner-img"
                                          src="${post.media.url}"
                                          alt="${post.media.alt}"
                                          />
                                        </div>
                                        <div class="blogs_card-body">
                                          <h2 class="blog-title">${
                                            post.title
                                          }</h2>
                                          <p class="blog-description">${
                                            post.body
                                          }</p>
                                          <a href="single-post.html?id=${
                                            post.id
                                          }" class="link-style-readMore">Read More >></a>
                                        <div class="blogs_card-profile">
                                          <img
                                            class="profile-img"
                                            src="${
                                              post.author?.avatar
                                                ?.url ||
                                              "default-avatar.png"
                                            }"
                                            alt="${
                                              post.author?.avatar
                                                ?.alt ||
                                              "Default Avatar"
                                            }"
                                          />
                                        <div class="blogs_card-profile-info">
                                          <h3 class="profile-name">${
                                            post.author?.name ||
                                            "Unknown Author"
                                          }</h3>
                                          <p class="profile-followers">${
                                            post.author?.bio ||
                                            "No bio available"
                                          }</p>
                                        </div>
                                        </div>
                                        <div class="post-actions">
                                          <button class="update-post" data-id="${
                                            post.id
                                          }">
                                            <i class="fas fa-edit"></i>
                                          </button>
                                          <button class="delete-post" data-id="${
                                            post.id
                                          }">
                                            <i class="fas fa-trash-alt"></i>
                                          </button>
                                        </div>
                                        <p class="post-created" style="display:none;">${
                                          post.created
                                        }</p>
                                        <p class="post-updated" style="display:none;">${
                                          post.updated
                                        }</p>
                                      </div></a>
                                    </div>`;
    });

    // Add event listeners to update and delete buttons
    const updateButtons = document.querySelectorAll(".update-post");
    updateButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const postId = event.target.closest("button").dataset.id;
        window.location.href = `./post/edit.html?id=${postId}`;
      });
    });

    const deleteButtons = document.querySelectorAll(".delete-post");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const postId = event.target.closest("button").dataset.id;
        deletePost(postId);
      });
    });
  } else {
    blogCardWrapper.classList.remove("error");
  }
}

function deletePost(postId) {
  let savedPosts = localStorage.getItem(localStorageKey);
  savedPosts = savedPosts ? JSON.parse(savedPosts) : [];

  const updatedPosts = savedPosts.filter(
    (post) => post.id !== postId
  );

  localStorage.setItem(localStorageKey, JSON.stringify(updatedPosts));

  renderPosts(updatedPosts);
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
      a.querySelector(".post-updated").textContent
    );
    const dateB = new Date(
      b.querySelector(".post-updated").textContent
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
