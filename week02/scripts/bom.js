// DOM element references
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('.chapter-list');

// Add the curent year to footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Add Chapter button click event listener
button.addEventListener('click', function() {
    // Check if input is not blank 
    if (input.value.trim() !== '') {
        
        // Create list item
        const li = document.createElement('li');
        
        // Create span for chapter text
        const chapterText = document.createElement('span');
        chapterText.textContent = input.value.trim();
        
        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Remove ${input.value.trim()}`);
        
        // Append elements to list item
        li.appendChild(chapterText);
        li.appendChild(deleteButton);
        
        // Append list item to the unordered list
        list.appendChild(li);
        
        // Add event listener to the delete button
        deleteButton.addEventListener('click', function() {
            list.removeChild(li);
            input.focus(); // Return focus to input field
        });
        
        // Clear the input value
        input.value = '';
        
    } else {
        // If input is empty, provide feedback to user
        alert('Please enter a Book of Mormon chapter before adding.');
    }
    
    // Return focus to the input field whether item was added or not
    input.focus();
});

// Allow adding chapters with Enter key
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        button.click(); // Trigger the button click event
    }
});

// Enhanced version with input validation and better user feedback
function validateInput() {
    const chapter = input.value.trim();
    
    if (chapter === '') {
        showError('Please enter a Book of Mormon chapter');
        return false;
    }
    
    // Basic validation for Book of Mormon chapter format
    const bookOfMormonBooks = [
        '1 Nephi', '2 Nephi', 'Jacob', 'Enos', 'Jarom', 'Omni', 'Words of Mormon',
        'Mosiah', 'Alma', 'Helaman', '3 Nephi', '4 Nephi', 'Mormon', 'Ether', 'Moroni'
    ];
    
    const isValidChapter = bookOfMormonBooks.some(book => 
        chapter.toLowerCase().startsWith(book.toLowerCase())
    );
    
    if (!isValidChapter) {
        showError('Please enter a valid Book of Mormon chapter (e.g., "Alma 5", "1 Nephi 3")');
        return false;
    }
    
    return true;
}

function showError(message) {
    // Remove any existing error message
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and display error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #e74c3c;
        background: #fdf2f2;
        border: 1px solid #e74c3c;
        border-radius: 5px;
        padding: 0.5rem;
        margin-top: 0.5rem;
        font-size: 0.9rem;
    `;
    
    input.parentNode.appendChild(errorElement);
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.remove();
        }
    }, 3000);
}

// Update the click event listener with validation
button.addEventListener('click', function() {
    // Remove any existing error message
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (validateInput()) {
        const chapter = input.value.trim();
        
        // Create list item
        const li = document.createElement('li');
        
        // Create span for chapter text
        const chapterText = document.createElement('span');
        chapterText.textContent = chapter;
        
        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Remove ${chapter}`);
        
        // Append elements to list item
        li.appendChild(chapterText);
        li.appendChild(deleteButton);
        
        // Append list item to the unordered list
        list.appendChild(li);
        
        // Add event listener to the delete button
        deleteButton.addEventListener('click', function() {
            // Add removal animation
            li.style.transform = 'translateX(100%)';
            li.style.opacity = '0';
            
            setTimeout(() => {
                if (li.parentNode) {
                    list.removeChild(li);
                }
            }, 300);
            
            input.focus(); // Return focus to input field
        });
        
        // Clear the input value
        input.value = '';
        
        // Add entry animation
        li.style.transform = 'translateX(-100%)';
        li.style.opacity = '0';
        setTimeout(() => {
            li.style.transform = 'translateX(0)';
            li.style.opacity = '1';
        }, 10);
    }
    
    // Return focus to the input field whether item was added or not
    input.focus();
});