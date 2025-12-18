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

  // Initialize form values when dbUser loads
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
        division: selectedDivision?.name,
        district: selectedDistrict?.name,
        upazila: selectedUpazila?.name,
        union: selectedUnion?.name,
        updated_at: new Date(),
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

  if (isLoading) return <ProfileSkeleton />;

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
            <div className="flex flex-col items-center md:items-start text-center lg:text-left">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {dbUser.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {dbUser.email}
                </p>
              </div>
              {/* role & status */}
              <div className="flex gap-3 mt-3">
                <span className="bg-amber-600 px-3 py-1 rounded-full text-white">
                  {dbUser.role}
                </span>
                <span className="bg-green-600 px-3 py-1 rounded-full text-white">
                  {dbUser.status}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button */}

          <motion.button
            className="px-5 py-2 cursor-pointer border rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
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

            {/* Division */}
            <div>
              <label className="label font-bold"> Division</label>
              <select
                {...register("division", { required: true })}
                className="select select-bordered w-full"
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
              <label className="label font-bold">District</label>
              <select
                {...register("district", { required: true })}
                className="select select-bordered w-full"
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
              <label className="label font-bold">Upazila</label>
              <select
                {...register("upazila", { required: true })}
                className="select select-bordered w-full"
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
              <label className="label font-bold">Union</label>
              <select
                {...register("union", { required: true })}
                className="select select-bordered w-full"
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={updateUserMutation.isLoading}
              >
                {updateUserMutation.isLoading ? "Saving..." : "Save Changes"}
              </motion.button>
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
              <p className="text-sm text-gray-500">Division</p>
              <p className="font-medium">{dbUser.division}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">District</p>
              <p className="font-medium">{dbUser.district}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Upazila</p>
              <p className="font-medium">{dbUser.upazila}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Union</p>
              <p className="font-medium">{dbUser.union}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
