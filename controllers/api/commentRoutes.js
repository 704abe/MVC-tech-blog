const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// endpoint for /api/comment

router.get('/', async (req, res) => {
  try {
    const allComments = await Comment.findAll();
    res.json(allComments);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    if(req.session) {
      const newComment = await Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.body.post_id
      });
      console.log('commentRoutes line 24', newComment);
      res.status(200).json(newComment);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatedComment = await Comment.update({
        ...req.body,
        where: {
            id: req.params.id
        }
      });
  
      res.status(200).json(updatedComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Comment.destroy({
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
