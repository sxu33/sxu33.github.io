// Theme toggle functionality
(function() {
  'use strict';

  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('.theme-toggle-icon');
  const html = document.documentElement;
  
  // Theme values
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };
  
  // Get saved theme or default to system preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? THEMES.DARK 
      : THEMES.LIGHT;
  }
  
  // Apply theme to the document
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    html.style.colorScheme = theme;
    
    // Update icon
    if (themeIcon) {
      themeIcon.textContent = theme === THEMES.DARK ? '☀️' : '🌙';
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }
  
  // Toggle between light and dark
  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme') || getInitialTheme();
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    applyTheme(newTheme);
  }
  
  // Initialize theme on page load
  function initTheme() {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    });
  }
  
  // Set up event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
