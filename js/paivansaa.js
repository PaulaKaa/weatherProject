const API_KEY = ''
const kaupunkienNimet = ['Helsinki', 'Tampere', 'Turku', 'Jyväskylä', 'Vaasa', 'Joensuu', 'Kuopio', 'Kajaani', 'Oulu', 'Rovaniemi', 'Utsjoki']

const url = 'https://api.openweathermap.org/data/2.5/weather?'
const icon_url = 'http://openweathermap.org/img/wn/'


const getWeatherData = (city) => {
    const fullURL = url + 'q=' + city + '&units=metric'+ '&lang=fi' + '&appid=' + API_KEY

    axios.get(fullURL)
        .then(response => {
            const json = response.data

            //Luodaan span- ja img-pohja, joka sopii kaikille kaupungeille
            const span = document.querySelector('#lampo' + city)
            const icon_img = document.querySelector('#img' + city)
    
            span.innerHTML = 
            'Lämpötila: ' + json.main.temp + '&#8451;' + '<br>' + 
            'Tuntuu kuin: ' + json.main.feels_like + '&#8451;' + ' <br>' +
            'Kuvailu: ' + json.weather[0].description
        
            image = icon_url + json.weather[0].icon + '@2x.png'
            icon_img.src = image

        }).catch(error => {
            alert(error)
        })
}

for (let i = 0; i < kaupunkienNimet.length; i++) {
    getWeatherData(kaupunkienNimet[i])
}
