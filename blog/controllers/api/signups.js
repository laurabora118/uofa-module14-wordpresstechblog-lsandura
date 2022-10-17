//help in mini project lesson 28 mvc
const router = require('express').Router();
const { Blogger } = require('../../models/signups');

router.post('/', async (req, res) => {
  try {
    const Bloggers = await Blogger.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(Bloggers);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const bloggerData = await Blogger.findOne({ where: { email: req.body.email } });

    if (!bloggerData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    console.log(bloggerData);

    const validPassword = await bloggerData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'please try email or password again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.blogger_id = bloggerData.id;
      req.session.logged_in = true;
      
      res.json({ Blogger: bloggerData, message: 'logged in!' });
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

module.exports = router;

