import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";


const Navbar: React.FC = () => {
   const [hovered, setHovered] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "/service" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "/contact" },
    { name: "Connect on Whatsapp", href: "https://wa.me/918696333092" },
  ];

  // Helper function to check if link is external
  const isExternal = (url: string) => url.startsWith("http");

  return (
    <motion.nav
      className="bg-indigo-900"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold text-white cursor-pointer w-28 sm:w-36 h-16 sm:h-20 overflow-hidden flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={"./images/Logo.png"}
            alt="Logo"
            className="object-contain h-36 w-auto sm:h-40"
          />
        </motion.div>

        {/* Hamburger Toggle (Mobile) */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="space-x-6 hidden sm:flex">
          {links.map((link) =>
            isExternal(link.href) || link.href.startsWith("#") ? (
              <motion.a
                key={link.name}
                href={link.href}
                className={`relative text-white font-medium transition duration-300 ${
                  hovered === link.name ? "text-yellow-300" : "hover:text-yellow-300"
                }`}
                onMouseEnter={() => setHovered(link.name)}
                onMouseLeave={() => setHovered(null)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.1 }}
                target={isExternal(link.href) ? "_blank" : undefined}
                rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full bg-yellow-300 transform transition-transform duration-300 origin-left scale-x-0 ${
                    hovered === link.name ? "scale-x-100" : ""
                  }`}
                ></span>
              </motion.a>
            ) : (
              <motion.div
                key={link.name}
                className={`relative inline-block text-white font-medium transition duration-300 ${
                  hovered === link.name ? "text-yellow-300" : "hover:text-yellow-300"
                }`}
                onMouseEnter={() => setHovered(link.name)}
                onMouseLeave={() => setHovered(null)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.1 }}
              >
                <Link to={link.href}>{link.name}</Link>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full bg-yellow-300 transform transition-transform duration-300 origin-left scale-x-0 ${
                    hovered === link.name ? "scale-x-100" : ""
                  }`}
                ></span>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 bg-white/90 backdrop-blur-md">
          {links.map((link) =>
            isExternal(link.href) || link.href.startsWith("#") ? (
              <motion.a
                key={link.name}
                href={link.href}
                className="block text-gray-800 font-semibold hover:text-indigo-600 transition"
                whileTap={{ scale: 0.95 }}
                target={isExternal(link.href) ? "_blank" : undefined}
                rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
              >
                {link.name}
              </motion.a>
            ) : (
              <motion.div key={link.name} whileTap={{ scale: 0.95 }}>
                <Link
                  to={link.href}
                  className="block text-gray-800 font-semibold hover:text-indigo-600 transition"
                  onClick={() => setIsOpen(false)} // close menu on click
                >
                  {link.name}
                </Link>
              </motion.div>
            )
          )}
        </div>
      )}
    </motion.nav>
  );
};




const App: React.FC = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="my-1 relative text-center py-40 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://static-cse.canva.com/blob/1368906/Howtomakeyourassignmentslookmoreprofessionalbanner.jpg')",
        }}
      >

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content above the background */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-5xl font-bold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Get Assignments Made Professionally
          </motion.h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Elevate your academic performance with AI-Free, Expert-Crafted assignments tailored to your needs.
          </p>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-6">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          <motion.div className="p-6 border rounded-lg shadow hover:shadow-xl transition cursor-pointer" whileHover={{ scale: 1.05 }}>
            <img src={"https://static-cse.canva.com/blob/1368906/Howtomakeyourassignmentslookmoreprofessionalbanner.jpg"} alt="Custom Assignments" className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Custom Assignments</h3>
            <p className="text-gray-600">Tailored to your topic, subject and academic level.</p>
          </motion.div>
          <motion.div className="p-6 border rounded-lg shadow hover:shadow-xl transition cursor-pointer" whileHover={{ scale: 1.05 }}>
            <img src={"https://cdn.pixabay.com/photo/2022/01/28/12/17/distance-learning-6974511_1280.jpg"} alt="AI-Free" className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">AI-Free Content</h3>
            <p className="text-gray-600">100% human-written and plagiarism-free assignments.</p>
          </motion.div>
          <motion.div className="p-6 border rounded-lg shadow hover:shadow-xl transition cursor-pointer" whileHover={{ scale: 1.05 }}>
            <img src={"https://contentspire.in/wp-content/uploads/2024/06/27039266_laptop_and_hand_fpv_01-1.jpg"} alt="Experts" className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Expert Writers</h3>
            <p className="text-gray-600">Real academic experts with years of experience.</p>
          </motion.div>
          <motion.div className="p-6 border rounded-lg shadow hover:shadow-xl transition cursor-pointer" whileHover={{ scale: 1.05 }}>
            <img src={"https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXNzaWdubWVudHxlbnwwfHwwfHx8MA%3D%3D"} alt="Fast Delivery" className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Fast Delivery</h3>
            <p className="text-gray-600">Quick turnaround time with on-time submissions.</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}

      <section id="testimonials" className="py-16 bg-white-100 text-center">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-6">What Students Say</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <motion.div
            className="bg-white p-6 rounded shadow-md flex flex-col items-center"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="Priya Sharma"
              className="w-20 h-20 rounded-full border-4 border-indigo-100 mb-4 shadow"
            />
            <p className="text-gray-600">
              "Outstanding quality! Got my assignment before the deadline with no errors."
            </p>
            <h4 className="mt-2 font-bold text-indigo-700">— Priya Sharma</h4>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded shadow-md flex flex-col items-center"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="https://randomuser.me/api/portraits/men/2.jpg"
              alt="Aarav Mehta"
              className="w-20 h-20 rounded-full border-4 border-indigo-100 mb-4 shadow"
            />
            <p className="text-gray-600">
              "Reliable and affordable. Will definitely use their service again!"
            </p>
            <h4 className="mt-2 font-bold text-indigo-700">— Aarav Mehta</h4>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded shadow-md flex flex-col items-center"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="https://randomuser.me/api/portraits/women/5.jpg"
              alt="Ananya Verma"
              className="w-20 h-20 rounded-full border-4 border-indigo-100 mb-4 shadow"
            />
            <p className="text-gray-600">
              "The service is amazing. I got exactly what I asked for in a professional format."
            </p>
            <h4 className="mt-2 font-bold text-indigo-700">— Ananya Verma</h4>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded shadow-md flex flex-col items-center"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="https://randomuser.me/api/portraits/men/6.jpg"
              alt="Rohan Kapoor"
              className="w-20 h-20 rounded-full border-4 border-indigo-100 mb-4 shadow"
            />
            <p className="text-gray-600">
              "Very cooperative team. My assignment was delivered early and well-written."
            </p>
            <h4 className="mt-2 font-bold text-indigo-700">— Rohan Kapoor</h4>
          </motion.div>
        </div>
      </section>

      {/* Frequently asked section  */}



      <section id="faq" className="py-16 bg-white-100 text-center">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto px-4 space-y-6 text-left">
          {[
            {
              question: "Are the assignments written by real people?",
              answer: "Yes! All assignments are written by experienced academic experts without using AI tools. 100% human-generated content."
            },
            {
              question: "How quickly can I receive my assignment?",
              answer: "We offer fast delivery depending on your deadline. Many assignments can be delivered within 24-48 hours."
            },
            {
              question: "Is the content plagiarism-free?",
              answer: "Absolutely. Every assignment is checked with premium plagiarism detection tools before delivery."
            },
            {
              question: "Can I request revisions?",
              answer: "Yes. You can request free revisions if the delivered assignment doesn't meet your original requirements."
            },
            {
              question: "Do you support all subjects?",
              answer: "Yes, we cover a wide range of subjects from engineering, management, literature, law, and more."
            }
          ].map((faq, index) => {
            const [openIndex, setOpenIndex] = useState(null);
            const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

            return (
              <motion.div
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggle(index)}
                >
                  <h4 className="text-lg font-semibold text-indigo-800">{faq.question}</h4>
                  <span className="text-indigo-700 text-xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.p
                      className="text-gray-600 mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>



      <footer className="bg-indigo-900 text-gray-300 py-10 px-6 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">AssignmentMaker</h3>
            <p className="text-gray-400">
              Helping students with custom, plagiarism-free assignments delivered fast and with expert care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-indigo-400 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-indigo-400 transition">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-indigo-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Contact Us</h3>
            <p>Email: <a href="mailto:support@assignmentmaker.com" className="hover:text-indigo-400 transition">support@assignmentmaker.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="hover:text-indigo-400 transition">+91 869633092 </a></p>
            <div className="flex space-x-4 mt-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://www.facebook.com/share/1ATwtaaD1g/?mibextid=qi2Omg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-indigo-400"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-3v-3h3v-2.3c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 1-2 2v2.3h3.4l-.5 3h-2.9v7A10 10 0 0 0 22 12" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://x.com/helpassignment0?t=WP5u90gGDq-0mRW3NBYM3g&s=09"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-400 hover:text-indigo-400"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.34-1.5.57-2.28.67a4.01 4.01 0 0 0 1.8-2.23 7.92 7.92 0 0 1-2.52.95 3.96 3.96 0 0 0-6.76 3.6A11.2 11.2 0 0 1 3.15 5.15a3.95 3.95 0 0 0 1.22 5.27 4 4 0 0 1-1.8-.5v.05a3.96 3.96 0 0 0 3.18 3.88 4.03 4.03 0 0 1-1.79.07 3.96 3.96 0 0 0 3.7 2.76 8 8 0 0 1-5 1.72A7.84 7.84 0 0 1 2 18.17 11.26 11.26 0 0 0 7.29 20c7.55 0 11.68-6.26 11.68-11.7 0-.18 0-.35-.01-.53A8.18 8.18 0 0 0 22.46 6z" />
                </svg>
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://www.instagram.com/the.assignment.maker/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-indigo-400"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5a3.75 3.75 0 0 0 3.75-3.75v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm8.75 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4.25 1.25a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://wa.me/91869633032"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-gray-400 hover:text-indigo-400"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.74 11.74 0 0 0 12 0a11.7 11.7 0 0 0-10.36 16.62L0 24l7.72-1.61a11.75 11.75 0 0 0 4.28.81 11.7 11.7 0 0 0 8.52-19.72zM12 21.67a9.8 9.8 0 0 1-5.21-1.53l-.37-.22-4.58.96 1.01-4.46-.24-.36a9.84 9.84 0 1 1 9.39 5.6zm5.1-6.49c-.28-.14-1.65-.81-1.9-.9-.25-.1-.43-.14-.61.14-.17.27-.66.9-.81 1.09-.15.18-.3.2-.56.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.4-1.66-1.57-1.94-.16-.27-.02-.42.12-.56.12-.12.28-.3.43-.45.14-.15.18-.25.28-.42.1-.17.05-.32-.02-.45-.07-.14-.61-1.47-.84-2.01-.22-.52-.44-.45-.61-.46-.16-.01-.35-.01-.54-.01s-.56.08-.85.4c-.28.27-1.07 1.04-1.07 2.53s1.1 2.94 1.25 3.15c.14.2 2.15 3.3 5.22 4.62.73.31 1.3.49 1.75.63.74.23 1.42.2 1.96.12.6-.1 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.2-.53-.35z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} AssignmentMaker. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default App;
