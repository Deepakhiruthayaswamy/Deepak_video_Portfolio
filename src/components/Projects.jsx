import { useRef } from "react";
import { motion } from "framer-motion";

import AgencyImage from "../assets/Agency.png";
import MasspekiImage from "../assets/Masspeki.png";
import fempsImage from "../assets/Femps.png";
import NDISImage from "../assets/NDIS.png";
import NXPLImage from "../assets/NXPL.png";
import LovedaleImage from "../assets/Lovedale.png";
import LokhaaImage from "../assets/Lokhaa.png";
import AlhulmImage from "../assets/Alhulm.png";
import NilgirigreensImage from "../assets/Nilgiri_greens.png";
import TeknoImage from "../assets/Tekno.png";
import GymImage from "../assets/Gym.jpeg";
import EcommerceImage from "../assets/E-Commerce.png";

const projects = [
  {
    title: "WP Digital Agency",
    description:
      "Modern, high-converting WordPress website for a digital agency.",
    image: AgencyImage,
    github: "https://github.com/Deepakhiruthayaswamy/Wordpress_Digital_agency",
    live: "https://digitalagency04.infinityfreeapp.com/?i=1",
  },
  {
    title: "WP Femps Machinery",
    description:
      "Modern WordPress website designed for an industrial machinery business.",
    image: fempsImage,
    live: "https://femps.in/",
  },
  {
    title: "WP Masspeki Machinery",
    description:
      "Modern WordPress website designed for an industrial machinery business.",
    image: MasspekiImage,
   
    live: "https://masspeki.com/",
  },
  {
    title: "WP Lokhaa School",
    description:
      "Responsive WordPress website for a modern educational institution.",
    image: LokhaaImage,
    
    live: "https://lokhaaschool.org/",
  },
  {
    title: "WP Lovedale Montessori",
    description:
      "Modern WordPress website for a Montessori school with a clean, user-friendly interface.",
    image: LovedaleImage,
 
    live: "https://lovedalemontessori.org/",
  },
  {
    title: "Nilgiri X-Ray",
    description:
      "Responsive WordPress website for a diagnostic and medical imaging center.",
    image: NXPLImage,
    
    live: "https://nilgiripathologicallab.com/",
  },
  {
    title: "Al Hulm",
    description:
      "Responsive WordPress website for a foodstuff trading company.",
    image: AlhulmImage,
   
    live: "https://alhulmfoodstufftrading.com/",
  },
  {
    title: "Living Hope NDIS",
    description:
      "Responsive WordPress website for an NDIS disability support service provider.",
    image: NDISImage,
   
    live: "https://livinghope.au/",
  },
  {
    title: "WP Nilgiri Greens",
    description:
      "Responsive WordPress website for a modern fitness and gym center.",
    image: NilgirigreensImage,
   
    live: "https://nilgirigreens.com/",
  },
  {
    title: "Gym Website",
    description:
      "Responsive WordPress website for a modern fitness and gym center.",
    image: GymImage,
    github:
      "https://github.com/Deepakhiruthayaswamy/HE_Grp_Project_Gym_1st_Project",
    live: "https://lucky-sprinkles-d7c288.netlify.app/",
  },
  {
    title: "E-Commerce Store (React)",
    description:
      "Responsive React e-commerce application with a seamless shopping experience.",
    image: EcommerceImage,
    github: "https://github.com/yourusername/ecommerce",
    live: "https://e-commerce-website-qpzvnm015-deepakhiruthayaswamys-projects.vercel.app/",
  },
  {
    title: "Tekno (Shopify)",
    description:
      "Responsive Shopify e-commerce store for a modern electronics and technology brand.",
    image: TeknoImage,
   
    live: "https://teknocraftonline.com/",
  },
];

const ProjectCard = ({ project, index }) => (
  <article className="project-card shrink-0 w-[82vw] max-w-[360px] sm:w-[340px]">
    <div className="h-[390px] overflow-hidden rounded-3xl">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="project-card-body">
      <span className="section-kicker">
        Project {String(index + 1).padStart(2, "0")}
      </span>

      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <div className="project-actions">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}

        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        )}
      </div>
    </div>
  </article>
);

const Projects = () => {
  const carouselRef = useRef(null);

  const scrollByCard = (direction) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction * 380,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="luxury-section projects-section">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="section-heading"
        >
          <span className="section-kicker">Selected Work</span>

          <h2>Projects crafted for premium digital presence.</h2>

          <p>
            Reusable project cards with slow motion, soft glass depth, and
            manual navigation support.
          </p>
        </motion.div>

        <div
          className="carousel-controls"
          aria-label="Project carousel controls"
        >
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous projects"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next projects"
          >
            ›
          </button>
        </div>
      </div>

      <div className="project-carousel" ref={carouselRef}>
        <div className="project-track">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
