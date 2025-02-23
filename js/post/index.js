const createPostForm = document.querySelector("#createPostForm");
const userName = localStorage.getItem("name");

const url = `https://v2.api.noroff.dev/blog/posts/${userName}`;

createPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = `Bearer ${localStorage.getItem("token")}`;

  const submitButton = createPostForm.querySelector(
    'button[type="submit"]'
  );
  submitButton.disabled = true;
  submitButton.textContent = "Creating Post...";

  const formData = new FormData(event.target);
  const postData = {
    title: formData.get("title"),
    body: formData.get("body"),
    tags: formData
      .get("tags")
      .split(",")
      .map((tag) => tag.trim()),
    media: {
      url: formData.get("mediaUrl"),
      alt: formData.get("mediaAlt"),
    },
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    author: {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      bio: localStorage.getItem("bio"),
      avatar: {
        url: localStorage.getItem("avatarUrl"),
        alt: localStorage.getItem("avatarAlt"),
      },
    },
  };

  console.log("Post Data:", postData);

  if (!postData.title) {
    alert("Title is required.");
    submitButton.disabled = false;
    submitButton.textContent = "Create Post";
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to create post. Please try again."
      );
    }

    const { id, title, body, tags, media, created, updated, author } =
      result.data;
    console.log("Post ID:", id);

    const postContainer = document.querySelector("#postContainer");
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.setAttribute("data-post-id", id);
    postElement.innerHTML = `
      <h2 class="post-title">${title}</h2>
      <p class="post-body">${body}</p>
      <p class="post-tags">${tags.join(", ")}</p>
      <img src="${media.url}" alt="${media.alt}" class="post-media">
      <p class="post-author">By: ${author.name}</p>
      <p class="post-created">Created: ${new Date(
        created
      ).toLocaleString()}</p>
      <p class="post-updated">Updated: ${new Date(
        updated
      ).toLocaleString()}</p>
      <p class="post-id">Post ID: ${id}</p>
    `;
    postContainer.appendChild(postElement);

    alert("Post created successfully!");
    location.href = "/index.html";
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  } finally {
    // Re-enable the submit button
    submitButton.disabled = false;
    submitButton.textContent = "Create Post";
  }
});
