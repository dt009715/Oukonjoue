import ContactForm from "../molecules/FormContact";

const ContactPageElement = () => {
  return (
    <main className="relative flex flex-col w-full h-full pt-10 items-center justify-between pb-8">
      <header>
        <h1 className="font-semibold text-3xl pb-2 text-center">Contact</h1>
      </header>
      <section aria-labelledby="contact-form">
        <h2 id="contact-form" className="sr-only">
          Formulaire de contact
        </h2>
        <ContactForm />
      </section>
    </main>
  );
};

export default ContactPageElement;
