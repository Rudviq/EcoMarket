document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('signup-link').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('login-form').classList.remove('active');
      document.getElementById('signup-form').classList.add('active');
    });
    
    document.getElementById('login-link').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('signup-form').classList.remove('active');
      document.getElementById('login-form').classList.add('active');
    });
    
});