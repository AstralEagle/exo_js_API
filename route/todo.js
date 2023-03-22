const router = require('express').Router();

router.get("/")
router.get("/:todoId")
router.post("/")
router.put("/:todoId")
router.delete("/:todoId")

module.exports = router;