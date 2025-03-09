import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import HomePageElement from "../organisms/HomePageElement";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col ">
      <Header />
      <div className="flex-1">
        <HomePageElement />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
