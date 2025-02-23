document.addEventListener("DOMContentLoaded", () => {
  const editPostForm = document.querySelector("#editPostForm");
  const localStorageKey = "data";

  const postId = new URLSearchParams(window.location.search).get(
    "id"
  );
  if (!postId) {
    alert("Post ID not found in URL.");
    return;
  }

  const fetchPost = () => {
    const savedPosts = localStorage.getItem(localStorageKey);
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      const post = posts.find((post) => post.id === postId);

      if (post) {
        prefillForm(post);
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
    document.getElementById("authorName").value =
      post.author?.name || "";
    document.getElementById("authorBio").value =
      post.author?.bio || "";
    document.getElementById("authorAvatarUrl").value =
      post.author?.avatar?.url || "";
    document.getElementById("authorAvatarAlt").value =
      post.author?.avatar?.alt || "";
  };

  editPostForm.addEventListener("submit", (event) => {
    event.preventDefault();

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
      author: {
        name: formData.get("authorName"),
        bio: formData.get("authorBio"),
        avatar: {
          url: formData.get("authorAvatarUrl"),
          alt: formData.get("authorAvatarAlt"),
        },
      },
    };

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

    submitButton.disabled = false;
    submitButton.textContent = "Update Post";
  });

  fetchPost();
});
