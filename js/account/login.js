import { save } from "../../storage/localStorage.js";
const form = document.querySelector("#loginForm");
const url = "https://v2.api.noroff.dev/auth/login";
const apiKey = "9bf37ee1-1a4f-4540-bca8-95e1425579f1";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  async function login(profile) {
    const options = {
      method: "post",
      body: JSON.stringify(profile),
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const profile = await response.json();
        console.log("Login successful:", profile);
        save("token", profile.data.accessToken);
        save("profile", JSON.stringify(profile.data));
        save("name", profile.data.name);

        alert("Login successful!");
        return profile;
      } else {
        console.error("Login failed:", response.statusText);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  login(user);
});
