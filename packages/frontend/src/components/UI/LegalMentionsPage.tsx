import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import LegalMentionsElement from "../organisms/LegalMentionsElement";

const LegalMentionsPage = () => {
  return (
    <div>
      <div className="bg-background flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <LegalMentionsElement />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LegalMentionsPage;
