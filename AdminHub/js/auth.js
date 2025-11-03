document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user', password: 'user123', role: 'user' }
    ];

    const found = users.find(u => u.username === username && u.password === password);

    if (found) {
        localStorage.setItem('userRole', found.role);

        Swal.fire({
            title: 'Login Successful 🎉',
            text: found.role === 'admin' ? 'Welcome back, Admin!' : 'Welcome back!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didClose: () => {
                window.location.href = found.role === 'admin' ? 'dashboard.html' : 'userDash.html';
            }
        });
    } else {
        Swal.fire({
            title: 'Invalid Credentials',
            text: 'Please check your username or password.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Try Again'
        });
    }
});
