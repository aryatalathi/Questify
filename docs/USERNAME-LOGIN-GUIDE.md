# Username/Email Login Guide

## 🎯 New Feature: Dual Login Support

The Questify Learning Hub now supports login with both **username** and **email address**!

## ✨ Features

### Login Options
- **Email Login**: `user@example.com` + password
- **Username Login**: `johndoe` + password
- **Smart Detection**: System automatically detects whether you entered an email or username

### Signup Process
1. **Full Name**: Your display name (e.g., "John Doe")
2. **Username**: Unique identifier (e.g., "johndoe123") 
   - Must be at least 3 characters
   - Can contain letters, numbers, and underscores only
3. **Email**: Your email address
4. **Password**: At least 6 characters

### Validation Rules
- **Username**: 3+ characters, alphanumeric + underscore only
- **Email**: Valid email format required
- **Password**: Minimum 6 characters for security

## 🔧 How It Works

### For Email Login
```
Input: "john@example.com"
System: Detects email format → Validates email → Creates/authenticates user
```

### For Username Login
```
Input: "johndoe"
System: Detects username format → Validates username → Creates/authenticates user
```

## 🎨 User Interface

### Login Form
- Single input field: "Username or Email Address"
- Smart placeholder text guides users
- Real-time validation with helpful error messages

### Signup Form
- Separate fields for username and email
- Clear validation feedback
- Modern, responsive design

## 🔒 Security & Session Management

- **User Registration**: Users must sign up before they can log in
- **Duplicate Prevention**: Username and email uniqueness validation
- **Password Storage**: Secure password handling (hashed in production)
- **Session Storage**: Secure user data handling
- **Remember Me**: Optional persistent login
- **Logout Protection**: Clean session termination
- **Demo User Available**: For testing - username: "demo", password: "demo123"

## 📱 Mobile Responsive

- Optimized for all screen sizes
- Touch-friendly interface
- Smooth animations and transitions

## 🚀 Quick Start

1. **Create Account**: Fill out the signup form with username, email, and password
2. **Login**: Use either your username OR email with your password
3. **Enjoy**: Access all learning hub features with your personalized account

**For Testing:**
- A demo user is automatically created: username `demo` / password `demo123`
- Or create your own account through the signup form

## 💡 Example Usage

**Signup:**
- Name: "Alex Johnson"
- Username: "alex_learns"
- Email: "alex@example.com"
- Password: "mypassword123"

**Login Options:**
- Option 1: Use `alex_learns` + password
- Option 2: Use `alex@example.com` + password

Both methods work seamlessly!

---

*This feature enhances user flexibility while maintaining security and user experience.*
