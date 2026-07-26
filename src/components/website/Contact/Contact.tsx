"use client";

import { ContactForm, ContactIntroPanel, SuccessModal } from "@/components/contact";
import { useContactForm } from "@/hooks";

const Contact = () => {
  const contactForm = useContactForm();

  return (
    <section
      id="contact"
      className="bg-background py-32 px-6 overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-stretch">
        <ContactIntroPanel />
        <ContactForm
          buttonOffset={contactForm.buttonOffset}
          form={contactForm.form}
          isSending={contactForm.isSending}
          isSent={contactForm.isSent}
          onButtonMouseMove={contactForm.handleButtonMouseMove}
          onButtonMouseLeave={contactForm.resetButtonOffset}
          onFieldChange={contactForm.updateField}
          onSubmit={contactForm.handleSubmit}
        />
      </div>
      <SuccessModal
        isOpen={contactForm.showModal}
        onClose={() => contactForm.setShowModal(false)}
      />
    </section>
  );
};

export default Contact;
