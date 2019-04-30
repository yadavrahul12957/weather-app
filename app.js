window.addEventListener('load', ()=> {

    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/88fe9947331a6a771850b222d47bd074/${lat},${long}`;


            fetch(api)
            .then(response => {
                return response.json();
            })


            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                // data.currently.temperature
                // Set Dom Elements from API
                // temperatureDegree.textContent = temperature;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Formula for Degree
                let celsius = (temperature - 32) * (5/9);
                // let farenheit = (((temperature)*(9/5)) + 32) ;

                //Set Icon
                setIcons(icon, document.querySelector(".icon"));


                //Change temperature to Celsius/Farenheit  
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                        
                    }else{
                        temperatureSpan.textContent = "F" ;
                        temperatureDegree.textContent = temperature; 
                    }
                });
            });    
        });
        
    }
    // else{
    //     h1.textContent = "Hey this thing isn't working due to this reason"
    // }

    function setIcons(icon,iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }




});