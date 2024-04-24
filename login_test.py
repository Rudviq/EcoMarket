
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

@pytest.fixture(scope="module")
def browser():
    # Start a new Chrome browser session
    driver = webdriver.Chrome()
    yield driver
    # Close the browser session after the test
    driver.quit()

def test_login_with_incorrect_credentials(browser):
    # Open the login page
    browser.get('http://localhost/Handicraft_Website/pages/login_.php')

    # Find the email and password fields by ID
    email = browser.find_element(By.ID, 'email')
    password = browser.find_element(By.ID, 'password')

    # Fill in the form fields with incorrect credentials
    email.send_keys('incorrect_email@example.com')
    password.send_keys('incorrect_password')

    # Submit the form
    submit_button = browser.find_element(By.ID, 'lgnBtn')
    submit_button.click()

    # Wait for the error message to be displayed (assuming there is an error message element)
    time.sleep(3)

    # Check if the error message is displayed
    error_message = browser.find_element(By.ID, 'error-message')
    assert error_message.is_displayed(), "Invalid email or password"

def test_login_with_correct_credentials(browser):
    # Open the login page
    browser.get('http://localhost/Handicraft_Website/pages/login_.php')

    # Find the email and password fields by ID
    email = browser.find_element(By.ID, 'email')
    password = browser.find_element(By.ID, 'password')

    # Fill in the form fields with correct credentials
    email.send_keys('rudviq@gmail.com')
    password.send_keys('Rud123')

    # Submit the form
    submit_button = browser.find_element(By.ID, 'lgnBtn')
    submit_button.click()

    # Wait until the profile page is loaded (assuming the title changes to "Profile Page")
    # You can replace this with appropriate wait conditions for your application
    time.sleep(3)

    # Check if the profile page is displayed
    assert "EcoMarket: Handcrafted Materials" in browser.title, "Login with correct credentials failed"
