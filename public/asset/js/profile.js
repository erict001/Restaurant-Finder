const search = document.querySelector("#search");
const render = document.getElementById('restaurantRender');


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
                    const call = document.createElement('button')
                    call.innerText = 'Call'
                    const menu = document.createElement('button')
                    menu.innerText = 'Is working?'
                    const fave = document.createElement('button')
                    fave.innerText = 'Favorite Restaurant'
                    render.appendChild(rest);
                    rest.append(call,menu,fave);
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

function clearRestaurants () {
    while (render.lastChild) {
        render.removeChild(render.lastChild);
    }
}

