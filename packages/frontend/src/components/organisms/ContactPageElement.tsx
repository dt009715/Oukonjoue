import ContactForm from "../molecules/FormContact";

const ContactPageElement = () => {
  return (
    <main className="relative flex flex-col w-full h-full items-center justify-center">
      <h2 id="contact-form" className="sr-only">
        Formulaire de contact
      </h2>
      <section aria-labelledby="contact-form">
        <ContactForm />
      </section>
    </main>
  );
};

export default ContactPageElement;
