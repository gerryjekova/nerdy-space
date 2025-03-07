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
          item.style.fontWeight = 'bold';
        } else {
          item.style.fontWeight = 'normal';
        }
      });
      
      // Update toggle text if it exists
      const themeToggle = document.getElementById('theme-dropdown-toggle');
      if (themeToggle) {
        const isLight = theme.startsWith('light');
        const iconClass = isLight ? 'fa-sun' : 'fa-moon';
        themeToggle.innerHTML = `<i class="fas ${iconClass}"></i> Theme`;
      }
    }
  });