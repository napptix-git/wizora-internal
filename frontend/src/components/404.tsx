import React from "react";

const PageNotFound: React.FC = () => (
  <div style={{ textAlign: "center", marginTop: "10vh" }}>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <a href="/" style={{ color: "#007bff", textDecoration: "underline" }}>
      Go to Home
    </a>
  </div>
);

export default PageNotFound;