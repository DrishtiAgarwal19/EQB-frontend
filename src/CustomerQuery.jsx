
import React from "react";

const CustomerQuery = () => {
  return (
    <>
      <div className="customer-query-container">
        <div className="contact-section">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-description">
            We're here to help! Please fill out the form below or reach out to us directly.
          </p>

          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="Enter the subject" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="6" placeholder="Enter your message"></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>

          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Email: support@venuefinder.com</p>
            <div className="contact-buttons">
              <button className="live-chat-button">Live Chat</button>
              <button className="whatsapp-button">WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerQuery;
