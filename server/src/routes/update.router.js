const { User } = require('../../db/models');
const updateRouter = require('express').Router();

updateRouter.put('/update', async (req, res) => {
  const { id, name, email, password } = req.body;

  console.log(req.body);

  try {
    const user = await User.findByPk(id);
    console.log(user);

    user.username = name;
    user.email = email;
    user.password = password;
    user.updatedAt = new Date();

    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = updateRouter;
