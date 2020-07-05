var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40, lng: -20 },
    zoom: 3,
  });
}

//get search dropdown options & decide which API route to hit
document.getElementById('searchBtn').addEventListener('click', searchFunc);

function searchFunc() {
  document.getElementById('searchDropdown').innerHTML = '';
  const searchInput = document.getElementById('searchInput');
  const searchInputReg = new RegExp(searchInput.value, 'i');
  fetch('./cityList.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const result = data.filter((e) => searchInputReg.test(e));
      if (result.length > 10) {
        const shortenResult = result.slice(0, 10);
        for (const e of shortenResult) {
          document.getElementById(
            'searchDropdown'
          ).innerHTML += `<a class="dropdown-item href="#"">${e}</a>`;
        }
      } else {
        for (const e of result) {
          document.getElementById(
            'searchDropdown'
          ).innerHTML += `<a class="dropdown-item href="#"">${e}</a>`;
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

const current = document.getElementById('current');

//MAIN SEARCH FUNCTION - always active - Choose the city from search dropdown box
document.getElementById('searchDropdown').addEventListener('click', (e) => {
  const city = e.target.textContent;
  if (current.classList.contains('active')) {
    fetch(`./api/weather/current/${city}`)
      .then((response) => response.json())
      .then((data) => currentWeather(data));
  } else {
    fetch(`./api/weather/forecast/${city}`)
      .then((response) => response.json())
      .then((data) => forecastWeather(data));
  }
});

//declare variables used throughout
let citySelection, lng, lat, center, weatherInfo, infoWindow;
const hoursArray = document.querySelectorAll('.hours');

/***** CURRENT WEATHER ******/

//function to populate popup with CURRENT weather info
function runCurrent() {
  current.classList.add('active');
  for (const e of hoursArray) {
    if (e.classList.contains('active')) {
      e.classList.remove('active');
    }
  }
  deletePopups();
}

current.addEventListener('click', runCurrent);

function currentWeather(e) {
  lng = e.coord.lon;
  lat = e.coord.lat;
  center = new google.maps.LatLng(lat, lng);
  map.panTo(center);

  //populating the Info Window with weather infor
  weatherInfo = `<h5>${
    e.name
  }</h5><button class="btn-close"><p class="btn-text">x</p></button><p>${(
    e.main.temp - 273.15
  ).toFixed(1)} C<p>${
    e.weather[0].description
  }</p><img class="center weather-image" src="http://openweathermap.org/img/wn/${
    e.weather[0].icon
  }.png" alt="weather-image-placeholder" >`;

  //call the Popup object, passing weatherInfo
  createPopupCard(weatherInfo);
}

/****** FORECAST WEATHER ********/

//function to pick which hours under forecast
hoursArray.forEach((e) => {
  e.addEventListener('click', (e) => {
    current.classList.remove('active');
    e.target.classList.add('active');
    for (const f of hoursArray) {
      if (f !== e.target) {
        f.classList.remove('active');
      }
    }
    deletePopups();
  });
});

function forecastHour() {
  for (const e of hoursArray) {
    if (e.classList.contains('active')) {
      return e;
    }
  }
}

//function to populate popup with forecast info

function forecastWeather(e) {
  lng = e.city.coord.lon;
  lat = e.city.coord.lat;
  center = new google.maps.LatLng(lat, lng);
  map.panTo(center);
  let chosenHour = forecastHour();
  let chosenHourText = chosenHour.textContent;

  //populating the popup with the chosen forecast by hour
  weatherInfo = function (forecast, hour) {
    return `<h5>${
      e.city.name
    }</h5><button class="btn-close"><p class="btn-text">x</p></button><p>${(
      e.list[forecast].main.temp - 273.15
    ).toFixed(1)} C<p class="">${
      e.list[forecast].weather[0].description
    }</p><img class="center weather-image" src="http://openweathermap.org/img/wn/${
      e.list[forecast].weather[0].icon
    }.png"+alt="weather-image-placeholder"><p>${hour} hours from now</p>`;
  };

  switch (chosenHourText) {
    case '3 Hour Forecast':
      weatherInfo = weatherInfo(0, 3);
      break;
    case '6 Hour Forecast':
      weatherInfo = weatherInfo(1, 6);
      break;
    case '9 Hour Forecast':
      weatherInfo = weatherInfo(2, 9);
      break;
    case '12 Hour Forecast':
      weatherInfo = weatherInfo(3, 12);
      break;
    case '24 Hour Forecast':
      weatherInfo = weatherInfo(7, 24);
      break;
  }
  //call the Popup object, passing weatherInfo
  createPopupCard(weatherInfo);
}

//function to create popup card on google maps
let popupList = [];
function createPopupCard(e) {
  infoWindow = document.createElement('div');
  Popup = createPopupClass(e);
  popup = new Popup(center, infoWindow);
  popup.setMap(map);

  //function to remove one popup-container when x is clicked
  popupList.push(popup.containerDiv.firstChild.firstChild);
  popupList.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-text')) {
        let toRemove = e.target.parentElement.parentElement.parentElement;
        setTimeout(() => {
          toRemove.remove();
        }, 290);
        toRemove.style.animationName = 'fadeout';
        toRemove.style.animationDuration = '.3s';
      }
    });
  });
}

//function to remove all popup containers. Divs with class of 'popup-container'
function deletePopups() {
  const popupContainers = document.getElementsByClassName('popup-container');
  const popupContainersArray = [].slice.call(popupContainers);
  popupContainersArray.forEach((e) => e.parentNode.removeChild(e));
}

//from google maps API - function to create google map API custom popup, passing weatherInfo from selectCity function
function createPopupClass(e) {
  /**
   * A customized popup on the map.
   * @param {!google.maps.LatLng} position
   * @param {!Element} content The bubble div.
   * @constructor
   * @extends {google.maps.OverlayView}
   */
  function Popup(position, content) {
    this.position = position;

    content.classList.add('popup-bubble');
    content.innerHTML = e;

    // This zero-height div is positioned at the bottom of the bubble.
    var bubbleAnchor = document.createElement('div');
    bubbleAnchor.classList.add('popup-bubble-anchor');
    bubbleAnchor.appendChild(content);

    // This zero-height div is positioned at the bottom of the tip.
    this.containerDiv = document.createElement('div');
    this.containerDiv.classList.add('popup-container');
    this.containerDiv.appendChild(bubbleAnchor);

    // Optionally stop clicks, etc., from bubbling up to the map.
    google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
  }
  // ES5 magic to extend google.maps.OverlayView.
  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function () {
    this.getPanes().floatPane.appendChild(this.containerDiv);
  };

  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function () {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  };

  /** Called each frame when the popup needs to draw itself. */
  Popup.prototype.draw = function () {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

    // Hide the popup when it is far out of view.
    var display =
      Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
        ? 'block'
        : 'none';

    if (display === 'block') {
      this.containerDiv.style.left = divPosition.x + 'px';
      this.containerDiv.style.top = divPosition.y + 'px';
    }
    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  };
  return Popup;
}
