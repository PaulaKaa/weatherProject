const API_KEY = 'token'
const kaupunkienNimet = ['Helsinki', 'Tampere', 'Turku', 'Jyväskylä', 'Vaasa', 'Joensuu', 'Kuopio', 'Kajaani', 'Oulu', 'Rovaniemi', 'Utsjoki']

const url = 'https://api.openweathermap.org/data/2.5/weather?'


const getSunData = (city) => {
    const fullURL = url + 'q=' + city + '&units=metric'+ '&lang=fi' + '&appid=' + API_KEY

    axios.get(fullURL)
        .then(response => {
            const json = response.data
            console.log(json)

            //Muutetaan kellonaikaa (sys.sunrise Sunrise time, unix, UTC) 
            let unixSunrise= new Date(json.sys.sunrise * 1000)
            let timeSunrise = unixSunrise.toLocaleTimeString([], {timeStyle: 'short'})

            let unixSunset= new Date(json.sys.sunset * 1000)
            let timeSunset = unixSunset.toLocaleTimeString([], {timeStyle: 'short'})

            //Luodaan span-pohja, joka sopii kaikille kaupungeille
            const span = document.querySelector('#aurinko' + city)
    
            span.innerHTML = 
            'Aurinko nousee: ' + timeSunrise + '<br>' + 
            'Aurinko laskee: ' + timeSunset + '<br> ' 

        }).catch(error => {
            alert(error)
        })
}

for (let i = 0; i < kaupunkienNimet.length; i++) {
    getSunData(kaupunkienNimet[i])
}
