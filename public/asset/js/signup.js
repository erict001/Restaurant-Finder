const signup = document.querySelector("#signup");

signup.addEventListener("submit", event => {
    event.preventDefault();
    const userObj = {
        username: document.querySelector("#signupUsername").value,
        password: document.querySelector("#signupPassword").value,
        email: document.querySelector("#signupEmail").value,
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
            location.href = "/login";
        } else {
            alert("An error occured");
        }
    });
});

console.log("linked");