const router = require('express').Router();

const auth = require('../middleware/auth');
const verifID = require('../middleware/params');

const List = require('../DB/schema/ListSchema');
const ToDo = require('../DB/schema/ToDoSchema');

router.get('/', auth, async (req, res) => {
  try {
    const lists = await List.find({ author: req.userID });
    res.status(200).json(lists);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.get('/:id', verifID, auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (list.author.toString() !== req.userID) { throw new Error("You can't view this."); }
    console.log({ listID: req.params.id, isFinish: req.query.viewAll ? undefined : false });
    const todo = await ToDo.find({ listID: req.params.id });
    res.status(200).json({ list, todo });
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
});
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;
    await List.create({ name, author: req.userID });
    res.status(201).json({ msg: 'List created with success!' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.put('/:id', verifID, auth, async (req, res) => {
  try {
    const { name } = req.body;
    const list = await List.findById(req.params.id);
    if (list.author.toString() !== req.userID) { throw new Error("You can't edit this."); }
    const newList = await List.findByIdAndUpdate(req.params.id, { name });
    res.status(200).json({ msg: 'Edited with success', list: newList });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.delete('/:id', verifID, auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (list.author.toString() !== req.userID) { throw new Error("You can't edit this."); }
    await ToDo.deleteMany({ listID: req.params.id });
    // eslint-disable-next-line no-underscore-dangle
    // await Promise.all(listToDo.map((x) => ToDo.findByIdAndDelete(x._id)));
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'List and Todo delete with success' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
