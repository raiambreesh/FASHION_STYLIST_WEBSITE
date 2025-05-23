import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-2">We'd love to hear from you. Get in touch through any of the following ways:</p>
      
      <div className="mt-4 space-y-3 text-gray-800">
        <p>
          📧 Email:{" "}
          <a href="mailto:captainwinter1990@gmail.com" className="text-blue-600 hover:underline">
            captainwinter1990@gmail.com
          </a>
        </p>
        <p>
          📞 Phone:{" "}
          <a href="tel:+917901750705" className="text-blue-600 hover:underline">
            +91 79017 50705
          </a>
        </p>
        <div className="mt-6">
          <p className="mb-2">💬 WhatsApp:</p>
          <img
            src="qr.jpg"
            alt="WhatsApp QR Code for Modernhub"
            className="w-60 h-auto rounded-md shadow-md"
          />
          <p className="text-sm text-gray-500 mt-1">
            Scan the code to start a WhatsApp chat with <strong>modernhub</strong>.
          </p>
        </div>
      </div>
    </div>

  );
};

export default ContactPage;

