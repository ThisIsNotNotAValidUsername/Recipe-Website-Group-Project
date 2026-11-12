// Sample recipe data so the homepage works right now.
// Prices are rough per-serving estimates. Later, replace this array with a fetch to the backend
// (e.g. fetch(BACKEND_URL + "/api/recipes/")) and keep the same field names.
const BACKEND_URL = "https://recipe-website-group-project-backend.onrender.com";

const RECIPES = [
    { id: 1, name: "Veggie Egg Fried Rice", emoji: "🍳", price: 1.40, calories: 480, protein: 18, minutes: 20, goals: ["maintain"],
      ingredients: ["1 cup cooked rice (day-old is best)", "2 eggs", "1 cup frozen mixed veggies", "1 tbsp soy sauce", "1 tsp oil"],
      steps: ["Heat the oil in a pan and cook the frozen veggies for 3 minutes.", "Push veggies aside, scramble the eggs in the gap.", "Add the rice and soy sauce, stir everything for 3 to 4 minutes until hot."] },
    { id: 2, name: "Black Bean Burrito Bowl", emoji: "🌯", price: 1.90, calories: 520, protein: 22, minutes: 15, goals: ["muscle", "maintain"],
      ingredients: ["1 cup cooked rice", "1/2 can black beans, drained", "1/4 cup salsa", "1/4 cup shredded cheese", "Handful of corn"],
      steps: ["Warm the beans and corn in the microwave for 90 seconds.", "Spoon over the rice.", "Top with salsa and cheese."] },
    { id: 3, name: "Chicken & Broccoli Stir-Fry", emoji: "🥦", price: 2.60, calories: 410, protein: 38, minutes: 25, goals: ["lose", "muscle"],
      ingredients: ["1 chicken breast, sliced", "2 cups broccoli florets", "1 tbsp soy sauce", "1 clove garlic", "1 tsp oil"],
      steps: ["Cook the chicken in oil over medium-high heat for 6 minutes.", "Add broccoli, garlic and 2 tbsp water, cover for 4 minutes.", "Stir in soy sauce and serve."] },
    { id: 4, name: "Overnight Oats", emoji: "🥣", price: 0.90, calories: 350, protein: 14, minutes: 5, goals: ["maintain", "lose"],
      ingredients: ["1/2 cup rolled oats", "1/2 cup milk", "1/4 cup yogurt", "1 tsp honey", "Banana slices"],
      steps: ["Mix oats, milk, yogurt and honey in a jar.", "Refrigerate overnight.", "Top with banana in the morning."] },
    { id: 5, name: "Tuna Cucumber Salad", emoji: "🥗", price: 1.80, calories: 280, protein: 26, minutes: 10, goals: ["lose"],
      ingredients: ["1 can tuna, drained", "1 cucumber, diced", "1 tbsp Greek yogurt", "Squeeze of lemon", "Salt and pepper"],
      steps: ["Mix tuna, yogurt and lemon in a bowl.", "Fold in the cucumber.", "Season and eat cold."] },
    { id: 6, name: "One-Pot Lentil Soup", emoji: "🍲", price: 1.20, calories: 330, protein: 20, minutes: 35, goals: ["lose", "maintain"],
      ingredients: ["1 cup dry lentils", "1 carrot, diced", "1/2 onion, diced", "3 cups broth or water", "1 tsp cumin"],
      steps: ["Cook onion and carrot in a pot for 4 minutes.", "Add lentils, broth and cumin.", "Simmer for 25 minutes until soft."] },
    { id: 7, name: "Peanut Butter Banana Toast", emoji: "🍌", price: 0.80, calories: 380, protein: 14, minutes: 5, goals: ["maintain"],
      ingredients: ["2 slices whole wheat bread", "2 tbsp peanut butter", "1 banana, sliced", "Pinch of cinnamon"],
      steps: ["Toast the bread.", "Spread peanut butter on both slices.", "Top with banana and cinnamon."] },
    { id: 8, name: "Turkey Taco Skillet", emoji: "🌮", price: 2.40, calories: 450, protein: 35, minutes: 20, goals: ["muscle"],
      ingredients: ["1/4 lb ground turkey", "1/2 can black beans", "2 tbsp taco seasoning", "1/4 cup salsa", "2 tortillas"],
      steps: ["Brown the turkey in a skillet for 6 minutes.", "Stir in seasoning, beans and salsa, cook 4 minutes.", "Serve in warm tortillas."] },
    { id: 9, name: "Sheet-Pan Sausage & Veggies", emoji: "🍠", price: 2.20, calories: 520, protein: 24, minutes: 35, goals: ["maintain"],
      ingredients: ["1 smoked sausage, sliced", "1 sweet potato, cubed", "1 bell pepper, chopped", "1 tbsp oil", "Salt and pepper"],
      steps: ["Heat the oven to 425F (220C).", "Toss everything with oil on a sheet pan.", "Roast for 25 minutes, flipping once."] },
    { id: 10, name: "Greek Yogurt Protein Bowl", emoji: "🍓", price: 1.50, calories: 300, protein: 25, minutes: 3, goals: ["lose", "muscle"],
      ingredients: ["1 cup plain Greek yogurt", "1/2 cup frozen berries", "2 tbsp oats", "1 tsp honey"],
      steps: ["Spoon yogurt into a bowl.", "Top with berries, oats and honey."] },
    { id: 11, name: "Garlic Spinach Pasta", emoji: "🍝", price: 1.30, calories: 560, protein: 16, minutes: 15, goals: ["maintain"],
      ingredients: ["2 oz dry pasta", "2 cloves garlic, sliced", "2 handfuls spinach", "1 tbsp olive oil", "Parmesan"],
      steps: ["Boil the pasta until tender.", "Warm garlic in oil for 1 minute, add spinach until wilted.", "Toss with the pasta and top with parmesan."] },
    { id: 12, name: "Egg & Cheese Breakfast Wrap", emoji: "🥚", price: 1.10, calories: 400, protein: 21, minutes: 8, goals: ["muscle", "maintain"],
      ingredients: ["2 eggs", "1 tortilla", "1 slice cheese", "Salsa (optional)"],
      steps: ["Scramble the eggs in a pan.", "Lay cheese on the warm tortilla and add eggs.", "Fold and eat."] }
];
