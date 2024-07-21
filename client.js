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
  
    fetch(userApiUrl)
    .then(response => {
      try {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching client information:', error);
        throw error;
      }
    })
    .then(data => {
      const user_id = localStorage.getItem('user_id');
      const user = data.filter(user => user.id == user_id)[0];
      const clientNameElement = document.querySelector('.clientName');
      const clientEmailElement = document.querySelector('.clientEmail');
  
      clientNameElement.innerHTML = `<strong>Username: </strong> ${user.username}`;
      clientEmailElement.innerHTML = `<strong>Email: </strong> ${user.email}`;

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
      const clientPhoneElement = document.querySelector('.clientPhone');
      clientPhoneElement.innerHTML = `<strong>Phone:</strong> ${profileData.phone}`;
    })
    .catch(error => {
      console.error('Error fetching client information:', error);
    });
  });  