import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { userData: dbUser, isLoading, refetch } = useUser();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (dbUser && isEditing) {
      reset({
        name: dbUser.name || "",
        avatar: "", // file input
        bloodGroup: dbUser.bloodGroup || "",
        district: dbUser.district || "",
        upazila: dbUser.upazila || "",
      });
    }
  }, [dbUser, isEditing, reset]);

  const updateUserMutation = useMutation({
    mutationFn: async (data) => {
      let photoURL = dbUser.avatar;

      if (data.avatar && data.avatar[0]) {
        const formData = new FormData();
        formData.append("image", data.avatar[0]);
        const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`;
        const imgRes = await axios.post(imageAPIURL, formData);
        photoURL = imgRes.data.data.url;
      }

      const updatedData = {
        name: data.name,
        avatar: photoURL,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
      };

      return axiosSecure.patch(`/users/${dbUser.email}`, updatedData);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetch();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update profile");
    },
  });

  const onSubmit = (data) => {
    updateUserMutation.mutate(data);
  };

  if (isLoading) return <div className="p-6">Loading profile...</div>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="px-6 text-2xl font-semibold text-gray-800 dark:text-white">
          My Profile
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm"></p>
      </div>

      <motion.div
        className="p-6 rounded-2xl dark:border-gray-800 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Top Section */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-6 border border-gray-400 rounded-2xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Profile Info */}
          <div className="flex flex-col items-center lg:flex-row gap-6">
            {/* Profile Image */}
            <motion.div
              className="w-28 h-28 rounded-full overflow-hidden border border-gray-300"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <img
                src={dbUser.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Text Info */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {dbUser.name}
              </h2>
              <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {dbUser.email}
                </p>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <motion.button
            className="px-5 py-2 border border-gray-300 rounded-full bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </motion.button>
        </motion.div>

        {isEditing && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 border border-gray-400 rounded-2xl p-5"
          >
            {/* Avatar */}
            <div className="md:col-span-2">
              <label className="label font-bold">Avatar</label>
              <input
                type="file"
                {...register("avatar")}
                className="file-input w-full"
              />
            </div>

            {/* Name */}
            <div>
              <label className="label font-bold">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="input w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
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
              <input
                {...register("district", { required: true })}
                className="input w-full"
              />
            </div>

            {/* Upazila */}
            <div>
              <label className="label font-bold">Upazila</label>
              <input
                {...register("upazila", { required: true })}
                className="input w-full"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={updateUserMutation.isLoading}
              >
                {updateUserMutation.isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}

        {/* Basic Info Section */}
        {!isEditing && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 border border-gray-400 rounded-2xl p-5 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {dbUser.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {dbUser.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Blood Group
              </p>
              <p className="font-medium text-gray-800 dark:text-white">
                {dbUser.bloodGroup}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                District
              </p>
              <p className="font-medium text-gray-800 dark:text-white">
                {dbUser.district}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upazila
              </p>
              <p className="font-medium text-gray-800 dark:text-white">
                {dbUser.upazila}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
