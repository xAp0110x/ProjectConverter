let convert = converterStockAPI;
const moneyFromButtons = document.querySelectorAll(".select-from button");
const moneyToButtons = document.querySelectorAll(".select-to button");
const leftRate = document.getElementById('left-rate');
const rightRate = document.getElementById('right-rate');

const apiKey = "e8090bf2230057779ccc1f61f3ac856f";
const apiUrl = "http://api.exchangerate.host/convert";

// Convertion func
async function converterStockAPI(from, to, amount) {

    const url = `${apiUrl}?access_key=${apiKey}&from=${from}&to=${to}&amount=${amount}`;
    let result;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.result;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// converterStockAPI('RUB', 'USD', 1817)
//     .then(result => {
//         console.log(result); 
//     });

//Update currency rate func
async function renewCurrencyRates(){
    let firstCurrency = document.querySelector('.select-from button.selected').innerText;
    let secondCurrency = document.querySelector('.select-to button.selected').innerText;

    let url = `${apiUrl}?access_key=${apiKey}&from=${firstCurrency}&to=${secondCurrency}&amount=1`;

    let response = await fetch(url);
    let data = await response.json();

    let firstRate = data.info.quote;

    url = `${apiUrl}?access_key=${apiKey}&from=${secondCurrency}&to=${firstCurrency}&amount=1`;

    response = await fetch(url);
    data = await response.json();

    let secondRate = data.info.quote;

    leftRate.textContent = `1 ${firstCurrency} = ${firstRate} ${secondCurrency}`;
    rightRate.textContent = `1 ${secondCurrency} = ${secondRate} ${firstCurrency}`;   
}
renewCurrencyRates();

//Selected btn func
function selectButtonClick(button, buttons) {
    buttons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    renewCurrencyRates();
}
//Event click on button
moneyFromButtons.forEach((button) => {
    button.addEventListener("click", () => selectButtonClick(button, moneyFromButtons));
});
moneyToButtons.forEach((button) => {
    button.addEventListener("click", () => selectButtonClick(button, moneyToButtons));
});

