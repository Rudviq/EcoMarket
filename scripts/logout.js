
function logout() {
    // Clear user_id from session storage
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_name');
    sessionStorage.clear();

    fetch(`logout.php`)
    .then(response => response.json())
    .then(data=> {
        console.log(data);
        window.location.href = "login_.php";
    })
    .catch(error => console.error('Error fetching user details:', error));
    // const userId = null;
    // console.log("Rudviq");
    // Redirect the user to the login page or any other appropriate page
   
  }