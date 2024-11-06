const departureCityElement = document.querySelector(".departure-city-selector"); 
const arrivalCityElement = document.querySelector(".arrival-city-selector");


if (departureCityElement && arrivalCityElement) {
  const departureCity = departureCityElement.textContent.trim();
  const arrivalCity = arrivalCityElement.textContent.trim();

  chrome.runtime.sendMessage({
    type: "citiesExtracted",
    payload: { departureCity, arrivalCity }
  });
}