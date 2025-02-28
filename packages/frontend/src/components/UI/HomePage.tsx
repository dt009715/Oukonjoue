import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import HomePageElement from "../organisms/HomePageElement";

const Home = () => {
  return (
    <div className="w-full h-full bg-background ">
      <Header />
      <HomePageElement />
      <Footer />
    </div>
  );
};

export default Home;
