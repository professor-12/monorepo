import React, { useEffect } from "react";
import "./campus.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "remixicon/fonts/remixicon.css";

export default function CampusConnect() {
      useEffect(() => {
            const hamburger = document.querySelector(".hamburger");
            const navLinks = document.querySelector(".nav-links");

            const toggleMenu = () => {
                  navLinks.classList.toggle("active");
            };

            const closeMenu = () => {
                  navLinks.classList.remove("active");
            };

            hamburger.addEventListener("click", toggleMenu);
            document.querySelectorAll(".nav-links a").forEach((link) => {
                  link.addEventListener("click", closeMenu);
            });

            return () => {
                  hamburger.removeEventListener("click", toggleMenu);
                  document.querySelectorAll(".nav-links a").forEach((link) => {
                        link.removeEventListener("click", closeMenu);
                  });
            };
      }, []);

      return (
            <div>
                  {/* ================= NAV ================= */}
                  <section className="Nav">
                        <img className="img1" src="Images/IMG-20250908-WA0020.jpg" alt="Logo" />
                        <div className="nav-container">
                              <button className="hamburger" aria-label="Toggle navigation">
                                    <i className="fas fa-bars"></i>
                              </button>
                              <ul className="nav-links">
                                    <li><a href="#" className="nav-items">Home</a></li>
                                    <li><a href="#" className="nav-items">Features</a></li>
                                    <li><a href="#" className="nav-items">About</a></li>
                                    <li><a href="#" className="nav-items">Connect</a></li>
                              </ul>
                              <button className="btn">
                                    <a href="https://monorepo-smoky-two.vercel.app/auth/login">
                                          <i className="fas fa-user"></i> Login
                                    </a>
                              </button>
                              <button className="btn">
                                    <a href="https://monorepo-smoky-two.vercel.app/auth/register">
                                          <i className="fas fa-user-check"></i> Sign up
                                    </a>
                              </button>
                        </div>
                  </section>

                  {/* ================= HERO ================= */}
                  <section className="hero">
                        <div className="hero-text">
                              Stay <span className="extra">Connected.</span><br />
                              Learn <span className="extra">Smarter.</span><br />
                              Live Campus <span className="extra">Better.</span>
                              <p>
                                    Campus Connect is your digital hub for collaboration, resources,
                                    and campus life all in one place.
                              </p>
                              <div className="space-x-4 pt-6">
                                    <button className="btn2"><a href="/auth/register">Get Started</a></button>
                                    <button className="btn2"><a href="#">Learn More</a></button>
                              </div>
                        </div>
                        <img className="img" src="Images/bdd4b5eecef38a4b3d3581b8b2b4dbdd.jpg" alt="Hero" />
                  </section>

                  {/* ================= FEATURES ================= */}
                  <section className="Features">
                        <h2>Features</h2>
                        <div className="features">
                              <div className="features-box">
                                    <span className="icon"><i className="fa-solid fa-message"></i></span>
                                    <div className="features-text">
                                          <h3>Channels</h3>
                                          <p>Collaboration & community</p>
                                    </div>
                              </div>
                              <div className="features-box">
                                    <span className="icon"><i className="fas fa-image"></i></span>
                                    <div className="features-text">
                                          <h3>Marketplace & Social Feed</h3>
                                          <p>Post & connect</p>
                                    </div>
                              </div>
                              <div className="features-box">
                                    <span className="icon"><i className="fa-solid fa-robot"></i></span>
                                    <div className="features-text">
                                          <h3>AI assistant</h3>
                                          <p>Personal campus assistant (incoming)</p>
                                    </div>
                              </div>
                              <div className="features-box">
                                    <span className="icon"><i className="fa-solid fa-book-open"></i></span>
                                    <div className="features-text">
                                          <h3>Academic tools</h3>
                                          <p>Resources, past questions, GPA calculator</p>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* ================= PROCESS ================= */}
                  <section className="Process">
                        <h2>How It Works</h2>
                        <div className="process-cards">
                              <div className="process-card">
                                    <span className="icons"><i className="fas fa-user-check"></i></span>
                                    <p>Sign up & Verify</p>
                              </div>
                              <div className="process-card">
                                    <span className="icons"><i className="fa-solid fa-users"></i></span>
                                    <p>Join Channels & Communities</p>
                              </div>
                              <div className="process-card">
                                    <span className="icons"><i className="fas fa-project-diagram"></i></span>
                                    <p>Connect, Share and Learn</p>
                              </div>
                        </div>
                  </section>

                  {/* ================= BENEFITS ================= */}
                  <section className="Benefits">
                        <h2>Benefits</h2>
                        <div className="benefit-cards">
                              <div className="benefit-card">
                                    <span className="iconss"><i className="fas fa-chart-line"></i></span>
                                    <p>Improved Engagement</p>
                              </div>
                              <div className="benefit-card">
                                    <span className="iconss"><i className="fas fa-clock"></i></span>
                                    <p>Increased Efficiency</p>
                              </div>
                              <div className="benefit-card">
                                    <span className="iconss"><i className="fas fa-graduation-cap"></i></span>
                                    <p>Enhanced Learning Experience</p>
                              </div>
                        </div>
                  </section>

                  {/* ================= ABOUT US ================= */}
                  <section className="About-Us">
                        <h2>About Us</h2>
                        <p>
                              Campuz Connect is your all-in-one digital campus hub. We make it
                              easier for students to connect, share knowledge, and access
                              resources anytime, anywhere.
                        </p>
                        <h4>Our goal is simple:</h4>
                        <div className="AUBoxs">
                              <div className="A-U-Box">
                                    <span className="iconz"><i className="fas fa-lightbulb"></i></span>
                                    <h3>Learn Smarter</h3>
                                    <p>Get access to study groups, past questions, and academic tools.</p>
                              </div>
                              <div className="A-U-Box">
                                    <span className="iconz"><i className="fas fa-users"></i></span>
                                    <h3>Connect Faster</h3>
                                    <p>Get through discussion forums, chat, and real-time collaboration.</p>
                              </div>
                              <div className="A-U-Box">
                                    <span className="iconz"><i className="fas fa-globe"></i></span>
                                    <h3>Experience More</h3>
                                    <p>
                                          Get information with events updates, campus news,
                                          and a vibrant student community.
                                    </p>
                              </div>
                        </div>
                        <span className="texts">
                              <i>
                                    With Campuz Connect, you don't just study on campus - you live
                                    connected.
                              </i>
                        </span>
                  </section>

                  {/* ================= CTA ================= */}
                  <section className="CTA">
                        <div className="CTA-container">
                              <h2>
                                    Ready to Build Your Digital <span className="extra1">Campus</span>
                                    <span className="extra2">?</span>
                              </h2>
                              <p>
                                    Campuz Connect makes engagement, collaboration,
                                    and learning seamless for students, faculty, and staffs.
                              </p>
                              <button className="btn3">
                                    <a href="https://monorepo-smoky-two.vercel.app/auth/login">Join Now</a>
                              </button>
                        </div>
                        <img
                              className="img2"
                              src="Images/group-cheerful-diverse-asian-college-600nw-2405844863.jpg"
                              alt="Students"
                        />
                  </section>

                  {/* ================= FOOTER ================= */}
                  <section className="footer">
                        <div className="img3">
                              <img className="img3" src="Images/IMG-20250908-WA0020.jpg" alt="Logo" />
                        </div>

                        <div className="towers">
                              <h2>Campuz Connect</h2>
                              <p>
                                    Discover a smarter way to stay updated, share resources, and connect
                                    with your campus community. Campuz Connect is your all-in-one academic
                                    and social platform.
                              </p>
                              <ul className="footer_socials">
                                    <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-github"></i></a></li>
                              </ul>
                        </div>

                        <div className="quick-links">
                              <h3>Quick Links</h3>
                              <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Resources</a></li>
                                    <li><a href="#">Connect</a></li>
                                    <li><a href="#">Channels</a></li>
                              </ul>
                        </div>

                        <div className="subscribe">
                              <h3>Subscribe</h3>
                              <form className="input">
                                    <input type="email" className="email" placeholder="Enter your email" />
                                    <button className="sub">Subscribe</button>
                              </form>
                        </div>
                  </section>
            </div>
      );
}
