import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { setUser, setError, setLoading } from "@/lib/store/slices/authSlice";
import axiosInstance from "@/lib/utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Get dispatch function
  const { loading, error } = useSelector((state) => state.auth); // Get loading and error from Redux
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const response = await axiosInstance.post("/auth/signin", {
        email,
        password,
      });

      const { user, token } = response.data.data;
      dispatch(setUser({ user, token }));

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      dispatch(setError(err.response?.data?.error || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="h-full bg-white">
      <div className="h-full">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    autoComplete="email"
                    className="block w-full rounded-lg bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-900 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    autoComplete="current-password"
                    className="block w-full rounded-lg bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-900 sm:text-sm"
                  />
                </div>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-black px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-gray-900"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-gray-900 hover:text-gray-700"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
