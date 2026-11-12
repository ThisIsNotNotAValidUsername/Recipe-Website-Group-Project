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

function loadRecipe(destination_id, recipe_name, recipe_ingredients, recipe_instructions, recipe_image) {
    // Get the recipe template and clone it
    const template = document.getElementById("recipe_template");
    const templateClone = template.content.cloneNode(true);

    // Populate the recipe name and image
    templateClone.querySelector(".recipe_image").src = recipe_image;
    templateClone.querySelector(".recipe_name").textContent = recipe_name;

    // Populate the ingredients list
    for (let i = 0; i < recipe_ingredients.length; i++) {
        const ingredient = recipe_ingredients[i];
        const list_item = document.createElement("li");
        list_item.textContent = ingredient;
        templateClone.querySelector(".recipe_ingredients").appendChild(list_item);
    }

    // Populate the instructions list
    for (let i = 0; i < recipe_instructions.length; i++) {
        const instruction = recipe_instructions[i];
        const list_item = document.createElement("li");
        list_item.textContent = instruction;
        templateClone.querySelector(".recipe_instructions").appendChild(list_item);
    }

    // Append the populated template to the destination element
    document.getElementById(destination_id).appendChild(templateClone);
}

/*
Example call, use in browser console to test:
loadRecipe("explorer_recipe_holder", "Pasta", ["Ingredient 1", "Ingredient 2", "Ingredient 3"], ["Instruction 1", "Instruction 2", "Instruction 3"], "source")
*/

// Test backend connection
function testBackendConnection() {
    fetch('https://recipe-website-group-project-backend.onrender.com/test/')
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch(error => {
            console.error('Backend connection failed:', error);
        });
}


// Create Page instances for each page in the application
const home = new Page("home");
const recipe_explorer = new Page("recipe_explorer");
const user_recipes = new Page("user_recipes");
const account = new Page("account");