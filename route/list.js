const router = require('express').Router();

const auth = require("../middleware/auth")

const List = require("../DB/schema/ListSchema")
const User = require("../DB/schema/UserSchema")

router.get("/", auth, async (req, res) => {
    try {
        const lists = await List.find({author: req.userID})
        res.status(200).json(lists)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})
router.get("/:listId", auth, async (req, res) => {
    try {
        const list = await List.findById(req.params.listId);
        res.status(200).json(list);
    } catch (e) {
        res.status(200).json({error: e.message})
    }
})
router.post("/", auth, async (req, res) => {
    try {

        const {name} = req.body;
        await List.create({name, author: req.userID})
        res.status(201).json({msg: "List created with success!"})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})
router.put("/:listId")
router.delete("/:listId")

module.exports = router;