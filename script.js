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
function testBackendConnection() {  // (Render's free tier can take ~30s to wake up)
    fetch('https://recipe-website-group-project-backend.onrender.com/test/')
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            setBackendStatus(true, data.message);
        })
        .catch(error => {
            console.error('Backend connection failed:', error);
            setBackendStatus(false);
        });
}


// ===== Homepage: search, saved recipes, recently viewed =====
// (see bottom of file) 

// Create Page instances for each page in the application
const home = new Page("home");
const recipe_explorer = new Page("recipe_explorer");
const user_recipes = new Page("user_recipes");
const account = new Page("account");

testBackendConnection();

// ===== Homepage features =====
// Saved + recently viewed live in the browser (localStorage), so they work for guests too.
const store = {
    get(key) { try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked: ignore */ } }
};
const TILE_COLORS = ["#DDEBC8", "#FBE3D3", "#E3E9F7", "#F8EBC0", "#E8DDF0", "#D5ECE6"];
const filters = { q: "", goal: "all", price: "any" };
const GOAL_LABELS = { lose: "Lose weight", muscle: "Build muscle", maintain: "Maintain" };
let openRecipeId = null;

function setBackendStatus(ok, message) {
    const el = document.getElementById("backend_status");
    if (!el) return;
    el.textContent = ok ? "Backend connected: " + message : "Backend is not reachable right now (it may be waking up). Refresh in a moment.";
    el.classList.toggle("ok", ok);
    el.classList.toggle("bad", !ok);
}

function isSaved(id) { return store.get("saved").includes(id); }

function cardHTML(r, goto) {
    const saved = isSaved(r.id);
    return `
    <article class="recipe-card" data-card="${r.id}">
        <button type="button" class="card-open" ${goto ? "data-goto" : "data-open"}="${r.id}" aria-label="Open ${r.name}">
            <span class="card-tile" style="background:${TILE_COLORS[r.id % TILE_COLORS.length]}" aria-hidden="true">${r.emoji}</span>
            <span class="card-name">${r.name}</span>
            <span class="card-stats"><b>$${r.price.toFixed(2)}</b> per serving<br>${r.calories} cal, ${r.protein}g protein, ${r.minutes} min</span>
        </button>
        <button type="button" class="save-btn ${saved ? "on" : ""}" data-save="${r.id}" aria-pressed="${saved}" aria-label="${saved ? "Remove" : "Save"} ${r.name}">${saved ? "♥" : "♡"}</button>
    </article>`;
}

function renderList(containerId, list, emptyText) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = list.length ? list.map(r => cardHTML(r)).join("") : `<p class="empty">${emptyText}</p>`;
}

function byIds(ids) { return ids.map(id => RECIPES.find(r => r.id === id)).filter(Boolean); }

function matches(r, q, goal, price) {
    const text = (r.name + " " + r.ingredients.join(" ")).toLowerCase();
    return (!q || text.includes(q.trim().toLowerCase())) &&
           (goal === "all" || r.goals.includes(goal)) &&
           (price === "any" || r.price < Number(price));
}

// A short row of suggestions on the homepage. Clicking one jumps to it in the Explorer.
const FEATURED_IDS = [3, 2, 10, 1];
function renderFeatured() {
    const el = document.getElementById("featured_grid");
    el.innerHTML = byIds(FEATURED_IDS).map(r => cardHTML(r, true)).join("");
}

// Send the person to the Explorer page, with the search/filters filled in.
// If a recipe id is given, that card is scrolled to and highlighted.
function goExplore(opts = {}) {
    const { q = "", goal = "all", price = "any", pick = null } = opts;
    document.getElementById("ex_search").value = q;
    document.getElementById("ex_goal").value = goal;
    document.getElementById("ex_price").value = price;
    document.getElementById("ex_sort").value = "price";
    renderExplorer();
    recipe_explorer.swap();
    const card = pick ? document.querySelector(`#explorer_recipe_holder [data-card="${pick}"]`) : null;
    if (card) {
        card.classList.add("picked");
        card.scrollIntoView({ block: "center", behavior: "smooth" });
    } else {
        window.scrollTo(0, 0);
    }
    resetHero();
}

function resetHero() {
    filters.q = ""; filters.goal = "all"; filters.price = "any";
    document.getElementById("search_input").value = "";
    document.getElementById("price_filter").value = "any";
    document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.goal === "all"));
}

// Explorer page: browse everything. When searching, matches come first and every other recipe is listed below.
function explorerActive() {
    return document.getElementById("ex_search").value.trim() !== "" ||
           document.getElementById("ex_goal").value !== "all" ||
           document.getElementById("ex_price").value !== "any";
}

function renderExplorer() {
    const q = document.getElementById("ex_search").value;
    const goal = document.getElementById("ex_goal").value;
    const price = document.getElementById("ex_price").value;
    const sort = document.getElementById("ex_sort").value;
    const active = explorerActive();
    const sorted = RECIPES.slice().sort((a, b) => sort === "protein" ? b.protein - a.protein : a[sort] - b[sort]);
    const hits = sorted.filter(r => matches(r, q, goal, price));
    const others = sorted.filter(r => !hits.includes(r));

    document.getElementById("ex_clear").classList.toggle("hidden", !active);
    document.getElementById("ex_other_wrap").classList.toggle("hidden", !active || others.length === 0);

    if (!active) {
        document.getElementById("ex_count").textContent = RECIPES.length + " recipes";
        renderList("explorer_recipe_holder", sorted, "");
        return;
    }
    document.getElementById("ex_count").textContent = hits.length + (hits.length === 1 ? " match" : " matches");
    renderList("explorer_recipe_holder", hits, "Nothing matches that. Try a different ingredient or raise the price limit. All recipes are listed below.");
    renderList("ex_other_holder", others, "");
}

// Put the Explorer back to its home view (everything, no search)
function clearExplorer() {
    document.getElementById("ex_search").value = "";
    document.getElementById("ex_goal").value = "all";
    document.getElementById("ex_price").value = "any";
    document.getElementById("ex_sort").value = "price";
    renderExplorer();
    window.scrollTo(0, 0);
}

function renderSaved() {
    const saved = byIds(store.get("saved"));
    renderList("saved_row", saved, "Tap the heart on a recipe to keep it here.");
    renderList("user_recipe_holder", saved, "No saved recipes yet. Find some in the Explorer and tap the heart.");
}

function renderRecent() {
    const recent = byIds(store.get("recent"));
    renderList("recent_row", recent, "Recipes you open will show up here.");
    renderList("user_recent_holder", recent, "Recipes you open will show up here.");
}

function renderAll() { renderFeatured(); renderExplorer(); renderSaved(); renderRecent(); }

function toggleSave(id) {
    let saved = store.get("saved");
    saved = saved.includes(id) ? saved.filter(x => x !== id) : [id, ...saved];
    store.set("saved", saved);
    renderAll();
    if (openRecipeId === id) updateModalSave(id);
}

function updateModalSave(id) {
    const btn = document.getElementById("modal_save");
    btn.textContent = isSaved(id) ? "♥ Saved. Tap to remove" : "♡ Save recipe";
    btn.classList.toggle("on", isSaved(id));
}

function openRecipe(id) {
    const r = RECIPES.find(x => x.id === id);
    if (!r) return;
    openRecipeId = id;
    store.set("recent", [id, ...store.get("recent").filter(x => x !== id)].slice(0, 6));
    document.getElementById("modal_title").textContent = r.emoji + " " + r.name;
    document.getElementById("modal_stats").innerHTML = `<b>$${r.price.toFixed(2)}</b> per serving, ${r.calories} cal, ${r.protein}g protein, ${r.minutes} min<br>Good for: ${r.goals.map(g => GOAL_LABELS[g]).join(", ")}`;
    document.getElementById("modal_ingredients").innerHTML = r.ingredients.map(i => `<li>${i}</li>`).join("");
    document.getElementById("modal_steps").innerHTML = r.steps.map(i => `<li>${i}</li>`).join("");
    updateModalSave(id);
    bootstrap.Modal.getOrCreateInstance(document.getElementById("recipe_modal")).show();
    renderRecent();
}

document.addEventListener("click", (e) => {
    const save = e.target.closest("[data-save]");
    if (save) { toggleSave(Number(save.dataset.save)); return; }
    const open = e.target.closest("[data-open]");
    if (open) { openRecipe(Number(open.dataset.open)); return; }
    const go = e.target.closest("[data-goto]");
    if (go) { goExplore({ pick: Number(go.dataset.goto) }); return; }
    const chip = e.target.closest(".chip");
    if (chip) { goExplore({ goal: chip.dataset.goal, q: document.getElementById("search_input").value, price: document.getElementById("price_filter").value }); }
});
document.getElementById("search_form").addEventListener("submit", (e) => { e.preventDefault(); goExplore({ q: document.getElementById("search_input").value, price: document.getElementById("price_filter").value }); });
document.getElementById("price_filter").addEventListener("change", (e) => { goExplore({ price: e.target.value, q: document.getElementById("search_input").value }); });
["ex_search", "ex_goal", "ex_price", "ex_sort"].forEach(id => {
    document.getElementById(id).addEventListener(id === "ex_search" ? "input" : "change", renderExplorer);
});
document.getElementById("ex_clear").addEventListener("click", clearExplorer);
document.getElementById("clear_recent").addEventListener("click", () => { store.set("recent", []); renderRecent(); });
document.getElementById("modal_save").addEventListener("click", () => { if (openRecipeId) toggleSave(openRecipeId); });

renderAll();
