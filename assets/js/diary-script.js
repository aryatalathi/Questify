// Get the current topic from the page title
function getCurrentTopic() {
  const title = document.title;
  return title.split(' - ')[0]; // Extract topic from "Topic - Learning Diary"
}

// Get area-specific localStorage key
function getStorageKey() {
  const topic = getCurrentTopic();
  const areaKey = topic.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return `diary-entries-${areaKey}`;
}

// Get the current date in YYYY-MM-DD format
function getCurrentDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Set today's date as default when page loads
window.onload = function() {
  // Check authentication first
  if (!isLoggedIn()) {
    window.location.href = '../pages/auth.html';
    return;
  }
  
  document.getElementById('entry-date').value = getCurrentDate();
  loadEntries();
  
  // Check if we need to highlight a specific entry
  checkForHighlightEntry();
};

// Show/hide the add entry form
function addNewEntry() {
  const form = document.getElementById('add-entry-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
  
  if (form.style.display === 'block') {
    document.getElementById('entry-date').value = getCurrentDate();
    document.getElementById('entry-title').focus();
  }
}

// Cancel adding new entry
function cancelEntry() {
  document.getElementById('add-entry-form').style.display = 'none';
  clearForm();
}

// Clear the form fields
function clearForm() {
  document.getElementById('entry-title').value = '';
  document.getElementById('entry-content').value = '';
  document.getElementById('entry-date').value = getCurrentDate();
}

// Save new entry
function saveEntry() {
  const date = document.getElementById('entry-date').value;
  const title = document.getElementById('entry-title').value.trim();
  const content = document.getElementById('entry-content').value.trim();
  
  if (!date || !title || !content) {
    alert('Please fill in all fields!');
    return;
  }
  
  // Format the date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Create new entry HTML with delete button
  const entryId = Date.now();
  const newEntry = `
    <div class="diary-entry" data-id="${entryId}" data-date="${date}" data-title="${title}">
      <div class="entry-header">
        <div class="entry-date">${formattedDate}</div>
        <button class="delete-btn" onclick="deleteEntry(${entryId})" title="Delete this entry">
          <span class="delete-icon">🗑️</span>
          <span class="delete-text">Delete</span>
        </button>
      </div>
      <div class="entry-title">${title}</div>
      <div class="entry-content">${content.replace(/\n/g, '<br>')}</div>
      <div class="entry-tags">
        <span class="tag">new entry</span>
      </div>
    </div>
  `;
  
  // Add to the beginning of the entries container
  const entriesContainer = document.getElementById('diary-entries');
  entriesContainer.insertAdjacentHTML('afterbegin', newEntry);
  
  // Save to localStorage with the same ID
  saveToLocalStorage(date, title, content, entryId);
  
  // Hide form and clear fields
  cancelEntry();
  
  // Show success message
  showSuccessMessage('Entry saved successfully! 📝');
}

// Save entry to localStorage
function saveToLocalStorage(date, title, content, entryId = null) {
  const entries = getStoredEntries();
  const newEntry = {
    id: entryId || Date.now(),
    date: date,
    title: title,
    content: content,
    timestamp: new Date().toISOString()
  };
  
  entries.unshift(newEntry); // Add to beginning
  localStorage.setItem(getStorageKey(), JSON.stringify(entries));
}

// Get stored entries from localStorage
function getStoredEntries() {
  const stored = localStorage.getItem(getStorageKey());
  return stored ? JSON.parse(stored) : [];
}

// Load entries from localStorage
function loadEntries() {
  const entries = getStoredEntries();
  const entriesContainer = document.getElementById('diary-entries');
  
  entries.forEach(entry => {
    const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const entryHTML = `
      <div class="diary-entry" data-id="${entry.id}" data-date="${entry.date}" data-title="${entry.title}">
        <div class="entry-header">
          <div class="entry-date">${formattedDate}</div>
          <button class="delete-btn" onclick="deleteEntry(${entry.id})" title="Delete this entry">
            <span class="delete-icon">🗑️</span>
            <span class="delete-text">Delete</span>
          </button>
        </div>
        <div class="entry-title">${entry.title}</div>
        <div class="entry-content">${entry.content.replace(/\n/g, '<br>')}</div>
        <div class="entry-tags">
          <span class="tag">saved entry</span>
        </div>
      </div>
    `;
    
    // Insert before the sample entries (they don't have data-id)
    const firstSampleEntry = entriesContainer.querySelector('.diary-entry:not([data-id])');
    if (firstSampleEntry) {
      firstSampleEntry.insertAdjacentHTML('beforebegin', entryHTML);
    } else {
      entriesContainer.insertAdjacentHTML('beforeend', entryHTML);
    }
  });
}

// Delete entry function
function deleteEntry(entryId) {
  // Show custom confirmation dialog
  const confirmed = confirm('⚠️ Are you sure you want to delete this entry?\n\nThis action cannot be undone.');
  
  if (confirmed) {
    try {
      // Remove from localStorage
      const entries = getStoredEntries();
      const entryToDelete = entries.find(entry => entry.id === entryId);
      const updatedEntries = entries.filter(entry => entry.id !== entryId);
      localStorage.setItem(getStorageKey(), JSON.stringify(updatedEntries));
      
      // Remove from DOM with animation
      const entryElement = document.querySelector(`[data-id="${entryId}"]`);
      if (entryElement) {
        // Add deleting class for animation
        entryElement.classList.add('deleting');
        entryElement.style.transform = 'translateX(-100%)';
        entryElement.style.opacity = '0';
        entryElement.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
          entryElement.remove();
          showSuccessMessage(`Entry "${entryToDelete?.title || 'Unknown'}" deleted successfully! 🗑️`);
        }, 300);
      } else {
        showSuccessMessage('Entry deleted successfully! 🗑️');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      showErrorMessage('There was an error deleting the entry. Please try again.');
    }
  }
}

// Show success message
function showSuccessMessage(message) {
  // Create and show a temporary success message
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
    z-index: 1000;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  `;
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  
  // Remove after 3 seconds
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// Show error message
function showErrorMessage(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #ff6b6b, #ff5252);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
    z-index: 1000;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  `;
  errorDiv.textContent = `❌ ${message}`;
  document.body.appendChild(errorDiv);
  
  // Remove after 4 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 4000);
}

// Check if we need to highlight a specific entry (from main hub navigation)
function checkForHighlightEntry() {
  const highlightData = sessionStorage.getItem('highlightEntry');
  if (highlightData) {
    try {
      const { date, title } = JSON.parse(highlightData);
      
      // Find the entry element that matches the date and title
      const entryElement = document.querySelector(`[data-date="${date}"][data-title="${title}"]`);
      
      if (entryElement) {
        // Add highlight class
        entryElement.classList.add('highlighted-entry');
        
        // Scroll to the entry
        setTimeout(() => {
          entryElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 500);
        
        // Remove highlight after a few seconds
        setTimeout(() => {
          entryElement.classList.remove('highlighted-entry');
        }, 5000);
      }
      
      // Clear the session storage after use
      sessionStorage.removeItem('highlightEntry');
    } catch (error) {
      console.error('Error highlighting entry:', error);
      sessionStorage.removeItem('highlightEntry');
    }
  }
}

// Authentication functions
function isLoggedIn() {
  return localStorage.getItem('questify_user') || sessionStorage.getItem('questify_user');
}
