# Questify Learning Hub

A beautiful, modern learning diary application with animated UI and organized note-taking for 12 different learning areas.

## Project Structure

```
learning-hub-final/
├── index.html                 # Main hub homepage
├── README.md                  # Project documentation
├── assets/                    # All static assets
│   ├── css/
│   │   ├── style.css         # Main hub styling
│   │   ├── diary-style.css   # Diary pages styling
│   │   ├── learning-calendar.css # Calendar page styling
│   │   └── auth-style.css    # Authentication page styling
│   ├── js/
│   │   ├── script.js         # Main hub functionality
│   │   ├── diary-script.js   # Diary pages functionality
│   │   ├── learning-calendar.js # Calendar page functionality
│   │   └── auth-script.js    # Authentication functionality
│   ├── icons/
│   │   ├── favicon.svg       # Browser tab icon (32x32)
│   │   ├── logo.svg          # Main logo (200x60)
│   │   ├── logo-q.svg        # Circular Q logo (60x60)
│   │   └── logo-mini.svg     # Compact logo (120x40)
│   └── images/               # Future images directory
├── pages/                     # All diary and utility pages
│   ├── ai-technology.html
│   ├── sports-analytics.html
│   ├── climate-sustainability.html
│   ├── current-affairs.html
│   ├── geopolitics.html
│   ├── health-biotech.html
│   ├── money-investments.html
│   ├── programming-concepts.html
│   ├── psychology-productivity.html
│   ├── space-science.html
│   ├── startups-innovations.html
│   ├── web-trends.html
│   ├── learning-calendar.html # Dedicated learning calendar page
│   ├── auth.html             # Sign in/Sign up authentication page
│   └── test-keys.html        # LocalStorage testing utility
└── docs/                     # Documentation
    └── LOGO-GUIDE.md         # Logo system documentation
```

## Features

- **User Authentication**: Secure sign in/sign up system with username/email login support and session management
- **Dual Login Support**: Login with either username or email address for enhanced flexibility
- **12 Learning Areas**: Dedicated diary pages for different topics
- **Modern UI**: Gradient backgrounds, animations, and responsive design
- **Local Storage**: Persistent note storage in browser
- **Delete Functionality**: Remove entries with confirmation dialogs
- **Logo System**: Complete branding with multiple logo variants
- **Responsive**: Works on desktop and mobile devices
- **Typography**: Beautiful fonts from Google Fonts
- **Dedicated Learning Calendar**: Visual calendar page showing learning progress with interactive features
- **Progress Monitoring**: Simple progress checking on main hub and detailed calendar view

## Learning Areas

1. 🤖 AI & Technology
2. 💰 Money & Investments
3. 🌍 Geopolitics
4. 🚀 Space & Science
5. 💡 Startups & Innovations
6. ⚽ Sports & Analytics
7. 📰 Current Affairs
8. 🌐 Web Trends
9. 💻 Programming Concepts
10. 🧠 Psychology & Productivity
11. 🧬 Health & BioTech
12. 🌱 Climate & Sustainability

## Usage

1. **Authentication**: 
   - Visit `pages/auth.html` to sign in or create an account
   - Create account with username, email, and password
   - Login using either your username OR email address  
   - Users must register before they can log in (no more demo mode)
   - Demo user available: username `demo` / password `demo123`
   - User sessions are stored locally with optional "Remember Me"
2. Open `index.html` in a web browser (requires authentication)
3. Click on any learning area card to open its diary
4. Add new entries using the "Add New Entry" button in individual diaries
5. **Track Your Learning** section on main hub:
   - Click "Check Progress" to see a simple text summary
   - Click "View Learning Calendar" to open the dedicated calendar page
6. **Learning Calendar Page** (`/pages/learning-calendar.html`):
   - Visual monthly calendar with entry indicators (✓)
   - Click dates to see detailed entries for that day
   - Navigate between months with arrow buttons
   - View progress statistics (total entries, active days, consistency)
   - Legend showing different entry types
7. View, edit, or delete existing entries in individual diary pages
8. Use the "View Notes" section on the main hub to see recent entries from all areas
9. **User Management**: 
   - User name displayed in navbar
   - Logout button to end session and return to auth page

## Technical Details

- **Storage**: Uses localStorage with unique keys per learning area
- **Styling**: CSS3 with animations and responsive design
- **JavaScript**: Vanilla ES6+ for all functionality
- **Icons**: SVG-based logo system with gradients
- **Fonts**: Poppins, Inter, and Playfair Display from Google Fonts

## Recent Updates

- ✅ **Enhanced Authentication**: Added username/email dual login support with smart format detection
- ✅ **Improved Signup Flow**: Added separate username field to registration process with validation
- ✅ **Added User Authentication**: Complete sign in/sign up system with session management and logout functionality
- ✅ **Enhanced Navbar**: Added user name display and logout button with responsive design
- ✅ **Removed Google Calendar Integration**: Cleaned up unused Google Calendar functionality and simplified navigation
- ✅ **Separated Calendar Functionality**: Moved comprehensive calendar from main hub to dedicated `/pages/learning-calendar.html`
- ✅ **Simplified Main Hub**: Track section now focuses on simple progress checking with two clear buttons
- ✅ **Enhanced Calendar Features**: Interactive monthly view with date selection, progress stats, and detailed entry viewing
- ✅ **Cleaned Up CSS**: Removed redundant calendar styles from main CSS file
- ✅ **Improved Navigation**: Clear separation between progress checking and calendar visualization
- ✅ Fixed screen blinking animation issues
- ✅ Added comprehensive delete functionality
- ✅ Created complete logo system
- ✅ Reorganized project structure
- ✅ Centered all headings across pages
- ✅ Enhanced responsive design
