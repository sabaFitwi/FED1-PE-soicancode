document.addEventListener("DOMContentLoaded", () => {
  const editPostForm = document.querySelector("#editPostForm");
  const localStorageKey = "data";

  // Fetch the post data to pre-fill the form
  const postId = new URLSearchParams(window.location.search).get(
    "id"
  ); // Get post ID from URL
  if (!postId) {
    alert("Post ID not found in URL.");
    return;
  }

  // Fetch the post data from localStorage
  const fetchPost = () => {
    const savedPosts = localStorage.getItem(localStorageKey);
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      const post = posts.find((post) => post.id === postId);

      if (post) {
        prefillForm(post); // Pre-fill the form with the post data
      } else {
        alert("Post not found.");
      }
    } else {
      alert("No posts found in localStorage.");
    }
  };

  const prefillForm = (post) => {
    document.getElementById("title").value = post.title || "";
    document.getElementById("body").value = post.body || "";
    document.getElementById("tags").value =
      post.tags?.join(", ") || "";
    document.getElementById("mediaUrl").value = post.media?.url || "";
    document.getElementById("mediaAlt").value = post.media?.alt || "";
  };

  // Handle form submission
  editPostForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Disable the submit button to prevent multiple submissions
    const submitButton = editPostForm.querySelector(
      'button[type="submit"]'
    );
    submitButton.disabled = true;
    submitButton.textContent = "Updating Post...";

    const formData = new FormData(event.target);
    const postData = {
      id: postId,
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
    };

    console.log("Updated Post Data:", postData);

    if (!postData.title) {
      alert("Title is required.");
      submitButton.disabled = false;
      submitButton.textContent = "Update Post";
      return;
    }

    const savedPosts = localStorage.getItem(localStorageKey);
    if (savedPosts) {
      let posts = JSON.parse(savedPosts);
      const postIndex = posts.findIndex((post) => post.id === postId);

      if (postIndex !== -1) {
        posts[postIndex] = postData;

        localStorage.setItem(localStorageKey, JSON.stringify(posts));
        alert("Post updated successfully!");
        location.href = "/blog.html";
      } else {
        alert("Post not found.");
      }
    } else {
      alert("No posts found in localStorage.");
    }

    // Re-enable the submit button
    submitButton.disabled = false;
    submitButton.textContent = "Update Post";
  });

  // Fetch the post data when the page loads
  fetchPost();
});
