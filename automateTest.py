from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Replace with the path to your Chrome webdriver
driver_path = 'C:/Users/hp/Desktop/chromedriver_win32/chromedriver.exe'

# Start a new Chrome browser session
driver = webdriver.Chrome()

# Open the login page
driver.get('http://localhost/Handicraft_Website/pages/login_.php')

# Find the email and password fields by ID
email = driver.find_element(By.ID, 'email')
password = driver.find_element(By.ID, 'password')

# Fill in the form fields
email.send_keys('rudviq@gmail.com')
password.send_keys('Rud123')

# Submit the form
submit_button = driver.find_element(By.ID, 'lgnBtn')
submit_button.click()

# Wait until the profile page is loaded (assuming the title changes to "Profile Page")
# You can replace this with appropriate wait conditions for your application
time.sleep(3)

shop_button = driver.find_element(By.ID, 'shopBtn')
shop_button.click()

time.sleep(5)
# Find the product cards
product_cards = driver.find_elements(By.CLASS_NAME, 'product-card')  # Replace 'product-card' with the actual class name

# Click on a specific product card (for example, the first one)
product_cards[0].click()

# Wait for a few seconds to see the result (you can adjust this time)
time.sleep(5)



# Close the browser session
driver.quit()
