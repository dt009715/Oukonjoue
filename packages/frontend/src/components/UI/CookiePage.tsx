import CookiePageElement from "../organisms/CookiePageElement";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

const CookiePage = () => {
  return (
    <div>
      <div className="bg-background flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <CookiePageElement />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CookiePage;
