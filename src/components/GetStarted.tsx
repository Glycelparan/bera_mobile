import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-4 bg-red-600 text-white">
        <h1 className="text-2xl font-bold">Get Started</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Create an account or sign in
          </h2>

          <p className="text-lg mb-8 text-gray-600">
            To use the Emergency Response app, you'll need to create an account
            or sign in to an existing one.
          </p>

          <div className="space-y-4">
            <Button
              className="w-full py-6 text-lg bg-red-600 hover:bg-red-700 text-white"
              onClick={() => navigate("/register")}
            >
              Create Account
            </Button>

            <Button
              className="w-full py-6 text-lg bg-white border border-red-600 text-red-600 hover:bg-red-50"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-gray-500">
        <p>© 2023 Bilar Emergency Response System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GetStarted;
