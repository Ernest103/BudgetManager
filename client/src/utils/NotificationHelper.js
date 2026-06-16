import Swal from 'sweetalert2';

export function showNotification(message, result, type) {
    // Toast notification
    if (type === 'toast') {
        switch (result) {
            case 'success':
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: message,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                break;
            case 'error':
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: message,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                break;
            case 'info':
            default:
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'info',
                    title: message,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
        }
    }
    // Modal dialog
    else {
        switch (result) {
            case 'success':
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: message,
                });
                break;
            case 'error':
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message,
                });
                break;
            case 'info':
            default:
                Swal.fire({
                    icon: 'info',
                    title: 'Info',
                    text: message,
                });
        }
    }
}