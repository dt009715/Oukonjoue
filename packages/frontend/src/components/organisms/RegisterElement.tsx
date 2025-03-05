import RegisterForm from "../molecules/RegisterForm";

const RegisterElement = () => {
  return (
    <div className="w-full">
      <h1 className="font-semibold text-3xl text-center  left-1/2  pt-7 pb-4">
        Inscription
      </h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterElement;
