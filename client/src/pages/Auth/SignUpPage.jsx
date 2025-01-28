import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import axiosInstance from "@/lib/utils/axiosInstance";
import { setUser, setError, setLoading } from "@/lib/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Get dispatch function
  const { loading, error } = useSelector((state) => state.auth); // Get loading and error from Redux
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError("")); // Clear previous errors
    dispatch(setLoading(true)); // Set loading to true while making the API call

    try {
      // Make API call to backend for signup
      const response = await axiosInstance.post("/auth/signup", {
        email,
        username,
        password,
      });

      console.log("response", response.data.data);

      const { user, token } = response.data.data; // Extract user and token from the response

      // Dispatch the success action with the user and token data
      dispatch(
        setUser({
          user,
          token,
        })
      );

      // Navigate based on the user's role
      if (user.role === "admin") {
        navigate("/admin/dashboard"); // Redirect to admin dashboard
      } else {
        navigate("/"); // Redirect to user home page
      }
    } catch (err) {
      console.log(err); // Log the error to the console
      // Handle error from API response
      dispatch(
        setError(err.response?.data?.error || "An error occurred during signup")
      );
    } finally {
      dispatch(setLoading(false)); // Set loading to false once the request is complete
    }
  };

  return (
    <div className="h-full bg-white">
      <div className="h-full">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Create a new account
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
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900"
                >
                  Username
                </Label>
                <div className="mt-2">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="YourUsername"
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
                    autoComplete="new-password"
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
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="#"
                className="font-semibold text-gray-900 hover:text-gray-700"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
