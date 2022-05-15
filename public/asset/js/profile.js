const search = document.querySelector("#search");
const render = document.getElementById("restaurantRender");
const faveBtn = document.getElementById("faveBtn");
const resId = document.getElementById("lid");
const faveClick = document.getElementById("favoriteRender");
var ol;
var list;
var favlistIt;
var loclistIt;
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

favorites = JSON.parse(localStorage.getItem("favorites")) || [];
locations = JSON.parse(localStorage.getItem("locations")) || [];

function renderFavorites() {
  for (let i = 0; i < favorites.length; i++) {
    ol = document.querySelector("#favoriteRender");
    list = document.createElement("button");
    favlistIt = favorites[i];
    console.log(favorites);
    loclistIt = locations[i];
    list.innerText = favlistIt;
    list.setAttribute("class", "indigo darken-4 white-text");
    list.setAttribute("id", `${i}`);
    ol.append(list);
  }
  faveClick.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("clicked");
    console.log(event.target.innerText);

    event.target.onclick = function () {
      modal.style.display = "block";
      console.log(event.target.id);
      modal.textContent = locations[event.target.id];
    };
    span.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });
}
renderFavorites();

search.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log("clicked")
  const userObj = {
    busName: document.querySelector("#name").value,
    busLocal: document.querySelector("#local").value,
  };
  // console.log(userObj)
  if (userObj.busName === "" || userObj.busLocal === "") {
    alert("Please enter name/keyword or location/zipcode into search boxes.");
  } else {
    fetch("/api/restaurants", {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            // console.log(data)
            clearRestaurants();
            for (let i = 0; i < Math.min(20, data.length); i++) {
              render.setAttribute("class", "container");
              const rest = document.createElement("li");
              // const restName = data[i].name
              rest.setAttribute("class", "row align-items-start");
              const textdiv = document.createElement("div");
              textdiv.setAttribute("class", "col-7");
              const imgdiv = document.createElement("div");
              imgdiv.setAttribute("class", "col-5");
              // const append = document.createElement('p')
              var callRest = document.createElement("a");
              callRest.setAttribute("href", `tel:${data[i].phone}`);
              callRest.innerText = `${data[i].phone}`;
              const rname = document.createElement("h3");
              rname.textContent = JSON.stringify(data[i].name);
              const rlocale = document.createElement("h5");
              rlocale.innerHTML = JSON.stringify(data[i].location);
              // rest.textContent = JSON.stringify(data[i].name + " " + data[i].location + " ")
              // rest.style.fontSize = "large"
              const image = document.createElement("img");
              image.src = data[i].imageURL;

              const fave = document.createElement("button");
              fave.innerText = "Favorite Restaurant";
              fave.addEventListener("click", saveFavorite);
              fave.setAttribute("data-restaurantName", data[i].name);
              fave.setAttribute(
                "data-restaurantLocation",
                data[i].name +
                  data[i].location +
                  data[i].phone +
                  data[i].imageURL
              );
              render.appendChild(rest);
              rest.append(textdiv, imgdiv);
              textdiv.append(rname, rlocale, callRest, fave);
              imgdiv.append(image);
            }
          });
          console.log(res);
          // location.href = "/profile";
        } else {
          alert("Invalid search");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
});

function clearRestaurants() {
  while (render.lastChild) {
    render.removeChild(render.lastChild);
  }
}

function saveFavorite(event) {
  favorites.unshift(event.target.getAttribute("data-restaurantName"));
  console.log(favorites + "===============================");
  locations.unshift(event.target.getAttribute("data-restaurantLocation"));
  console.log(locations);
  // console.log(favorites)
  localStorage.setItem("favorites", JSON.stringify(favorites));
  localStorage.setItem("locations", JSON.stringify(locations));
  const ol = document.querySelector("#favoriteRender");
  const list = document.createElement("button");
  list.innerText = favorites[0];
  list.setAttribute("class", "indigo darken-4 white-text");
  // favList.append(favorites[0])
  ol.append(list);
}
