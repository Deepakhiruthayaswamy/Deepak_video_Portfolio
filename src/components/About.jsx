import stackImage from "../assets/about/Video_portfolio_second_image_new.png";

const About = () => {
  return (
    <section id="about" className="luxury-section about-section">
      <div className="section-shell about-grid">
        <div className="about-portrait" data-aos="drop-bounce">
          <div className="portrait-lanyard" />
          <div className="portrait-card">
            <div className="portrait-slot" />
            <img src={stackImage} alt="Deepak profile" />
          </div>
        </div>

        <div data-aos="fade-left" data-aos-delay="200" className="about-copy">
          <span className="section-kicker">Digital Solutions</span>
          <h2>Hello! I build modern websites with code, AI, and care.</h2>
          <p>
            Hi, my name is <strong>Deepak</strong>, I'm a dedicated Web
            Developer with 2 years of experience building modern, responsive,
            and user-friendly websites. I have a strong foundation in HTML, CSS,
            Bootstrap, Tailwind CSS, JavaScript, React.js, WordPress, PHP, and
            MySQL. I enjoy combining traditional development practices with
            AI-assisted development (Vibe Coding) to improve productivity,
            accelerate development, and deliver high-quality digital solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
