const moneyFromButtons = document.querySelectorAll(".select-from button");
const moneyToButtons = document.querySelectorAll(".select-to button");
const leftRate = document.getElementById('left-rate');
const rightRate = document.getElementById('right-rate');
const firstInput = document.getElementById('first-input');
const secondInput = document.getElementById('second-input');

const apiKey = "6f4fbdda846674d4de9d6c0f1db52b3c";
const apiUrl = "http://api.exchangerate.host/convert";


//Update currency rate func
async function renewCurrencyRates() {
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
    button.addEventListener("click", async function () {
        selectButtonClick(button, moneyFromButtons);

        let firstCurrency = String(document.querySelector('.select-from button.selected').innerText);
        let secondCurrency = String(document.querySelector('.select-to button.selected').innerText);
        let resultValue = 0;

        const url = `${apiUrl}?access_key=${apiKey}&from=${firstCurrency}&to=${secondCurrency}&amount=${firstInput.value}`;
        let response = await fetch(url);
        let data = await response.json();

        if (data.result != undefined) { secondInput.value = data.result.toFixed(4); }
    });
});
moneyToButtons.forEach((button) => {
    button.addEventListener("click", async function () {
        selectButtonClick(button, moneyToButtons);

        let firstCurrency = String(document.querySelector('.select-from button.selected').innerText);
        let secondCurrency = String(document.querySelector('.select-to button.selected').innerText);
        let resultValue = 0;

        const url = `${apiUrl}?access_key=${apiKey}&from=${secondCurrency}&to=${firstCurrency}&amount=${secondInput.value}`;
        let response = await fetch(url);
        let data = await response.json();

        if (data.result != undefined) { firstInput.value = data.result.toFixed(4); }
    });
});


firstInput.addEventListener('input', async function (event) {
    let firstCurrency = String(document.querySelector('.select-from button.selected').innerText);
    let secondCurrency = String(document.querySelector('.select-to button.selected').innerText);
    let resultValue = 0;

    const url = `${apiUrl}?access_key=${apiKey}&from=${firstCurrency}&to=${secondCurrency}&amount=${firstInput.value}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.result != undefined) { secondInput.value = data.result.toFixed(4); }
});

secondInput.addEventListener('input', async function (event) {
    let firstCurrency = String(document.querySelector('.select-from button.selected').innerText);
    let secondCurrency = String(document.querySelector('.select-to button.selected').innerText);
    let resultValue = 0;

    const url = `${apiUrl}?access_key=${apiKey}&from=${secondCurrency}&to=${firstCurrency}&amount=${secondInput.value}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.result != undefined) { firstInput.value = data.result.toFixed(4); }
});
