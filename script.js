document.addEventListener('DOMContentLoaded', function() {
    fetchServices();
});

function fetchServices() {
    fetch('services.php')
        .then(response => response.json())
        .then(data => {
            const servicesContainer = document.getElementById('services-container');
            data.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.classList.add('service-card');
                
                const serviceImage = document.createElement('img');
                serviceImage.src = service.image || 'default.jpg';  // Use default image if not provided
                serviceImage.alt = service.title;

                const serviceTitle = document.createElement('h2');
                serviceTitle.textContent = service.title;

                const serviceDescription = document.createElement('p');
                serviceDescription.textContent = service.description;

                const servicePrice = document.createElement('p');
                servicePrice.classList.add('price');
                servicePrice.textContent = `Price: $${service.price}`;

                const serviceProvider = document.createElement('p');
                serviceProvider.classList.add('provider');
                serviceProvider.textContent = `Provider: ${service.provider_name}`;

                serviceCard.appendChild(serviceImage);
                serviceCard.appendChild(serviceTitle);
                serviceCard.appendChild(serviceDescription);
                serviceCard.appendChild(servicePrice);
                serviceCard.appendChild(serviceProvider);

                servicesContainer.appendChild(serviceCard);
            });
        })
        .catch(error => console.error('Error fetching services:', error));
}


