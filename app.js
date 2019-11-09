'use-strict';

window.addEventListener('load', () => {
    let longitude;
    let latitude;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const degreeSection = document.querySelector('.degree-section');
    const temperatureSpan = degreeSection.querySelector('span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/f80073f750ab420ea26990d12ba8609a/${latitude},${longitude}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                renderWeatherData(data, temperatureDescription, temperatureDegree, locationTimezone);
            });
        });

    } else {
        //h1.textContent = "Hey this is not working, please enable geolocation."
    }

    function renderWeatherData(data) {
        let {temperature, summary, icon } = data.currently;
        let celsius = Math.round((temperature - 32) * (5 / 9));
        temperature = Math.round(temperature);
        //Set DOM elements ferom the API
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;

        degreeSection.addEventListener('click', () => {
            if(temperatureSpan.textContent) {
                if(temperatureSpan.textContent === "F") {
                    temperatureSpan.textContent = "C°";
                    temperatureDegree.textContent = celsius;
                } else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;

                }
            }
        });
        setIcons(icon, document.querySelector('.icon'));
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});

