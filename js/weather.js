window.addEventListener('load', ()=>{
    let long;
    let lat;
    const API_KEY = "a3dd809a9ad2fef162af8d567f8bf6c2";
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
            fetch(api)
            .then(data =>{
                return data.json();
            })
            .then(data => {
                // console.log(data);
                const {temp} = data.main;
                const {icon,description} = data.weather[0];
                const {country} = data.sys;

                // Set Dom elements from the API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = country;
                // Set Icon
                const iconurl = document.querySelector(".wicon")
                iconurl.src= `http://openweathermap.org/img/wn/${icon}@2x.png`;
                
            });
        });
    }

});
