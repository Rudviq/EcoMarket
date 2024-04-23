function logout() {
    // Clear user_id from session storage
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_name');
    console.log(5);
    // Redirect the user to the login page or any other appropriate page
    window.location.href = "login_.php";
  }