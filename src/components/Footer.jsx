const footerLinks = [
  {
    label: "Gmail",
    href: "mailto:deepakwebcraft@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm-.5 3.8-7.1 5.1c-.2.1-.5.2-.7.2s-.5-.1-.7-.2L3.5 8.8V7.6l8.5 5.9 7.5-5.3v.6Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/deepak-hiruthayaswamy/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    href: "tel:+918489130301",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/14mXFHnCbhT/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.2 22v-8.5h2.86l.43-3.32H14.2V8.06c0-.96.27-1.62 1.65-1.62h1.76V3.47c-.3-.04-1.35-.13-2.57-.13-2.54 0-4.28 1.55-4.28 4.4v2.44H7.9v3.32h2.86V22h3.44Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/deepak_hiruthayaswamy?igsh=MW40dzAyY2N2cWd4",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-grid">
        <div>
          Web Development React.js, WordPress Frontend Development Responsive
          UI/UX SEO & Performance Fast, Optimized Websites
        </div>

        <div className="md:text-center">
          <p>2+ years of experience</p>
          <a href="#projects">View Work</a>
        </div>

        <div className="md:text-right">
          <p>Worldwide Available</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      <div className="footer-name">
        <h2>Deepak</h2>
      </div>

      <div className="footer-socials" aria-label="Footer contact links">
        {footerLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
          </a>
        ))}
      </div>

      <div className="footer-grid footer-bottom">
        <div>
          <a href="#contact">Contact</a>
          <p>
            &copy; {new Date().getFullYear()} Deepak Web Developer | Built with
            React
          </p>
        </div>

        <div className="md:text-center">
          <a href="mailto:deepakwebcraft@gmail.com">deepakwebcraft@gmail.com</a>
        </div>

        <div className="md:text-right">
          <a href="#contact">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
