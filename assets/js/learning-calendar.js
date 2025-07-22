// Learning areas and their icons
const areas = ["AI & Technology","Money & Investments","Geopolitics","Space & Science","Startups & Innovations","Sports & Analytics","Current Affairs","Web Trends","Programming Concepts","Psychology & Productivity","Health & BioTech","Climate & Sustainability"];

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

// Current calendar state
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let selectedDate = null;

// Initialize the calendar page
window.onload = function() {
  // Check authentication first
  if (!isLoggedIn()) {
    window.location.href = '../auth.html';
    return;
  }
  
  const trackAreaSelect = document.getElementById('track-area');
  const today = new Date();
  
  // Set today's date as default
  document.getElementById('track-date').value = today.toISOString().split('T')[0];
  
  // Populate area dropdown
  areas.forEach(area => {
    const option = document.createElement('option');
    option.value = area;
    option.textContent = `${areaIcons[area]} ${area}`;
    trackAreaSelect.appendChild(option);
  });
  
  // Generate initial calendar
  generateCalendar(currentYear, currentMonth);
  updateProgressSummary(currentYear, currentMonth);
};

function generateCalendar(year, month) {
  const calendarDays = document.getElementById('calendar-days');
  const calendarTitle = document.getElementById('calendar-title');
  
  // Clear existing calendar
  calendarDays.innerHTML = '';
  
  // Update title
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  calendarTitle.textContent = `${monthNames[month]} ${year}`;
  
  // Get calendar info
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  
  // Get entries for this month
  const monthEntries = getAllEntriesForMonth(year, month);
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day other-month';
    calendarDays.appendChild(emptyDay);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Check if this date has entries
    if (monthEntries[dateString] && monthEntries[dateString].length > 0) {
      dayElement.classList.add('has-entries');
      dayElement.title = `${monthEntries[dateString].length} entries - Click to view details`;
    }
    
    // Mark today
    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
      dayElement.classList.add('today');
    }
    
    // Mark selected date
    if (selectedDate === dateString) {
      dayElement.classList.add('selected');
    }
    
    // Add click handler
    dayElement.addEventListener('click', () => {
      // Remove previous selection
      document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
      });
      
      // Add selection to clicked day
      dayElement.classList.add('selected');
      selectedDate = dateString;
      
      // Update date input
      document.getElementById('track-date').value = dateString;
      
      // Show entries for this date
      showDateDetails(dateString, monthEntries[dateString] || []);
    });
    
    calendarDays.appendChild(dayElement);
  }
}

function getAllEntriesForMonth(year, month) {
  const monthEntries = {};
  
  areas.forEach(area => {
    const entries = getStoredEntriesForArea(area);
    entries.forEach(entry => {
      const entryDate = new Date(entry.date);
      if (entryDate.getFullYear() === year && entryDate.getMonth() === month) {
        const dateString = entry.date;
        if (!monthEntries[dateString]) {
          monthEntries[dateString] = [];
        }
        monthEntries[dateString].push({ area, entry });
      }
    });
  });
  
  return monthEntries;
}

function getStoredEntriesForArea(area) {
  const areaKey = area.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const storageKey = `diary-entries-${areaKey}`;
  const stored = localStorage.getItem(storageKey);
  return stored ? JSON.parse(stored) : [];
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
      showDateDetails(selectedDate, entriesOnDate.map(entry => ({ area: selectedArea, entry })));
    } else {
      showProgressMessage(`📝 No entries found in ${selectedArea} for ${formatDate(selectedDate)}`);
    }
  } else {
    // Check all areas for the selected date
    let totalEntries = 0;
    const areasWithEntries = [];
    const allEntries = [];
    
    areas.forEach(area => {
      const entries = getStoredEntriesForArea(area);
      const entriesOnDate = entries.filter(entry => entry.date === selectedDate);
      if (entriesOnDate.length > 0) {
        totalEntries += entriesOnDate.length;
        areasWithEntries.push(`${areaIcons[area]} ${area} (${entriesOnDate.length})`);
        entriesOnDate.forEach(entry => allEntries.push({ area, entry }));
      }
    });
    
    if (totalEntries > 0) {
      showProgressMessage(`✅ ${totalEntries} total entries found for ${formatDate(selectedDate)}:\n${areasWithEntries.join(', ')}`);
      showDateDetails(selectedDate, allEntries);
    } else {
      showProgressMessage(`📝 No entries found for ${formatDate(selectedDate)}`);
    }
  }
}

function showDateDetails(dateString, entries) {
  if (entries.length === 0) return;
  
  const existingDetails = document.getElementById('date-details');
  if (existingDetails) {
    existingDetails.remove();
  }
  
  const detailsDiv = document.createElement('div');
  detailsDiv.id = 'date-details';
  detailsDiv.style.cssText = `
    background: #fff;
    border-radius: 15px;
    padding: 25px;
    margin-top: 25px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border-left: 4px solid #667eea;
  `;
  
  let html = `<h3 style="color: #333; margin-bottom: 20px;">📅 Entries for ${formatDate(dateString)}</h3>`;
  
  entries.forEach(({ area, entry }) => {
    html += `
      <div style="background: rgba(102, 126, 234, 0.05); padding: 15px; margin: 10px 0; border-radius: 10px; border-left: 3px solid #667eea;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <strong style="color: #667eea;">${areaIcons[area]} ${area}</strong>
          <small style="color: #888;">${new Date(entry.timestamp || entry.date).toLocaleTimeString()}</small>
        </div>
        <h4 style="color: #333; margin-bottom: 8px;">${entry.title}</h4>
        <p style="color: #666; line-height: 1.6;">${entry.content.length > 200 ? entry.content.substring(0, 200) + '...' : entry.content}</p>
      </div>
    `;
  });
  
  detailsDiv.innerHTML = html;
  document.querySelector('.calendar-container').appendChild(detailsDiv);
}

function updateProgressSummary(year, month) {
  const summaryStats = document.getElementById('summary-stats');
  const monthEntries = getAllEntriesForMonth(year, month);
  
  // Calculate statistics
  const totalDays = Object.keys(monthEntries).length;
  const totalEntries = Object.values(monthEntries).reduce((sum, entries) => sum + entries.length, 0);
  const areasActive = new Set();
  
  Object.values(monthEntries).forEach(entries => {
    entries.forEach(({ area }) => areasActive.add(area));
  });
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const consistency = Math.round((totalDays / daysInMonth) * 100);
  
  summaryStats.innerHTML = `
    <div class="stat-card">
      <span class="stat-number">${totalEntries}</span>
      <div class="stat-label">Total Entries</div>
    </div>
    <div class="stat-card">
      <span class="stat-number">${totalDays}</span>
      <div class="stat-label">Active Days</div>
    </div>
    <div class="stat-card">
      <span class="stat-number">${areasActive.size}</span>
      <div class="stat-label">Areas Explored</div>
    </div>
    <div class="stat-card">
      <span class="stat-number">${consistency}%</span>
      <div class="stat-label">Learning Consistency</div>
    </div>
  `;
}

function previousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
  updateProgressSummary(currentYear, currentMonth);
  
  // Remove date details when changing months
  const existingDetails = document.getElementById('date-details');
  if (existingDetails) {
    existingDetails.remove();
  }
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
  updateProgressSummary(currentYear, currentMonth);
  
  // Remove date details when changing months
  const existingDetails = document.getElementById('date-details');
  if (existingDetails) {
    existingDetails.remove();
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
  
  setTimeout(() => {
    messageDiv.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (document.body.contains(messageDiv)) {
        document.body.removeChild(messageDiv);
      }
    }, 300);
  }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
`;
document.head.appendChild(style);

// Authentication function
function isLoggedIn() {
  return localStorage.getItem('questify_user') || sessionStorage.getItem('questify_user');
}