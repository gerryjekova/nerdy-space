document.addEventListener('DOMContentLoaded', function() {
  // Theme dropdown toggle
  const themeDropdownToggle = document.getElementById('theme-dropdown-toggle');
  const themeDropdownMenu = document.getElementById('theme-dropdown-menu');
  
  if (themeDropdownToggle && themeDropdownMenu) {
    // Toggle dropdown menu
    themeDropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      themeDropdownMenu.classList.toggle('show');
    });
    
    // Close the dropdown if clicked outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.theme-dropdown') && themeDropdownMenu.classList.contains('show')) {
        themeDropdownMenu.classList.remove('show');
      }
    });
    
    // Handle theme selection
    const themeItems = document.querySelectorAll('.theme-dropdown-item');
    themeItems.forEach(item => {
      item.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        applyTheme(theme);
        localStorage.setItem('theme', theme);
        themeDropdownMenu.classList.remove('show');
        
        // Add visual feedback for selection
        this.classList.add('selected');
        setTimeout(() => {
          this.classList.remove('selected');
        }, 500);
      });
    });
  }
  
  // Apply saved theme or default on page load
  const savedTheme = localStorage.getItem('theme') || 'light-retro';
  applyTheme(savedTheme);
  
  // Function to apply a theme
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update active item in dropdown if it exists
    const themeItems = document.querySelectorAll('.theme-dropdown-item');
    themeItems.forEach(item => {
      if (item.getAttribute('data-theme') === theme) {
        item.classList.add('active');
        item.style.fontWeight = 'bold';
      } else {
        item.classList.remove('active');
        item.style.fontWeight = 'normal';
      }
    });
    
    // Update toggle text and icon
    const themeToggle = document.getElementById('theme-dropdown-toggle');
    if (themeToggle) {
      const isLight = theme.startsWith('light');
      const iconClass = isLight ? 'fa-sun' : 'fa-moon';
      themeToggle.innerHTML = `<i class="fas ${iconClass}"></i> Theme`;
    }
    
    // Apply special effects based on theme
    applyThemeSpecificEffects(theme);
  }
  
  // Apply special effects based on current theme
  function applyThemeSpecificEffects(theme) {
    // Get all cards for animations
    const cards = document.querySelectorAll('.card');
    
    // Apply different animations based on the theme
    if (theme.includes('retro')) {
      // For retro themes, add subtle parallax effect to cards
      cards.forEach(card => {
        card.classList.add('retro-effect');
        
        // Add hover listener for parallax effect
        card.addEventListener('mousemove', function(e) {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;
          const mouseX = e.clientX - cardCenterX;
          const mouseY = e.clientY - cardCenterY;
          
          // Limit the rotation
          const maxRotation = 8;
          const rotateY = (mouseX / cardRect.width) * maxRotation;
          const rotateX = -((mouseY / cardRect.height) * maxRotation);
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
      });
    } else {
      // Remove retro effects if not a retro theme
      cards.forEach(card => {
        card.classList.remove('retro-effect');
        card.style.transform = '';
        
        // Remove event listeners (clone and replace)
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
      });
    }
    
    // Enhance buttons based on theme
    const buttons = document.querySelectorAll('.btn-primary, .btn-danger, .btn-warning');
    if (theme.includes('mono')) {
      // For mono themes, add subtle grow effect
      buttons.forEach(btn => {
        btn.classList.add('mono-effect');
      });
    } else {
      // Remove mono effects
      buttons.forEach(btn => {
        btn.classList.remove('mono-effect');
      });
    }
    
    // Apply header footer gradients based on theme
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    
    if (navbar && footer) {
      if (theme.includes('soft')) {
        navbar.style.background = 'var(--gradient1) !important';
        footer.style.background = 'var(--gradient1) !important';
      } else if (theme.includes('mono')) {
        navbar.style.background = 'var(--gradient2) !important';
        footer.style.background = 'var(--gradient2) !important';
      } else if (theme.includes('retro')) {
        navbar.style.background = 'var(--gradient3) !important';
        footer.style.background = 'var(--gradient3) !important';
      }
    }
  }
  
  // Add special class to cards for animations
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('card-hover');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('card-hover');
    });
  });
  
  // Enhance post navigation
  const prevNextLinks = document.querySelectorAll('a.prev, a.next');
  prevNextLinks.forEach(link => {
    link.innerHTML = link.classList.contains('prev') ? 
      '<i class="fa fa-angle-left"></i>' : 
      '<i class="fa fa-angle-right"></i>';
  });
});