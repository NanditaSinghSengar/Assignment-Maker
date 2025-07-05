import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import axios from 'axios'




const Navbar: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/service" },
    { name: "Testimonials", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "Connect on Whatsapp", href: "https://wa.me/918696333092" }
  ];

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
          className="https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.linkedin.com%2Fcompany%2Fthe-assignment-maker&psig=AOvVaw3Kvs8QnTVUa773fF_GfHDH&ust=1751205497477000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCF8P2ilI4DFQAAAAAdAAAAABAEr"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlnYIH74xgP5KlXGph-WGE7sBnDHITOa7DNw&s"}
            alt="Logo"
            className="object-contain h-36 w-auto sm:h-40"
            
          />
        </motion.div>

        {/* Hamburger Toggle (Mobile) */}
        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="space-x-6 hidden sm:flex">
          {links.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={`relative text-white font-medium transition duration-300 ${hovered === link.name ? "text-yellow-300" : "hover:text-yellow-300"
                }`}
              onMouseEnter={() => setHovered(link.name)}
              onMouseLeave={() => setHovered(null)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
            >
              {link.name}
              {/* Underline animation */}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 w-full bg-yellow-300 transform transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${hovered === link.name ? "scale-x-100" : ""
                  }`}
              ></span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 bg-white/90 backdrop-blur-md">
          {links.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="block text-gray-800 font-semibold hover:text-indigo-600 transition"
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      )}
    </motion.nav>
  );
};



const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
  });

  // Track which fields have been touched to only show errors after first interaction
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    contact: false,
    service: false,
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateContact = (contact: string) =>
    /^\d{10}$/.test(contact);

  // Real-time validation on input change
  useEffect(() => {
    let newErrors = { name: "", email: "", contact: "", service: "" };

    if (touched.name && !formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (touched.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (touched.contact && !validateContact(formData.contact)) {
      newErrors.contact = "Please enter a valid 10-digit contact number.";
    }

    if (touched.service && !formData.service.trim()) {
      newErrors.service = "Please describe the service you need.";
    }

    setErrors(newErrors);
  }, [formData, touched]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all touched to show errors if any
    setTouched({
      name: true,
      email: true,
      contact: true,
      service: true,
    });

    if (
      !formData.name.trim() ||
      !validateEmail(formData.email) ||
      !validateContact(formData.contact) ||
      !formData.service.trim()
    ) {
      return;
    }

    try {
      const response= await axios.post(
    `${import.meta.env.VITE_API_URL}/api/contact`,
    formData
  );
  console.log("hey")

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", contact: "", service: "" });
        setTouched({ name: false, email: false, contact: false, service: false });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to send message.");
    }



    // Successful submit
    alert("Thank you! We'll get in touch soon.");
    setFormData({ name: "", email: "", contact: "", service: "" });
    setTouched({ name: false, email: false, contact: false, service: false });
  };

  const errorAnim = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
  };

  return (
    <>
      <div>
        <Navbar />
        <section id="contact" className="py-16 px-4   bg-white text-center bg-[url('https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430867.jpg?semt=ais_items_boosted&w=740')] bg-cover bg-center bg-no-repeat ">
          <motion.h2
            className="text-3xl font-semibold  text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            noValidate
          >
            {/** NAME */}
            <div className="flex flex-col text-left">
              <label className="mb-1 text-sm text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 transition ${errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                  }`}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    className="text-red-600 text-sm mt-1"
                    {...errorAnim}
                    key="nameError"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/** EMAIL */}
            <div className="flex flex-col text-left">
              <label className="mb-1 text-sm text-gray-700 font-medium">Email </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 transition ${errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                  }`}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    className="text-red-600 text-sm mt-1"
                    {...errorAnim}
                    key="emailError"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/** CONTACT */}
            <div className="flex flex-col text-left">
              <label className="mb-1 text-sm text-gray-700 font-medium">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 transition ${errors.contact
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                  }`}
              />
              <AnimatePresence>
                {errors.contact && (
                  <motion.p
                    className="text-red-600 text-sm mt-1"
                    {...errorAnim}
                    key="contactError"
                  >
                    {errors.contact}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/** SERVICE */}
            <div className="flex flex-col text-left">
              <label className="mb-1 text-sm text-gray-700 font-medium">
                Service You Want
              </label>
              <textarea
                name="service"
                value={formData.service}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                placeholder="Describe the service you need..."
                className={`border rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 transition ${errors.service
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                  }`}
              />
              <AnimatePresence>
                {errors.service && (
                  <motion.p
                    className="text-red-600 text-sm mt-1"
                    {...errorAnim}
                    key="serviceError"
                  >
                    {errors.service}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
            >
              Submit
            </motion.button>
          </motion.form>
        </section>
        
               <footer className="bg-indigo-900 text-gray-300 py-10 px-6 mt-1">
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
                          <p>Phone: <a href="tel:8696333092" className="hover:text-indigo-400 transition">+91 8696333092 </a></p>
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
                              href="https://wa.me/918696333092"
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
    </>
  );
};

export default Contact;
