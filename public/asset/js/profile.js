const search = document.querySelector("#search");


search.addEventListener("submit", event => {
    event.preventDefault();
    const userObj = {
        name: document.querySelector("#name").value,
        // password: document.querySelector("#searchPassword").value,
    };
    console.log(userObj)
    // fetch("/api/user/login", {
    //     method: "POST",
    //     body: JSON.stringify(userObj),
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // }).then(res => {
    //     if (res.ok) {
    //         location.href = "/profile";
    //     } else {
    //         alert("Invalid search");
    //     }
    // });
});

