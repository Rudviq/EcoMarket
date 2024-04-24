// const userId = sessionStorage.getItem('user_id');
console.log(10);
// document.addEventListener('DOMContentLoaded', function() {
function showNavBar(userId){

    console.log(userId);
    if(userId){
        fetch(`fetch_user_details.php?id=${userId}`)
        .then(response => response.json())
        .then(user => {
        // Populate HTML elements with product details
            // console.log("Qwerty");
            if (user.isAdmin === '1') {
                const artisannav = document.getElementById('q');
                artisannav.innerHTML = `    
                    <ul>
                        <li><a href="homePage_artisan.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li class="dropdown">
                        <a href="#" class="dropbtn" id="pro">Welcome, ${user.Username}</a>
                        <div class="dropdown-content">
                            <a href="profile.html">Profile</a>
                            <a onclick="logout()">Logout</a>
                        </div>
                        </li>
                    </ul>
                `;
            
            } else {
                const artisannav = document.getElementById('q');
                artisannav.innerHTML = `    
                    <ul>
                        <li><a href="homePage.html">Home</a></li>
                        <li><a href="shop.html">Shop</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="purchase_history.html">Past Orders</a></li>
                        <li class="dropdown">
                        <a href="#" class="dropbtn" id="pro">Welcome, ${user.Username}</a>
                        <div class="dropdown-content">
                            <a href="profile.html">Profile</a>
                            <a onclick="logout()">Logout</a>
                        </div>
                        </li>
                    </ul>
                `;
            }
        })
        .catch(error => console.error('Error fetching user details:', error));
    }
    else{
        const artisannav = document.getElementById('q');
        artisannav.innerHTML = `    
            <ul>
                <li><a href="homePage.html">Home</a></li>
                <li><a href="shop.html">Shop</a></li>
                <li><a href="about.html">About</a></li>
                <li class="dropdown">
                <a href="login_.php" class="dropbtn" id="pro">Login</a>
                </li>
            </ul>
        `;
    }

}