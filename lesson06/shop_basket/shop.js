function productPlace(product) {
    // элементы блока создаются в обратном порядке
    // порядок при отображении меняется за счёт стилей

    var container = document.createElement("div");
    container.className = "buy-section";

    var elem = document.createElement("input");
    elem.className = "amount-field";
    elem.setAttribute("type", "number");
    elem.setAttribute("min", 1);
    elem.setAttribute("value", 1);
    container.append(elem);

    elem = document.createElement("a");
    elem.className = "link-button";
    elem.innerText = "Купить";
    elem.setAttribute("href", "#");
    elem.setAttribute("product", product.vendorCode);
    elem.addEventListener("click", addToBasket);
    container.append(elem);

    elem = container;
    container = document.createElement("div");
    container.className = "product-place";
    container.append(elem);

    elem = document.createElement("p");
    elem.className = "product-price";
    elem.innerText = product.price;
    container.append(elem);

    elem = document.createElement("p");
    elem.className = "product-description";
    elem.innerHTML = product.description;
    container.append(elem);

    elem = document.createElement("img");
    elem.setAttribute("src", product.image);
    elem.setAttribute("alt", product.name);
    elem.className = "product-image";
    container.append(elem);

    elem = document.createElement("h3");
    elem.className = "product-name";
    elem.innerText = product.name;
    container.append(elem);

    return container;
}

function basketSlot(slot) {

    var container = document.createElement("div");
    container.className = "basket-slot";
    container.setAttribute("product", slot.vendorCode);

    var elem = document.createElement("h3");
    elem.className = "product-name";
    elem.innerText = slot.name;
    container.append(elem);

    elem = document.createElement("p");
    elem.className = "product-price";
    elem.innerText = slot.price;
    container.append(elem);

    elem = document.createElement("input");
    elem.className = "amount-field";
    elem.setAttribute("type", "number");
    elem.setAttribute("min", 1);
    elem.setAttribute("value", slot.amount);
    elem.addEventListener("change", amountChanged);
    elem.addEventListener("blur", focusLost);
    container.append(elem);

    elem = document.createElement("p");
    elem.className = "slot-cost";
    elem.innerText = (slot.price * slot.amount).toFixed(2) / 1;
    container.append(elem);

    elem = document.createElement("a");
    elem.className = "link-button";
    elem.innerText = "Удалить";
    elem.setAttribute("href", "#");
    elem.addEventListener("click", removeSlot);
    container.append(elem);

    return container;
}

function findProductIdx(item) {
    return item.vendorCode == this;
}

function addToBasket(event) {
    event.preventDefault();
    var amount = parseInt(event.target.parentElement.querySelector("input").value);
    if(amount < 1) {
        event.target.parentElement.querySelector("input").value = 1;
        return;
    }
    var product = event.target.getAttribute("product");
    var idx = basket.findIndex(findProductIdx, product);
    if(idx == -1) {
        idx = productList.findIndex(findProductIdx, product);
        basket.push({
            vendorCode: product,
            name: productList[idx].name,
            price: productList[idx].price,
            amount: amount
        });
    }
    else {
        basket[idx].amount += amount;
    }
    updateBasketInfo();
}

function amountChanged() {
    isAmountChanged = true;
}

function focusLost(event) {
    if(isAmountChanged) {
        isAmountChanged = false;
        var product = event.target.parentElement.getAttribute("product");
        var idx = basket.findIndex(findProductIdx, product);
        var amount = parseInt(event.target.value);
        if(amount < 0) {
            event.target.value = basket[idx].amount;
            return;
        }
        else if(amount == 0) {
            basket.splice(idx, 1);
            document.querySelector("main").removeChild(event.target.parentElement);
        }
        else {
            basket[idx].amount = amount;
            event.target.parentElement.querySelector(".slot-cost").innerText = basket[idx].price * amount;
        }
        updateBasketInfo();
    }
}

function removeSlot(event) {
    event.preventDefault();
    var product = event.target.parentElement.getAttribute("product");
    var idx = basket.findIndex(findProductIdx, product);
    basket.splice(idx, 1);
    document.querySelector("main").removeChild(event.target.parentElement);
    if(basket.length == 0) {
        document.querySelector("main").innerHTML = "<h3>Корзина пуста</h3>";
    }
    updateBasketInfo();
}

function updateBasketInfo() {
    var amount = 0, total = 0;
    for(var slot of basket) {
        amount += slot.amount;
        total += slot.amount * slot.price;
    }
    total = total.toFixed(2) / 1;
    if(!basketView) {
        basketInfo.querySelector("#amount").style.display = "block";
        if(basket.length == 0) {
            basketInfo.querySelector("#amount").innerText = "Корзина пуста";
            basketInfo.querySelector("#total").style.display = "none";
        }
        else {
            basketInfo.querySelector("#total").style.display = "block";
            basketInfo.querySelector("#amount").innerText = `Товаров в корзине: ${amount}`;
            basketInfo.querySelector("#total").innerText = `на сумму $ ${total}`;
        }
    }
    return {amount, total};
}

function switchView(event) {
    if(Object.is(event, Event)) {
        event.preventDefault();
    }

    basketView = !basketView;
    // чистим контейнер
    var childItem = document.querySelector("main").firstChild;
    while(childItem) {
        document.querySelector("main").removeChild(childItem);
        childItem = document.querySelector("main").firstChild;
    }

    if(basketView) {
        basketInfo.querySelector("#amount").style.display = "none";
        basketInfo.querySelector("#total").style.display = "none";
        basketInfo.querySelector("a").innerText = "Перейти к товарам";
        // рисуем корзину
        if(basket.length) {
            for(var slot of basket) {
                document.querySelector("main").append(basketSlot(slot));
            }
        }
        else {
            document.querySelector("main").innerHTML = "<h3>Корзина пуста</h3>";
        }
        document.querySelector("main").className = "basket-view";
    }
    else {
        basketInfo.querySelector("a").innerText = "Перейти в корзину";
        // рисуем витрину
        for(var product of productList) {
            document.querySelector("main").append(productPlace(product));
        }
        document.querySelector("main").className = "showcase";
    }
    updateBasketInfo();
}

var basket = [],
    basketView = true,
    isAmountChanged = false,
    basketInfo = document.querySelector("#basket-info");

switchView();
basketInfo.querySelector("a").addEventListener("click", switchView);
