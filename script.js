$(document).ready(function () {
    var cityList = [];

    loadCityHistory();

    function loadCityHistory() {
        // Get sored Cities from localStorage & parse the JSON string to an array
        var storedCities = JSON.parse(localStorage.getItem("cities"));

        //If cities were fetched from localStorage, assign them to cityList array
        if (storedCities !== null) {
            cityList = storedCities;
        }
        // Add cities to the page
        renderSearchedCities();
    }

    function renderSearchedCities() {
        $("#cityList").empty();
        $("#userSearch").val("");


        for (var i = 0; i < cityList.length; i++) {
            var item = (cityList[i]);
            $("#cityList").append("<li class='list-group-item'>" + item + "</li>");
        }

        $("li").click(function () {
            var city = $(this).text();
            console.log(city);

            fetchCurrentWeather(city);
            fetchForcastWeather(city);
        });
    }

    $("#userBtn").click(function () {
        // get user search text
        var userSearch = document.getElementById("userSearch").value;

        // remember the city
        cityList.push(userSearch);
        localStorage.setItem("cities", JSON.stringify(cityList));
        
        // update the html
        renderSearchedCities();
        fetchCurrentWeather(userSearch);
        fetchForcastWeather(userSearch);

    });

    function buildCurrentWeather(weatherData) {
        $("#CityAndDate").text(weatherData.name);
        $("#cTemp").text(weatherData.main.temp);
        $("#cHumidity").text(weatherData.main.humidity);
        $("#cWind").text(weatherData.wind.speed);
        // $("#cUV-index").text(weatherData.) // UV Index doesn't exist on the api
    };



    function buildForcast(weatherData) {
        // Day 1
        $("#date1").text(weatherData.list[0].dt_txt);
        $("#Temp1").text(weatherData.list[0].main.temp);
        $("#Humidity1").text(weatherData.list[0].main.humidity);
        // Day 2
        $("#date2").text(weatherData.list[7].dt_txt);
        $("#Temp2").text(weatherData.list[7].main.temp);
        $("#Humidity2").text(weatherData.list[7].main.humidity);
        // Day 3
        $("#date3").text(weatherData.list[15].dt_txt);
        $("#Temp3").text(weatherData[15].main.temp);
        $("#Humidity3").text(weatherData[15].main.humidity);
        // Day 4 
        $("#date4").text(weatherData.list[23].dt_txt);
        $("#Temp4").text(weatherData.list[23].main.temp);
        $("#Humidity4").text(weatherData.list[23].main.humidity);
        // Day 5
        $("#date5").text(weatherData.list[32].dt_txt);
        $("#Temp5").text(weatherData.list[32].main.temp);
        $("#Humidity5").text(weatherData.list[32].main.humidity);
    };

    function fetchCurrentWeather(citySearched) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&appid=ce0ce71f7cda76dd7b16ae4ee13840f4"
        // http://api.openweathermap.org/data/2.5/weather?q=seattle&appid=ce0ce71f7cda76dd7b16ae4ee13840f4

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            buildCurrentWeather(response);
        });
    };


    function fetchForcastWeather(citySearched) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearched + "&appid=ce0ce71f7cda76dd7b16ae4ee13840f4";
        // http://api.openweathermap.org/data/2.5/forecast?q=seattle&appid=ce0ce71f7cda76dd7b16ae4ee13840f4

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            buildForcast(response);
        });
    }
});
