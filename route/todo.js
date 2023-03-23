const router = require("express").Router();

const auth = require("../middleware/auth");
const verifID = require("../middleware/params");

const List = require("../DB/schema/ListSchema");
const ToDo = require("../DB/schema/ToDoSchema");

router.get("/:id", verifID, auth, async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) throw new Error("ToDo don't exist");
    const list = await List.findById(todo.listID.toString());
    if (list && req.userID !== list.author.toString()) {
      throw new Error("Unauthorized");
    }
    res.status(200).json(todo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.post("/", auth, async (req, res) => {
  try {
    const { listID, name, desc, dateEnd } = req.body;
    if (
      typeof name !== "string" ||
      typeof desc !== "string" ||
      !(!dateEnd || typeof dateEnd === "number")
    )
      throw new Error("Invalid value");
    const listSelected = await List.findById(listID);
    if (!listSelected || listSelected.author.toString() !== req.userID) {
      throw new Error("Unauthorized");
    }
    const options = { name, desc, listID };
    if (dateEnd) options.dateEnd = new Date(dateEnd);
    await ToDo.create(options);
    res.status(201).json({ msg: "ToDo created with success " });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.put("/:id", verifID, auth, async (req, res) => {
  try {
    const { name, desc, isFinish } = req.body;
    if (
      !(!name || typeof name === "string") ||
      !(!desc || typeof desc === "string") ||
      !(!isFinish || typeof isFinish === "boolean")
    )
      throw new Error("Invalid value");
    const todo = await ToDo.findById(req.params.id);
    if (!todo) throw new Error("ToDo don't exist");
    const list = await List.findById(todo.listID.toString());
    if (req.userID !== list.author.toString()) {
      throw new Error("Unauthorized");
    }
    await ToDo.findByIdAndUpdate(req.params.id, { name, desc, isFinish });
    res.status(200).json({ msg: "Edited with success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.delete("/:id", verifID, auth, async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) throw new Error("ToDo don't exist");
    const list = await List.findById(todo.listID.toString());
    if (req.userID !== list.author.toString()) {
      throw new Error("Unauthorized");
    }
    await ToDo.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "ToDo Deleted with success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
