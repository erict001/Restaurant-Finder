const search = document.querySelector("#search");
const render = document.getElementById('restaurantRender');
const faveBtn = document.getElementById('faveBtn')
const resId = document.getElementById('lid')

var favorites = []

function renderFavorites() {
    var favItems = JSON.parse(localStorage.getItem("favorites"))

    // if (favItems){
    //     var favorites = favItems
    // }
    
}




search.addEventListener("submit", event => {
    event.preventDefault();
    console.log("clicked")
    const userObj = {
        busName: document.querySelector("#name").value,
        busLocal: document.querySelector("#local").value,
    };
    console.log(userObj)
    fetch("/api/restaurants", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {


        if (res.ok) {
            res.json().then(data => {
                console.log(data)
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

                    // const call = document.createElement('button')
                    // call.innerText = 'Call'
                    // const menu = document.createElement('button')
                    // menu.innerText = 'Is working?'
                    const fave = document.createElement('button')
                    fave.innerText = 'Favorite Restaurant'
                    fave.addEventListener("click", saveFavorite)
                    fave.setAttribute("data-restaurantName", data[i].name)

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
    console.log(favorites)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    const ol = document.querySelector("#favoriteRender")
    const list = document.createElement("button");
    list.innerText = favorites[0]
    // favList.append(favorites[0])
    ol.append(list)
    renderFavorites();
}
