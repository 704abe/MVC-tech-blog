const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// endpoint for /api/comment

// returns all comments (backend use)
router.get('/', async (req, res) => {
  try {
    const allComments = await Comment.findAll();
    res.json(allComments);
  } catch (err) {
    res.status(400).json(err);
  }
});

// returns one comment (backend use)
router.get('/:id', async (req, res) => {

  Comment.findOne({
    where: {id: req.params.id}
  }).then(
    singleComment => res.json(singleComment)
  ).catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

// comment post route (post)
router.post('/', withAuth, async (req, res) => {
  try {
      const newComment = await Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.body.post_id
      });
      console.log('commentRoutes line 24', newComment);
      res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// comment update route (dashboard)
router.put('/:id', withAuth, async (req, res) => {
  console.log(req.params.id, req.body)
    try {
      const updatedComment = await Comment.update({
        content: req.body.content,
      },
      {
        where: {
            id: req.params.id
        }
      });
  
      res.status(200).json(updatedComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// comment delete route (dashboard)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log('delete request', req);
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
