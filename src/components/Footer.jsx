function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} My Website. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#222",
    color: "#fff",
    textAlign: "center",
    padding: "1rem",
    position: "fixed", // ให้ติดด้านล่าง
    bottom: 0,
    width: "100%",
  },
};

export default Footer;
