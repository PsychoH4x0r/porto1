// contact-form.js

function initContactForm() {
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');

    if (!form) return;  //Pastikan form ada

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah pengiriman formulir bawaan

        // Reset pesan
        messageDiv.textContent = '';
        messageDiv.classList.remove('success', 'error');


        // Validasi sederhana (bisa diperluas)
        const name = form.elements['name'].value.trim();
        const email = form.elements['email'].value.trim();
        const message = form.elements['message'].value.trim();

        if (!name || !email || !message) {
            messageDiv.textContent = 'Please fill in all fields.';
            messageDiv.classList.add('error');
            return;
        }

        if (!isValidEmail(email)) {
          messageDiv.textContent = 'Please enter a valid email address.';
          messageDiv.classList.add('error');
          return;
        }


        // Simulasi pengiriman (ganti dengan AJAX request ke backend)
        messageDiv.textContent = 'Sending message...';

        setTimeout(() => {

            // Contoh respons sukses (ganti sesuai respons dari server)
             const success = true;  // Ganti dengan logika pengecekan respons
            if (success) {
                messageDiv.textContent = 'Message sent successfully!';
                messageDiv.classList.add('success');
                form.reset(); // Reset formulir setelah berhasil
            } else {
                messageDiv.textContent = 'An error occurred. Please try again later.';
                messageDiv.classList.add('error');
            }
        }, 2000); // Simulasi delay 2 detik
    });

    function isValidEmail(email) {
    // Regex untuk validasi email yang lebih baik
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

export { initContactForm };