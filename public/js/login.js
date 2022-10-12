  // login 
  console.log('login page');
  const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log('login');
  
    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(username, password);
  
    if (username && password) {
    console.log(username, password);

      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Incorrect username or password',
          showConfirmButton: true,
          timer: 1500,
          confirmButtonColor: '#0d6efd'
        })
      }
    } else {
      console.log('login: no username or password');
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid username or password',
        showConfirmButton: true,
        timer: 1500,
        confirmButtonColor: '#0d6efd'
      }); 
    }
  };
  // signup
  const signupFormHandler = async (event) => {
    event.preventDefault();
  console.log('signup');

    const username = document.querySelector('#user-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(username, password);
    if (username && password) {
      console.log('if', username, password);
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.ok);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'There is already a user with this username',
          showConfirmButton: true,
          timer: 1500,
          confirmButtonColor: '#0d6efd'
        })
      }
    } else {
    console.log('signup: no username or password');
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Invalid username or password',
      showConfirmButton: true,
      timer: 1500,
      confirmButtonColor: '#0d6efd'
    }) 
  };
}

  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
