import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const SERVICE_ID = 'service_uye5edp';
    const TEMPLATE_ID = 'template_m1sdsdr';
    const USER_ID = 'pakf3mFzk9lWyU_qC';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID)
      .then((result) => {
        console.log(result.text);
        setIsSent(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => {
          setIsSent(false);
        }, 2000);
      }, (error) => {
        console.log(error.text);
        setError('Failed to send message. Please try again.');
      });
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="message">Message</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  Send
                </button>
              </div>
              {isSent && <div className="alert alert-success text-center mt-3">Message sent successfully!</div>}
              {error && <div className="alert alert-danger text-center mt-3">{error}</div>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
