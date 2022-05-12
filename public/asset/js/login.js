const login = document.querySelector("#login");

login.addEventListener("submit", event => {
    event.preventDefault();
    const userObj = {
        username: document.querySelector("#loginUsername").value,
        password: document.querySelector("#loginPassword").value,
    };
    console.log(userObj)
    fetch("api/user/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            console.log(res)
            location.href = "/profile";
        } else {
            alert("Invalid login");
        }
    });
});

