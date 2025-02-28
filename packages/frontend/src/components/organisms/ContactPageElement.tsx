import ContactForm from "../molecules/FormContact";

const ContactPageElement = () => {
  return (
    <div className="w-full pt-7">
      <h1 className="font-semibold text-3xl absolute left-1/2 transform -translate-x-1/2">
        Contact
      </h1>
      <ContactForm />
    </div>
  );
};

export default ContactPageElement;
