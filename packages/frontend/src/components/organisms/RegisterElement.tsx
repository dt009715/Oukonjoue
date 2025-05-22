import RegisterForm from "../molecules/RegisterForm";

const RegisterElement = () => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Inscription</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterElement;
