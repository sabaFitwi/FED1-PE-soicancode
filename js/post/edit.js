document.addEventListener("DOMContentLoaded", () => {
  const editPostForm = document.querySelector("#editPostForm");
  const url = "https://v2.api.noroff.dev/blog/posts"; // Replace with your actual API endpoint
  const apiKey = "9bf37ee1-1a4f-4540-bca8-95e1425579f1"; // Your API key
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXplYl9zYW0iLCJlbWFpbCI6ImF6aXNhbUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc0MDIzNTU2MH0.DukCSjk2MEYxw3z4RSJHqYa20ZJ14iL7UeQ3fEa2nic"; // Manually added token

  // Fetch the post data to pre-fill the form
  const postId = new URLSearchParams(window.location.search).get(
    "id"
  ); // Get post ID from URL
  if (!postId) {
    alert("Post ID not found in URL.");
    return;
  }

  // Fetch the post data
  const fetchPost = async () => {
    try {
      const response = await fetch(`${url}/${postId}`, {
        headers: {
          "X-Noroff-API-Key": apiKey,
          Authorization: token,
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch post data."
        );
      }

      const post = result.data; // Assuming the API returns the post data in `data`
      prefillForm(post); // Pre-fill the form with the post data
    } catch (error) {
      console.error("Error fetching post:", error);
      alert(error.message);
    }
  };

  // Pre-fill the form with the post data
  const prefillForm = (post) => {
    document.getElementById("title").value = post.title || "";
    document.getElementById("body").value = post.body || "";
    document.getElementById("tags").value =
      post.tags?.join(", ") || "";
    document.getElementById("mediaUrl").value = post.media?.url || "";
    document.getElementById("mediaAlt").value = post.media?.alt || "";
  };

  // Handle form submission
  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Disable the submit button to prevent multiple submissions
    const submitButton = editPostForm.querySelector(
      'button[type="submit"]'
    );
    submitButton.disabled = true;
    submitButton.textContent = "Updating Post...";

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

    console.log("Updated Post Data:", postData);

    // Validate required fields
    if (!postData.title) {
      alert("Title is required.");
      submitButton.disabled = false;
      submitButton.textContent = "Update Post";
      return;
    }

    try {
      const response = await fetch(`${url}/${postId}`, {
        method: "PUT", // Use PUT or PATCH depending on your API
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
          result.message || "Failed to update post. Please try again."
        );
      }

      alert("Post updated successfully!");
      location.href = "/posts.html"; // Redirect to the posts page (or any other page)
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = "Update Post";
    }
  });

  // Fetch the post data when the page loads
  fetchPost();
});
