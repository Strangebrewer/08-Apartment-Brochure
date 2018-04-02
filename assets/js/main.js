//  Carousel - slick.js
$('.autoplay').slick({
  dots: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3500,
  pauseOnHover: true,
  pauseOnDotsHover: true,
  appendDots: $(".slider-wrapper")
});

function degreesToCardinal(deg) {
  const cardinalArray = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  var cardinal = Math.floor(((deg + 11.25) % 360) / 22.5);
  return cardinalArray[cardinal];
}

getWeather();

setInterval(getWeather, 1000 * 600);

function getWeather() {
  $.ajax({
    async: true,
    crossDomain: true,
    url: "https://api.openweathermap.org/data/2.5/weather?id=5771826&units=imperial&APPID=4ecdc01b5584988caec51ee700a06511",
    method: "GET"
  }).then(response => {
    console.log(response);    
    var convertedDirection = degreesToCardinal(response.wind.deg);
    var convertedTemperature = Math.round(response.main.temp);
    var convertedSpeed = Math.round(response.wind.speed);
    var weatherDiv = $("<div>");
    var loc = $("<p>Local Weather: </p>");
    var image = $("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
    var cond = $("<p>" + response.weather[0].main + "</p>");
    var temp = $("<p>" + convertedTemperature + " F" + "</p>");
    var wind = $("<p>Wind: " + convertedDirection + " " + convertedSpeed + "mph</p>");
    var attribution = $("<p class='weather-link'>Weather data provided by <a href='https://openweathermap.org' target='_blank'>OpenWeatherMap.org</a>");
    weatherDiv.addClass("weather-div");
    image.addClass("weather-img");
    cond.addClass("weather-cond");
    temp.addClass("weather-temp");
    wind.addClass("weather-wind");
    loc.addClass("weather-loc");
    weatherDiv.append(loc);
    weatherDiv.append(image);
    weatherDiv.append(cond);
    weatherDiv.append(wind);
    weatherDiv.append(temp);
    $("#weather-display").html("");
    $("#weather-display").append(weatherDiv);
    $("#weather-display").append(attribution);
  });
}

// hamburger menu toggle
$(".cross").hide();
$(".menu").hide();
$(".hamburger").click(function () {
  $(".menu").slideToggle(400, function () {
    $(".hamburger").hide();
    $(".cross").show();
  });
});

//  Close the menu by clicking the cross
$(".cross").click(function () {
  $(".menu").slideToggle(400, function () {
    $(".cross").hide();
    $(".hamburger").show();
  });
});

//  Close the menu by clicking one of the links
$(".drop-down-link").click(function () {
  $(".menu").slideToggle(400, function () {
    $(".cross").hide();
    $(".hamburger").show();
  });
});

//  Makes the '#' links scroll rather than instantly jump
$(".page-link").on("click", function () {
  $("html, body").animate({
    scrollTop: $($.attr(this, "href")).offset().top
  }, 500);
})

//  Floorplan toggle - magnific.js
$('.floorplan-thumbs').magnificPopup({
  delegate: 'a',
  type: 'image',
  gallery: { enabled: true },
  titleSrc: 'title'
  // other options
});

//  Gallery toggle - magnific.js
$('.gallery-thumbs').magnificPopup({
  delegate: 'a',
  type: 'image',
  gallery: { enabled: true }
  // other options
});
