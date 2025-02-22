const createPostForm = document.querySelector("#createPostForm");
const url = "https://v2.api.noroff.dev/blog/posts";
const apiKey = "9bf37ee1-1a4f-4540-bca8-95e1425579f1"; // Your API key

createPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Retrieve the token from local storage
  const token = `Bearer ${localStorage.getItem("token")}`;

  // Disable the submit button to prevent multiple submissions
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
      .map((tag) => tag.trim()), // Convert tags to an array
    media: {
      url: formData.get("mediaUrl"),
      alt: formData.get("mediaAlt"),
    },
  };

  console.log("Post Data:", postData);

  // Validate required fields
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
        "X-Noroff-API-Key": apiKey,
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

    // Extract the post ID and other details from the response
    const { id, title, body, tags, media, created, updated, author } =
      result.data;
    console.log("Post ID:", id);

    // Render the post details (example)
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
    `;
    postContainer.appendChild(postElement);

    alert("Post created successfully!");
    location.href = "/index.html"; // Redirect to the posts page (or any other page)
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  } finally {
    // Re-enable the submit button
    submitButton.disabled = false;
    submitButton.textContent = "Create Post";
  }
});
