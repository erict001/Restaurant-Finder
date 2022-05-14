const search = document.querySelector("#search");
const render = document.getElementById('restaurantRender');
const faveBtn = document.getElementById('faveBtn')
const resId = document.getElementById('lid')
const faveClick = document.getElementById('favoriteRender')
var ol;
var list;
var favlistIt;
var loclistIt;

favorites = JSON.parse(localStorage.getItem("favorites")) || []
locations = JSON.parse(localStorage.getItem("locations")) || []

function renderFavorites() {
    for (let i = 0; i < favorites.length; i++) {
        ol = document.querySelector("#favoriteRender")
        list = document.createElement("button");
        favlistIt = favorites[i]
        loclistIt = locations[i]
        list.innerText = favlistIt + " " + loclistIt
        list.setAttribute('class','indigo darken-4 white-text')
        list.setAttribute("id",`${i}`)
        ol.append(list)      
    }
    faveClick.addEventListener("click", event=>{
        event.preventDefault();
        console.log("clicked")
        console.log(list.innerText)
        console.log(this)
        // console.log(this)
        // const userFave = {
        //     busName: favlistIt[i],
        //     busLocal: loclistIt[i]
        // };
        // console.log(userFave)
        // fetch("/api/restaurants", {
        //     method: "POST",
        //     body: JSON.stringify(userFave),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }).then(res => {
        //     if (res.ok) {
        //         res.json().then(data => {
        //             console.log(data)
        //         })
        //     }
        // })
    })
}
renderFavorites();


search.addEventListener("submit", event => {
    event.preventDefault();
    // console.log("clicked")
    const userObj = {
        busName: document.querySelector("#name").value,
        busLocal: document.querySelector("#local").value,
    };
    // console.log(userObj)
    fetch("/api/restaurants", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            res.json().then(data => {
                // console.log(data)
                clearRestaurants();
                for (let i = 0; i < Math.min(20, data.length); i++) {
                    const rest = document.createElement('li')
                    // const restName = data[i].name
                    rest.setAttribute('id', 'lid')
                    // const append = document.createElement('p')
                    var callRest = document.createElement('a')
                    callRest.setAttribute('href',`tel:${data[i].phone}`)
                    callRest.innerText = `${data[i].phone}`
                    rest.textContent = JSON.stringify(data[i].name + " " + data[i].location + " ")
                    const image = document.createElement('img')
                    image.src = (data[i].imageURL)
                    image.style = "height:80px"
                    const fave = document.createElement('button')
                    fave.innerText = 'Favorite Restaurant'
                    fave.addEventListener("click", saveFavorite)
                    fave.setAttribute("data-restaurantName", data[i].name)
                    fave.setAttribute("data-restaurantLocation", data[i].location)
                    render.appendChild(rest);
                    rest.append(callRest, image, fave);
                }
            })
            console.log(res)
            // location.href = "/profile";
        } else {
            alert("Invalid search");
        }
    }).catch(e => {
        console.error(e)
    })
});

function clearRestaurants() {
    while (render.lastChild) {
        render.removeChild(render.lastChild);
    }
}


function saveFavorite (event) {
    favorites.unshift(event.target.getAttribute("data-restaurantName"))
    locations.unshift(event.target.getAttribute("data-restaurantLocation"))
    // console.log(favorites)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    localStorage.setItem("locations", JSON.stringify(locations))
    const ol = document.querySelector("#favoriteRender")
    const list = document.createElement("button");
    list.innerText = favorites[0]
    // favList.append(favorites[0])
    ol.append(list)
    // renderFavorites();
}
