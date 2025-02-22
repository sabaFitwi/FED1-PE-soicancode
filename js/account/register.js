const form = document.querySelector("#registerForm");
const url = "https://v2.api.noroff.dev/auth/register";
const apiKey = "9bf37ee1-1a4f-4540-bca8-95e1425579f1";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const userData = Object.fromEntries(formData.entries());

  console.log("User Data:", userData);

  if (!userData.name || !userData.email || !userData.password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
        //Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });

    const result = await response.json();
    console.log("API Response:", result);
    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    if (!result.accessToken) {
      throw new Error("No accessToken received!");
    }

    localStorage.setItem("token", result.accessToken);
    alert("Registration successful!");
    location.href = "/login.html";
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
});
