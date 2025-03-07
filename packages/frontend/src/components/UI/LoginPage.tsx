import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import LoginElement from "../organisms/LoginElement";

const LoginPage = () => {
  return (
    <div className="bg-background w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <LoginElement />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
