import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);

    emailjs.send(
      'service_6wdgx6d',      // 🔁 Replace with actual service ID
      'template_att2tkm',     // 🔁 Replace with actual template ID
      { user_email: email },
      'cmTllBM8a-WCWOqLI'       // 🔁 Replace with actual public key
    )
    .then(() => {
      toast.success('Thank you for subscribing!', {
        description: 'You will now receive our newsletter updates.'
      });
      setEmail('');
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      toast.error('Failed to subscribe. Try again later.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to receive updates about new arrivals, future events and special offers.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
