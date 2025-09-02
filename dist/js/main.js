// main.js - script base
// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const icon = menuButton.querySelector('i');

        // Alternar menu ao clicar no botão
        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', function (e) {
                e.stopPropagation(); // Impede que o evento chegue ao document
                mobileMenu.classList.toggle('active');

                // Alternar ícone
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Fechar menu ao clicar em um link
        const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Fechar menu ao clicar fora dele
        document.addEventListener('click', function (e) {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !menuButton.contains(e.target)) {
                mobileMenu.classList.remove('active');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Impedir que cliques dentro do menu fechem-no
        mobileMenu.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });