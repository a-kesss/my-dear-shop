const { User } = require('../../db/models');
const deleteRouter = require('express').Router();

deleteRouter.delete('/delete', async (req, res) => {
  const { id } = req.body;

  console.log(req.body);
  

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
