const express = require("express");
const router = express.Router();
const { User, Favorite } = require("../../models/");
const bcrypt = require("bcrypt");

//find all
router.get("/data", (req, res) => {
    User.findAll({
        include: [Favorite]
    })
        .then(dbUsers => {
            res.json(dbUsers);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});





//find one
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id, {})
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("login")
})

//create user
router.post("/", (req, res) => {
    User.create(req.body)
        .then(newUser => {
            req.session.user = {
                id: newUser.id,
                username: newUser.username,
                password: newUser.password,
                email: newUser.email
            }
            res.json(newUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(400).json({ msg: "Wrong login credentials" })
        }
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.user = {
                id: foundUser.id,
                username: foundUser.username
            }
            return res.json(foundUser)
        } else {
            return res.status(400).json({ msg: "Wrong login credentials" })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error occured", err });
    });
});

//update user
router.put("/:id", (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updatedUser => {
        res.json(updatedUser);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

//delete a user
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(delUser => {
        res.json(delUser);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

// router.get("/logout", (req, res) => {
//     req.session.destroy();
//     res.redirect("/")
// })

module.exports = router;