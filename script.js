const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

let btn = document.querySelector("form button");
let dropdowns = document.querySelectorAll(".dropdown select");

let fromCurr = document.querySelector(".form select");
let toCurr = document.querySelector(".to select");

let msg = document.querySelector('.msg')
for (let select of dropdowns) {
  for (currCode in countryList) {
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
  select.addEventListener("click", (e) => {
    upDateFlag(e.target);
  });
}

const upDateFlag = (el) => {
  let currCode = el.value;
  let countryCode = countryList[currCode];
  let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = el.parentElement.querySelector("img");
  img.src = newScr;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
 const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate
  console.log(rate);

  msg.innerText = `${amtVal} ${fromCurr.value} ${finalAmount} ${toCurr.value}` ;
});
