function About() {
  return (
    <div style={styles.container}>
      <h1>ℹ️ About Page</h1>
      <p>
        This is the About page of our website. Here you can add information
        about your project, company, or yourself.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
  },
};

export default About;
