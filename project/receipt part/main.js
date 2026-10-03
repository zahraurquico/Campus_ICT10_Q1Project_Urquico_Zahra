var PESO = "\u20B1";

var categories = [
    "Fresh Produce",
    "Fruit",
    "Animal Produce",
    "Condiments & Preserves",
    "Baked Goods",
    "Grains & Pantry",
    "Herbs & Spices"
];

var products = [
    { category: "Fresh Produce", name: "Tomatoes", price: 80, sku: "FP-TOM-001" },
    { category: "Fresh Produce", name: "Carrots", price: 60, sku: "FP-CAR-001" },
    { category: "Fresh Produce", name: "Lettuce", price: 70, sku: "FP-LET-001" },
    { category: "Fresh Produce", name: "Sweet Potato", price: 65, sku: "FP-SWE-001" },

    { category: "Fruit", name: "Apples", price: 120, sku: "FT-APP-001" },
    { category: "Fruit", name: "Bananas", price: 70, sku: "FT-BAN-001" },
    { category: "Fruit", name: "Mangoes", price: 150, sku: "FT-MAN-001" },
    { category: "Fruit", name: "Strawberries", price: 200, sku: "FT-STR-001" },

    { category: "Animal Produce", name: "Eggs", price: 125, sku: "AP-EGG-001" },
    { category: "Animal Produce", name: "Fresh Milk", price: 98, sku: "AP-FRE-001" },
    { category: "Animal Produce", name: "Butter", price: 150, sku: "AP-BUT-001" },
    { category: "Animal Produce", name: "Chicken Breast", price: 240, sku: "AP-CHI-001" },

    { category: "Condiments & Preserves", name: "Strawberry Jam", price: 160, sku: "CP-STR-001" },
    { category: "Condiments & Preserves", name: "Honey", price: 280, sku: "CP-HON-001" },
    { category: "Condiments & Preserves", name: "Soy Sauce", price: 55, sku: "CP-SOY-001" },
    { category: "Condiments & Preserves", name: "Pickles", price: 140, sku: "CP-PIC-001" },

    { category: "Baked Goods", name: "Sourdough Loaf", price: 180, sku: "BG-SOU-001" },
    { category: "Baked Goods", name: "Croissant", price: 75, sku: "BG-CRO-001" },
    { category: "Baked Goods", name: "Banana Bread", price: 150, sku: "BG-BAN-001" },
    { category: "Baked Goods", name: "Blueberry Muffin", price: 85, sku: "BG-BLU-001" },

    { category: "Grains & Pantry", name: "Brown Rice", price: 110, sku: "GP-BRO-001" },
    { category: "Grains & Pantry", name: "Rolled Oats", price: 130, sku: "GP-ROL-001" },
    { category: "Grains & Pantry", name: "Olive Oil", price: 350, sku: "GP-OLI-001" },
    { category: "Grains & Pantry", name: "Wheat Flour", price: 95, sku: "GP-WHE-001" },

    { category: "Herbs & Spices", name: "Basil", price: 45, sku: "HS-BAS-001" },
    { category: "Herbs & Spices", name: "Black Pepper", price: 90, sku: "HS-BLA-001" },
    { category: "Herbs & Spices", name: "Cinnamon", price: 85, sku: "HS-CIN-001" },
    { category: "Herbs & Spices", name: "Oregano", price: 60, sku: "HS-ORE-001" }
];

var cart = {};

var receiptNumber = 1001;


function toggleMenu() {
    var menu = document.getElementById("menu");

    menu.classList.toggle("open");
}


function money(number) {
    return PESO + Number(number).toFixed(2);
}

function twoDigits(number) {
    if (number < 10) {
        return "0" + number;
    }

    return String(number);
}

function readNumber(id) {
    var value = Number(document.getElementById(id).value);

    if (isNaN(value) || value < 0) {
        return 0;
    }

    return value;
}

function receiptLine(left, right) {
    return "<div class='line'><span>" + left + "</span><span>" + right + "</span></div>";
}

function addOne(button) {
    var sku = button.getAttribute("data-sku");

    cart[sku] = (cart[sku] || 0) + 1;
    showEverything();
}

function removeOne(button) {
    var sku = button.getAttribute("data-sku");
    var inCart = cart[sku] || 0;

    if (inCart > 0) {
        cart[sku] = inCart - 1;
    }

    showEverything();
}

function removeFromCart(button) {
    var sku = button.getAttribute("data-sku");

    cart[sku] = 0;
    showEverything();
}


function showProducts() {
    var filter = document.getElementById("filter").value;
    var html = "";

    for (var i = 0; i < categories.length; i++) {
        var categoryName = categories[i];

        if (filter !== "" && filter !== categoryName) {
            continue;
        }

        html += "<h3>" + categoryName + "</h3>";
        html += "<div class='product-box'>";

        for (var j = 0; j < products.length; j++) {
            var product = products[j];

            if (product.category !== categoryName) {
                continue;
            }

            var quantity = cart[product.sku] || 0;
            var quantityClass = "quantity";

            if (quantity > 0) {
                quantityClass = "quantity has-items";
            }

            html += "<div class='product-row'>";
            html += "<span class='product-name'>" + product.name + "</span>";
            html += "<span class='product-price'>" + money(product.price) + "</span>";
            html += "<button class='plus' data-sku='" + product.sku + "' onclick='addOne(this)'>+</button>";
            html += "<button class='minus' data-sku='" + product.sku + "' onclick='removeOne(this)'>-</button>";
            html += "<span class='" + quantityClass + "'>" + twoDigits(quantity) + "</span>";
            html += "</div>";
        }

        html += "</div>";
    }

    document.getElementById("productList").innerHTML = html;
}


function getCartItems() {
    var items = [];

    for (var i = 0; i < products.length; i++) {
        var quantity = cart[products[i].sku] || 0;

        if (quantity > 0) {
            items.push({ product: products[i], quantity: quantity });
        }
    }

    return items;
}


function showCart() {
    var items = getCartItems();
    var cartBox = document.getElementById("cart");

    if (items.length === 0) {
        cartBox.innerHTML = "<p class='small-text'>Your cart is empty. Use + on the product list.</p>";
        return;
    }

    var html = "<table>";
    html += "<tr><th>Item</th><th>Quantity</th><th class='right'>Price</th><th></th></tr>";

    for (var i = 0; i < items.length; i++) {
        var product = items[i].product;
        var quantity = items[i].quantity;

        html += "<tr>";
        html += "<td>" + product.name + "</td>";
        html += "<td>" + quantity + "</td>";
        html += "<td class='right'>" + money(product.price * quantity) + "</td>";
        html += "<td class='right'>";
        html += "<button class='remove-button' data-sku='" + product.sku + "' onclick='removeFromCart(this)'>X</button>";
        html += "</td>";
        html += "</tr>";
    }

    html += "</table>";
    cartBox.innerHTML = html;
}


function showReceipt() {
    var items = getCartItems();
    var subtotal = 0;

    for (var i = 0; i < items.length; i++) {
        subtotal = subtotal + items[i].product.price * items[i].quantity;
    }

    var discountPercent = readNumber("discount");

    if (discountPercent > 100) {
        discountPercent = 100;
    }

    var taxPercent = readNumber("tax");
    var discount = subtotal * discountPercent / 100;
    var tax = (subtotal - discount) * taxPercent / 100;
    var total = subtotal - discount + tax;

    var html = "<div class='middle store-name'>Harvest &amp; Co.</div>";
    html += "<div class='middle'>Receipt #" + receiptNumber + "</div>";
    html += "<div class='middle'>" + new Date().toLocaleString() + "</div>";
    html += "<hr>";

    if (items.length === 0) {
        html += "<div class='middle'>No items yet</div>";
    }

    for (var j = 0; j < items.length; j++) {
        var product = items[j].product;
        var quantity = items[j].quantity;

        html += receiptLine(quantity + " x " + product.name, money(product.price * quantity));
        html += "<div class='sku-line'>" + product.sku + " @ " + money(product.price) + "</div>";
    }

    html += "<hr>";
    html += receiptLine("Subtotal", money(subtotal));

    if (discount > 0) {
        html += receiptLine("Discount", "-" + money(discount));
    }

    html += receiptLine("Tax", money(tax));
    html += "<div class='total'>" + receiptLine("TOTAL", money(total)) + "</div>";
    html += "<hr>";
    html += receiptLine("Paid by", document.getElementById("payment").value);
    html += "<hr>";
    html += "<div class='middle'>Thank you for shopping with us</div>";

    document.getElementById("receipt").innerHTML = html;
}


function showEverything() {
    document.getElementById("error").textContent = "";

    showProducts();
    showCart();
    showReceipt();
}


function printReceipt() {
    if (getCartItems().length === 0) {
        document.getElementById("error").textContent = "Add at least one item before printing.";
        return;
    }

    window.print();

    receiptNumber = receiptNumber + 1;
    showReceipt();
}


showEverything();
