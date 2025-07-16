"use client"; // This directive is necessary for using hooks like useState and useEffect

import React, { useState, useEffect, useRef } from "react";
import { Home, User, Briefcase, Mail, Linkedin, Github, ExternalLink, Menu, X, Eye, Sun, Moon, ArrowUpCircle, Award, Database, Wrench, GraduationCap, Building, Calendar, Facebook, BookOpen, FlaskConical, Cpu, Copy, CheckCircle, ChevronDown } from 'lucide-react';


// --- Data from Md. Abdul Awal's CV with Logos ---
const workExperienceData = [
  {
    id: 1,
    title: "Junior Software Engineer",
    company: "Babylon Resources LTD.",
    period: "Feb 2024 - Present",
    description:
      "Developing and implementing diverse IT solutions to streamline business processes at a leading IT firm.",
    logoUrl: "/babylon.png",
    tags: ["Node.js", "React.js", "MongoDB", "RESTful APIs", "Tailwind CSS"],
    details: [
      "Writing server-side logic and APIs using Node.js.",
      "Integrating Node.js with MongoDB for efficient data storage and retrieval.",
      "Developing RESTful APIs to communicate with frontend components.",
      "Implementing frontend features using React.js within MERN stack projects.",
      "Ensuring cross-browser compatibility and responsiveness of web applications.",
    ],
  },
  {
    id: 2,
    title: "Jr. Software Developer (Intern)",
    company: "Walton Hi-Tech Industries PLC",
    period: "Aug 2023 - Nov 2023",
    description:"Gained hands-on experience contributing to internal web applications in a large-scale corporate environment.",
    logoUrl: "/walton.jpg",
    tags: ["Grails Framework", "JavaScript", "MySQL", "Web Applications"],
    details: [
      "Contributed to the development of user-friendly web applications using the Grails Framework.",
      "Managed and interacted with MySQL databases.",
      "Implemented interactive web content and features with JavaScript.",
    ],
  },
  {
    id: 3,
    title: "Teacher Assistant (Intern)",
    company: "American International University-Bangladesh",
    period: "Mar 2023 - Jul 2023",
    description:
      "Assisted faculty and students in academic courses, focusing on web technologies and data structures.",
    logoUrl: "/aiub.jpeg",
    tags: ["Oracle", "JasperSoft", "Web Technologies", "Data Structures"],
    details: [
      "Assisted students with their coursework and understanding of concepts.",
      "Reviewed and provided feedback on student projects.",
      "Prepared Project Requirements Documents (PRD) for 'Web Technologies' and 'Data Structures' courses.",
      "Collaborated with faculty to enhance the learning environment.",
      "Gained experience with Oracle for data management and JasperSoft for report creation.",
    ],
  },
];
const projectsData = [
    {
        id: 1,
        title: "EventBy",
        description: "A comprehensive event management platform for creating, promoting, and managing events of all sizes.",
        imageUrl: "/signupattendee.png",
        tags: ["Event Management", "SaaS", "React", "Node.js"],
        liveLink: "https://app.eventby.xyz/",
        githubLink: "#"
    },
    {
        id: 2,
        title: "Reply Master AI",
        description: "An AI-powered browser extension to generate context-aware replies for social media platforms like LinkedIn and Twitter.",
        imageUrl: "/replymaster.png",
        tags: ["AI", "Browser Extension", "SaaS", "Next.js"],
        liveLink: "https://replymaster.ai/",
        githubLink: "#"
    },
    {
        id: 3,
        title: "Invoice Generator",
        description: "A user-friendly web application for creating, managing, and downloading professional invoices.",
        imageUrl: "/invoice.jpg",
        tags: ["Business Tool", "Invoicing", "JavaScript", "HTML/CSS"],
        liveLink: "https://demo.templatemonster.com/demo/507286.html",
        githubLink: "#"
    },
    {
        id: 4,
        title: "Foodipos",
        description: "A modern Point of Sale (POS) and ordering system designed for restaurants to streamline operations.",
        imageUrl: "https://placehold.co/600x400/0ea5e9/ffffff?text=Foodipos",
        tags: ["POS System", "Restaurant Tech", "React", "MongoDB"],
        liveLink: "#",
        githubLink: "#"
    },
    {
        id: 5,
        title: "Herlancer",
        description: "A freelance marketplace concept designed to connect clients with talented female professionals across various industries.",
        imageUrl: "https://placehold.co/600x400/0ea5e9/ffffff?text=Herlancer",
        tags: ["Marketplace", "Freelancing", "Web Platform", "Next.js"],
        liveLink: "#",
        githubLink: "#"
    }
];

const educationData = {
  degree: "B.Sc in Computer Science and Engineering",
  university: "American International University-Bangladesh",
  period: "2019 - 2023",
  cgpa: "3.85 / 4.00",
  logoUrl: "https://i.imgur.com/2a6eD7g.png",
  thesis: {
    title: "A Machine Learning Approach for Predicting Software Defects",
    description:
      "Developed and evaluated a predictive model using various classification algorithms to identify potential software defects early in the development lifecycle, achieving high accuracy and precision.",
  },
  courses: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Web Technologies",
    "Artificial Intelligence",
    "Computer Networks",
  ],
};

// Framer Motion-like component (simplified for this environment)
const MotionDiv = ({
  children,
  initial,
  animate,
  transition,
  className,
  ...props
}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const combinedStyle = {
    ...initial,
    ...(isInView ? animate : {}),
    transition: `all ${transition?.duration || 500}ms ${
      transition?.ease || "ease-out"
    } ${transition?.delay || 0}ms`,
  };

  return (
    <div ref={ref} style={combinedStyle} className={className} {...props}>
      {children}
    </div>
  );
};

// Helper component for section titles
const SectionTitle = ({ title, subtitle }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 500 }}
    className="mb-16 text-center"
  >
    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
      {title}
    </h2>
    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
      {subtitle}
    </p>
  </MotionDiv>
);

// Navbar Component
const Navbar = ({ onNavigate, darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const navLinks = [
    { href: "home", label: "Home", icon: <Home size={18} /> },
    { href: "about", label: "About", icon: <User size={18} /> },
    { href: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    {
      href: "education",
      label: "Education",
      icon: <GraduationCap size={18} />,
    },
    { href: "contact", label: "Contact", icon: <Mail size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      let currentSection = "home";
      navLinks.forEach((link) => {
        const section = document.getElementById(link.href);
        if (section && section.offsetTop <= window.scrollY + 100) {
          currentSection = link.href;
        }
      });
      setActiveLink(currentSection);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const handleNavClick = (href) => {
    onNavigate(href);
    setActiveLink(href);
    setIsOpen(false);
  };

  return (
  <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 500, delay: 0.2 }}>
            <a href="#home" onClick={() => handleNavClick('home')} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 hover:opacity-80 transition-opacity">
              Abdul Awal
            </a>
          </MotionDiv>
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <MotionDiv key={link.href} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 300, delay: 0.1 * index + 0.3 }}>
                <a href={`#${link.href}`} onClick={() => handleNavClick(link.href)} className={`flex items-center px-4 py-2 rounded-md text-md font-medium transition-all duration-300 ease-in-out ${activeLink === link.href ? 'bg-sky-500 text-white shadow-md dark:bg-sky-600' : 'text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400'}`}>
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </a>
              </MotionDiv>
            ))}
             <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 300, delay: 0.8 }}>
                <button onClick={toggleDarkMode} className="ml-4 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle dark mode">
                    {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
                </button>
            </MotionDiv>
          </div>
          <div className="md:hidden flex items-center">
             <button onClick={toggleDarkMode} className="mr-2 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle dark mode">
                {darkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <Menu size={24} /> : <X size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <MotionDiv initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 300, ease: "easeInOut" }} className="md:hidden bg-white dark:bg-slate-900 shadow-lg origin-top" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a key={link.href} href={`#${link.href}`} onClick={() => handleNavClick(link.href)} className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-300 ${activeLink === link.href ? 'bg-sky-500 text-white dark:bg-sky-600' : 'text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400'}`}>
                {link.icon}
                <span className="ml-3">{link.label}</span>
              </a>
            ))}
          </div>
        </MotionDiv>
      )}
    </nav>
  );
};

// --- Custom Hooks ---
const useTypewriter = (text, speed = 40) => {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayText(""); // Reset before starting
    indexRef.current = 0;

    const typingInterval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayText;
};

// --- Interactive Background Component ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let particles = [];
    const particleCount = 70;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0)
          this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0)
          this.directionY = -this.directionY;

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    const init = () => {
      handleResize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
        let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
        let directionX = Math.random() * 0.4 - 0.2;
        let directionY = Math.random() * 0.4 - 0.2;
        let color = document.documentElement.classList.contains("dark")
          ? "rgba(255, 255, 255, 0.5)"
          : "rgba(0, 0, 0, 0.5)";
        particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance =
            (particles[a].x - particles[b].x) *
              (particles[a].x - particles[b].x) +
            (particles[a].y - particles[b].y) *
              (particles[a].y - particles[b].y);
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - distance / 20000;
            let color = document.documentElement.classList.contains("dark")
              ? `rgba(14, 165, 233, ${opacityValue})`
              : `rgba(56, 189, 248, ${opacityValue})`;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);

    // Re-init on theme change
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          init();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    ></canvas>
  );
};

// Hero Section Component
const HeroSection = ({ onNavigate }) => {
const typedName = useTypewriter("M.d Abdul Awal", 90);


  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 pt-20 overflow-hidden relative"
    >
      <ParticleBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 700, ease: "easeOut", delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <MotionDiv
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 500, delay: 0.5 }}
          >
            <img
              src="/awal.jpg"
              alt="Md. Abdul Awal"
              className="w-36 h-36 md:w-44 md:h-44 rounded-full mx-auto mb-8 shadow-2xl border-4 border-white dark:border-slate-700 transform hover:scale-105 transition-transform duration-300"
            />
          </MotionDiv>
          <MotionDiv
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 500, delay: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 dark:text-white leading-tight mb-2">
  Hi, I'm{" "}
  <span className="whitespace-pre bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 inline-block min-w-[15ch]">
    {typedName}
  </span>
  <span className="animate-cursor-blink">|</span>
</h1>

            <p className="text-2xl sm:text-3xl font-semibold text-slate-700 dark:text-slate-200 mb-6">
              Junior Software Developer
            </p>
          </MotionDiv>
          <MotionDiv
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 500, delay: 0.9 }}
          >
            <p className="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              A highly motivated developer proficient in web development and
              programming, eager to apply my skills to drive innovation and
              growth.
            </p>
          </MotionDiv>
          <MotionDiv
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 500, delay: 1.1 }}
            className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <a
              href="#experience"
              onClick={() => onNavigate("experience")}
              className="px-8 py-3 bg-sky-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center group"
            >
              View My Experience{" "}
              <Briefcase
                size={20}
                className="ml-2 transform group-hover:rotate-6 transition-transform"
              />
            </a>
            <a
              href="#contact"
              onClick={() => onNavigate("contact")}
              className="px-8 py-3 bg-slate-200 text-slate-700 text-lg font-semibold rounded-lg shadow-lg hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center group"
            >
              Get In Touch{" "}
              <Mail
                size={20}
                className="ml-2 transform group-hover:translate-x-1 transition-transform"
              />
            </a>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 500, delay: 1.3 }}
            className="mt-12 flex justify-center space-x-6"
          >
            <a
              href="https://www.github.com/Abdul-Awal1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors transform hover:-translate-y-1"
            >
              <Github size={30} />
            </a>
            <a
              href="https://www.facebook.com/mahfuz.mintu.9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors transform hover:-translate-y-1"
            >
              <Facebook size={30} />
            </a>
          </MotionDiv>
        </MotionDiv>
        <a
          href="#about"
          onClick={() => onNavigate("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
            <ChevronDown className="text-slate-500 dark:text-slate-400" />
          </div>
        </a>
      </div>
    </section>
  );
};

const SkillBadge = ({ skill }) => (
  <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-3 rounded-lg shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-slate-200 dark:hover:bg-slate-700/90 border border-transparent hover:border-sky-500">
    <span className="font-medium text-slate-700 dark:text-slate-200">
      {skill}
    </span>
  </div>
);

const AboutSection = () => {
  const languagesAndFrameworks = [
    "C++",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "NestJS",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "PHP",
    "React.js",
  ];
  const databases = ["MongoDB", "MySQL", "SQL Developer", "PG Admin"];
  const tools = ["Git", "IntelliJ IDEA", "VS Code"];

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-white dark:bg-slate-900 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="About Me"
          subtitle="My journey, skills, and passion for development"
        />
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 600 }}
            className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300"
          >
            <p>
              I am a dedicated and results-oriented Software Developer, a proud
              graduate with a B.Sc in Computer Science and Engineering from the
              American International University-Bangladesh (AIUB) with a CGPA of
              3.85.
            </p>
            <p>
              My passion lies in crafting elegant solutions to complex problems,
              particularly in web development and database management. I thrive
              in collaborative environments and enjoy turning ideas into
              tangible, high-quality applications.
            </p>
            <p>
              I'm always eager to learn new technologies and contribute to
              challenging projects. Feel free to explore my experience and get
              in touch!
            </p>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 600, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                <Cpu size={24} className="mr-3 text-sky-500" />
                Languages & Frameworks
              </h3>
              <div className="flex flex-wrap gap-3">
                {languagesAndFrameworks.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                <Database size={24} className="mr-3 text-sky-500" />
                Databases
              </h3>
              <div className="flex flex-wrap gap-3">
                {databases.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                <Wrench size={24} className="mr-3 text-sky-500" />
                Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {tools.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = ({ onOpenModal }) => {
  return (
    <section
      id="experience"
      className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Work Experience"
          subtitle="My professional journey and contributions"
        />
        <div className="relative max-w-2xl mx-auto">
          <div
            className="absolute left-9 top-0 h-full w-0.5 bg-slate-200 dark:bg-slate-700"
            aria-hidden="true"
          ></div>
          <div className="space-y-12">
            {workExperienceData.map((exp, index) => (
              <MotionDiv
                key={exp.id}
                className="relative pl-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 500, delay: index * 0.2 }}
              >
                <div className="absolute left-[29px] top-1 h-5 w-5 bg-white dark:bg-slate-950 rounded-full border-4 border-sky-500"></div>
                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-1">
                        {exp.period}
                      </p>
                      <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-md font-semibold text-slate-500 dark:text-slate-400 mb-3">
                        {exp.company}
                      </p>
                    </div>
                    <div className="bg-white p-2 rounded-md shadow-sm ml-4 flex-shrink-0">
                      <img
                        src={exp.logoUrl}
                        alt={`${exp.company} logo`}
                        className="h-[100px] w-auto object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onOpenModal(exp)}
                    className="w-full text-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 transition-all duration-300 font-medium flex items-center justify-center transform group-hover:scale-105"
                  >
                    View Details <Eye size={18} className="ml-2" />
                  </button>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
// --- NEW Projects Section ---
const ProjectsSection = () => {
    return (
        <section id="projects" className="py-20 md:py-28 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="My Projects" subtitle="A selection of applications I've built and contributed to." />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <MotionDiv
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 500, delay: index * 0.1 }}
                            className="group bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
                        >
                            <div className="relative overflow-hidden">
                                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{project.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="inline-block bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-auto flex items-center space-x-4">
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={`flex-1 text-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium flex items-center justify-center ${project.liveLink === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        Live Demo <ExternalLink size={16} className="ml-2" />
                                    </a>
                                    {/* <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`flex-1 text-center px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium flex items-center justify-center ${project.githubLink === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        GitHub <Github size={16} className="ml-2" />
                                    </a> */}
                                </div>
                            </div>
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </section>
    );
};
const EducationSection = () => {
  return (
    <section
      id="education"
      className="py-20 md:py-28 bg-white dark:bg-slate-900 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Education"
          subtitle="My academic background and qualifications"
        />
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <MotionDiv
            className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-slate-800 dark:to-sky-900/40 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 h-full flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 600 }}
          >
            <div className="flex items-start gap-6 mb-4">
              <div className="bg-white p-2 rounded-md shadow-md">
                <img
                      src="/aiub.jpeg"
                  alt="AIUB Logo"
                  className="h-30 w-30 object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {educationData.degree}
                </h3>
                <p className="text-lg font-semibold text-sky-600 dark:text-sky-400 mt-1">
                  {educationData.university}
                </p>
              </div>
            </div>
            <div className="space-y-2 mt-auto">
              <p className="text-slate-600 dark:text-slate-400 flex items-center">
                <Calendar size={16} className="mr-2" /> {educationData.period}
              </p>
              <p className="text-md font-medium text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 inline-block px-3 py-1 rounded-full">
                <Award size={16} className="inline mr-1" /> CGPA:{" "}
                {educationData.cgpa}
              </p>
            </div>
          </MotionDiv>

          <div className="space-y-8">
            <MotionDiv
              className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 600, delay: 0.2 }}
            >
              <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                <FlaskConical size={20} className="mr-3 text-sky-500" /> Thesis
                Project
              </h4>
              <p className="font-bold text-slate-700 dark:text-slate-200 mb-2">
                {educationData.thesis.title}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {educationData.thesis.description}
              </p>
            </MotionDiv>
            <MotionDiv
              className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 600, delay: 0.4 }}
            >
              <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                <BookOpen size={20} className="mr-3 text-sky-500" /> Relevant
                Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {educationData.courses.map((course) => (
                  <span
                    key={course}
                    className="bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceModal = ({ experience, onClose }) => {
  if (!experience) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4"
      style={{ animation: "fadeIn 0.3s ease-out forwards" }}
      onClick={onClose}
    >
      <MotionDiv
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 300, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 z-10"
          >
            <X size={28} />
          </button>
          <div className="pr-8 flex items-start gap-4">
            <div className="bg-white p-2 rounded-md shadow-sm flex-shrink-0">
              <img
                src={experience.logoUrl}
                alt={`${experience.company} logo`}
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                {experience.period}
              </p>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
                {experience.title}
              </h2>
              <p className="text-xl font-semibold text-slate-600 dark:text-slate-300">
                {experience.company}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 my-6">
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
            Key Responsibilities
          </h3>
          <ul className="space-y-2 list-disc list-inside text-slate-700 dark:text-slate-300 prose prose-slate dark:prose-invert max-w-none">
            {experience.details.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </MotionDiv>
    </div>
  );
};

// --- Redesigned Contact Section ---
const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const email = "awalabdul.aiub@gmail.com";

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    document.body.removeChild(textArea);
  };

  const contactLinks = [
    // { name: "LinkedIn", icon: <Linkedin size={24} />, href: "#" },
    {
      name: "GitHub",
      icon: <Github size={24} />,
      href: "https://www.github.com/Abdul-Awal1",
    },
    { name: "Facebook", icon: <Facebook size={24} />, href: "https://www.facebook.com/mahfuz.mintu.9/" },
  ];

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Let's Connect"
          subtitle="I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out!"
        />
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 600 }}
          className="max-w-lg mx-auto bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-xl p-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              Get in Touch
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">
              The best way to reach me is via email.
            </p>
            <div className="relative">
              <div className="group flex items-center justify-between bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                <span className="text-sky-600 dark:text-sky-400 font-mono text-sm sm:text-base">
                  {email}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  {copied ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <Copy
                      size={20}
                      className="text-slate-500 dark:text-slate-400"
                    />
                  )}
                </button>
              </div>
              {copied && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs bg-green-500 text-white px-2 py-1 rounded-md shadow-lg">
                  Copied!
                </div>
              )}
            </div>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
              <span className="flex-shrink mx-4 text-slate-400 dark:text-slate-500 text-sm">
                or find me on
              </span>
              <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
            </div>
            <div className="flex justify-center space-x-6">
              {contactLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-full text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-800/50 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-lg"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-600 dark:text-slate-400">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Md. Abdul Awal. All rights reserved.
        </p>
        <p className="text-xs mt-1">Based in Mirpur, Dhaka, Bangladesh.</p>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 z-50 animate-bounce-once"
          aria-label="Scroll to top"
        >
          <ArrowUpCircle size={24} />
        </button>
      )}
    </footer>
  );
};

export default function App() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Set initial dark mode state from localStorage or system preference
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

   const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  const handleNavigate = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleOpenModal = (experience) => {
    setSelectedExperience(experience);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedExperience(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && selectedExperience) handleCloseModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedExperience]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes bounce-once { 0%, 20%, 50%, 80%, 100% {transform: translateY(0) scale(1);} 40% {transform: translateY(-10px) scale(1.1);} 60% {transform: translateY(-5px) scale(1.05);} }
      .animate-bounce-once { animation: bounce-once 1.5s ease-out; }
      @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      .animate-cursor-blink { animation: cursor-blink 0.7s infinite; }
      body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

 return (
    <div className="font-inter bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar onNavigate={handleNavigate} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <HeroSection onNavigate={handleNavigate} />
        <AboutSection />
        <ExperienceSection onOpenModal={handleOpenModal} />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
      {selectedExperience && <ExperienceModal experience={selectedExperience} onClose={handleCloseModal} />}
    </div>
  );
}
