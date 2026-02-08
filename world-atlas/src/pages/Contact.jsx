const Contact = () => {
  return (
    <section className="section-contact">
      <h2 className="container-title">Contact Us</h2>

      <div className="contact-wrapper container">
        <form action="">
          <input
            type="text"
            name="username"
            placeholder="Enter your Name"
            required
          />
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your Email"
            autoComplete="false"
            required
          />
          <textarea
            type="text"
            name="message"
            placeholder="Enter your message"
            autoComplete="false"
            required
            rows={10}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
