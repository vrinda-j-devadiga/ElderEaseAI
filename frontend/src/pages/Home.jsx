import Navbar from "../components/Navbar";
import "../styles/Home.css";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import {
  FaUsers,
  FaUser,
  FaCapsules,
  FaCalendarAlt,
  FaChartLine,
  FaFileMedical,
  FaBell,
  FaLock,
  FaStar,
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

function Home() {
  return (
      <>
    <Navbar />

    <div className="home">

      <section className="hero">

        <div className="hero-left">

          <span className="hero-tag">
            🟢 AI Powered Healthcare Companion
          </span>

          <h1>
            Smart Healthcare
            <br />
            Companion for
            <span> Senior Citizens</span>
          </h1>

          <p>
            Manage medicines, appointments, AI health assistance,
            reports and reminders—all in one secure platform.
          </p>

          <div className="hero-buttons">

            <Link to="/register">
              <button className="primary-btn">
                Get Started
              </button>
            </Link>

        <button
  className="secondary-btn"
  onClick={() =>
    document
      .getElementById("features")
      .scrollIntoView({ behavior: "smooth" })
  }
>
  Learn More
</button>

          </div>

          <div className="hero-highlights">

            <div>✔ Secure</div>

            <div>✔ AI Powered</div>

            <div>✔ Easy to Use</div>

          </div>

        </div>

 <div className="hero-right">

  <div className="phone-mockup">

    <div className="phone-header">
      <h3>Hello, User 👋</h3>
      <p>Take care of your health today!</p>
    </div>

    <div className="phone-card">
      <span>💊 Today's Medicines</span>
      <strong>3</strong>
    </div>

    <div className="phone-card">
      <span>📅 Next Appointment</span>
      <strong>Dr. Kumar</strong>
      <small>20 June • 10:30 AM</small>
    </div>

    <div className="phone-card">
      <span>❤️ Health Score</span>

      <div className="progress">
        <div className="progress-fill"></div>
      </div>

      <strong>85%</strong>
    </div>

  </div>

</div>

        

      </section>


      <section className="features" id="features">

        <h2>Everything You Need</h2>

        <p>
          Powerful features designed for elderly healthcare.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <FaCapsules />
            <h3>Medicine Reminder</h3>
            <p>Never miss your medicines.</p>
          </div>

          <div className="feature-card">
            <FaCalendarAlt />
            <h3>Appointments</h3>
            <p>Track doctor appointments.</p>
          </div>

          <div className="feature-card">
            <FaRobot />
            <h3>AI Assistant</h3>
            <p>Ask health related questions.</p>
          </div>

          <div className="feature-card">
            <FaChartLine />
            <h3>Dashboard</h3>
            <p>Monitor your health easily.</p>
          </div>

          <div className="feature-card">
            <FaFileMedical />
            <h3>Reports</h3>
            <p>Download health reports.</p>
          </div>

          <div className="feature-card">
            <FaBell />
            <h3>Notifications</h3>
            <p>Receive timely reminders.</p>
          </div>

        </div>

      </section>

     <section className="how-section" id="how">

    <h2>How It Works</h2>

    <p>
        Getting started with ElderEase AI takes only a few simple steps.
    </p>

    <div className="timeline">

        <div className="timeline-item">

            <div className="step-icon">
                <FaUser />
            </div>

            <div className="step-content">
                <h3><span>1.</span> Register</h3>
                <p>Create your ElderEase AI account securely.</p>
            </div>

        </div>

        <div className="timeline-line"></div>

        <div className="timeline-item">

            <div className="step-icon">
                <FaCapsules />
            </div>

            <div className="step-content">
                <h3><span>2.</span> Add Medicines</h3>
                <p>Add medicines and appointment schedules.</p>
            </div>

        </div>

        <div className="timeline-line"></div>

        <div className="timeline-item">

            <div className="step-icon">
                <FaBell />
            </div>

            <div className="step-content">
                <h3><span>3.</span> Receive Reminders</h3>
                <p>Get timely notifications for medicines.</p>
            </div>

        </div>

        <div className="timeline-line"></div>

        <div className="timeline-item">

            <div className="step-icon">
                <FaHeartbeat />
            </div>

            <div className="step-content">
                <h3><span>4.</span> Track Health</h3>
                <p>Monitor reports and health statistics easily.</p>
            </div>

        </div>

    </div>

</section>


<section className="why-section">

    <h2>Why Choose ElderEase AI?</h2>

    <p>
        Empowering senior citizens with smart, secure and easy healthcare management.
    </p>

    <div className="why-grid">

        <div className="why-card">
            <FaHeartbeat className="why-icon" />
            <h3>Designed for Seniors</h3>
            <p>
                Large, simple and easy-to-use interface specially designed for elderly users.
            </p>
        </div>

        <div className="why-card">
            <FaRobot className="why-icon" />
            <h3>AI Health Assistant</h3>
            <p>
                Ask health-related questions anytime and receive instant AI guidance.
            </p>
        </div>

        <div className="why-card">
            <FaLock className="why-icon" />
            <h3>Secure Medical Records</h3>
            <p>
                Your health information is encrypted and protected for complete privacy.
            </p>
        </div>

        <div className="why-card">
            <FaUsers className="why-icon" />
            <h3>Caregiver Support</h3>
            <p>
                Family members can stay updated and help monitor healthcare activities.
            </p>
        </div>

    </div>

</section>



<section className="assistant-section" id="AI">

    <div className="assistant-left">

        <span className="assistant-tag">
            🤖 AI Powered
        </span>

        <h2>Meet Your AI Health Assistant</h2>

        <p>
            Get instant answers to health-related questions, medicine guidance,
            appointment support and wellness tips anytime.
        </p>

        <ul className="assistant-list">

            <li>✔ 24/7 AI Assistance</li>

            <li>✔ Medicine Information</li>

            <li>✔ Health Guidance</li>

            <li>✔ Easy Conversations</li>

        </ul>

    </div>


    <div className="assistant-chat">

        <div className="chat-header">

            <FaRobot />

            <span>ElderEase AI</span>

        </div>

        <div className="chat-body">

            <div className="bot-msg">
                👋 Hello! How can I help you today?
            </div>

            <div className="user-msg">
                Can I take my medicine after food?
            </div>

            <div className="bot-msg">
                Yes! Most medicines can be taken after food. Always follow your doctor's advice.
            </div>

        </div>

        <div className="chat-input">

            <input
                type="text"
                placeholder="Ask your health question..."
            />

            <button>

                <FaPaperPlane />

            </button>

        </div>

    </div>

</section>



<section className="contact-section" id="contact">

    <h2>Get in Touch</h2>

    <p>
        Have questions or suggestions? We'd love to hear from you.
    </p>

    <div className="contact-container">

        <div className="contact-info">

    <h3>Contact Information</h3>

    <p className="contact-desc">
        We're happy to answer your questions and hear your feedback.
        Feel free to reach out anytime.
    </p>

    <p>
        <FaEnvelope className="contact-icon" />
        eldereaseai@gmail.com
    </p>

    <p>
        <FaPhoneAlt className="contact-icon" />
        +91 98765 43210
    </p>

    <p>
        <FaMapMarkerAlt className="contact-icon" />
        Mangalore, Karnataka, India
    </p>

</div>

        <form className="contact-form">

            <input
                type="text"
                placeholder="Your Name"
            />

            <input
                type="email"
                placeholder="Your Email"
            />

            <textarea
                rows="5"
                placeholder="Your Message"
            ></textarea>

            <button>
                Send Message
            </button>

        </form>

    </div>

</section>

<footer className="footer">

    <div className="footer-container">

        <div className="footer-logo">

    <h2>
        <FaHeartbeat className="footer-heart" />
        ElderEase AI
    </h2>

    <p>
        Smart healthcare companion designed to help senior citizens
        manage medicines, appointments and daily health with ease.
    </p>

</div>

        <div className="footer-links">

            <h3>Navigation</h3>

            <a href="#features">Features</a>

            <a href="#how">How It Works</a>

            <a href="#AI">AI Assistant</a>

            <a href="#contact">Contact</a>

        </div>

       <div className="footer-contact">
    <h3>Contact</h3>

    <p>
        <FaEnvelope className="footer-icon" />
         eldereaseai@gmail.com
    </p>

    <p>
        <FaPhoneAlt className="footer-icon" />
         +91 98765 43210
    </p>

    <p>
        <FaMapMarkerAlt className="footer-icon" />
         Mangalore, Karnataka
    </p>
</div>

    </div>

    <hr />

    <p className="copyright">
        © 2026 ElderEase AI. All Rights Reserved.
    </p>

</footer>

    </div>
        
  </>
  );
}

export default Home;
