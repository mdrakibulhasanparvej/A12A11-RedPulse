import { useForm } from "react-hook-form";
import { CgArrowRightO } from "react-icons/cg";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Button from "../../components/ui/Button";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      toast.success("Login successfully 🎉");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center bg-linear-to-r from-[#6A0B37] to-[#B32346] bg-clip-text text-transparent">
          Login
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          Welcome back! Please login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500
                  bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-white"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500
                  bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-white"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            size={true}
            type="submit"
            label="Login"
            iconRight={CgArrowRightO}
          />
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-red-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
