const postContainer = document.querySelector(".content");
const localStorageKey = "data";

function loadPosts() {
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
      postContainer.innerHTML = displayError("Invalid data format.");
    }
  } else {
    postContainer.innerHTML = displayError(
      "No posts found in localStorage."
    );
  }
}

function renderPosts(posts) {
  postContainer.innerHTML = "";
  if (posts.length > 0) {
    posts.forEach((post) => {
      postContainer.innerHTML += `
        <div class="all blogs_card item">       
          <div class="blogs_card-banner">
            <img class="banner-img" src="${
              post.media?.url || "default.jpg"
            }" 
                 alt="${post.media?.alt || "Blog Image"}" />
          </div>
          <div class="blogs_card-body">
            <h2 class="blog-title">${post.title}</h2>
            <p class="blog-description">${
              post.body || "No content available."
            }</p>
            <p class="blog-tags">${
              post.tags ? post.tags.join(", ") : "No tags"
            }</p>
            <a href="single-post.html?id=${
              post.id
            }" class="link-style-readMore">Read More >></a>
          </div>
        </div>`;
    });
  } else {
    postContainer.innerHTML = displayError(
      "No blog posts available."
    );
  }
}

function savePost(newPost) {
  let savedPosts = localStorage.getItem(localStorageKey);

  // Ensure parsed data is an array
  try {
    savedPosts = savedPosts ? JSON.parse(savedPosts) : [];
    if (!Array.isArray(savedPosts)) {
      savedPosts = [];
    }
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    savedPosts = [];
  }

  // Add new post
  savedPosts.push(newPost);

  // Save back to localStorage
  localStorage.setItem(localStorageKey, JSON.stringify(savedPosts));

  // Refresh the displayed posts
  renderPosts(savedPosts);
}

document
  .querySelector("#createPostBtn")
  ?.addEventListener("click", () => {
    const newPost = {
      id: Date.now().toString(),
      title: "New Blog Post",
      body: "This is a sample post.",
      tags: ["sample", "test"],
      media: { url: "default.jpg", alt: "Sample Image" },
    };

    savePost(newPost);
  });

loadPosts();

const flexGap = 16;

const slider = document.querySelector(".slider"),
  content = document.querySelector(".content"),
  right = document.querySelector("#right"),
  left = document.querySelector("#left");

left.addEventListener("click", (e) => {
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

right.addEventListener("click", (e) => {
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

let width = slider.offsetWidth;
window.addEventListener(
  "resize",
  (e) => (width = slider.offsetWidth)
);
