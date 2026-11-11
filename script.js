const home = new Page("home");
const recipe_explorer = new Page("recipe_explorer");
const user_recipes = new Page("user_recipes");
const account = new Page("account");

//save user info *DONT CHANGE*
document.getElementById("save_account").addEventListener("click", function() {
    let username = document.getElementById("username").value;
    let goal = document.getElementById("fitness_goal").value;

    localStorage.setItem("username", username);
    localStorage.setItem("fitness_goal", goal);

    document.getElementById("save_message").textContent = "Settings Saved!";
});

// Load saved settings when website opens
document.getElementById("username").value = localStorage.getItem("username") || "";
document.getElementById("fitness_goal").value = localStorage.getItem("fitness_goal") || "maintenance";
