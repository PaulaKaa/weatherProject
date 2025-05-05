const API_KEY = ''

//Taulukot
const kaupunkienNimet = ['Helsinki', 'Tampere', 'Turku', 'Jyväskylä', 'Vaasa', 'Joensuu', 'Kuopio', 'Kajaani', 'Oulu', 'Rovaniemi', 'Utsjoki']

const url = 'https://api.openweathermap.org/data/2.5/weather?'
const icon_url = 'http://openweathermap.org/img/wn/'


const getWeatherData = (city) => {
    const fullURL = url + 'q=' + city + '&units=metric' + '&appid=' + API_KEY

    axios.get(fullURL)
        .then(response => {
            const json = response.data
            console.log(json)

            //Luodaan span- ja img-pohja, joka sopii kaikille kaupungeille
            const span = document.querySelector('#lampo' + city)
            
            const icon_img = document.querySelector('#img' + city)
            const reelfeel = document.querySelector('#tuntuu'+ city)

            span.innerHTML = json.main.temp + '&#8451;'
            reelfeel.innerHTML = json.main.feels_like + '&#8451;'
            image = icon_url + json.weather[0].icon + '@2x.png'
            icon_img.src = image

        }).catch(error => {
            alert(error)
        })
}

for (let i = 0; i < kaupunkienNimet.length; i++) {
    getWeatherData(kaupunkienNimet[i])
}
