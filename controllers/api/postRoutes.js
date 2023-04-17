const router = require("express").Router();
const Post = require("../../models/Post");
const withAuth = require("../../utils/auth");
//const withAuth = require("../../utils/auth");

// API route to add new posts
router.post("/", async (req, res) => {
  // add this once authentication is done ->  withAuth
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

//API route to delete specific Posts
router.delete("/:id", async (req, res) => {
  // add this once authentication is done ->  withAuth
  try {
    const deletePost = await Post.destroy({
      where: {
        post_id: req.params.id,
        //  user_id: req.session.user_id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        tag_id: req.body.tag_id, // add tag_id field here
      },
      {
        where: {
          post_id: req.params.id,
        },
      }
    );

    if (updatedPost[0] === 0) {
      return res.status(404).json({ message: "No post found with this ID" });
    }

    const updatedPostData = await Post.findByPk(req.params.id);
    res.status(200).json(updatedPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
