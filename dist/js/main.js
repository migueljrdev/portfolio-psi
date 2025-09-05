document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = Array.from(document.querySelectorAll('.btn-link-nav'));
  const header = document.querySelector('header');
  let headerH = header ? header.offsetHeight : 0;

  // Atualiza altura do header ao redimensionar
  window.addEventListener('resize', () => {
    headerH = header ? header.offsetHeight : 0;
  });

  // --- TOGGLE MENU MOBILE ---
  if (menuButton && mobileMenu) {
    const icon = menuButton.querySelector('i');

    menuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden'); // mostra/esconde
      mobileMenu.classList.toggle('active');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times'); // se usar FA6, troque por 'fa-xmark'
      }
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      const aberto = mobileMenu && !mobileMenu.classList.contains('hidden');
      if (aberto && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('active');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Evita fechar ao clicar dentro do menu
    mobileMenu.addEventListener('click', (e) => e.stopPropagation());
  }

  // --- Helpers ---
  function setActiveById(id) {
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
    });
  }

  function throttle(fn, wait = 100) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  // --- SCROLL SUAVE ao clicar nos links ---
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - headerH;
          window.scrollTo({ top: y, behavior: 'smooth' });
          setActiveById(href.slice(1));
        }

        // Fecha menu mobile se estiver aberto
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('active');
          const icon = menuButton ? menuButton.querySelector('i') : null;
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      }
    });
  });

  // --- SCROLL SPY (marca ativo durante rolagem) ---
  const sections = Array.from(document.querySelectorAll('section[id]'));

  const onScroll = throttle(() => {
    const pos = window.scrollY + headerH + 20;
    let currentId = sections[0].id; // padrão: primeira section

    // procura a section mais "profunda" cujo topo já passou
    for (const sec of sections) {
      if (pos >= sec.offsetTop) {
        currentId = sec.id;
      }
    }

    // se chegou no fim da página, força última
    const bottomPage = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (bottomPage) {
      currentId = sections[sections.length - 1].id;
    }

    setActiveById(currentId);
  }, 100);

  window.addEventListener('scroll', onScroll);

  // chamada inicial para marcar ativo ao carregar
  onScroll();
});
