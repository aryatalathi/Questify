// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is already logged in
  if (isLoggedIn()) {
    window.location.href = '../index.html';
  }

  // Form submissions
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('signup-form').addEventListener('submit', handleSignup);
});

// Switch between login and signup forms
function switchToSignup() {
  document.getElementById('login-form').classList.remove('active');
  document.getElementById('signup-form').classList.add('active');
}

function switchToLogin() {
  document.getElementById('signup-form').classList.remove('active');
  document.getElementById('login-form').classList.add('active');
}

function showForgotPassword() {
  showMessage('Please contact support or create a new account if you forgot your credentials.', 'error');
}

// Development helper functions (remove in production)
function createDemoUser() {
  const registeredUsers = getRegisteredUsers();
  const demoUser = {
    id: 'demo_user_123',
    name: 'Demo User',
    username: 'demo',
    email: 'demo@example.com',
    password: 'demo123',
    createdAt: new Date().toISOString()
  };
  
  // Check if demo user already exists
  const existingDemo = registeredUsers.find(user => user.username === 'demo');
  if (!existingDemo) {
    registeredUsers.push(demoUser);
    localStorage.setItem('questify_registered_users', JSON.stringify(registeredUsers));
    console.log('Demo user created: username="demo", password="demo123"');
  }
}

function clearAllUsers() {
  localStorage.removeItem('questify_registered_users');
  console.log('All registered users cleared');
}

// Create demo user on page load for testing
createDemoUser();

// Handle login form submission
async function handleLogin(e) {
  e.preventDefault();
  
  const identifier = document.getElementById('login-identifier').value.trim();
  const password = document.getElementById('login-password').value;
  const rememberMe = document.getElementById('remember-me').checked;
  
  // Check if identifier is email or username
  const isEmail = validateEmail(identifier);
  
  if (!identifier) {
    showMessage('Please enter your username or email address', 'error');
    return;
  }
  
  if (!isEmail && identifier.length < 3) {
    showMessage('Username must be at least 3 characters long', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('Password must be at least 6 characters long', 'error');
    return;
  }
  
  // Show loading state
  const submitBtn = e.target.querySelector('.auth-btn');
  submitBtn.classList.add('loading');
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user exists in our registered users
    const registeredUsers = getRegisteredUsers();
    const user = findUser(registeredUsers, identifier, isEmail);
    
    if (!user) {
      // User doesn't exist - prompt to sign up
      const userType = isEmail ? 'email address' : 'username';
      showMessage(`This ${userType} is not registered. Please sign up first!`, 'error');
      
      // Auto-switch to signup form after 2 seconds
      setTimeout(() => {
        switchToSignup();
        // Pre-fill the identifier if it's an email
        if (isEmail) {
          document.getElementById('signup-email').value = identifier;
        } else {
          document.getElementById('signup-username').value = identifier;
        }
      }, 2000);
      
      return;
    }
    
    // Verify password (in real app, this would be hashed comparison)
    if (user.password !== password) {
      showMessage('Invalid password. Please try again.', 'error');
      return;
    }
    
    // Successful login - create session
    const userData = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      loginTime: new Date().toISOString(),
      rememberMe: rememberMe
    };
    
    // Store user session
    if (rememberMe) {
      localStorage.setItem('questify_user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('questify_user', JSON.stringify(userData));
    }
    
    showMessage('Login successful! Redirecting...', 'success');
    
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 1000);
    
  } catch (error) {
    console.error('Login error:', error);
    showMessage('Login failed. Please try again.', 'error');
  } finally {
    submitBtn.classList.remove('loading');
  }
}

// Handle signup form submission
async function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signup-name').value.trim();
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const agreeTerms = document.getElementById('agree-terms').checked;
  
  // Validation
  if (name.length < 2) {
    showMessage('Name must be at least 2 characters long', 'error');
    return;
  }
  
  if (username.length < 3) {
    showMessage('Username must be at least 3 characters long', 'error');
    return;
  }
  
  if (!/^\w+$/.test(username)) {
    showMessage('Username can only contain letters, numbers, and underscores', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showMessage('Please enter a valid email address', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('Password must be at least 6 characters long', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showMessage('Passwords do not match', 'error');
    return;
  }
  
  if (!agreeTerms) {
    showMessage('Please agree to the Terms & Conditions', 'error');
    return;
  }
  
  // Check if username or email already exists
  const registeredUsers = getRegisteredUsers();
  const existingUser = registeredUsers.find(user => 
    user.username.toLowerCase() === username.toLowerCase() || 
    user.email.toLowerCase() === email.toLowerCase()
  );
  
  if (existingUser) {
    if (existingUser.username.toLowerCase() === username.toLowerCase()) {
      showMessage('This username is already taken. Please choose a different one.', 'error');
    } else {
      showMessage('This email is already registered. Please use a different email or sign in.', 'error');
    }
    return;
  }
  
  // Show loading state
  const submitBtn = e.target.querySelector('.auth-btn');
  submitBtn.classList.add('loading');
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create new user account
    const newUser = {
      id: generateUserId(),
      name: name,
      username: username,
      email: email,
      password: password, // In real app, this would be hashed
      createdAt: new Date().toISOString()
    };
    
    // Store user in registered users list
    registeredUsers.push(newUser);
    localStorage.setItem('questify_registered_users', JSON.stringify(registeredUsers));
    
    // Create user session
    const userData = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      loginTime: new Date().toISOString(),
      rememberMe: false
    };
    
    // Store user session
    sessionStorage.setItem('questify_user', JSON.stringify(userData));
    
    showMessage('Account created successfully! Redirecting...', 'success');
    
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 1000);
    
  } catch (error) {
    console.error('Signup error:', error);
    showMessage('Account creation failed. Please try again.', 'error');
  } finally {
    submitBtn.classList.remove('loading');
  }
}

// Utility functions
function getRegisteredUsers() {
  const usersStr = localStorage.getItem('questify_registered_users');
  return usersStr ? JSON.parse(usersStr) : [];
}

function findUser(registeredUsers, identifier, isEmail) {
  return registeredUsers.find(user => {
    if (isEmail) {
      return user.email.toLowerCase() === identifier.toLowerCase();
    } else {
      return user.username.toLowerCase() === identifier.toLowerCase();
    }
  });
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
}

function getNameFromEmail(email) {
  const name = email.split('@')[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function generateUsernameFromEmail(email) {
  return email.split('@')[0];
}

function capitalizeUsername(username) {
  return username.charAt(0).toUpperCase() + username.slice(1);
}

function isLoggedIn() {
  return localStorage.getItem('questify_user') || sessionStorage.getItem('questify_user');
}

function getCurrentUser() {
  const userStr = localStorage.getItem('questify_user') || sessionStorage.getItem('questify_user');
  return userStr ? JSON.parse(userStr) : null;
}

function logout() {
  localStorage.removeItem('questify_user');
  sessionStorage.removeItem('questify_user');
  window.location.href = 'pages/auth.html';
}

function showMessage(message, type) {
  // Remove existing messages
  const existingMessages = document.querySelectorAll('.message');
  existingMessages.forEach(msg => msg.remove());
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  // Insert at the top of the active form
  const activeForm = document.querySelector('.auth-form.active');
  const formTitle = activeForm.querySelector('h2');
  formTitle.insertAdjacentElement('afterend', messageDiv);
  
  // Auto-remove after 5 seconds for error messages
  if (type === 'error') {
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

// Export functions for use in other scripts
window.authUtils = {
  isLoggedIn,
  getCurrentUser,
  logout
};
