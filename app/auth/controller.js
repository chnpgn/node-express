import { User } from './model.js'
import { compare } from './crypt.js';

export const showLogin = (req, res) => {
  res.render('auth/login', { title: 'Login::', layout: 'plain'});
};

export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.redirect("/login?error=Missing%20credentials");
    return;
  }

  const user = await User.findOne({
    email: email.toLowerCase()
  })

  if(!user) {
    res.redirect("/login?error=Missing%20credentials");
    return;
  }

  // Placeholder for authentication logic
  if (await compare(password, user.password)) {
    // Set a cookie or session here for real authentication
    req.session.user = { email, isAuthenticated: true }; // Example of setting a session user
    return res.redirect("/guitars"); // Redirect to guitars page after successful login
  } else {
    res.redirect("/login?error=Invalid%20credentials");
  }
};

export const logoutUser = (req, res) => {
  // Placeholder for logout logic
  req.session.destroy();
  res.redirect("/");
};

export const checkAuth = (req, res, next) => {
  // Placeholder for authentication logic
  const isAuthenticated = req.session.user?.isAuthenticated; // Replace with real auth check
  if (!isAuthenticated) {
    return res.redirect("/login"); // Uncomment if you have a login page
  }
  next();
};
