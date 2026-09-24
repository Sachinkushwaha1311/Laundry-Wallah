# Laundry Wallah

Laundry Wallah is a small laundry booking website made with HTML, CSS, and JavaScript. A user can choose laundry services, add them to a cart, and send a booking request.

I made this project to practice front-end development and form handling.

## What the website can do

- Show the laundry services and prices
- Add the same service more than one time
- Remove one service item at a time
- Show the cart total
- Check the name, email, and phone number before booking
- Send booking details using EmailJS
- Save the latest booking in the browser using LocalStorage
- Let a user subscribe to the newsletter
- Show a simple login and signup demo page

## Tools used

- HTML for the page content
- CSS for the design
- JavaScript for the buttons, cart, and forms
- EmailJS for sending booking and newsletter emails
- LocalStorage for saving the last booking

## Main files

- `index.html` - Main website page
- `style.css` - Main website styles
- `script.js` - Cart, booking form, and newsletter code
- `login.html` - Login and signup page
- `login.css` - Login page styles
- `login.js` - Login and signup form code
- `laundry.jpg` - Image used on the home page

## How to run the project

1. Open the `e:\laundry` folder in VS Code.
2. Open `index.html` with the Live Server extension, or open it directly in a browser.
3. Add services to the cart and test the booking form.
4. Open `login.html` to test the login and signup forms.

No npm install or build command is needed for this project.

## EmailJS setup

The booking form and newsletter form use EmailJS. To send real emails, the EmailJS details must be configured correctly.

1. Create an EmailJS account and email service.
2. Create a booking email template and a newsletter template.
3. Put the EmailJS public key in `index.html`.
4. Put the service ID and template ID in `script.js`.
5. Make sure the templates use the required values, such as `customer_name`, `customer_email`, `customer_phone`, `services`, `total_amount`, `booking_date`, and `newsletter_email`.

## Important note

This is a front-end practice project. The login and signup page does not create real user accounts yet. EmailJS is the external service used for sending emails, and there is no personal backend server in this project.
