import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { userData: dbUser, isLoading, refetch } = useUser();
  const axiosSecure = useAxiosSecure();
  const { user: firebaseUser, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const avatarFile = watch("avatar");
  const [preview, setPreview] = useState(dbUser?.avatar || "");

  // Initialize form values when dbUser loads
  useEffect(() => {
    if (dbUser && isEditing) {
      reset({
        name: dbUser.name || "",
        avatar: "",
        bloodGroup: dbUser.bloodGroup || "",
        district: dbUser.district || "",
        upazila: dbUser.upazila || "",
      });
    }
  }, [dbUser, isEditing, reset]);

  // Live avatar preview
  useEffect(() => {
    if (avatarFile && avatarFile[0]) {
      const url = URL.createObjectURL(avatarFile[0]);
      setPreview(url);
    } else if (dbUser?.avatar) {
      setPreview(dbUser.avatar);
    } else {
      setPreview(null);
    }
  }, [avatarFile, dbUser]);

  // Mutation to update profile
  const updateUserMutation = useMutation({
    mutationFn: async (data) => {
      if (!firebaseUser?.email) throw new Error("User not logged in");

      let photoURL = dbUser?.avatar || "";

      // Upload new avatar if provided
      if (data.avatar && data.avatar[0]) {
        const formData = new FormData();
        formData.append("image", data.avatar[0]);
        const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`;
        const imgRes = await axios.post(imageAPIURL, formData);
        photoURL = imgRes.data.data.url;
        console.log(photoURL);
      }

      const updatedData = {
        name: data.name,
        avatar: photoURL,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
      };

      // console.log(updatedData);

      // Update backend
      await axiosSecure.patch(
        `/user-profile/${firebaseUser.email}`,
        updatedData
      );

      // Update Firebase Auth profile
      if (updateUserProfile) {
        await updateUserProfile({ displayName: data.name, photoURL });
      }

      return updatedData;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetch();
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message || "Failed to update profile");
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
      </div>

      <motion.div
        className="p-6 rounded-2xl dark:border-gray-800 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Profile Header */}
        <motion.div className="flex flex-col lg:flex-row items-center justify-between gap-6 border border-gray-400 rounded-2xl p-5">
          <div className="flex flex-col items-center lg:flex-row gap-6">
            {/* Avatar */}
            <motion.div className="w-28 h-28 rounded-full overflow-hidden border border-gray-300">
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700" />
              )}
            </motion.div>

            {/* Name & Email */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {dbUser.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dbUser.email}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <motion.button
            className="px-5 py-2 border rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </motion.button>
        </motion.div>

        {/* Edit Form */}
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
            <div className="md:col-span-2 flex justify-end mt-4">
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

        {/* Profile Info */}
        {!isEditing && (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5 border border-gray-400 rounded-2xl p-5 mt-6">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{dbUser.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{dbUser.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Blood Group</p>
              <p className="font-medium">{dbUser.bloodGroup}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">District</p>
              <p className="font-medium">{dbUser.district}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Upazila</p>
              <p className="font-medium">{dbUser.upazila}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
