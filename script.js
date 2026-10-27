document.addEventListener("DOMContentLoaded", function () {
    const typeRadios = document.querySelectorAll('input[name="productType"]');
    const optionsContainer = document.getElementById("options-container");
    const propertyContainer = document.getElementById("property-container");
    const productSelect = document.getElementById("product-select");
    const productProperty = document.getElementById("product-property");
    const quantityInput = document.getElementById("product-quantity");
    const resultDiv = document.getElementById("calc-result");
    const errorDiv = document.getElementById("calc-error");

    function calculate() {
        const quantityValue = quantityInput.value.trim();
        
        // Регулярное выражение: проверка, что введено целое положительное число (больше 0)
        const regex = /^[1-9]\d*$/;

        if (!regex.test(quantityValue)) {
            errorDiv.textContent = "Ошибка: введите корректное целое число больше 0!";
            errorDiv.style.display = "block";
            resultDiv.textContent = "";
            return;
        }

        errorDiv.style.display = "none";
        errorDiv.textContent = "";

        // Находим выбранный тип товара
        let basePrice = 0;
        let selectedType = "1";
        typeRadios.forEach(radio => {
            if (radio.checked) {
                basePrice = parseFloat(radio.value);
                if (radio.id === "type2") selectedType = "2";
                if (radio.id === "type3") selectedType = "3";
            }
        });

        // Управляем видимостью дополнительных элементов по условию лабы:
        // Тип 1: без опций и свойств
        // Тип 2: только опции (селект)
        // Тип 3: только свойства (чекбокс)
        if (selectedType === "1") {
            optionsContainer.classList.add("d-none");
            propertyContainer.classList.add("d-none");
        } else if (selectedType === "2") {
            optionsContainer.classList.remove("d-none");
            propertyContainer.classList.add("d-none");
            basePrice += parseFloat(productSelect.value);
        } else if (selectedType === "3") {
            optionsContainer.classList.add("d-none");
            propertyContainer.classList.remove("d-none");
            if (productProperty.checked) {
                basePrice += parseFloat(productProperty.value);
            }
        }

        const quantity = parseInt(quantityValue, 10);
        const total = basePrice * quantity;

        resultDiv.textContent = "Стоимость заказа: " + total + " руб.";
    }

    // Вешаем слушатели событий на все элементы формы для динамического пересчета
    typeRadios.forEach(radio => radio.addEventListener("change", calculate));
    productSelect.addEventListener("change", calculate);
    productProperty.addEventListener("change", calculate);
    quantityInput.addEventListener("input", calculate);

    // Первичный расчет при загрузке
    calculate();
});
