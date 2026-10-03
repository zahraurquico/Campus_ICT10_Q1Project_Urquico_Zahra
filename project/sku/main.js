var currentSku = "";

function toggleMenu (){
    var menu = document.getElementById("menu");

    menu.hidden = !menu.hidden;
}

function threeDigits(number) {
    var text = String(number);

    while (text.length < 3) {
        text = "0" + text;
    }

    return text;
}

function generateSku(){
    var error = document.getElementById("error");
    var preview = document.getElementById("preview");

    error.textContent = "";
    document.getElementById("message").textContent = "";

    var categoryCode = document.getElementById("category").value;
    var name = document.getElementById("name").value;
    var stockText = document.getElementById("stock").value;

    var lettersOnly = name.replace (/[^a-zA-Z0-9]/g, "");

    if (lettersOnly === "") {
        error.textContent = "Please enter a vaild product name.";
        return;
    }

    var stock = Number(stockText);

    if (stockText === "" || stock < 0 || stock > 999 || stock % 1 !== 0) {
        error.textContent = "stock quantity must be a whole number.";
        return;
    }

    var nameCode = lettersOnly.substring(0,3).toUpperCase();

    while (nameCode.length < 3) {
        nameCode = nameCode + "X";
    }

    currentSku=categoryCode+"-"+ nameCode+ "-"+ threeDigits(stock);

    preview.textContent=currentSku;
    preview.className="preview";
}

function copySku(){
    var message=document.getElementById("message");

    if(currentSku===""){
        message.textConent="Generate a SKU first.";
        return;
    }

    if (!navigator.clipboard){
        message.textContent="Copy is not available.";
        return;
    }

    navigator.clipboard.writeText(currentSku).then(function () {
        message.textContent="Copied " + currentSku;
    });
}