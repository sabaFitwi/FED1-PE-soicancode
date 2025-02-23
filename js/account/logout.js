// Function to remove items from localStorage
function remove(key) {
  localStorage.removeItem(key);
}

// Logout function
export const logout = function () {
  remove("token");
  remove("profile");
  remove("name");
  remove("email");
  remove("bio");
  remove("avatarUrl");
  remove("avatarAlt");
  window.location.replace("/index.html");
};

// Add event listener to the logout button
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.querySelector("#logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
});
