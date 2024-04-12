
function toggleComments() {
    var commentsDiv = document.getElementById('comments');
    commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
}

// Function to add a comment
function addComment(user, rating, comment) {
    var commentsDiv = document.getElementById('comments');
    var commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <div class="user-info" >
        <img src="../assets/creator1.jpeg" alt="User Profile Picture">
        <span>${user}</span>
        <span>${rating} Stars</span>
        </div>
        <div class="comment-text">${comment}</div>
    `;
    commentsDiv.appendChild(commentElement);
}

// Example: Add some initial comments
addComment('John Doe', 4.5, 'This is a great product!');
addComment('Jane Smith', 5, 'I love it!');
