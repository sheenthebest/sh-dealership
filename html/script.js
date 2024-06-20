document.addEventListener("DOMContentLoaded", () => {
    const dealershipUI = document.getElementById("dealership-ui");
    const categoryList = document.getElementById("category-list");
    const vehicleList = document.getElementById("vehicle-list");
    const searchContainer = document.getElementById("search-container");
    const filtersContainer = document.getElementById("filters-container");
    const searchInput = document.getElementById("search");
    const orderSelect = document.getElementById("order");
    const backButton = document.getElementById("back");
    const container = document.querySelector(".container");
    const body = document.querySelector("body");

    const vehicleModal = document.getElementById("vehicle-modal");
    const closeButton = document.querySelector(".close-button");
    const confirmPurchaseButton = document.getElementById("confirm-purchase");
    const vehicleNameElement = document.getElementById("vehicle-name");
    const vehicleImageElement = document.getElementById("vehicle-image");
    const vehiclePriceElement = document.getElementById("vehicle-price");
    const colorInput = document.getElementById("color");
    const engineSelect = document.getElementById("engine");
    const suspensionSelect = document.getElementById("suspension");
    const turboCheckbox = document.getElementById("turbo");

    let currentCategory = null;
    let selectedVehicle = null;

    const fadeIn = (element) => {
        element.style.opacity = 0;
        element.classList.remove("hidden");
        requestAnimationFrame(() => {
            element.style.transition = "opacity 0.5s ease-in-out, transform 0.5s";
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        });
    };

    const fadeOut = (element) => {
        element.style.transition = "opacity 0.5s ease-in-out, transform 0.5s";
        element.style.opacity = 0;
        element.style.transform = "translateY(20px)";
        setTimeout(() => {
            element.classList.add("hidden");
        }, 500);
    };

    const loadCategories = () => {
        clearCategories();
        const fragment = document.createDocumentFragment();
        categories.forEach(category => {
            const categoryCard = document.createElement("div");
            categoryCard.className = "category-card fade-in-card";
            categoryCard.innerHTML = `
                <img src="images/categories/${category.image}.png" alt="${category.name}" class="loading">
                <h2>${category.name}</h2>
            `;
            categoryCard.querySelector('img').addEventListener('load', () => {
                categoryCard.querySelector('img').classList.remove('loading');
            });
            categoryCard.addEventListener("click", () => {
                currentCategory = category.name;
                fadeOut(categoryList);
                setTimeout(() => {
                    showVehicles(category.name);
                    fadeIn(vehicleList);
                    searchContainer.classList.remove("hidden");
                    filtersContainer.classList.remove("hidden");
                    backButton.style.display = 'block';
                }, 500);
            });
            fragment.appendChild(categoryCard);
        });
        categoryList.appendChild(fragment);
        fadeIn(categoryList);
    };

    const clearCategories = () => {
        categoryList.innerHTML = '';
    };

    const showVehicles = (categoryName) => {
        const filteredCars = cars.filter(car => car.category === categoryName);
        displayVehicles(filteredCars);
    };

    const displayVehicles = (vehicleArray) => {
        vehicleList.innerHTML = '';
        const fragment = document.createDocumentFragment();
        vehicleArray.forEach(car => {
            const vehicleCard = document.createElement("div");
            vehicleCard.className = "vehicle-card fade-in-card";
            vehicleCard.innerHTML = `
                <img src="images/vehicles/${car.image}.png" alt="${car.name}" class="loading">
                <h2>${car.name}</h2>
                <p>Price: $${car.price}</p>
                <button class="buy-button"><i class="fas fa-shopping-cart"></i> Buy Vehicle</button>
                <button class="test-drive-button"><i class="fas fa-car"></i> Test Drive</button>
            `;
            vehicleCard.querySelector('img').addEventListener('load', () => {
                vehicleCard.querySelector('img').classList.remove('loading');
            });
            fragment.appendChild(vehicleCard);

            vehicleCard.querySelector('.buy-button').addEventListener('click', () => {
                selectedVehicle = car;
                openModal(car);
            });

            vehicleCard.querySelector('.test-drive-button').addEventListener('click', () => {
                $.post(`https://${GetParentResourceName()}/TEST_DRIVE`, JSON.stringify(car));
            });
        });
        vehicleList.appendChild(fragment);
        fadeIn(vehicleList);
    };

    const openModal = (car) => {
        vehicleNameElement.textContent = car.name;
        vehicleImageElement.src = `images/vehicles/${car.image}.png`;
        vehiclePriceElement.textContent = `Price: $${car.price}`;
        vehicleModal.classList.remove("hidden");
    };

    const closeModal = () => {
        vehicleModal.classList.add("hidden");
    };

    const animateSearchAndFilter = () => {
        vehicleList.classList.add('fade-out');
        setTimeout(() => {
            vehicleList.classList.remove('fade-out');
            vehicleList.classList.add('fade-in');
        }, 500);
    };

    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    };

    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
        };
    };

    const handleSearchInput = () => {
        const query = searchInput.value.toLowerCase();
        const filteredCars = cars.filter(car => car.category === currentCategory && car.name.toLowerCase().includes(query));
        displayVehicles(filteredCars);
        animateSearchAndFilter();
    };

    const handleOrderSelect = () => {
        const sortedCars = cars.filter(car => car.category === currentCategory).sort((a, b) => {
            switch (orderSelect.value) {
                case "low_price": return a.price - b.price;
                case "high_price": return b.price - a.price;
                case "a_to_z": return a.name.localeCompare(b.name);
                case "z_to_a": return b.name.localeCompare(a.name);
            }
        });
        displayVehicles(sortedCars);
        animateSearchAndFilter();
    };

    searchInput.addEventListener("input", debounce(handleSearchInput, 300));
    orderSelect.addEventListener("change", handleOrderSelect);

    backButton.addEventListener("click", () => {
        fadeOut(vehicleList);
        setTimeout(() => {
            currentCategory = null;
            searchContainer.classList.add("hidden");
            filtersContainer.classList.add("hidden");
            backButton.style.display = 'none';
            searchInput.value = '';
            fadeIn(categoryList);
        }, 500);
    });

    closeButton.addEventListener("click", closeModal);

    confirmPurchaseButton.addEventListener("click", () => {
        closeModal();
        hideUI();
        $.post(`https://${GetParentResourceName()}/CLOSE_UI`);

        const purchaseData = {
            vehicle: selectedVehicle,
            configuration: {
                color: hexToRgb(colorInput.value),
                engine: engineSelect.value,
                suspension: suspensionSelect.value,
                turbo: turboCheckbox.checked
            }
        };

        $.post(`https://${GetParentResourceName()}/BUY_VEHICLE`, JSON.stringify(purchaseData));
    });

    const showUI = () => {
        body.classList.remove("hidden");
        setTimeout(() => {
            dealershipUI.classList.remove("hidden");
            container.classList.remove("hidden");
            setTimeout(() => {
                container.style.transition = "transform 0.5s ease-in-out";
                container.style.transform = "translateY(0)";
                setTimeout(loadCategories, 500);
            }, 100);
        }, 50);
    };

    const hideUI = () => {
        container.style.transform = "translateY(100vh)";
        setTimeout(() => {
            container.classList.add("hidden");
            dealershipUI.classList.add("hidden");
            body.classList.add("hidden");

            currentCategory = null;
            searchContainer.classList.add("hidden");
            filtersContainer.classList.add("hidden");
            backButton.style.display = 'none';
            searchInput.value = '';
            fadeOut(vehicleList);
            clearCategories();
        }, 500);
    };

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            $.post(`https://${GetParentResourceName()}/CLOSE_UI`);
            hideUI();
        }
    });

    window.addEventListener("message", (event) => {
        if (event.data.action === "SHOW_UI") {
            showUI();
        }
    });

    // Start with UI hidden
    hideUI();
});
