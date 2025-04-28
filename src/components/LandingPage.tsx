import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-500 to-red-700 text-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bilar Emergency Response</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Fast Emergency Response At Your Fingertips
          </h2>

          <p className="text-xl mb-8">
            Get immediate help when you need it most with our mobile emergency
            response system.
          </p>

          <div className="space-y-4">
            <Button
              className="w-full py-6 text-lg bg-white text-red-700 hover:bg-red-50"
              onClick={() => navigate("/get-started")}
            >
              Get Started
            </Button>
          </div>

          <p className="mt-8 text-sm opacity-80">
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-red-200">
              Log in
            </a>
          </p>
        </div>
      </main>

      <footer className="p-4 text-center text-sm opacity-70">
        <p>© 2023 Bilar Emergency Response System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
