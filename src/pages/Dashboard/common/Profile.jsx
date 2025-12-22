import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import ProfileSkeleton from "../../../components/ui/Loading/Profile/ProfileSkeleton";
import useBDLocation from "../../../hooks/useBDLocation";
import useTitle from "../../../hooks/useTitle";
import Button from "../../../components/ui/Button";

const Profile = () => {
  useTitle("Profile");

  const { userData: dbUser, isLoading, refetch } = useUser();
  const axiosSecure = useAxiosSecure();
  const { user: firebaseUser, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const {
    divisions,
    filteredDistricts,
    filteredUpazilas,
    filteredUnions,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    selectedUnion,
    setSelectedDivision,
    setSelectedDistrict,
    setSelectedUpazila,
    setSelectedUnion,
  } = useBDLocation();

  const avatarFile = watch("avatar");
  const [preview, setPreview] = useState(dbUser?.avatar || "");

  // Initialize form values
  useEffect(() => {
    if (dbUser && isEditing) {
      reset({
        name: dbUser.name || "",
        avatar: "",
        bloodGroup: dbUser.bloodGroup || "",
        district: dbUser.district || "",
        upazila: dbUser.upazila || "",
        division: dbUser.division,
        union: dbUser.union,
      });
    }
  }, [dbUser, isEditing, reset]);

  // Avatar preview
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

  // Update profile mutation
  const updateUserMutation = useMutation({
    mutationFn: async (data) => {
      setIsRegistering(true);

      if (!firebaseUser?.email) throw new Error("User not logged in");

      let photoURL = dbUser?.avatar || "";

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
        division: selectedDivision?.name,
        district: selectedDistrict?.name,
        upazila: selectedUpazila?.name,
        union: selectedUnion?.name,
      };

      await axiosSecure.patch(
        `/user-profile/${firebaseUser.email}`,
        updatedData
      );

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
    onSettled: () => {
      setIsRegistering(false);
    },
  });

  const onSubmit = (data) => {
    updateUserMutation.mutate(data);
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className=" py-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        My Profile
      </h2>

      <motion.div
        className="p-6 rounded-2xl border border-gray-300 shadow-sm dark:border-gray-700 max-w-5xl mx-auto bg-white dark:bg-gray-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Profile Header */}
        <motion.div className="flex flex-col lg:flex-row items-center justify-between gap-6 border border-gray-300 dark:border-gray-700 rounded-2xl p-5 bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Avatar */}
            <motion.div className="w-28 h-28 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
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
            <div className="flex flex-col items-center md:items-start text-center lg:text-left">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {dbUser.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {dbUser.email}
                </p>
              </div>
              <div className="flex gap-3 mt-3">
                <span className="bg-amber-600 px-3 py-1 rounded-full text-white">
                  {dbUser.role}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    dbUser.status === "blocked" ? "bg-red-700" : "bg-green-600"
                  }`}
                >
                  {dbUser.status}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <motion.button
            className="px-5 py-2 cursor-pointer border rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 border border-gray-300 dark:border-gray-700 rounded-2xl p-5 bg-gray-50 dark:bg-gray-800"
          >
            {/* Avatar */}
            <div className="md:col-span-2">
              <label className="label font-bold text-gray-700 dark:text-gray-300">
                Avatar
              </label>
              <input
                type="file"
                {...register("avatar")}
                className="file-input w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>

            {/* Name */}
            <div>
              <label className="label font-bold text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="input w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <label className="label font-bold text-gray-700 dark:text-gray-300">
                Blood Group
              </label>
              <select
                {...register("bloodGroup", { required: true })}
                className="input w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
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

            {/* Division */}
            <div>
              <label className="label font-bold text-gray-700 dark:text-gray-300">
                Division
              </label>
              <select
                {...register("division", { required: true })}
                className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                value={selectedDivision?.id || ""}
                onChange={(e) => {
                  const div = divisions.find((d) => d.id === e.target.value);
                  setSelectedDivision(div);
                }}
              >
                <option value="">Select Division</option>
                {divisions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.bn_name})
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="label font-bold text-gray-700 dark:text-gray-300">
                District
              </label>
              <select
                {...register("district", { required: true })}
                className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                disabled={!selectedDivision}
                value={selectedDistrict?.id || ""}
                onChange={(e) => {
                  const dist = filteredDistricts.find(
                    (d) => d.id === e.target.value
                  );
                  setSelectedDistrict(dist);
                }}
              >
                <option value="">Select District</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.bn_name})
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="label font-bold text-gray-700 dark:text-gray-300">
                Upazila
              </label>
              <select
                {...register("upazila", { required: true })}
                className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                disabled={!selectedDistrict}
                value={selectedUpazila?.id || ""}
                onChange={(e) => {
                  const upa = filteredUpazilas.find(
                    (u) => u.id === e.target.value
                  );
                  setSelectedUpazila(upa);
                }}
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.bn_name})
                  </option>
                ))}
              </select>
            </div>

            {/* Union */}
            <div>
              <label className="label font-bold text-gray-700 dark:text-gray-300">
                Union
              </label>
              <select
                {...register("union", { required: true })}
                className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                disabled={!selectedUpazila}
                value={selectedUnion?.id || ""}
                onChange={(e) => {
                  const uni = filteredUnions.find(
                    (u) => u.id === e.target.value
                  );
                  setSelectedUnion(uni);
                }}
              >
                <option value="">Select Union</option>
                {filteredUnions.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.bn_name})
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <Button
                type="submit"
                label="Save"
                loading={isRegistering}
                disabled={isRegistering}
              />
            </div>
          </form>
        )}

        {/* Profile Info */}
        {!isEditing && (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5 border border-gray-300 dark:border-gray-700 rounded-2xl p-5 bg-gray-50 dark:bg-gray-800 mt-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {dbUser.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {dbUser.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Blood Group
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {dbUser.bloodGroup}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Division
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {dbUser.division}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                District
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {dbUser.district}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upazila
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {dbUser.upazila}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Union</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {dbUser.union}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
