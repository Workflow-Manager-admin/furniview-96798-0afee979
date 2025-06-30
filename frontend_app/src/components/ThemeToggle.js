import React from 'react';

// PUBLIC_INTERFACE
function ThemeToggle({ theme, setTheme }) {
  // PUBLIC_INTERFACE
  const cycleTheme = () => {
    // auto -> light -> dark -> back to auto
    if (theme === 'auto') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('auto');
  };

  let icon, label;
  if (theme === 'auto') { icon = '🌗'; label = 'Auto'; }
  else if (theme === 'dark') { icon = '🌙'; label = 'Dark'; }
  else { icon = '☀️'; label = 'Light'; }

  return (
    <div className="theme-toggle-outer">
      <button
        onClick={cycleTheme}
        className="theme-toggle"
        aria-label="Change color theme"
        title={`Theme: ${label} (click to cycle)`}
        type="button"
      >
        {icon} {label}
      </button>
    </div>
  );
}

export default ThemeToggle;
