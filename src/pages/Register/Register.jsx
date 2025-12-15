import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import Button from "../../components/ui/Button";
import { CgArrowRightO } from "react-icons/cg";
// import Navbar from "../../components/Shared/Navbar/Navbar";
// import Footer from "../../components/Shared/Footer/Footer";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const handleRegistration = async (data) => {
    const profileImg = data.photo[0];

    try {
      // Step 1: Create Firebase User
      // toast.loading("Creating account...");
      await createUser(data.email, data.password);
      toast.success("Account created successfully ✅", { duration: 2000 });

      // Step 2: Upload Image
      // toast.loading("Uploading profile image...");
      const formData = new FormData();
      formData.append("image", profileImg);

      const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`;
      const imgRes = await axios.post(imageAPIURL, formData);
      const photoURL = imgRes.data.data.url;

      toast.success("Profile image uploaded 🖼️", { duration: 2000 });

      // Step 3: Prepare User Info
      const userInfo = {
        email: data.email,
        name: data.name,
        avatar: photoURL,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        role: "donor",
        status: "active",
        created_at: new Date(),
      };

      // Step 4: Save to Database
      // toast.loading("Saving user data...");
      const dbRes = await axiosSecure.post("/users", userInfo);

      // console.log(dbRes.data);
      if (dbRes.data) {
        toast.success("Donor profile saved 🩸", { duration: 2000 });
      } else {
        throw new Error("Database insertion failed");
      }

      // Step 5: Update Firebase Profile
      // toast.loading("Updating profile...");
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });
      toast.success("Profile updated successfully 🎯", { duration: 2000 });

      // Final success
      toast.success("Registration complete 🎉", { duration: 4000 });

      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Registration failed ❌",
        {
          duration: 5000, // Make it stay longer
          style: {
            fontSize: "16px",
          },
        }
      );
      // toast.dismiss();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-[#B32346] to-[#6A0B37] p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              User Registration
            </h2>
            <p className="text-red-100 text-sm">Register with RedPulse</p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(handleRegistration)}
            encType="multipart/form-data"
            className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Avatar */}
            <div className="md:col-span-2">
              <label className="label font-bold">Avatar</label>
              <input
                type="file"
                {...register("photo", { required: "Avatar is required" })}
                className="file-input w-full"
              />
              {errors.photo && (
                <p className="text-red-600 text-sm">{errors.photo.message}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="label font-bold">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input w-full"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label font-bold">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input w-full"
                placeholder="Email"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="label font-bold">Blood Group</label>
              <select
                {...register("bloodGroup", { required: true })}
                className="input w-full"
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="label font-bold">District</label>
              <select
                {...register("district", { required: true })}
                className="input w-full"
              >
                <option value="">Select District</option>
                <option>Dhaka</option>
                <option>Chattogram</option>
                <option>Rajshahi</option>
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="label font-bold">Upazila</label>
              <select
                {...register("upazila", { required: true })}
                className="input w-full"
              >
                <option value="">Select Upazila</option>
                <option>Savar</option>
                <option>Uttara</option>
                <option>Dhanmondi</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="label font-bold">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input w-full"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label font-bold">Confirm Password</label>
              <input
                type="password"
                {...register("confirm_password", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="input w-full"
              />
              {errors.confirm_password && (
                <p className="text-red-600 text-sm">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <Button
                type="submit"
                label="Register"
                iconRight={CgArrowRightO}
              />

              <p className="text-sm">
                Already have an Account?{" "}
                <Link to="/login" className="link link-hover font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
