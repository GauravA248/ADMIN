document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn =
        document.getElementById('logoutBtn') ||
        document.getElementById('logoutUser');

    if (!logoutBtn) {
        console.warn('⚠️ Logout button not found on this page.');
        return;
    }

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault(); // avoid accidental anchor redirects

        // check if SweetAlert is loaded
        if (typeof Swal === 'undefined') {
            console.error('❌ SweetAlert2 not loaded.');
            alert('Logout confirmation failed. Please try again.');
            return;
        }

        Swal.fire({
            title: 'Logout?',
            text: 'Are you sure you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('userRole');

                Swal.fire({
                    title: 'Logged Out!',
                    text: 'You have been successfully logged out.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1200,
                    didClose: () => {
                        window.location.href = 'index.html';
                    }
                });
            }
        });
    });
});
