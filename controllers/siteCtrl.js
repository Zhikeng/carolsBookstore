const User = require('../models/userModel');
const siteData = require('../data/siteData');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport')

module.exports = {
  index: (request, response) => {
    response.render('pages/index', {
      name: siteData.userName,
      copyrightYear: siteData.year,
      signedIn: siteData.signedIn
    });
  },
  register_get: (request, response) => {
    response.render('pages/register', {
      copyrightYear: siteData.year
    });
  },
  register_post: (request, response) => {
    // const {username, password} = request.body;
    // bcrypt.hash(password, saltRounds, (error, hash) => {
    //   const newUser = new User({
    //     username: username,
    //     password: hash
    //   });
    //   newUser.save();
    //   console.log(`The hash value being saved where the password string was saved previously is: ${hash}.`);
    //   response.redirect('/admin');
    // }); 
    User.register({ username: request.body.username }, request.body.password, (error, user) => {
      if (error) {
        console.log(error)
        response.redirect('/register')
      } else {
        passport.authenticate('local')(request, response, () => {
          response.redirect('/')
        })
      }
    })
  },
  login_get: (request, response) => {
    response.render('pages/login', {
      copyrightYear: siteData.year
    });
  },
  login_post: (request, response) => {
    //   const {username, password} = request.body;
    //   console.log(`password entered is: ${password}`);
    //   User.findOne({username: username}, (error, foundUser) => {
    //     if (error) {
    //       console.log(`The error at login is: ${error}`);
    //     } else {
    //       if(foundUser) {
    //         console.log(`username was matched: ${foundUser.username}`);
    //         console.log(`their password is: ${foundUser.password}`);
    //         bcrypt.compare(password, foundUser.password, (error, result) => {
    //           if (result === true) {
    //             console.log(`user ${foundUser.username} successfully logged in`);
    //             response.redirect('/admin');
    //           };
    //         });
    //       };
    //     };
    //  });
    // }
    const user = new User({
      username: request.body.username,
      password: request.body.password
    });
    request.login(user, (error) => {
      if (error) {
        return error
      } else {
        passport.authenticate('local')(request, response, () => {
          response.redirect('/')
        })
      }
    })
  },
  logout: (request, response) => {
    request.logout(function (error) {
      if (error) {
        return next(error)
      } else {
        response.redirect('/')
      }
    })
  },
  google_get: passport.authenticate('google', { scope: ['openid', 'profile', 'email']}),
  google_redirect_get: [
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res){
      // Successful authentication, redirect home
      res.redirect('/admin')
    }
  ]
}