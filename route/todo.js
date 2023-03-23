const router = require('express').Router();

const auth = require("../middleware/auth")

const List = require("../DB/schema/ListSchema")
const ToDo = require("../DB/schema/ToDoSchema")

router.get("/:todoId", auth, async (req, res) => {
    try{
        const todo = await ToDo.findByID(req.params.todoId);
        const list = await List.findByID(todo.listID.toString());
        if(req.userID !== list.author.toString())
            throw new Error("You can't read that.")
        res.status(200).json(todo);
    }catch (e) {
        res.status(500).json({error: e.message})
    }
})
router.post("/", auth, async (req, res) => {
    try {
        const {listID, name, desc} = req.body;
        const listSelected = await List.findById(listID)
        if (listSelected.author.toString() !== req.userID)
            throw new Error("Unauthorized")
        await ToDo.create({name, desc, listID})
        res.status(201).json({msg : "ToDo created with success"})
    } catch (e) {
        res.status(500).json({error: e.message});
    }
})
router.put("/:todoId", auth, async (req, res) => {
    try{
        const {name, desc} = req.body;
        const todo = await ToDo.findByID(req.params.todoId);
        const list = await List.findByID(todo.listID.toString());
        if(req.userID !== list.author.toString())
            throw new Error("You can't read that.")
        ToDo.findByIdAndUpdate(req.params.todoId, {name, desc})
        res.status(200).json({msg: "Edited with success"});
    }catch (e) {
        res.status(500).json({error: e.message})
    }
})
router.delete("/:todoId", auth, async (req, res) => {
    try{
        const todo = await ToDo.findByID(req.params.todoId);
        const list = await List.findByID(todo.listID.toString());
        if(req.userID !== list.author.toString())
            throw new Error("You can't read that.")
        await ToDo.findByIDAndDelete(req.params.todoId)
        res.status(200).json({msg: "ToDo Deleted with success"})

    }catch (e) {
        res.status(500).json({error: e.message})
    }
})

module.exports = router;