document.addEventListener('DOMContentLoaded', () => {
    
    const emailElement = document.querySelector('.contact-info p');
    
    if (emailElement) {
        emailElement.style.cursor = 'pointer'; 
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', () => {
            const emailText = emailElement.textContent.trim();
            
            navigator.clipboard.writeText(emailText).then(() => {
                const originalHTML = emailElement.innerHTML;
                
                emailElement.innerHTML = '<span style="color: #58a6ff; font-weight: bold;">Copied!</span>';
                
                setTimeout(() => {
                    emailElement.innerHTML = originalHTML;
                }, 1500);
            });
        });
    }

});