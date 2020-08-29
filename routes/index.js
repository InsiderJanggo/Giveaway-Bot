const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("index", {
        pageTitle: "Giveaway Bot"
    })
})

module.exports = router;