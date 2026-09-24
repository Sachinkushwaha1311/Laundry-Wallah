let cart = [];

function getServiceCount(name) {
    let count = 0;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            count++;
        }
    }

    return count;
}

function updateRemoveButtons() {
    const serviceItems = document.querySelectorAll(".service-item");

    for (let i = 0; i < serviceItems.length; i++) {
        const serviceItem = serviceItems[i];
        const serviceName = serviceItem.getAttribute("data-name");
        const removeButton = serviceItem.querySelector(".remove-btn");
        const count = getServiceCount(serviceName);

        if (count === 0) {
            removeButton.disabled = true;
            removeButton.textContent = "Remove Now";
        } else {
            removeButton.disabled = false;
            removeButton.textContent = "Remove 1 (" + count + ")";
        }
    }
}

function updateCart() {
    const cartBox = document.getElementById("cart-items");
    const totalBox = document.getElementById("total-amount");
    if (cart.length === 0) {
        cartBox.innerHTML = "No services added yet.";
        totalBox.textContent = "0";
    } else {
        let list = "";
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            list += "<li>" + cart[i].name + " - Rs " + cart[i].price + "</li>";
            total = total + parseInt(cart[i].price);
        }
        cartBox.innerHTML = "<ul>" + list + "</ul>";
        totalBox.textContent = total;
    }

    updateRemoveButtons();
}

function addService(name, price) {
    const newService = {
        name: name,
        price: price
    };
    cart.push(newService);
    updateCart();
}

function removeService(name) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart.splice(i, 1);
            break;
        }
    }
    updateCart();
}

const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
    bookingForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const msg = document.getElementById("form-message");

        msg.textContent = "";
        msg.className = "form-message";

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneDigits = phone.replace(/\D/g, "");

        if (name === "" || email === "" || phone === "") {
            msg.textContent = "Please fill all fields.";
            msg.className = "form-message error";
            return;
        }

        if (!emailPattern.test(email)) {
            msg.textContent = "Please enter a valid email address.";
            msg.className = "form-message error";
            return;
        }

        if (phoneDigits.length < 10 || phoneDigits.length > 15) {
            msg.textContent = "Please enter a valid phone number.";
            msg.className = "form-message error";
            return;
        }

        if (cart.length === 0) {
            msg.textContent = "Please add at least one service.";
            msg.className = "form-message error";
            return;
        }

        let cartItems = "";
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            if (i > 0) {
                cartItems += ", ";
            }
            cartItems += cart[i].name + " - Rs " + cart[i].price;
            total += parseInt(cart[i].price);
        }

        const bookingData = {
            customer_name: name,
            customer_email: email,
            customer_phone: phone,
            services: cartItems,
            total_amount: total,
            booking_date: new Date().toLocaleString()
        };

        localStorage.setItem(
            "lastBooking",
            JSON.stringify(bookingData)
        );

        const bookButton = bookingForm.querySelector(".book-now-btn");
        bookButton.textContent = "Sending...";
        bookButton.disabled = true;

        try {
            await emailjs.send(
                "service_qsgzpuf",
                "template_wpecnne",
                {
                    customer_name: name,
                    customer_email: email,
                    customer_phone: phone,
                    services: cartItems,
                    total_amount: total,
                    booking_date: new Date().toLocaleString()
                }
            );

            msg.textContent = "Thank you for booking the service. We will get back to you soon!";
            msg.className = "form-message success";
            bookingForm.reset();
            cart = [];
            updateCart();
        } catch (error) {
            console.log("EmailJS Error:", error);
            msg.textContent = "Booking failed. Please try again.";
            msg.className = "form-message error";
        }

        bookButton.textContent = "Book Now";
        bookButton.disabled = false;
    });
}


const addButtons = document.querySelectorAll(".add-btn");
for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function () {
        const serviceItem = this.closest(".service-item");
        const serviceName = serviceItem.getAttribute("data-name");
        const servicePrice = serviceItem.getAttribute("data-price");

        addService(serviceName, servicePrice);

    });
}

const removeButtons = document.querySelectorAll(".remove-btn");
for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", function () {
        const serviceItem = this.closest(".service-item");
        const serviceName = serviceItem.getAttribute("data-name");

        removeService(serviceName);
    });
}

const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const emailInput = document.getElementById("newsletter-email");
        const message = document.getElementById("newsletter-message");
        const submitButton = newsletterForm.querySelector("button");
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            message.textContent = "Please enter a valid email address.";
            message.className = "form-message error";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Joining...";

        try {
            await emailjs.send("service_qsgzpuf", "template_wpecnne", {
                newsletter_email: email,
                customer_email: email,
                message: "New newsletter subscriber"
            });

                message.textContent = "Thanks for subscribing!";
                message.className = "form-message success";
                newsletterForm.reset();
        } catch (error) {
            console.log("Newsletter EmailJS Error:", error);
            message.textContent = "Subscription failed. Please try again.";
            message.className = "form-message error";
        }

        submitButton.disabled = false;
        submitButton.textContent = "Subscribe";
    });
}

