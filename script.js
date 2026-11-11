// To the others, feel free to change this at will, just decided I would try and make some sort of template.
function login(guest, email="", password="") {
    // Hide Account and User Recipes buttons if user logs in as a guest
    if (guest) {
        // Currently commented to prevent us from seeing the alt buttons until we have an actual account system in place
        /*
        const account_btn_holder = document.getElementById("account_btn_holder");
        account_btn_holder.classList.add("hidden");
        const user_recipes_btn_holder = document.getElementById("user_recipes_btn_holder");
        user_recipes_btn_holder.classList.add("hidden");
        */
    }
    // Unhide the home page and hide the login page
    const login_page = document.getElementById("login");
    login_page.classList.add("hidden");
    const main_page = document.getElementById("main");
    main_page.classList.remove("hidden");
}

function createAccount(first_name, last_name, email, password) {
    const new_account = new Account(first_name, last_name, email, password);
}

const home = new Page("home");
const recipe_explorer = new Page("recipe_explorer");
const user_recipes = new Page("user_recipes");
const account = new Page("account");