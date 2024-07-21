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
        window.location.href = 'login.html'; // Adjust according to your logout logic
    });
});




