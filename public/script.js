var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 50, lng: 10 },
    zoom: 5,
  });
}

//get search dropdown options
document.getElementById('searchBtn').addEventListener('click', searchFunc);

function searchFunc(e) {
  e.preventDefault();
  const searchInput = document.getElementById('searchInput');
  fetch('./cityList.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const result = data.filter((e) => e.includes(searchInput.value));
      if (result.length > 10) {
        const shortenResult = result.slice(0, 10);
        console.log(shortenResult);
        // for (const e of shortenResult) {
        // }
      } else {
        console.log(result);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
