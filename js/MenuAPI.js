let iconcartspan = document.querySelector('.cart-subscript');
const menuContainer = document.querySelector(".menu-container");
//categories
let categories = [

    "Breakfast",
    "appetizers",
    "thai",
    "Steak",
    "dessert",
    "chicken",
    "seafood",
    "chinese",
    "beverage"
];

//Func render the menu
function renderPillsAndTabs() {
    let pillsDiv = document.getElementById("v-pills-tab");
    let tabsDiv = document.getElementById("pills-tabContent");
    if (categories.length == 0)
        menuContainer.innerHTML = `MENU WILL BE UPDATED SOON`;

    let firstCuisine = categories[0];
    pillsDiv.innerHTML += `<button class="nav-link active" id="v-pills-${firstCuisine}-tab" data-bs-toggle="pill"
                            data-bs-target="#v-pills-${firstCuisine}" type="button" role="tab" aria-controls="v-pills-${firstCuisine}"
                            aria-selected="true">${firstCuisine}</button>`;
    tabsDiv.innerHTML += `<div class="tab-pane fade show active" id="v-pills-${firstCuisine}" role="tabpanel"
                                aria-labelledby="pills-${firstCuisine}-tab" tabindex="0"></div>`;

    for (let i = 1; i < categories.length; i++) {
        pillsDiv.innerHTML += `<button class="nav-link" id="v-pills-${categories[i]}-tab" data-bs-toggle="pill"
                            data-bs-target="#v-pills-${categories[i]}" type="button" role="tab" aria-controls="v-pills-${categories[i]}"
                            aria-selected="true">${categories[i]}</button>`;
        tabsDiv.innerHTML += `<div class="tab-pane fade" id="v-pills-${categories[i]}" role="tabpanel"
                                aria-labelledby="pills-${categories[i]}-tab" tabindex="0"></div>`;
    }
}

renderPillsAndTabs();

// Func get meals by category
async function getMealsByCategory(category) {
    const url = `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.meals || [];
}

// Funct source and name of the dish for category
async function getMealDataByCategory(category) {
    try {
        const meals = await getMealsByCategory(category);
        return meals.map((meal) => ({
            name: meal.strMeal,
            imgSrc: meal.strMealThumb,
            id: meal.idMeal,
        }));
    } catch (error) {
        console.error("Error fetching meals:", error);
        return [];
    }
}

// // Func render meal details
function renderMeals(mealData) {
    return mealData.map(
        (mealDetails) => `
        <div class="col-sm-6 col-xl-4 item">
            <div class="card">
                <div class="card-thumbnail">
                    <div class="black-overlay">
                    	<img src="${mealDetails.imgSrc}" alt="" class="card-img-top">
                    </div>
                    <button class="btn btn-warning add-to-cart-button" data-product-id="${mealDetails.id}" data-product-name="${mealDetails.name}" data-product-price="100" data-product-img-source="${mealDetails.imgSrc}">+ Add to Cart</button>
            	</div>
            	<div class="card-body">
                    <h3>${mealDetails.name}</h3>
                	<p>100฿</p>
                    <div class="star-rating">
                        <button class="star-button" onclick="rateItem(this, 1)"><i class="fas fa-star"></i></button>
                        <button class="star-button" onclick="rateItem(this, 2)"><i class="fas fa-star"></i></button>
                        <button class="star-button" onclick="rateItem(this, 3)"><i class="fas fa-star"></i></button>
                    	<button class="star-button" onclick="rateItem(this, 4)"><i class="fas fa-star"></i></button>
                        <button class="star-button" onclick="rateItem(this, 5)"><i class="fas fa-star"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `
    ); 
}
//Meal data
async function clickHandler(curpage, category) {
    const mealData = await getMealDataByCategory(category);
    const renderedMeals = renderMeals(mealData);
    const mealsToBeDisplayed = renderedMeals.slice(
        (curpage - 1) * 6,
        curpage * 6
    );
    paneToBeRendered = document.getElementById(`v-pills-${category}`);
    paneToBeRendered.innerHTML =
        `<div class = "row g-4">` +
        mealsToBeDisplayed.join("") +
        `</div>` +
        createPagination(curpage, renderedMeals, category);
}

function createPagination(curpage, renderedMeals, category) {
    let n = renderedMeals.length,
        totalPages = Math.ceil(n / 6);
    let navcontent = `<nav><ul class = "pagination justify-content-center">`;
    if (curpage == 1)
        navcontent += `<li><button class="btn btn-primary prev" aria-label="Previous" disabled><i class="fas fa-angle-left"></i></button></li>`;
    else
        navcontent += `<li><button class="btn btn-primary prev" aria-label="Previous" onclick="clickHandler(${
      curpage - 1
    },'${category}')"><i class="fas fa-angle-left"></i></button></li>`;

    if (totalPages <= 1)
        navcontent += `<li><button class="btn active" onclick="clickHandler(1,'${category}')">1</button></li>`;
    else if (totalPages == 2) {
        if (curpage == 1)
            navcontent += `<li><button class="btn active" onclick="clickHandler(1,'${category}')">1</button></li>
					  	<li><button class="btn" onclick="clickHandler(2,'${category}')">2</button></li>`;
        else
            navcontent += `<li><button class="btn" onclick="clickHandler(1,'${category}')">1</button></li>
					  	<li><button class="btn active" onclick="clickHandler(2,'${category}')">2</button></li>`;
    } else {
        if (curpage == 1) {
            navcontent += `<li><button class="btn active" onclick="clickHandler(${curpage},'${category}')">${curpage}</button></li>
				  		<li><button class="btn" onclick="clickHandler(${
                curpage + 1
              },'${category}')">${curpage + 1}</button></li>
						<li><button class="btn" onclick="clickHandler(${curpage + 2},'${category}')">${
        curpage + 2
      }</button></li>`;
        } else if (curpage == totalPages) {
            navcontent += `<li><button class="btn" onclick="clickHandler(${
        curpage - 2
      },'${category}')">${curpage - 2}</button></li>
						<li><button class="btn" onclick="clickHandler(${curpage - 1},'${category}')">${
        curpage - 1
      }</button></li>
						<li><button class="btn active" onclick="clickHandler(${curpage},'${category}')">${curpage}</button></li>`;
        } else {
            navcontent += `<li><button class="btn" onclick="clickHandler(${
        curpage - 1
      },'${category}')">${curpage - 1}</button></li>
				  		<li><button class="btn active" onclick="clickHandler(${curpage},'${category}')">${curpage}</button></li>
						<li><button class="btn" onclick="clickHandler(${curpage + 1},'${category}')">${
        curpage + 1
      }</button></li>`;
        }
    }

    if (curpage == totalPages)
        navcontent += `<li><button class="btn btn-primary next" aria-label="Next" disabled><i class="fas fa-angle-right"></i></button></li>`;
    else
        navcontent += `<li><button class="btn btn-primary next" aria-label="Next" onclick="clickHandler(${
      curpage + 1
    },'${category}')"><i class="fas fa-angle-right"></i></button></li>`;
    navcontent += `</ul></nav>`;
    return navcontent;
}

async function RenderPage() {
    for (category of categories) {
        const mealData = await getMealDataByCategory(category);
        const renderedMeals = renderMeals(mealData);
        const mealsToBeDisplayed = renderedMeals.slice(0, 6);
        const paneToBeRendered = document.getElementById(`v-pills-${category}`);
        paneToBeRendered.innerHTML =
            `<div class = "row g-4">` +
            mealsToBeDisplayed.join("") +
            `</div>` +
            createPagination(1, renderedMeals, category);
        createPagination(1, renderedMeals, paneToBeRendered);
    }
}

RenderPage();

// Func cart items from local storage
function getCartItems() {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
}

// Func set cart items to local storage
function setCartItems(cartItems) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function cartBtn() {
    menuContainer.addEventListener("click", (event) => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains("add-to-cart-button")) {
            const productName = clickedElement.dataset.productName;
            const productImgSource = clickedElement.dataset.productImgSource ;
            const productPrice = clickedElement.dataset.productPrice;

            console.log("dataset", clickedElement.dataset)

            // Get the current cart items
            const cartItems = getCartItems();

            // Check if the item is already in the cart
            const existingCartItem = cartItems.find(
                (item) => item.name === productName
            );

            if (existingCartItem) {
                // If the item is already in the cart, increase the quantity
                existingCartItem.quantity += 1;
            } else {
                // If the item is not in the cart, add it with quantity 1
                cartItems.push({
                    name: productName,
                    imgSrc: productImgSource,
                    quantity: 1,
                    price: productPrice,
                });
            }

            // Save the updated cart items to local storage
            setCartItems(cartItems);

            // Calculate the total quantity of items in the cart
            const totalquantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

            // Update the cart icon subscript
            iconcartspan.innerText = totalquantity;
        }
    });
}

cartBtn();

function filterMenu() {
    const priceFilter = document.getElementById("filter-price").value;
    const menuItems = document.querySelectorAll(".menu-items .item");

    menuItems.forEach((item) => {
        const itemName = item.querySelector("h3").innerText;
        const itemPrice = parseFloat(
            item.querySelector("p").innerText.replace("฿", "")
        );
        let priceMatch = false;

        switch (priceFilter) {
            case "all":
                priceMatch = true;
                break;
            case "0-50":
                priceMatch = itemPrice >= 0 && itemPrice <= 50;
                break;
            case "50-100":
                priceMatch = itemPrice > 50 && itemPrice <= 100;
                break;
            case "100-150":
                priceMatch = itemPrice > 100 && itemPrice <= 150;
                break;
            case "150-200":
                priceMatch = itemPrice > 150 && itemPrice <= 200;
                break;
        }
    })
};
// other category outside mealDB
async function getMealsByCategory(category) {
    if (category.toLowerCase() === 'chinese') {
        return [
            { strMeal: "Kung Pao Chicken", strMealThumb: "Images/chinesefood/image.png", idMeal: "a1" },
            { strMeal: "Mapo Tofu", strMealThumb: "Images/chinesefood/download (3).jpeg", idMeal: "c2" },
            { strMeal: "Dim Sum", strMealThumb: "Images/chinesefood/download (4).jpeg", idMeal: "c3" },
            { strMeal: "Peking Duck", strMealThumb: "Images/chinesefood/download (5).jpeg", idMeal: "c4" },
            { strMeal: "Hot and Sour Soup", strMealThumb: "Images/chinesefood/download (6).jpeg", idMeal: "c5" },
            { strMeal: "Spring Rolls", strMealThumb: "Images/chinesefood/download (7).jpeg", idMeal: "c6" },
        ];
    }
    if (category.toLowerCase() === 'appetizers') {
        return [
            { strMeal: "Mozzarella sticks", strMealThumb: "Images/Appetizers/app1.jpg", idMeal: "c1" },
            { strMeal: "Melon moji", strMealThumb: "Images/Appetizers/app2.jpg", idMeal: "c2" },
            { strMeal: "Springroll", strMealThumb: "Images/Appetizers/app3.png", idMeal: "c3" },
            { strMeal: "Green bean fries", strMealThumb: "Images/Appetizers/app4.2.jpg", idMeal: "c4" },
            { strMeal: "Fries shrimp", strMealThumb: "Images/Appetizers/app5.jpg", idMeal: "c5" },
        ];
    }
 if (category.toLowerCase() === 'beverage') {
            return [
                { strMeal: "Americano", strMealThumb: "Images/Beverages/americano.jpeg", idMeal: "c1" },
                { strMeal: "Coffee", strMealThumb: "Images/Beverages/coffee.jpg", idMeal: "c2" },
                { strMeal: "Expresso", strMealThumb: "Images/Beverages/expresso.jpg", idMeal: "c3" },
                { strMeal: "Latte", strMealThumb: "Images/Beverages/latte.jpg", idMeal: "c4" },
                { strMeal: "Softdrink", strMealThumb: "Images/Beverages/softdrink.jpg", idMeal: "c5" },
                { strMeal: "Smoothie", strMealThumb: "Images/Beverages/Smoothie.jpg", idMeal: "c6" },
            ];
        }
        if (category.toLowerCase() === 'steak') {
            return [
                { strMeal: "Chicken steak", strMealThumb: "Images/steak/ChickenSteak.jpg", idMeal: "c1" },
                { strMeal: "Spicy Chicken Steak", strMealThumb: "Images/steak/spicychicken.jpg", idMeal: "c2" },
                { strMeal: "Pork Chop", strMealThumb: "Images/steak/porkchop.jpg", idMeal: "c3" },
                { strMeal: "Pork Rib-Eye", strMealThumb: "Images/steak/porkrib.jpg", idMeal: "c4" },
                { strMeal: "Ribeye Steaks", strMealThumb: "Images/steak/ribeye.jpg", idMeal: "c5" },
                { strMeal: "T-Bone Steaks", strMealThumb: "Images/steak/Tbone.jpg", idMeal: "c6" },
            ];
        }
        if (category.toLowerCase() === 'thai') {
            return [
                { strMeal: "แกงเขียวหวาน", strMealThumb: "Images/Thai/แกงเขียวหวาน.jpeg", idMeal: "c1" },
                { strMeal: "แกงมัสมั่น", strMealThumb: "Images/Thai/แกงมัสมั่น.jpg", idMeal: "c2" },
                { strMeal: "ข้าวซอย", strMealThumb: "Images/Thai/ข้าวซอย.jpg", idMeal: "c3" },
                { strMeal: "ต้มยำกุ้ง", strMealThumb: "Images/Thai/ต้มยำกุ้ง.jpg", idMeal: "c4" },
                { strMeal: "ผัดไทยกุ้งสด", strMealThumb: "Images/Thai/ผัดไทยกุ้งสด.jpg", idMeal: "c5" },
                { strMeal: "ส้มตำ", strMealThumb: "Images/Thai/ส้มตำ.jpg", idMeal: "c6" },
            ];
        }
     else {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.meals || [];
    }
};
