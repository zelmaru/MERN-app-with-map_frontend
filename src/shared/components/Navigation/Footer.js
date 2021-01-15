import React from "react";

import "./Footer.css";

function Footer(props) {
  return (
    <footer className="page-footer">
      <p>Copyright {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
