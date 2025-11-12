/* ============================================
   AJAX HANDLERS
   ============================================ */

(function() {
    'use strict';

    // ===== CONTACT FORM AJAX =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate AJAX request (Replace with actual endpoint)
            fetch('mail-handler.php', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.success) {
                    showNotification('success', 'Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    showNotification('error', data.message || 'Something went wrong. Please try again.');
                }
            })
            .catch(function(error) {
                console.error('Error:', error);
                showNotification('error', 'Network error. Please check your connection and try again.');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }

    // ===== NEWSLETTER FORM AJAX =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';

            // Simulate AJAX request (Replace with actual endpoint)
            fetch('newsletter-handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.success) {
                    showNotification('success', 'Thank you for subscribing!');
                    newsletterForm.reset();
                } else {
                    showNotification('error', data.message || 'Subscription failed. Please try again.');
                }
            })
            .catch(function(error) {
                console.error('Error:', error);
                showNotification('error', 'Network error. Please try again.');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }

    // ===== LOGIN FORM AJAX =====
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging in...';

            fetch('login-handler.php', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.success) {
                    showNotification('success', 'Login successful! Redirecting...');
                    setTimeout(function() {
                        window.location.href = data.redirect || 'dashboard.html';
                    }, 1000);
                } else {
                    showNotification('error', data.message || 'Invalid credentials. Please try again.');
                }
            })
            .catch(function(error) {
                console.error('Error:', error);
                showNotification('error', 'Network error. Please try again.');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }

    // ===== REGISTER FORM AJAX =====
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Registering...';

            fetch('register-handler.php', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.success) {
                    showNotification('success', 'Registration successful! Redirecting to login...');
                    setTimeout(function() {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    showNotification('error', data.message || 'Registration failed. Please try again.');
                }
            })
            .catch(function(error) {
                console.error('Error:', error);
                showNotification('error', 'Network error. Please try again.');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }

    // ===== NOTIFICATION FUNCTION =====
    function showNotification(type, message) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(function(notif) {
            notif.remove();
        });

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.innerHTML = '<span>' + message + '</span><button class="notification-close">&times;</button>';

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = 'background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; line-height: 1;';
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(function() {
                notification.remove();
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(function() {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(function() {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Add slide animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

})();

