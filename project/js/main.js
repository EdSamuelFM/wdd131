function setFooterDates() {
    const today = new Date();
    
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = today.getFullYear();
    }

    const modifiedSpan = document.getElementById('lastmodified');
    if (modifiedSpan) {
        modifiedSpan.textContent = `${document.lastModified}`;
    }
}

function toggleMenu() {
    const menuButton = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    
    if (menuButton && mainMenu) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            
            mainMenu.classList.toggle('open');
            
            menuButton.setAttribute('aria-expanded', !isExpanded);
        });
    }
}

function handleLazyLoadFade() {
    const images = document.querySelectorAll('.gallery img');
    images.forEach(img => {
        if (img.loading === 'lazy') {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        } else {
            img.classList.add('loaded');
        }
    });
}


setFooterDates();
toggleMenu();
handleLazyLoadFade();