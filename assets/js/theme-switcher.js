document.addEventListener('DOMContentLoaded', function() {
  // Theme dropdown toggle
  const themeDropdownToggle = document.getElementById('theme-dropdown-toggle');
  const themeDropdownMenu = document.getElementById('theme-dropdown-menu');
  
  if (themeDropdownToggle && themeDropdownMenu) {
    // Toggle dropdown menu with stopPropagation to prevent immediate closing
    themeDropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
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
        
        // Visual feedback for selection
        themeItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
  
  // Apply saved theme or default on page load
  const savedTheme = localStorage.getItem('theme') || 'light-soft';
  applyTheme(savedTheme);
  
  // Function to apply a theme
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update active item in dropdown
    const themeItems = document.querySelectorAll('.theme-dropdown-item');
    themeItems.forEach(item => {
      if (item.getAttribute('data-theme') === theme) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Update toggle icon based on light or dark theme
    const themeToggle = document.getElementById('theme-dropdown-toggle');
    if (themeToggle) {
      const isLight = theme.startsWith('light');
      // Check if using Font Awesome 5 (fas) or older version (fa)
      const iconPrefix = document.querySelector('.fas') ? 'fas' : 'fa';
      const iconClass = isLight ? 'fa-sun' : 'fa-moon';
      themeToggle.innerHTML = `<i class="${iconPrefix} ${iconClass}"></i> Theme`;
    }
    
    // Fix visibility issues with navigation arrows
    fixNavigationArrows();
    
    // Additional theme-specific adjustments
    adjustThemeSpecificElements(theme);
  }
  
  // Additional function to adjust elements based on theme
  function adjustThemeSpecificElements(theme) {
    const isDark = theme.startsWith('dark');
    
    // Adjust navbar toggler for better visibility in dark themes
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
      if (isDark) {
        navbarToggler.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      } else {
        navbarToggler.style.backgroundColor = '';
      }
    }
    
    // Ensure navigation arrows have appropriate contrast
    const navArrows = document.querySelectorAll('a.prev, a.next');
    navArrows.forEach(arrow => {
      if (isDark) {
        arrow.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        arrow.style.color = '#fff';
      } else {
        arrow.style.backgroundColor = '';
        arrow.style.color = '';
      }
    });
  }
  
  // Function to fix navigation arrows
  function fixNavigationArrows() {
    const prevNextLinks = document.querySelectorAll('a.prev, a.next');
    prevNextLinks.forEach(link => {
      // Ensure icons are visible
      if (!link.querySelector('i')) {
        // Check if using Font Awesome 5 (fas) or older version (fa)
        const iconPrefix = document.querySelector('.fas') ? 'fas' : 'fa';
        link.innerHTML = link.classList.contains('prev') ? 
          `<i class="${iconPrefix} fa-angle-left"></i>` : 
          `<i class="${iconPrefix} fa-angle-right"></i>`;
      }
      
      // Make slightly visible by default
      link.style.opacity = '0.8';
      
      // Set background and text color for better visibility
      const theme = document.documentElement.getAttribute('data-theme') || 'light-soft';
      const isDark = theme.startsWith('dark');
      
      if (isDark) {
        link.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        link.style.color = '#ffffff';
      } else {
        // For light themes, use accent color as background
        const computedStyle = getComputedStyle(document.documentElement);
        const accentColor = computedStyle.getPropertyValue('--accent-color1');
        link.style.backgroundColor = accentColor || '#007BFF';
        link.style.color = '#ffffff';
      }
      
      link.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    });
  }
  
  // Initialize navigation arrows on page load
  fixNavigationArrows();
});