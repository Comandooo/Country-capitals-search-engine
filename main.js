let countryInput = document.querySelector("#country-input");
let countryBtn = document.querySelector("#country-btn");
let container = document.querySelector(".container");

const ApiUrl = "https://restcountries.com/v3.1/all";

fetch(ApiUrl)
  .then((response) => response.json())
  .then((countriesBeforeFiltr) => {
    countries = countriesBeforeFiltr.map((country) => {
      return {
        flagUrl: country.flags.png,
        name: country.name.common,
        capital: country.capital && country.capital[0],
      };
    });
  });

const showResults = (filtredCountries) => {
  const createCountryResults = (country) => {
    resultsContainer = document.createElement("div");
    resultsContainer.setAttribute('id', 'search-results');

    const countryFlag = document.createElement("img");
    countryFlag.setAttribute('id', 'country-flag');
    countryFlag.src = country.flagUrl;
    countryFlag.alt = `${country.name} flag`;

    const countryName = document.createElement("span");
    countryName.setAttribute('id', 'country-name');
    countryName.innerText = country.name;

    const countryCapital = document.createElement("span");
    countryCapital.setAttribute('id', 'country-capital');
    countryCapital.innerText = `Capital: ${country.capital}`;


    resultsContainer.appendChild(countryFlag);
    resultsContainer.appendChild(countryName);
    resultsContainer.appendChild(countryCapital);
    return resultsContainer;
  };
  const changeCountryResults = (country) => {
    const countryFlagImg = document.querySelector('#country-flag')
    countryFlagImg.src = country.flagUrl;
    countryFlagImg.alt = `${country.name} flag`;

    const countryNameSpan = document.querySelector("#country-name");
    countryNameSpan.innerText = country.name;

    const countryCapitalSpan = document.querySelector("#country-capital");
    countryCapitalSpan.innerText = `Capital: ${country.capital}`;
  };

  filtredCountries.forEach((country) => {
    if (document.querySelector("#search-results") == null) {
      container.appendChild(createCountryResults(country));
    }
    else {
      changeCountryResults(country);
    };
  });
};

countryBtn.addEventListener("click", () => {
  const inputValue = countryInput.value;
  const filtredCountries = countries.filter((country) => country.name.toLowerCase() == (inputValue.toLowerCase()));
  const resultsContainerRemove = () => {
    const resultsContainer = document.querySelector("#search-results");
    resultsContainer.remove();
  }
  if (inputValue.length == 0) {
    if (document.querySelector("#input-empty") == null) {
      if (document.querySelector("#country-flag") !== null) {
        resultsContainerRemove();
      }
      else if (document.querySelector("#invalid-country") !== null) {
        resultsContainerRemove();
      }
      resultsContainer = document.createElement("div");
      resultsContainer.setAttribute('id', 'search-results');
      const inputEmpty = document.createElement("span");
      inputEmpty.setAttribute('id', 'input-empty');
      inputEmpty.innerText = ("The text field cannot be empty");

      resultsContainer.appendChild(inputEmpty);
      container.appendChild(resultsContainer);
      return container;
    }
  }
  else if (filtredCountries.length == 0) {
    if (document.querySelector("#invalid-country") == null) {
      if (document.querySelector("#country-flag") !== null) {
        resultsContainerRemove();
      }
      else if (document.querySelector("#input-empty") !== null) {
        resultsContainerRemove();
      }
      resultsContainer = document.createElement("div");
      resultsContainer.setAttribute('id', 'search-results');
      const inputEmpty = document.createElement("span");
      inputEmpty.setAttribute('id', 'invalid-country');
      inputEmpty.innerText = ("Enter a valid country name");

      resultsContainer.appendChild(inputEmpty);
      container.appendChild(resultsContainer);
      return container;
    }
  }
  else {
    if (document.querySelector("#input-empty") !== null || document.querySelector("#invalid-country") !== null) {
      resultsContainerRemove();
    }
    showResults(filtredCountries);
  }
});

countryInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#country-btn").click();
  }
});

