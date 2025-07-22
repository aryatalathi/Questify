const areas = ["AI & Technology","Money & Investments","Geopolitics","Space & Science","Startups & Innovations","Sports & Analytics","Current Affairs","Web Trends","Programming Concepts","Psychology & Productivity","Health & BioTech","Climate & Sustainability"];

// Create URL-friendly slugs for each area
const areaUrls = {
  "AI & Technology": "pages/ai-technology.html",
  "Money & Investments": "pages/money-investments.html", 
  "Geopolitics": "pages/geopolitics.html",
  "Space & Science": "pages/space-science.html",
  "Startups & Innovations": "pages/startups-innovations.html",
  "Sports & Analytics": "pages/sports-analytics.html",
  "Current Affairs": "pages/current-affairs.html", 
  "Web Trends": "pages/web-trends.html",
  "Programming Concepts": "pages/programming-concepts.html",
  "Psychology & Productivity": "pages/psychology-productivity.html",
  "Health & BioTech": "pages/health-biotech.html",
  "Climate & Sustainability": "pages/climate-sustainability.html"
};

// Icons for each learning area
const areaIcons = {
  "AI & Technology": "🤖",
  "Money & Investments": "💰", 
  "Geopolitics": "🌍",
  "Space & Science": "🚀",
  "Startups & Innovations": "💡",
  "Sports & Analytics": "⚽",
  "Current Affairs": "📰", 
  "Web Trends": "🌐",
  "Programming Concepts": "💻",
  "Psychology & Productivity": "🧠",
  "Health & BioTech": "🧬",
  "Climate & Sustainability": "🌱"
};

window.onload = function() {
  // Check authentication first
  if (!isLoggedIn()) {
    window.location.href = 'pages/auth.html';
    return;
  }
  
  // Update user name in navbar
  updateUserInterface();
  
  const cards = document.getElementById('cards');
  const notes = document.getElementById('notes');
  const trackAreaSelect = document.getElementById('track-area');
  
  // Set today's date as default for tracking
  const today = new Date();
  document.getElementById('track-date').value = today.toISOString().split('T')[0];
  
  areas.forEach(area => {
    // Create clickable cards that navigate to diary pages
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${area}</h3>
      <div class="card-icon">${areaIcons[area]}</div>
    `;
    card.onclick = () => window.location.href = areaUrls[area];
    cards.appendChild(card);
    
    // Create note cards with "View Notes" buttons that show diary entries
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';
    noteCard.innerHTML = `
      <h3>${area}</h3>
      <button onclick='viewNotes("${area}")'>View And Add Notes</button>
      <div class='note-content' id='notes-${area.replace(/[^a-zA-Z0-9]/g, "")}'>
        <div class="loading">Loading notes...</div>
      </div>
    `;
    notes.appendChild(noteCard);
    
    // Add option to the track area dropdown
    const option = document.createElement('option');
    option.value = area;
    option.textContent = `${areaIcons[area]} ${area}`;
    trackAreaSelect.appendChild(option);
  });
};

function viewNotes(area) {
  const contentId = `notes-${area.replace(/[^a-zA-Z0-9]/g, "")}`;
  const contentDiv = document.getElementById(contentId);
  const card = contentDiv.parentElement;
  
  // Toggle the card active state
  card.classList.toggle('active');
  
  if (card.classList.contains('active')) {
    // Load entries from localStorage for this specific area
    loadNotesForArea(area, contentDiv);
  }
}

function loadNotesForArea(area, contentDiv) {
  // Get stored entries from localStorage for this specific area
  const entries = getStoredEntriesForArea(area);
  
  if (entries.length === 0) {
    contentDiv.innerHTML = `
      <div class="no-notes">
        <p>No notes found for ${area}</p>
        <p><small>Add entries in the <a href="${areaUrls[area]}" style="color: #667eea;">${area} diary</a> to see them here.</small></p>
      </div>
    `;
  } else {
    let notesHTML = `<div class="notes-summary"><h4>Recent Notes (${entries.length})</h4></div>`;
    
    // Show the 5 most recent entries as clickable compact lines
    entries.slice(0, 5).forEach(entry => {
      const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      
      // Create clickable entry that redirects to diary page with entry highlighted
      notesHTML += `
        <div class="mini-entry-compact" onclick="redirectToEntry('${area}', '${entry.date}', ${JSON.stringify(entry.title)})">
          <span class="mini-date-compact">${formattedDate}</span>
          <span class="mini-title-compact">${entry.title}</span>
          <span class="mini-arrow">→</span>
        </div>
      `;
    });
    
    if (entries.length > 5) {
      notesHTML += `<div class="view-all"><a href="${areaUrls[area]}" style="color: #667eea;">View all ${entries.length} entries →</a></div>`;
    }
    
    contentDiv.innerHTML = notesHTML;
  }
}

function getStoredEntriesForArea(area) {
  // Create area-specific localStorage key that matches diary-script.js exactly
  const areaKey = area.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const storageKey = `diary-entries-${areaKey}`;
  const stored = localStorage.getItem(storageKey);
  
  return stored ? JSON.parse(stored) : [];
}

function toggleNote(button) {
  const card = button.parentElement;
  card.classList.toggle('active');
}

function checkLearningProgress() {
  const selectedDate = document.getElementById('track-date').value;
  const selectedArea = document.getElementById('track-area').value;
  
  if (!selectedDate) {
    alert('Please select a date to check progress!');
    return;
  }
  
  if (selectedArea) {
    // Check specific area for the selected date
    const entries = getStoredEntriesForArea(selectedArea);
    const entriesOnDate = entries.filter(entry => entry.date === selectedDate);
    
    if (entriesOnDate.length > 0) {
      showProgressMessage(`✅ ${entriesOnDate.length} entry(ies) found in ${selectedArea} for ${formatDate(selectedDate)}`);
    } else {
      showProgressMessage(`📝 No entries found in ${selectedArea} for ${formatDate(selectedDate)}`);
    }
  } else {
    // Check all areas for the selected date
    let totalEntries = 0;
    const areasWithEntries = [];
    
    areas.forEach(area => {
      const entries = getStoredEntriesForArea(area);
      const entriesOnDate = entries.filter(entry => entry.date === selectedDate);
      if (entriesOnDate.length > 0) {
        totalEntries += entriesOnDate.length;
        areasWithEntries.push(`${areaIcons[area]} ${area} (${entriesOnDate.length})`);
      }
    });
    
    if (totalEntries > 0) {
      showProgressMessage(`✅ ${totalEntries} total entries found for ${formatDate(selectedDate)}:\n${areasWithEntries.join(', ')}`);
      
      // Show progress in the progress display area
      const progressDisplay = document.getElementById('progress-display');
      const progressContent = document.getElementById('progress-content');
      progressDisplay.style.display = 'block';
      
      let html = `<p><strong>📅 ${formatDate(selectedDate)}</strong></p>`;
      html += `<p>Total entries found: <strong>${totalEntries}</strong></p>`;
      html += `<ul style="margin-top: 10px;">`;
      areasWithEntries.forEach(area => {
        html += `<li style="margin: 5px 0;">${area}</li>`;
      });
      html += `</ul>`;
      
      progressContent.innerHTML = html;
    } else {
      showProgressMessage(`📝 No entries found for ${formatDate(selectedDate)}`);
      document.getElementById('progress-display').style.display = 'none';
    }
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function showProgressMessage(message) {
  // Create progress message element
  const messageDiv = document.createElement('div');
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    z-index: 1000;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    animation: slideInRight 0.3s ease-out;
    max-width: 300px;
    white-space: pre-line;
  `;
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
  
  // Remove after 4 seconds
  setTimeout(() => {
    messageDiv.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (document.body.contains(messageDiv)) {
        document.body.removeChild(messageDiv);
      }
    }, 300);
  }, 4000);
}

function redirectToEntry(area, entryDate, entryTitle) {
  // Navigate to the diary page for the area
  // The diary page will need to highlight or scroll to the specific entry
  const url = areaUrls[area];
  
  // Store the entry details in sessionStorage so the diary page can highlight it
  sessionStorage.setItem('highlightEntry', JSON.stringify({
    date: entryDate,
    title: entryTitle
  }));
  
  // Navigate to the diary page
  window.location.href = url;
}

// Authentication functions
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

function updateUserInterface() {
  const user = getCurrentUser();
  if (user) {
    document.getElementById('user-name').textContent = user.name;
    
    // Show welcome message for new logins (only once per session)
    if (!sessionStorage.getItem('welcome_shown')) {
      setTimeout(() => {
        showWelcomeMessage(user.name);
        sessionStorage.setItem('welcome_shown', 'true');
      }, 1000);
    }
  }
}

function showWelcomeMessage(name) {
  const messageDiv = document.createElement('div');
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(76, 175, 80, 0.4);
    z-index: 1000;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    animation: slideInRight 0.5s ease-out;
    max-width: 300px;
  `;
  messageDiv.innerHTML = `🎉 Welcome back, ${name}!<br><small>Ready to continue your learning journey?</small>`;
  document.body.appendChild(messageDiv);
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    messageDiv.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (document.body.contains(messageDiv)) {
        document.body.removeChild(messageDiv);
      }
    }, 300);
  }, 4000);
}


