const API_KEY = "";
const url = "https://api.openweathermap.org/data/2.5/weather?";
const icon_url = "http://openweathermap.org/img/wn/";

const otsake_span = document.querySelector('#kayttajanKaupunkiH')
const kayttaja_span = document.querySelector('#kayttajanData')
const käyttajan_kuvake = document.querySelector('#imgkayttaja')

document.querySelector("button").addEventListener("click", () => {
  /*Lue käyttäjän arvo ja kutsu get weatherData-funktiota */
  const usersCity = document.querySelector("input");
  getWeatherData(usersCity.value);
});

const getWeatherData = (city) => {
  const fullURL = url + "q=" + city + "&units=metric" + "&appid=" + API_KEY;

  axios
    .get(fullURL)
    .then((response) => {
      const json = response.data;
      console.log(json);

     otsake_span.innerHTML=city
      kayttaja_span.innerHTML = '<br>Lämpotila ' + json.main.temp + '&#8451; <br> Tuntuu kuin ' + json.main.feels_like + '&#8451;'
           

      const image = icon_url + json.weather[0].icon + '@2x.png'
      käyttajan_kuvake.src = image

    })
    .catch(() => {

    });
};
