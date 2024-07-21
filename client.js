document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = 'login.html';
  });
  


  