import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useBDLocation from "../../../hooks/useBDLocation";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button";
import useUser from "../../../hooks/useUser";
import AccessRestricted from "../../ErrorPages/AccessRestricted";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const { userData: dbUser, isLoading: userLoading } = useUser();

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

  const donationMutation = useMutation({
    mutationFn: async (donationRequest) => {
      const res = await axiosSecure.post("/donation-requests", donationRequest);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Donation request created successfully");
      reset();
      queryClient.invalidateQueries({ queryKey: ["my-donation-requests"] });
    },
    onError: () => {
      toast.error("Failed to create donation request");
    },
  });

  const onSubmit = (data) => {
    if (
      !selectedDivision ||
      !selectedDistrict ||
      !selectedUpazila ||
      !selectedUnion
    ) {
      toast.error("Please select Division, District, Upazila & Union");
      return;
    }
    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDivision: selectedDivision?.name,
      recipientDistrict: selectedDistrict?.name,
      recipientUpazila: selectedUpazila?.name,
      recipientUnion: selectedUnion?.name,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      status: "pending",
    };

    donationMutation.mutate(donationRequest);
  };

  /* ================= LOADING ================= */
  if (userLoading) {
    return (
      <div
        className="w-full p-6 rounded-2xl shadow text-center
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100"
      >
        <p className="text-lg font-medium">Checking user status...</p>
      </div>
    );
  }

  /* ================= BLOCKED ================= */
  if (dbUser?.status === "blocked") {
    return <AccessRestricted />;
  }

  /* ================= FORM ================= */
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Create Donation Request</h2>
      <div
        className="w-full mx-auto p-6 rounded-2xl shadow
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-gray-100"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Requester Name */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">
              Requester Name
            </label>
            <input
              readOnly
              value={user?.displayName || ""}
              className="input input-bordered w-full
            bg-gray-100 dark:bg-gray-600
            text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Requester Email */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">
              Requester Email
            </label>
            <input
              readOnly
              value={user?.email || ""}
              className="input input-bordered w-full
            bg-gray-100 dark:bg-gray-600
            text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">
              Recipient Name
            </label>
            <input
              {...register("recipientName", { required: true })}
              className="input input-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Division */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">
              Recipient Division
            </label>
            <select
              className="select select-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
              value={selectedDivision?.id || ""}
              onChange={(e) =>
                setSelectedDivision(
                  divisions.find((d) => d.id === e.target.value)
                )
              }
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
            <label className="label text-gray-700 dark:text-gray-300">
              Recipient District
            </label>
            <select
              disabled={!selectedDivision}
              className="select select-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
              value={selectedDistrict?.id || ""}
              onChange={(e) =>
                setSelectedDistrict(
                  filteredDistricts.find((d) => d.id === e.target.value)
                )
              }
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
            <label className="label text-gray-700 dark:text-gray-300">
              Recipient Upazila
            </label>
            <select
              disabled={!selectedDistrict}
              className="select select-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
              value={selectedUpazila?.id || ""}
              onChange={(e) =>
                setSelectedUpazila(
                  filteredUpazilas.find((u) => u.id === e.target.value)
                )
              }
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
            <label className="label text-gray-700 dark:text-gray-300">
              Recipient Union
            </label>
            <select
              disabled={!selectedUpazila}
              className="select select-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
              value={selectedUnion?.id || ""}
              onChange={(e) =>
                setSelectedUnion(
                  filteredUnions.find((u) => u.id === e.target.value)
                )
              }
            >
              <option value="">Select Union</option>
              {filteredUnions.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.bn_name})
                </option>
              ))}
            </select>
          </div>

          {/* Hospital */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">
              Hospital Name
            </label>
            <input
              {...register("hospitalName", { required: true })}
              className="input input-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Full Address */}
          <div className="md:col-span-2">
            <label className="label text-gray-700 dark:text-gray-300">
              Full Address
            </label>
            <input
              {...register("fullAddress", { required: true })}
              className="input input-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">
              Blood Group
            </label>
            <select
              {...register("bloodGroup", { required: true })}
              className="select select-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">
              Donation Date
            </label>
            <input
              type="date"
              {...register("donationDate", { required: true })}
              className="input input-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Time */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">
              Donation Time
            </label>
            <input
              type="time"
              {...register("donationTime", { required: true })}
              className="input input-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="label text-gray-700 dark:text-gray-300">
              Request Message
            </label>
            <textarea
              {...register("requestMessage", { required: true })}
              rows="4"
              className="textarea textarea-bordered w-full
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              label={
                donationMutation.isLoading
                  ? "Submitting..."
                  : "Request Blood Donation"
              }
              disabled={
                donationMutation.isLoading ||
                !selectedDivision ||
                !selectedDistrict ||
                !selectedUpazila ||
                !selectedUnion
              }
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateDonationRequest;
