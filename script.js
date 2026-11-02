

const ingredientInput = document.getElementById("ingredientInput");
const addIngredientButton = document.getElementById("addIngredient");
const ingredientList = document.getElementById("ingredientList");

const shoppingInput = document.getElementById("shoppingInput");
const addShoppingButton = document.getElementById("addShopping");
const shoppingList = document.getElementById("shoppingList");

const searchButton = document.getElementById("searchRecipes");
const recipeList = document.getElementById("recipeList");

let ingredients = JSON.parse(localStorage.getItem("ingredients") || "[]");
let shoppingItems = JSON.parse(localStorage.getItem("shoppingItems") || "[]");

// レシピデータ
const recipes = [
  {
    name: "たまごチャーハン",
    ingredients: ["たまご", "ごはん"],
    price: 200,
    time: 10,
    description: "たまごとごはんで作れる簡単メニュー！"
  },
  {
    name: "野菜たっぷりスープ",
    ingredients: ["にんじん", "玉ねぎ", "キャベツ"],
    price: 300,
    time: 20,
    description: "野菜を煮込むだけのあったかスープ！"
  },
  {
    name: "ツナパスタ",
    ingredients: ["パスタ", "ツナ"],
    price: 350,
    time: 15,
    description: "ツナを使ったお手軽パスタ！"
  },
  {
    name: "オムライス",
    ingredients: ["たまご", "ごはん", "玉ねぎ"],
    price: 400,
    time: 25,
    description: "ふわふわたまごの定番メニュー！"
  },
  {
    name: "野菜炒め",
    ingredients: ["キャベツ", "にんじん", "玉ねぎ"],
    price: 250,
    time: 15,
    description: "冷蔵庫の野菜をおいしく活用！"
  }
];

// リスト表示
function showList(items, listElement, storageKey) {
  listElement.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item + " ";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", () => {
      items.splice(index, 1);
      localStorage.setItem(storageKey, JSON.stringify(items));
      showList(items, listElement, storageKey);
    });

    li.appendChild(deleteButton);
    listElement.appendChild(li);
  });
}

// 食材を追加
addIngredientButton.addEventListener("click", () => {
  const ingredient = ingredientInput.value.trim();

  if (!ingredient) {
    alert("食材を入力してね！");
    return;
  }

  ingredients.push(ingredient);
  localStorage.setItem("ingredients", JSON.stringify(ingredients));
  ingredientInput.value = "";
  showList(ingredients, ingredientList, "ingredients");
});

// 買い物リストに追加
addShoppingButton.addEventListener("click", () => {
  const item = shoppingInput.value.trim();

  if (!item) {
    alert("買うものを入力してね！");
    return;
  }

  shoppingItems.push(item);
  localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
  shoppingInput.value = "";
  showList(shoppingItems, shoppingList, "shoppingItems");
});

// レシピ検索
searchButton.addEventListener("click", () => {
  const budget = Number(document.getElementById("budget").value);
  const cookTime = Number(document.getElementById("cookTime").value);

  recipeList.innerHTML = "";

  const matchedRecipes = recipes.filter(recipe => {
    const hasIngredient = recipe.ingredients.some(item =>
      ingredients.includes(item)
    );

    return hasIngredient &&
      recipe.price <= budget &&
      recipe.time <= cookTime;
  });

  if (matchedRecipes.length === 0) {
    recipeList.textContent =
      "条件に合うレシピが見つからなかったよ。食材や条件を変えてみてね！";
    return;
  }

  matchedRecipes.forEach(recipe => {
    const card = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = "🍽️ " + recipe.name;

    const description = document.createElement("p");
    description.textContent = recipe.description;

    const info = document.createElement("p");
    info.textContent =
      "目安：約" + recipe.price + "円 ／ " +
      "調理時間：約" + recipe.time + "分";

    const used = document.createElement("p");
    used.textContent =
      "材料：" + recipe.ingredients.join("、");

    const shoppingButton = document.createElement("button");
    shoppingButton.textContent = "🛒 材料を買い物リストに追加";

    shoppingButton.addEventListener("click", () => {
      const missingIngredients = recipe.ingredients.filter(item =>
        !ingredients.includes(item)
      );

      if (missingIngredients.length === 0) {
        alert("必要な材料は全部登録されているよ！");
        return;
      }

      missingIngredients.forEach(item => {
        if (!shoppingItems.includes(item)) {
          shoppingItems.push(item);
        }
      });

      localStorage.setItem(
        "shoppingItems",
        JSON.stringify(shoppingItems)
      );

      showList(shoppingItems, shoppingList, "shoppingItems");
      alert("買い物リストに追加したよ！");
    });

    card.append(title, description, info, used, shoppingButton);

    // これが抜けていたよ！
    recipeList.appendChild(card);
  });
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => {
        console.log("オフライン機能の準備ができました！");
      })
      .catch((error) => {
        console.log("登録に失敗しました:", error);
      });
  });
}
