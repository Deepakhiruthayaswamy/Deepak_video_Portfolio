import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  permission: false,
};

const Contact = () => {
  console.log(import.meta.env);
  const ref = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      return "Please fill in every field before sending.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Please enter a valid email address.";
    }

    if (!form.permission) {
      return "Please confirm that I can contact you at this email address.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setStatus({
        type: "error",
        message: validationError,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log(import.meta.env);
      console.log("Service:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
      console.log("Template:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
      console.log("Public:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus({
        type: "success",
        message: "Message sent successfully!",
      });

      setForm(initialForm);
    } catch (error) {
      console.error("EmailJS Error:", error);
      console.log("Status:", error.status);
      console.log("Text:", error.text);
      console.log("Message:", error.message);

      setStatus({
        type: "error",
        message: error.text || error.message || "Unable to send message.",
      });
    }
    setIsSubmitting(false);
  };
  return (
    <section ref={ref} id="contact" className="contact-section">
      <motion.div style={{ y }} className="contact-bg-text">
        <h1>Contact</h1>
      </motion.div>

      <div className="contact-shell">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="contact-card"
        >
          <div className="section-heading compact">
            <span className="section-kicker">Reach Me</span>
            <h2>Let's build a refined, fast website for your next idea.</h2>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-fields">
              <label>
                <span>First Name</span>
                <input
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={updateField}
                  autoComplete="given-name"
                  required
                />
              </label>
              <label>
                <span>Last Name</span>
                <input
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={updateField}
                  autoComplete="family-name"
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  autoComplete="email"
                  required
                />
              </label>
              <label className="message-field">
                <span>Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  required
                />
              </label>
            </div>

            <div className="contact-bottom">
              <label className="permission-field">
                <input
                  name="permission"
                  type="checkbox"
                  checked={form.permission}
                  onChange={updateField}
                />
                <span>Kindly contact me at this email address.</span>
              </label>

              <div className="contact-submit">
                {status.message && (
                  <p
                    className={`form-status ${status.type === "error" ? "form-status-error" : "form-status-success"}`}
                  >
                    {status.message}
                  </p>
                )}
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
