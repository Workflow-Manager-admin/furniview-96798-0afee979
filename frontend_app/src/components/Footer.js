import React from 'react';

// PUBLIC_INTERFACE
function Footer() {
  return (
    <footer className="footer">
      <div>
        &copy; {new Date().getFullYear()} FurniView &mdash; Modern Furniture Store
      </div>
      <div style={{marginTop: 3, fontSize:'0.96rem', color:'#ffe'}}>
        Contact: <a href="mailto:info@furniview.com" style={{color: '#FFC107'}}>info@furniview.com</a>
      </div>
    </footer>
  );
}

export default Footer;
