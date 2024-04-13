
function toggleComments() {
    var commentsDiv = document.getElementById('comments');
    commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';

    fetch(`fetch_comments.php?id=1`)
      .then(response => response.json())
      .then(products => {
        var commentsDiv = document.getElementById('comments');

        products.forEach(product => {
        var commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        console.log(product);
        commentElement.innerHTML = `
            <div class="user-info" >
            <img src="../assets/creator1.jpeg" alt="User Profile Picture">
            <span>${product.Username}</span>
            <span> ${generateStarRating(product.Rating)}</span>
            </div>
            <div class="comment-text">${product.Comment}</div>
        `;
        commentsDiv.appendChild(commentElement);
        });
      })
      .catch(error => console.error('Error fetching product details:', error));
  
}

// Function to add a comment
function addComment(user, rating, comment) {
    
}

// // Example: Add some initial comments
// addComment('John Doe', 4.5, 'This is a great product!');
// addComment('Jane Smith', 5, 'I love it!');
