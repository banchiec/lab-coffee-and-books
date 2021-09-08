let itemsPlace = document.querySelectorAll('.itemPlace')
itemsPlace.forEach((element) => {
    element.addEventListener('click', () => {
        setTimeout(() => {
            const map = new google.maps.Map(
                document.querySelector('#myMap'),
                {
                    zoom: 15,
                    center: directions.ironhackBCN.coords,
                    styles: mapStyles.retro
                }
            )
        }, 1000);
        // alert(element.value)
    })
})

function printPlaces(places, map) {

    // console.log(places)

    places.forEach(element => {

        let position = {
            lat: element.location.coordinates[0],
            lng: element.location.coordinates[1]
        }
        new google.maps.Marker({ map, position, title: element.name })
    });
}
function getPlace(map) {
    axios
        .get('/api/lugares')
        .then((response) => {
            printPlaces(response.data, map)
        })
        .catch(error => console.error(error))
}

function initMap() {

    const map = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 15,
            center: directions.ironhackMAD.coords,
            styles: mapStyles.retro
        }
    )
    getPlace(map)


}