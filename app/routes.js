module.exports = function(app,passport,hbs) {

  // =====================================
  // HOME PAGE ===========================
  // =====================================
  app.get('/', (req,res) => {
    res.render('index', { message: 'Hello there!'})
  })

  // =====================================
  // LOGIN ===============================
  // =====================================
  app.get('/login', (req,res) => {
    res.render('login', {message: req.flash('loginMessage')})
  })

  app.post('/login', passport.authenticate('local-login', {
    successRedirect   : '/profile',
    failureRedirect   : '/login',
    failureFlash      : true
  }))

  // =====================================
  // SIGNUP ==============================
  // =====================================
  app.get('/signup', (req,res) => {
    res.render('signup', {message: req.flash('signupMessage')})
  })

  // app.post('/signup', (req,res) => {
  //   console.log(req.body.email)
  //   console.log(req.body.password)
  //   res.redirect('/signup')
  // })

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect   : '/profile',
    failureRedirect   : '/signup',
    failureFlash      : true
  }))

  // =====================================
  // PROFILE =============================
  // =====================================
  app.get('/profile', (req,res) => {
    res.render('profile', {user: req.user})
  })

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', (req,res) => {
    req.logout()  //A function of passport
    res.redirect('/')
  })



  // =====================================
  // MIDDLEWARE ==========================
  // =====================================
  function isLoggedIn(res,res,next) {
    if (req.isAuthenticated()){
      return next()
    }
    res.redirect('/')
  }

}
