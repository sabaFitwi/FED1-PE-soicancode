document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-post-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const postElement = event.target.closest(".post");
      const postId = postElement.getAttribute("data-post-id");

      if (confirm("Are you sure you want to delete this post?")) {
        try {
          const response = await fetch(
            `https://api.example.com/posts/${postId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                  "token"
                )}`,
              },
            }
          );

          if (response.ok) {
            console.log("Post deleted successfully");
            postElement.remove();
          } else {
            console.error(
              "Failed to delete post:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error during delete:", error);
        }
      }
    });
  });
});
