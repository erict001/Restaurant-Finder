const login = document.querySelector("#login");

login.addEventListener("login", event => {
    event.preventDefault();
    const userObj = {
        username: document.querySelector("#loginUsername").value,
        password: document.querySelector("#loginPassword").value,
    };
    console.log(userObj)
    fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/";
        } else {
            alert("Invalid login");
        }
    });
});

const signup = document.querySelector("#signup");

signup.addEventListener("signup", event => {
    event.preventDefault();
    const userObj = {
        username: document.querySelector("#signupUsername").value,
        password: document.querySelector("#signupPassword").value,
    };
    console.log(userObj)
    fetch("/api/user/", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/";
        } else {
            alert("An error occured");
        }
    });
});