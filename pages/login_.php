<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login and Signup Form</title>
  <link rel="stylesheet" href="../styles/styles.css">
</head>
<body>
  <div class="container">
    <div id="login-form" class="form-container ">
      <form method="post" action="login.php">
        <h2>Login</h2>
        <?php if(isset($_GET['login_err'])){ ?>
          <p class="login_err"> <?php echo $_GET['login_err']; ?></p>
        <?php }?>
        <?php if(isset($_GET['signup_success'])){ ?>
          <p class="signup_success"> <?php echo $_GET['signup_success']; ?></p>
        <?php }?>
        
        <input name ="email" type="email" placeholder="Email" required>
        <input name="password" type="password" placeholder="Password" required>
        <button type="submit" id="lgnBtn">Login</button>
        <p>Don't have an account? <a href="signup_.php" id="signup-link">Sign Up</a></p>
        
      </form>
      
    </div>
    
  </div>
 
</body>
</html>
