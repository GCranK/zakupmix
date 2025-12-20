document.addEventListener("DOMContentLoaded", () => {
    const locations = document.querySelectorAll(".location-tab");
    const tabsContainer = document.querySelector(".tabs");
    const categoriesContainer = document.getElementById("categories");
    const productList = document.getElementById("productList");
    const sendButton = document.getElementById("sendData");
    const productsSection = document.getElementById("products");
    const loader = document.getElementById("loader");
    
    loader.style.display = "none";
    let selectedItems = {};
    let currentLocation = localStorage.getItem("selectedLocation") || "shakePear";
    let currentWarehouse = localStorage.getItem("selectedWarehouse") || "bar";

    const products = {
        shakePear: {
            bar: {
                "Фрукты": ["Яблоки", "Апельсины", "Морковь", "Огурцы", "Мандарины", "Имбирь корень"],
                "Овощи": ["Лимон", "Гранат"],
                "Зелень": ["Мята", "Розмарин ветки"],
                "Бакалея": [
                    "Сахар", "Чай чёрный Ahmad english breakfest", "Чай зелёный Ahmad", " Чёрный чай фруктовый пакетики", "Мед", "Мускатный орех",
                    "Черный молотый перец", "Сахарные стики", "Лёд", "Стикеры для доски"
                ],
                "Напитки": [
                    "Адреналин 0.5", "Кола 0.5", "Фанта 0.5", "Спрайт 0.5", "18+ 0.5", "Вода без газа 0.5", "Вода c газом 0.5",
                    "Ред Булл 0.25", "Спрайт 1.5л", "Сок вишня", "Вода 10л"
                ],
                "Канцелярия": ["Бумага А4", "Термобумага для чеков большая", "Термобумага для чеков маленькая", "Стикеры"],
                "Снеки": ["Шоколад Alpen Gold (разные)", "Чокопай", "Орео", "Барни", "Какао"],
                "Специи": ["Кардамон", "Бадьян (звёздочка)", "Палочки корицы", "Гвоздика", "Шалфей", "Зверобой", "Трава Душица", "Шиповник"],
                "Хоз. товары": ["Пакеты для мусора большие", "Жидкое мыло", "Тряпка дельфин", "Тряпка дельфин черная"]
            },
            kitchen: {
                "Мясо": [
                    "Говядина", "Куриные бёдра", "Куриное филе", "Куриная голень", 
                    "Куриные крылышки", "Говяжий фарш", "Индейка", "Копчёная говядина", 
                    "Сосиски", "Копченая колбаса", "Вареная колбаса", "Жир", "Баварские колбаски", "Ветчина", "Тунец", "Крабовые палочки", "Креветки средние"
                ],
                "Фрукты": [
                    "Апельсины", "Яблоки", "Бананы"
                ],
                "Овощи": [
                    "Морковь красная", "Морковь желтая", "Лук", "Лук шалот", "Картошка", "Картофель средний", "Помидоры", "Чеснок чищенный", "Баклажаны",
                    "Дайкон", "Свекла", "Огурцы", "Капуста белая", "Капуста красная", "Капуста пекинская", "Болгарский перец", 
                    "Шампиньоны", "Болгарский светофор красный", "Болгарский светофор зеленый", "Болгарский светофор желтый", "Лимоны", "Черри помидоры", "Редиска", "Редька"
                ],
                "Зелень": [
                    "Латук", "Лолло росса", "Петрушка", "Укроп", "Кинза", "Салат Айсберг", 
                    "Мята", "Руккола", "Розмарин", "Зелёный лук", "Салат чимчи", 
                    "Микро зелень"
                ],
                "Специи": [
                    "Зира", "Орегано", "Чёрный молотый перец", "Кориандр молотый", "Тмин", 
                    "Розмарин сухой", "Горчица", "Сухая кинза", "Лавровый лист", "паприка", "Нохат", "Магиз"
                ],
                "Соуса": [
                    "Чили соус", "Барбекю соус", "Соус сырный", "Бальзамический уксус",
                    "Соус ореховый", "Унаги соус", "Кимчи соус",  "Тобаско", "Лимонный соус 0,5мл"
                ],
                "Крупы": [
                    "Рис лазер", "Рис аланга", "Красная фасоль", "Гречка", "Маш", "Чечевица", 
                    "Феттучини", "Фарфале", "Спагетти", "Макароны рожки", "Макароны спираль", "Перловка"
                ],
                "Хлеб": [
                    "Лепёшки", "Лаваш", "Багет", "Чиабатта", "Булочка для бургера", "Тостерный хлеб", "Тортилья"
                ],
                "Бакалея": [
                    "Яйца", "Перепелиные яйца", "Сахар", "Сахарные кубики", "Соль", "Соль китайская", "Томатная паста", "Кетчуп", 
                    "Майонез", "Сливочное масло", "Щедрое лето маргарин", "Дешевый маргарин", "Оливковое масло", "Фритюрное масло", 
                    "Кунжутное масло", "Сухари панко", 
                    "Томатный сок", "Соя", "Фасоль консервированная", "Кукуруза консервированная",
                    "Красная икра", "Домашняя лапша", "Арахис в глазури", "Пергамент Большой", "Пергамент маленький",
                    "Бамбуковые шпажки", "Джем Клубника", "Джем Малина", "Джем ягодный микс", "Маринованные огурцы",
                    "Галина бланка курица", "Галина бланка говядина", "Chococream Большой", "Chococream маленький", 
                    "Дрожжи ангел", "Маслины", "Оливки", "Мука", "Зеленый горох", "Кукуруза", "Горчица", "Соевый соус"
                ],
                "Молочные продукты": [
                    "Молоко", "Сливки", "Фетакса", "Творог", "Голландский сыр", "Гауда сыр", 
                    "Пармезан", "Виола сыр", "Творожный сыр", "Чиз сыр (пластинки)", "Сыр моцарелла"
                ],
                "Прочее": [
                    "Навват", "Халва", "Курага", "Финики", "Банан сухофрукт", "Сухофрукты",
                    "Орехи", "Арахис", "Киш-миш", "Миндаль", 
                    "Анчоусы", "Отрывные маленькие пакеты"
                ]
            },
            household: {
                "Хоз. товары": [
                    "Гель для посуды", "Перчатки жёлтые большие", "Пакеты для мусора большие",
                    "Пакеты для мусора маленькие (50×65)", "Губки для посуды большие",
                    "Губки для посуды блестящие", "Жидкое мыло", "Азелит",
                    "Тряпки цветные", "Отбеливатель", "Диспенсерки (салфетки)",
                    "Туалетная бумага простая", "Тряпка дельфин"
                ]
            }
    },
    ijodCafe: {
        bar: {
            "Фрукты/овощи": ["Лимон", "Яблоки", "Апельсины", "Морковь", "Огурцы", "Мандарины", "Имбирь корень"],
            "Зелень": ["Мята", "Розмарин ветки"],
            "Бакалея": [
                "Сахар", "Чай чёрный", "Чай зелёный", "Черный чай", "Мед", "Мускатный орех",
                "Черный молотый перец", "Сахар пакетики", "Сахарные стики", "Лёд", "Стикеры для доски"
            ],
            "Напитки": [
                "Адреналин 0.5", "Кола 0.5", "Фанта 0.5", "Спрайт 0.5", "18+ 0.5", "Вода без газа 0.5", "Вода c газом 0.5",
                "Ред Булл 0.25", "Спрайт 1.5л", "Сок в ассортименте", "Вода 10л"
            ],
            "Канцелярия": ["Бумага А4", "Термобумага для чеков большая", "Стикеры"],
            "Снеки": ["Шоколад Alpen Gold (разные)", "Чокопай", "Орео", "Барни", "Какао"],
            "Специи": ["Кардамон", "Бадьян (звёздочка)", "Палочки корицы", "Гвоздика", "Шалфей", "Зверобой", "Трава Душица"],
            "Хоз. товары": ["Пакеты для мусора большие", "Жидкое мыло", "Тряпка дельфин", "Тряпка дельфин черная"]
        },
        kitchen: {
            "Мясо": [
                "Говядина яблочко", "Качалка", "Говядина мякоть", "Куриные бёдра", "Куриное филе", "Куриная голень", "Шапок", 
                "Куриные крылышки", "Говяжий фарш", "Индейка", "Копчёная говядина", 
                "Сосиски", "Колбаса копченая", "Колбаса вареная", "Жир", "Бараний жир", "Баварские колбаски", "Ветчина", "Тунец", "Крабовые палочки", "Креветки средние"
            ],
            "Фрукты": [
                    "Апельсины", "Яблоки", "Бананы"
                ],
            "Овощи": [
                "Морковь красная", "Морковь желтая", "Лук", "Лук шалот", "Картошка", "Картофель средний", "Помидоры", "Чеснок чищенный", "Баклажаны",
                "Дайкон", "Свекла", "Огурцы", "Капуста белая", "Капуста красная", "Капуста пекинская", "Болгарский перец", 
                "Шампиньоны", "Болгарский светофор красный", "Болгарский светофор зеленый", "Болгарский светофор желтый", "Лимоны", "Черри помидоры", "Редиска", "Редька"
                ],
            "Зелень": [
                "Латук", "Лолло росса", "Петрушка", "Укроп", "Кинза", "Салат Айсберг", 
                "Мята", "Руккола", "Розмарин", "Зелёный лук", "Базилик", "Райхон", 
                "Микро зелень"
            ],
                "Специи": [
                    "Зира", "Орегано", "Чёрный молотый перец", "Кориандр молотый", "Тмин", 
                    "Розмарин сухой", "Горчица", "Сухая кинза", "Лавровый лист", "паприка", "Нохат", "Магиз"
                ],
                "Соуса": [
                    "Чили соус", "Барбекю соус", "Соус сырный", "Бальзамический уксус",
                    "Соус ореховый", "Унаги соус", "Кимчи соус",  "Тобаско", "Лимонный соус 0,5мл"
                ],
                "Крупы": [
                    "Рис лазер", "Рис аланга", "Красная фасоль", "Гречка", "Маш", "Чечевица", 
                    "Феттучини", "Фарфале", "Спагетти", "Макароны рожки", "Макароны спираль", "Перловка"
                ],
            "Хлеб": [
                "Лепёшки", "Лаваш", "Багет", "Чиабатта", "Булочка для бургера", "Тостерный хлеб", "Тортилья"
            ],
            "Салаты": [
                "Чимчи", "Капуста ассорти солёные", "Огурцы соленые весовой",
            ],
                "Бакалея": [
                    "Яйца", "Перепелиные яйца", "Сахар", "Сахарные кубики", "Соль", "Соль китайская", "Томатная паста", "Кетчуп", 
                    "Майонез", "Сливочное масло", "Щедрое лето маргарин", "Дешевый маргарин", "Оливковое масло", "Фритюрное масло", 
                    "Кунжутное масло", "Сухари панко", 
                    "Томатный сок", "Соя", "Фасоль консервированная", "Кукуруза консервированная",
                    "Красная икра", "Домашняя лапша", "Арахис в глазури", "Пергамент Большой", "Пергамент маленький",
                    "Бамбуковые шпажки", "Джем Клубника", "Джем Малина", "Джем ягодный микс", "Маринованные огурцы",
                    "Галина бланка курица", "Галина бланка говядина", "Chococream Большой", "Chococream маленький", 
                    "Дрожжи ангел", "Маслины", "Оливки", "Мука", "Зеленый горох", "Кукуруза", "Горчица", "Соевый соус"
                ],
            "Молочные продукты": [
                "Молоко", "Сливки 20%", "Фетакса", "Творог", "Голландский сыр", "Гауда сыр", 
                "Пармезан", "Виола сыр", "Творожный сыр", "Чиз сыр (пластинки)", "Сыр моцарелла", "Сыр сулугуни", "Сгущенка вареная"
            ],
            "Прочее": [
                "Навват", "Халва", "Курага", "Финики", "Банан сухофрукт", "Сухофрукты",
                "Орехи", "Арахис", "Киш-миш", "Миндаль",
                "Анчоусы", "Салат чимчи", "Отрывные маленькие пакеты"
            ]
        },
        household: {
            "Хоз. товары": [
                "Гель для посуды", "Перчатки жёлтые большие", "Пакеты для мусора большие",
                "Пакеты для мусора маленькие (50×65)", "Губки для посуды большие",
                "Губки для посуды блестящие", "Жидкое мыло", "Азелит",
                "Тряпки цветные", "Отбеливатель", "Диспенсерки (салфетки)",
                "Туалетная бумага простая", "Тряпка дельфин"
            ]
        }
    },  
    ilhomBar: {
        bar: {
            "Фрукты/овощи": ["Лимон", "Яблоки", "Апельсины", "Морковь", "Огурцы", "Мандарины", "Имбирь корень"],
            "Зелень": ["Мята", "Розмарин ветки"],
            "Бакалея": [
                "Сахар", "Чай чёрный", "Чай зелёный", "Черный чай", "Мед", "Мускатный орех",
                "Черный молотый перец", "Сахар пакетики", "Сахарные стики", "Лёд", "Стикеры для доски"
            ],
            "Напитки": [
                "Адреналин 0.5", "Кола 0.5", "Фанта 0.5", "Спрайт 0.5", "18+ 0.5", "Вода без газа 0.5", "Вода c газом 0.5",
                "Ред Булл 0.25", "Спрайт 1.5л", "Сок в ассортименте", "Вода 10л"
            ],
            "Канцелярия": ["Бумага А4", "Термобумага для чеков большая", "Стикеры"],
            "Снеки": ["Шоколад Alpen Gold (разные)", "Чокопай", "Орео", "Барни", "Какао"],
            "Специи": ["Кардамон", "Бадьян (звёздочка)", "Палочки корицы", "Гвоздика", "Шалфей", "Зверобой", "Трава Душица"],
            "Хоз. товары": ["Пакеты для мусора большие", "Жидкое мыло", "Тряпка дельфин", "Тряпка дельфин черная"]
        },
    },
    };
    function init() {
       currentLocation = localStorage.getItem("selectedLocation") || "shakePear";
       currentWarehouse = localStorage.getItem("selectedWarehouse") || "bar";
       
       if (!products[currentLocation]) {
           currentLocation = "shakePear";
           localStorage.setItem("selectedLocation", currentLocation);
       }
        
        document.querySelectorAll('.location-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeLocationTab = document.querySelector(`.location-tab[data-location="${currentLocation}"]`);
        if (activeLocationTab) {
            activeLocationTab.classList.add('active');
        }
        
        updateWarehouseTabs(currentLocation);
        updateCategories(currentWarehouse);
    }
    
function handleWarehouseSelect() {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    this.classList.add("active");
    currentWarehouse = this.dataset.warehouse;
    localStorage.setItem("selectedWarehouse", currentWarehouse);
    updateCategories(currentWarehouse);
}
locations.forEach(locationTab => {
    locationTab.addEventListener("click", function() {
        document.querySelectorAll(".location-tab").forEach(t => t.classList.remove("active"));

        currentLocation = this.dataset.location;
        localStorage.setItem("selectedLocation", currentLocation);

        this.classList.add("active");
        
        updateWarehouseTabs(currentLocation);
        
        const warehouses = Object.keys(products[currentLocation]);
        currentWarehouse = warehouses[0];
        localStorage.setItem("selectedWarehouse", currentWarehouse);
        
        updateCategories(currentWarehouse);
    });
});
function updateWarehouseTabs(location) {
    tabsContainer.innerHTML = "";
    
    if (!products[location]) {
        console.error(`Локация ${location} не найдена`);
        return;
    }
    
    const warehouses = Object.keys(products[location]);
    
    warehouses.forEach(wh => {
        const tab = document.createElement("div");
        tab.className = "tab";
        tab.dataset.warehouse = wh;
        tab.innerHTML = `
            <i class="${getWarehouseIcon(wh)}"></i>
            ${wh === "bar" ? "Бар" : wh === "kitchen" ? "Кухня" : "Хоз. часть"}
        `;
        tab.addEventListener("click", handleWarehouseSelect);
        tabsContainer.appendChild(tab);
    });
    
    if (warehouses.length > 0) {
        currentWarehouse = warehouses[0];
        tabsContainer.querySelector(".tab").classList.add("active");
    }
}

    function updateCategories(warehouse) {
        categoriesContainer.innerHTML = "";
        const locationData = products[currentLocation];
        
        if (!locationData) {
            console.error(`Локация не найдена: ${currentLocation}`);
            return;
        }

        const warehouseData = locationData[warehouse];
        if (!warehouseData) {
            console.error(`Склад не найден: ${currentLocation} > ${warehouse}`);
            return;
        }

        Object.keys(warehouseData).forEach(category => {
            const div = document.createElement("div");
            div.classList.add("category");
            div.dataset.category = category;
            div.innerHTML = `<i class="fas fa-box"></i><p>${category}</p>`;
            div.addEventListener("click", () => loadProducts(warehouse, category));
            categoriesContainer.appendChild(div);
        });
    }

    function loadProducts(warehouse, category) {
        productList.innerHTML = "";
        productsSection.classList.remove("hidden");
    
        try {
            const categoryProducts = products[currentLocation]?.[warehouse]?.[category] ?? [];
            
            if (categoryProducts.length === 0) {
                productList.innerHTML = `<li class="empty-message">🚫 Товары в этой категории отсутствуют</li>`;
                return;
            }
    
            const fragment = document.createDocumentFragment();
            
            const unitRules = {
                "кг": ["Мясо", "Фрукты/овощи"],
                "гр": ["Зелень", "Специи", "Крупы"],
                "шт": ["default"]
            };
    
            categoryProducts.forEach(product => {

                let defaultUnit = "шт";
                for (const [unit, categories] of Object.entries(unitRules)) {
                    if (categories.includes(category)) {
                        defaultUnit = unit;
                        break;
                    }
                }

                const savedData = selectedItems[product] || { 
                    quantity: "", 
                    unit: defaultUnit 
                };
    
                const li = document.createElement("li");
                const div = document.createElement("div");
                div.className = "item-container";
    
                const nameSpan = document.createElement("span");
                nameSpan.className = "product-name";
                nameSpan.textContent = product;
    
                const input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.className = "product-input";
                input.value = savedData.quantity;
                input.addEventListener("focus", () => input.value = "");
    
                const select = document.createElement("select");
                select.className = "product-unit";

                ["шт", "кг", "гр", "л", "пач/уп"].forEach(unit => {
                    const option = document.createElement("option");
                    option.value = unit;
                    option.textContent = unit;
                    option.selected = (unit === savedData.unit);
                    select.appendChild(option);
                });

                const updateHandler = () => {
                    saveSelection(
                        product,
                        category,
                        input.value,
                        select.value
                    );
                };
    
                input.addEventListener("input", updateHandler);
                select.addEventListener("change", updateHandler);
    
                div.append(nameSpan, input, select);
                li.appendChild(div);
                fragment.appendChild(li);
            });
    
            productList.appendChild(fragment);
    
        } catch (error) {
            console.error("Ошибка загрузки товаров:", error);
            productList.innerHTML = `<li class="error-message">⚠️ Ошибка загрузки данных</li>`;
        }
    }
    function saveSelection(product, category, quantity, unit) {
        if (quantity > 0) {
            selectedItems[product] = { category, quantity, unit };
        } else {
            delete selectedItems[product];
        }
    }

    sendButton.addEventListener("click", () => {
        const items = Object.keys(selectedItems).map(name => ({
            name,
            category: selectedItems[name].category,
            quantity: selectedItems[name].quantity,
            unit: selectedItems[name].unit
        }));

        if (items.length === 0) {
            alert("⚠️ Вы не выбрали товары!");
            return;
        }

        loader.style.display = "flex";
        const requestBody = {
            location: currentLocation,
            warehouse: currentWarehouse,
            items
        };
        fetch("https://frontend-developer.uz/sendzakup.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ location: currentLocation, warehouse: currentWarehouse, items })
          })
          .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
          })
          .then(data => {
            if (data.status === "success") {
              alert("✅ Заказ отправлен!");
              location.reload();
            } else {
              alert(`❌ Ошибка: ${data.message}`);
            }
          })
          .catch(err => {
            console.error("[FETCH ERROR]", err);
            alert("❌ Ошибка отправки заказа!");
          })
          .finally(() => loader.style.display = "none");
        });

    function getWarehouseIcon(warehouse) {
        const icons = {
            bar: "fas fa-glass-martini-alt",
            kitchen: "fas fa-utensils",
            household: "fas fa-broom"
        };
        return icons[warehouse];
    }

    init();
});




