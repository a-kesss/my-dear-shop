const deleteRouter = require('express').Router();
const { User } = require('../../db/models');

deleteRouter.delete('/delete', async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = deleteRouter;
