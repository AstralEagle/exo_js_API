const router = require('express').Router();

const auth = require("../middleware/auth")

const List = require("../DB/schema/ListSchema")
const ToDO = require("../DB/schema/ToDoSchema")

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
        if (list.author.toString() !== req.userID)
            throw new Error("You can't view this.")
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
router.put("/:listId", auth, async (req, res) => {
    try{
        const {name} = req.body
        const list = await List.findById(req.params.listId)
        if (list.author.toString() !== req.userID)
            throw new Error("You can't edit this.")
        const newList = await List.findByIdAndUpdate(req.params.listId, {name})
        res.status(200).json({msg: "Edited with success", list: newList})
    }catch (e) {
        res.status(500).json({error: e.message})
    }
})
router.delete("/:listId", auth, async (req, res) => {
    try{
        const list = await List.findById(req.params.listId)
        if (list.author.toString() !== req.userID)
            throw new Error("You can't edit this.")
        const listToDo = await ToDo.findAnd({listID: req.params.listId})
        await Promise.all(listToDo.map(async (x) => await ToDo.findByIdAndDelete(x._id) ))
        await List.findByIdAndDelete(req.params.listId)
        res.status(200).json({msg: "List and Todo delete with success"})
    }catch (e) {
        res.status(500).json({error: e.message})
    }
})

module.exports = router;