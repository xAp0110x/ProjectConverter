let input1 = document.getElementById('first-input');
let input2 = document.getElementById('second-input');

function converterRapidApi(from, to, amount) 
{

    const url = 'https://community-neutrino-currency-conversion.p.rapidapi.com/convert';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'ef1d961cc7msh0e20587c31e620ap187f9fjsnfb3c85ba3479',
            'X-RapidAPI-Host': 'community-neutrino-currency-conversion.p.rapidapi.com'
        },
        body: new URLSearchParams({
            'from-value': amount,
            'from-type': from,
            'to-type': to
        })
    };

    try {
        fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.result);
            });
    } catch (error) {
        console.error(error);
    }

}

let convert = converterRapidApi;


convert('RUB', 'USD', '181');