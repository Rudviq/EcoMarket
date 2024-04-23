// const productId = 0;
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the button for showing comments
    const showCommentsButton = document.getElementById('show-comments-button');
    showCommentsButton.addEventListener('click', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        toggleComments(productId);
    });
});

function toggleComments(productId) {
    var commentsDiv = document.getElementById('comments');
    commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';

    fetch(`fetch_comments.php?id=${productId}`)
      .then(response => response.json())
      .then(products => {
        var commentsDiv = document.getElementById('comments');

        products.forEach(product => {
        var commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        console.log(product);
        commentElement.innerHTML = `
            <div class="user-info" >
            <img src="../assets/${product.Photo}" alt="User Profile Picture">
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
