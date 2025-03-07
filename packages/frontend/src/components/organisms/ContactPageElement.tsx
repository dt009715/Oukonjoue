import ContactForm from "../molecules/FormContact";

const ContactPageElement = () => {
  return (
    <div className="relative flex flex-col w-full h-full pt-10 items-center justify-between pb-8">
      <h1 className="font-semibold text-3xl pb-2 text-center">Contact</h1>
      <ContactForm />
    </div>
  );
};

export default ContactPageElement;
