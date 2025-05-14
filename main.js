let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
const fromDropdown = document.getElementById("from-currency-select");
const toDropdown = document.getElementById("to-currency-select");

const getCurrencyCode = (currencyString) => {
    return currencyString.split(' ')[0];
}

currencies.forEach(currency => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropdown.add(option);
})

currencies.forEach(currency => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropdown.add(option);
})

fromDropdown.value = "USD (United States Dollar)";
toDropdown.value = "IDR (Indonesian Rupiah)";

let convertCurrency = () => {
    const amount = document.querySelector("#amount").value;
    const fromCurrency = getCurrencyCode(fromDropdown.value);
    const toCurrency = getCurrencyCode(toDropdown.value);

    if (amount.length != 0) {
        fetch(api)
            .then(resp => resp.json())
            .then((data) => {
                let fromExchangeRate = data.conversion_rates[fromCurrency];
                let toExchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
                const result = document.querySelector("#result");
                result.innerHTML = `${amount} ${fromDropdown.value} = ${convertedAmount.toFixed(2)} ${toDropdown.value}`;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat mengkonversi mata uang');
            });
    } else {
        alert("Isikan jumlah uang yang ingin dikonversi.");
    }
}

document.querySelector("#convert-button").addEventListener("click", convertCurrency);

window.addEventListener("load", () => {
    const amount = document.querySelector("#amount").value;
    if (amount) {
        convertCurrency();
    }
});