let weather = {

  temp: 0,
  inCelsius: true,
  previousWeather: null,
  

  //fetch the weather from open weather api
  getWeather: function (location) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=3d5b034d1354db3ad932bdef722cc23b`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => this.displayWeather(data));
  },

  //displays the weather
  displayWeather: (data) => {
    if(data.cod == 200) {
      const { name } = data;
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      this.temp = temp;

      if(!!this.previousWeather) {
        const tempType = this.inCelsius ? "°C" : "°F"; 
        const liElem = document.createElement("li").textContent = `${name} : ${temp} ${tempType}`;
        const br = document.createElement("br");
        document.querySelector("#previousTemps").append(liElem);
        document.querySelector("#previousTemps").append(br);
      } else {
        this.previousWeather = {name: name, temp: temp};
      }


      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      
    }
  },

  deleteHistory: function () {
    document.querySelector("#previousTemps").replaceChildren();
  },

  search: function () {
    this.getWeather(document.querySelector("#search").value);
  },

  //converts temp between Farenheit and Celsius
  convert: () => {
    this.temp = this.inCelsius ? (this.temp-32)*.5556 : (this.temp * 1.8)+32;
    this.temp = Math.round(this.temp * 100) / 100; //round number

    const tempType = this.inCelsius ? "°C" : "°F"; 
    document.querySelector(".temp").innerText = this.temp + tempType;

    this.inCelsius = !this.inCelsius; 
  }

};


  document.querySelector("#deleteHistory").addEventListener("click", function () {
    weather.deleteHistory();
  });

  document.querySelector("#searchButton").addEventListener("click", function () {
    weather.search();
  });

   //listens to the click of the Celsius/Farenheit convert button to convert the temp
  document.querySelector("#convertButton").addEventListener("click", function () {
    weather.convert();
  });


  
  document
    .querySelector("#search")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  //default city
  weather.getWeather("Boston");