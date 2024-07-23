document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.user-registration-form');
    const usernameInput = document.querySelector('.username-input');
    const emailInput = document.querySelector('.email-input');
    const passwordInput = document.querySelector('.password-input');
    const confirmPasswordInput = document.querySelector('.confirm-password-input');
    const userTypeSelect = document.querySelector('.user-type-select');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const userType = userTypeSelect.value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const requestData = {
            username: username,
            email: email,
            password: password,
            user_type: userType,
        };

        try {
            const response = await fetch('https://mk-services.onrender.com/services/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                alert('User registered successfully');
                window.location.href = 'login.html';
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
});
