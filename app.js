///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BASE_URL = "https://v6.exchangerate-api.com/v6/7c7e0b8f0f618f2cc89e3b98/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector(".btn_form");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

// Function to update the exchange rate message
const updateExchangeRate = async () => {
    try {
        // Fetch exchange rate data
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();

        // Get exchange rate for selected currencies
        const rate = data.conversion_rates[toCurr.value];

        // Calculate final amount
        let amount = parseFloat(document.querySelector(".amount input").value) || 1;
        const finalAmount = amount * rate;

        // Update message
        msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        msg.innerText = 'Failed to fetch exchange rates. Please try again later.';
    }
};

// Event listener for button click to calculate exchange rate
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// Initialize dropdowns and update flag on change
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        // updateExchangeRate();
    });
}

// Function to update flag based on selected currency
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
