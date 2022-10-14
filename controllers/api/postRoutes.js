const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// endpoint for /api/post

// returns all posts (home)
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    res.json(allPosts);
  } catch (err) {
    res.status(400).json(err)
  }
});

// returns post by id (post)
router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const singlePost = await Post.findAll({
      where: { id : req.params.id }
    });
    res.json(singlePost);
  } catch (err) {
    res.status(400).json(err)
  }
});

// new post route (dashboard)
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// post update route (dashboard)
router.put('/:id', withAuth, async (req, res) => {
  Post.update({
    title: req.body.title,
    content: req.body.content
  },
  {
    where: {
      id: req.params.id
    }
  }).then(updatedPost => {
    res.status(200).json(updatedPost);
  }).catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// post delete route (dashboard)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
