// create a utility function that will reroute any user that is not logged in to the login page
// if they're trying to access a website feature that is exclusive to logged in users
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
};

module.exports = withAuth;