

    // Fetch userId using AJAX from a PHP endpoint
    // document.addEventListener('DOMContentLoaded', function() {
        fetch('get_user_id.php')
        .then(response => response.json())
        .then(data => {
            const userId = data.user_id;
            const userName = data.user_name;
            console.log(1);
            // updatePageContent(userId, userName);
            setUserNameInDropbtn(userName,userId);
            runOtherScripts();
        })
        .catch(error => console.error('Error fetching user id:', error));
    // });
    console.log(2);
    // const userId = sessionStorage.getItem('user_id');

        // Function to set userId in sessionStorage
        function setUserIdInSessionStorage(userId) {
            sessionStorage.setItem('user_id', userId);
        }
    
        function setUserNameInSessionStorage(userName) {
            sessionStorage.setItem('user_name', userName);
        }
    
        function setUserNameInDropbtn(userName,userId) {
    
            if (userId) {
                setUserIdInSessionStorage(userId);
            } else {
                console.log('User not logged in');
            }
    
            if (userName) {
                setUserNameInSessionStorage(userName);
            } else {
                console.log('UserName not found');
            }
    
           
        }