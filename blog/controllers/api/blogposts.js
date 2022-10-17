//assignment example like project routes lesson 28
const router = require('express').Router();
const { Blog } = require('../../modules');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            blogger_id: req.session.blogger_id,
        });
        
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});
