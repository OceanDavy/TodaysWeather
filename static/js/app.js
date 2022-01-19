//Inputs text and button
let button = document.querySelector('.button');
let inputValue = document.querySelector('.search-bar');
//Weather Info
let cityTemp = document.querySelector('.cityTemp');
let cityName = document.querySelector('.cityName');
let cityCountry = document.querySelector('.cityCountry');
let cityTempMax = document.querySelector('.cityTempMax');
let cityTempMin = document.querySelector('.cityTempMin');
let cityDes = document.querySelector('.cityDesc');
let cityPre = document.querySelector('.cityPre');
let cityHum = document.querySelector('.cityHum');
let cityIcon = document.getElementById('icon');
let checkbox = document.querySelector("input[name=checkbox]");

button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=metric&appid=9490add092e79e517c1818c330efd859')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var countryValue = data['sys']['country'];
        //Temperature Celsius/Fahrenheint
        var tempCelsius = Math.round(data['main']['temp']) + '°C';
        var tempFahrenheit = Math.round((data['main']['temp'] * 9/5) + 32) + '°F';
        //Max Temperature Celsius/Fahrenheint
        var tempMaxValueC = "Max: " + Math.round(data['main']['temp_max']) + "°C";
        var tempMaxValueF = "Max: " + Math.round(data['main']['temp_max'] * 9/5 + 32) + '°F';
        //Min Temperature Celsius/Fahrenheint
        var tempMinValueC = "Min: " + Math.round(data['main']['temp_min']) + "°C";
        var tempMinValueF = "Min: " + Math.round(data['main']['temp_min'] * 9/5 + 32) + '°F';

        var descValue = data['weather'][0]['description'];
        var humValue = data['main']['humidity'];
        var iconValue = data['weather'][0]['icon'];


        cityName.innerHTML = nameValue;
        cityCountry.innerHTML = countryValue;
        cityDes.innerHTML = descValue;
        cityHum.innerHTML = "Humidity: " + humValue + "%";
        cityIcon.src = "http://openweathermap.org/img/w/"+iconValue+".png";
        
        /*Every time you clic on "GET WEATHER" you will get either Celsius or Fahrenheit
        depending on the checkbox status (checked or unchecked)
        */
        if(checkbox.checked == true){
            cityTemp.innerHTML = tempFahrenheit;    
            cityTempMax.innerHTML = tempMaxValueF;
            cityTempMin.innerHTML = tempMinValueF;
        }
        else{
            cityTemp.innerHTML = tempCelsius;
            cityTempMax.innerHTML = tempMaxValueC;
            cityTempMin.innerHTML = tempMinValueC;
        }

        checkbox.addEventListener('change', function(){
            if(checkbox.checked == true){ // If you change the checkbox status to "True"/checked it'll turn the temp to Fahrenheit
                cityTemp.innerHTML = tempFahrenheit;
                cityTempMax.innerHTML = tempMaxValueF;
                cityTempMin.innerHTML = tempMinValueF;
                console.log("Fahrenheit");
            }
            else{ // If you change the checkbox status to "False"/unchecked it'll turn the temp to Celsius
                cityTemp.innerHTML = tempCelsius;
                cityTempMax.innerHTML = tempMaxValueC;
                cityTempMin.innerHTML = tempMinValueC;
                console.log("Celsius");
            }
        });
        
        console.log(data);
        document.getElementById("weatherBlock").style.display = "block";
    })

.catch(err => alert("Wrong city name"))
})  

//Event Listener that actives the button click EventListener by pressing "Enter"
inputValue.addEventListener('keyup', function(event){
    if(event.keyCode == 13){
        button.click();
    }
});
