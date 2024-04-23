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
    
    <div id="login-form" class="form-container">
      <form method="post" action="signup.php">
        <h2>Sign Up</h2>

        <?php if(isset($_GET['signup_err'])){ ?>
          <p class="login_err"> <?php echo $_GET['signup_err']; ?></p>
        <?php }?>
        <?php if(isset($_GET['signup_success'])){ ?>
          <p class="signup_success"> <?php echo $_GET['signup_success']; ?></p>
        <?php }?>

        <input type="text" name="fname" placeholder="First Name" required>
        <input type="text" name="lname" placeholder="Last Name" required>
        <input type="email" name = "email" placeholder="Email" required>
        <input type="password" name= "password" placeholder="Password" required>
        <input type="password" name="cpassword" placeholder="Confirm Password" required>
        <!-- <input type="file" name="photo" accept="image/*"> Input for profile picture -->
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="login_.php" id="login-link">Login</a></p>
      </form>
    </div>
  </div>

  
</body>
</html>
