const API_KEY = "TOKEN";
const url = "https://api.openweathermap.org/data/2.5/weather?";
const icon_url = "http://openweathermap.org/img/wn/";

const otsake_span = document.querySelector('#kayttajanKaupunkiH')
const kayttaja_span = document.querySelector('#kayttajanData')
const käyttajan_kuvake = document.querySelector('#imgkayttaja')
const muistin1 = document.querySelector('#muistin1')
const muistin2 = document.querySelector('#muistin2')
const muistin3 = document.querySelector('#muistin3')
let paivittaja = 0;

/* LocalStoragea varten */
const MUISTI = 'muisti'
let muisti = JSON.parse(localStorage.getItem(MUISTI))





const updateRecentCitys = () => {
  if (JSON.parse(localStorage.getItem(MUISTI)) === null) {
    muisti = []
  }

  if (muisti.length == 0 || muisti.length == null) {

  } else if (muisti.length === 1) {
    muistin1.innerHTML = muisti[muisti.length - 1]
  } else if (muisti.length === 2) {
    muistin1.innerHTML = muisti[muisti.length - 1]
    muistin2.innerHTML = muisti[muisti.length - 2]
  } else if (muisti.length > 2) {
    muistin1.innerHTML = muisti[muisti.length - 1]
    muistin2.innerHTML = muisti[muisti.length - 2]
    muistin3.innerHTML = muisti[muisti.length - 3]
  }
}


updateRecentCitys()

const getWeatherData = (city) => {
  const fullURL = url + 'q=' + city + '&units=metric' + '&lang=fi' + '&appid=' + API_KEY

  axios
    .get(fullURL)
    .then((response) => {
      const json = response.data;

      
      console.log(json);
      


      addToLocalStorage(json.name)
      otsake_span.innerHTML = city
      kayttaja_span.innerHTML = '<br>Lämpotila ' + json.main.temp + '&#8451; <br> Tuntuu kuin ' + json.main.feels_like + '&#8451;' + '<br> Tuulen nopeus: ' + json.wind.speed + 'm/s <br> Ilmankosteus:  ' + json.main.humidity +
        '% <br> <br> ' +
        'Kuvailu: ' + json.weather[0].description

      const image = icon_url + json.weather[0].icon + '@2x.png'
      käyttajan_kuvake.src = image
      updateRecentCitys()
    })
    .catch(() => {
      kayttaja_span.innerHTML = "Virhe tietoja ladattaessa. <br> Tarkista kaupungin nimi."
    });


};

document.querySelector("button").addEventListener("click", () => {
  /*Lue käyttäjän arvo ja kutsu get weatherData-funktiota */
  const usersCity = document.querySelector("input");
  getWeatherData(usersCity.value);
});

const addToLocalStorage = (city) => {
  if (JSON.parse(localStorage.getItem(MUISTI)) === null) {
    muisti = []
  }
  muisti.push(city)
  localStorage.setItem(MUISTI, JSON.stringify(muisti))
}

const removeFromLocalStorage = () => {
  /*Poista aina eka */
  let nro = 0
  muisti.splice(nro, 1)
  localStorage.setItem(MUISTI, JSON.stringify(muisti))
  nro++
}

