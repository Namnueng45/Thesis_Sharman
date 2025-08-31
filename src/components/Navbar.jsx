import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>
        Home
      </Link>
      <Link to="/about" style={styles.link}>
        About
      </Link>
      <Link to="/contact" style={styles.link}>
        Contact
      </Link>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#333",
    padding: "1rem",
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Navbar;
