/* ================== Side NAV JQUERY ================== */
let data;
let rec;
let main = document.querySelector('.main');
let allCat;
let searchInputs = document.getElementById('searchInputs');
let selectedItem;

$('#sideNav').click(function() {
        if ($(this).css('left') == '-260px') {
            $(this).animate({left: '0px'}, 100);
            $('.change-icon').removeClass('open-close-icon').addClass('fa-xmark');
        } else {
            $(this).animate({left: '-260px'}, 100);
            $('.change-icon').removeClass('fa-xmark').addClass('open-close-icon');
        }
});


/* ================== API ================== */
async function getMainMeals() {
    let food = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`); 
        data = await food.json();
    disMain()
}
getMainMeals()


/* ========================= ITEMS ON LOAD ========================= */ 
function disMain() {
    allCat = data.meals;
    let item = ``;
    for (let i = 0; i < allCat.length; i++) {
            item+=`
                <div class="col-md-3 border-0">
                    <div class='all-item position-relative overflow-hidden rounded-3' onclick='disMainItem(${i})'>
                        <img src=${allCat[i].strMealThumb} class='w-100' loading="lazy">        
                        <div class='item-data position-absolute px-2 w-100'>
                            <h3>${allCat[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
                `;
            }
            main.innerHTML = item;
        }

/* ========================= ITEMS ON LOAD AFTER CLICK IT ========================= */
function disMainItem(i) {
    main.innerHTML = '';
    selectedItem = allCat[i];
    let measurements = [];
    let ingredients = [];

    for (let prop in selectedItem) {
        if (prop.startsWith("strIngredient") && selectedItem[prop] !== "") {
        ingredients.push(selectedItem[prop]);
        } else if (prop.startsWith("strMeasure") && selectedItem[prop] !== " ") {
        measurements.push(selectedItem[prop]);
        }
    }
    rec = measurements.map((measurement, i) => `${measurement} ${ingredients[i]}`);

    let item = `
                <div class="col-md-4 border-0">
                    <div>
                        <img src=${selectedItem.strMealThumb} class='w-100 rounded-3' loading="lazy">
                        <h2 class='text-light'>${selectedItem.strMeal}</h2>
                    </div>
                </div>
                <div class="col-md-8 border-0">
                    <div class='text-light'>
                        <h2>Instructions</h2>
                        <p>${selectedItem.strInstructions}</p>
                        <h3>Area : <span>${selectedItem.strArea}</span></h3>
                        <h3>Category : <span>${selectedItem.strCategory}</span></h3>
                        <div>
                            <h3>Recipes : </h3>
                            <span>${rec[i]}</span>
                        </div>
                        <h3>Tags :</h3>
                        <ul class='list-unstyled d-flex'>
                            <li class='alert alert-danger m-2 py-1 px-2'></li>
                        </ul>
                        <a href=${selectedItem.strYoutube} class="btn btn-danger">Youtube</a>
                        <a href=${selectedItem.strSource} class="btn btn-success">Youtube</a>
                    </div>
                </div>
                `;
    main.innerHTML = item;
}

function getSearchMood() {
    searchInputs.innerHTML = `
    <div class='row'>
        <div class='col-md-6'>
        <input type="text" placeholder="Search By Name" class='form-control'/>
        </div>
        <div class="col-md-6">
        <input type="text" placeholder="Search By First Name" class='form-control'/>
        </div>
    </div>`
    main.innerHTML = ''
}



/* ========================= BY CATEGORY ========================= */

async function disAllCat() {
    searchInputs.innerHTML = '';
    let food = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let cate = await food.json();
    let allCat = cate.categories;
    let item = ``;
    for (let i = 0; i < allCat.length; i++) {
        item+=`
                <div class="col-md-3">
                <div class='all-item position-relative overflow-hidden rounded-3 cate' onclick='disAllCatFil("${allCat[i].strCategory}")'>
                <img src=${allCat[i].strCategoryThumb} class='w-100' loading="lazy">        
                        <div class='item-data position-absolute px-2 w-100'>
                            <h3 class='mt-3'>${allCat[i].strCategory}</h3>
                            <p>${allCat[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
                `;
            }
            main.innerHTML = item;
}

async function disAllCatFil(cate) {
    let food = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`);
    let cateFil = await food.json();
    let allCat = cateFil.meals;
    let item = ``;
    if (allCat) {
        for (let i = 0; i < allCat.length; i++) {
            item+=`
                    <div class="col-md-3 border-0">
                        <div class='all-item position-relative overflow-hidden rounded-3'>
                            <img src=${allCat[i].strMealThumb} class='w-100' loading="lazy">        
                            <div class='item-data position-absolute px-2 w-100 text-center'>
                                <h3 class='mt-3'>${allCat[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
                    `;
                }
    } else {
        item = `<div>No meals found for this category.</div>`;
    }
    main.innerHTML = item;
}

/* ========================= BY AREA ========================= */

async function disByArea() {
    searchInputs.innerHTML = '';
    let food = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let area = await food.json();
    let allArea = area.meals;
    let item = ``;
    for (let i = 0; i < allArea.length; i++) {
        item+=`
                <div class="col-md-3 border-0">
                    <div class='all-item position-relative overflow-hidden rounded-3 cate text-light m-auto text-center'>
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class='mt-3'>${allArea[i].strArea}</h3>
                    </div>
                </div>
                `;
            }
            main.innerHTML = item;
}


/* ========================= BY Ingredients ========================= */

async function disByIngre() {
    searchInputs.innerHTML = '';
    let food = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let ingre = await food.json();
    let allIngre = ingre.meals;
    let item = ``;
    for (let i = 0; i < allIngre.length; i++) {
        item+=`
                <div class="col-md-3 border-0">
                    <div class='all-item position-relative overflow-hidden rounded-3 cate text-light m-auto text-center'>
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class='mt-3'>${allIngre[i].strIngredient}</h3>
                        <p>${allIngre[i].strDescription}</p>
                    </div>
                </div>
                `;
            }
            main.innerHTML = item;
}