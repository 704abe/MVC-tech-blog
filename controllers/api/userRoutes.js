const router = require('express').Router();
const { User } = require('../../models');

// endpoint for /api/users

router.get('/', async (req, res) => {
  try {
  let allUsers = await User.findAll()
  res.json(allUsers)
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    let existingUser = await User.findOne({ where: { username: req.body.username } });
    console.log(existingUser);
    if (existingUser) {
      return json({ message: 'There is already a user with this username. Please choose another.' });
    }
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log('this is in the catch');
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let deletedUser = await User.destroy( { where: { id: req.params.id } } );
    let allUsers = await User.findAll()
    res.json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;