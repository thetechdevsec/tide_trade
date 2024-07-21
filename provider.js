document.addEventListener('DOMContentLoaded', function() {
    const serviceList = document.getElementById('serviceList');
    const bookingList = document.getElementById('bookingList');
    const reviewList = document.getElementById('reviewList');

    // Sample data
    const services = [
        { title: 'Haircut', description: 'A great haircut', price: '$50' },
        { title: 'Makeup Application', description: 'Professional makeup', price: '$80' }
    ];

    const bookings = [
        { client: 'John Doe', service: 'Haircut', date: '2024-07-21' },
        { client: 'Jane Smith', service: 'Makeup Application', date: '2024-07-22' }
    ];

    const reviews = [
        { client: 'John Doe', review: 'Excellent service!', rating: 5 },
        { client: 'Jane Smith', review: 'Very professional and friendly.', rating: 4 }
    ];

    // Populate services
    services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'col-md-4 mb-3';
        serviceItem.innerHTML = `
            <div class="card border-styled">
                <div class="card-body">
                    <h5 class="card-title">${service.title}</h5>
                    <p class="card-text">${service.description}</p>
                    <p class="card-text"><strong>Price:</strong> ${service.price}</p>
                </div>
            </div>
        `;
        serviceList.appendChild(serviceItem);
    });

    // Populate bookings
    bookings.forEach(booking => {
        const bookingItem = document.createElement('div');
        bookingItem.className = 'col-md-4 mb-3';
        bookingItem.innerHTML = `
            <div class="card border-styled">
                <div class="card-body">
                    <p><strong>Client:</strong> ${booking.client}</p>
                    <p><strong>Service:</strong> ${booking.service}</p>
                    <p><strong>Date:</strong> ${booking.date}</p>
                </div>
            </div>
        `;
        bookingList.appendChild(bookingItem);
    });

    // Populate reviews
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'col-md-4 mb-3';
        reviewItem.innerHTML = `
            <div class="card border-styled">
                <div class="card-body">
                    <p><strong>Client:</strong> ${review.client}</p>
                    <p><strong>Review:</strong> ${review.review}</p>
                    <p><strong>Rating:</strong> ${'⭐'.repeat(review.rating)}</p>
                </div>
            </div>
        `;
        reviewList.appendChild(reviewItem);
    });

    // Handle Logout Button
    document.getElementById('logout').addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'login.html';
    });
});

document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.clear();
    window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const userApiUrl = 'https://mk-services.onrender.com/services/api/users/';
    const profileUrl = 'https://mk-services.onrender.com/services/api/profiles/';
    const access = localStorage.getItem('access');
    
    fetch(userApiUrl, {
      headers: {
        'Authorization': `Bearer ${access}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        const user_id = localStorage.getItem('user_id');
        const user = data.filter(user => user.id == user_id)[0];
        const providerNameElement = document.querySelector('.providerName');
        const providerEmailElement = document.querySelector('.providerEmail');
    
        providerNameElement.innerHTML = `<strong>Username:</strong> ${user.username}`;
        providerEmailElement.innerHTML = `<strong>Email:</strong> ${user.email}`;

        // provider profile
        return fetch(profileUrl, {
            headers: {
            'Authorization': `Bearer ${access}`
            }
        });
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(profileData => {
        const providerPhoneElement = document.querySelector('.providerPhone');
        providerPhoneElement.innerHTML = `<strong>Phone:</strong> ${profileData.phone}`;
        })
        .catch(error => {
        console.error('Error fetching provider information:', error);
    });
});