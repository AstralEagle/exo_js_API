module.exports = async (req, res, next) => {
  try {
    if (!req.params.id) throw new Error('Invalid param');
    next();
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};
