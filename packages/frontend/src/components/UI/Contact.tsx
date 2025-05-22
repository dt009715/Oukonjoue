import ContactPageElement from "../organisms/ContactPageElement";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

const Contact = () => {
  return (
    <div className="bg-background  min-h-screen flex flex-col">
      <Header />
      <ContactPageElement />
      <Footer />
    </div>
  );
};

export default Contact;
