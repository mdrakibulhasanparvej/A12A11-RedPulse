import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useBDLocation from "../../../hooks/useBDLocation";
import Button from "../../../components/ui/Button";
import AccessRestricted from "../../ErrorPages/AccessRestricted";
import useUser from "../../../hooks/useUser";
import useTitle from "../../../hooks/useTitle";

const EditDonationRequest = () => {
  useTitle("Edit Donation Request");

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { userData: dbUser, isLoading: userLoading } = useUser();

  // console.log(user.email);
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

  const { register, handleSubmit, reset, setValue } = useForm();

  // Fetch the specific donation request
  const {
    data: requestData,
    isLoading: requestLoading,
    error,
  } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-request-all?id=${id}&email=${user?.email}`
      );
      return res.data.requests[0]; // assuming API returns { requests: [...] }
    },
    enabled: !!id,
  });

  // Pre-fill form when data is loaded
  useEffect(() => {
    if (requestData) {
      // Set form values
      setValue("recipientName", requestData.recipientName || "");
      setValue("hospitalName", requestData.hospitalName || "");
      setValue("fullAddress", requestData.fullAddress || "");
      setValue("bloodGroup", requestData.bloodGroup || "");
      setValue("donationDate", requestData.donationDate || "");
      setValue("donationTime", requestData.donationTime || "");
      setValue("requestMessage", requestData.requestMessage || "");

      // Set location selections using the saved names/ids (adjust if your data has IDs)
      const division = divisions.find(
        (d) => d.name === requestData.recipientDivision
      );
      const district = filteredDistricts.find(
        (d) => d.name === requestData.recipientDistrict
      );
      const upazila = filteredUpazilas.find(
        (u) => u.name === requestData.recipientUpazila
      );
      const union = filteredUnions.find(
        (u) => u.name === requestData.recipientUnion
      );

      if (division) setSelectedDivision(division);
      if (district) setSelectedDistrict(district);
      if (upazila) setSelectedUpazila(upazila);
      if (union) setSelectedUnion(union);
    }
  }, [
    requestData,
    divisions,
    filteredDistricts,
    filteredUpazilas,
    filteredUnions,
    setValue,
    setSelectedDivision,
    setSelectedDistrict,
    setSelectedUpazila,
    setSelectedUnion,
  ]);

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      return await axiosSecure.patch(
        `/donation-request-all/${id}`,
        updatedData
      );
    },
    onSuccess: () => {
      toast.success("Donation request updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-donation-requests"] });
      queryClient.invalidateQueries({ queryKey: ["donation-request", id] });
      navigate("/dashboard/my-donation-requests"); // or wherever your list is
    },
    onError: () => {
      toast.error("Failed to update donation request");
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

    const updatedRequest = {
      recipientName: data.recipientName,
      recipientDivision: selectedDivision.name,
      recipientDistrict: selectedDistrict.name,
      recipientUpazila: selectedUpazila.name,
      recipientUnion: selectedUnion.name,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
    };

    updateMutation.mutate(updatedRequest);
  };

  // Loading & blocked states
  if (userLoading || requestLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">Loading donation request...</p>
      </div>
    );
  }

  if (dbUser?.status === "blocked") return <AccessRestricted />;

  if (error || !requestData) {
    return (
      <div className="text-center py-10 text-red-600">
        Donation request not found or access denied.
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Edit Donation Request</h2>
      <div className="w-full mx-auto p-6 rounded-2xl shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Requester Info (Read-only) */}
          <div>
            <label className="label">Requester Name</label>
            <input
              readOnly
              value={user?.displayName || ""}
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="label">Requester Email</label>
            <input
              readOnly
              value={user?.email || ""}
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Editable Fields */}
          <div>
            <label className="label">Recipient Name</label>
            <input
              {...register("recipientName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Location Selects - Same as Create Page */}
          <div>
            <label className="label">Recipient Division</label>
            <select
              className="select select-bordered w-full"
              value={selectedDivision?.id || ""}
              onChange={(e) =>
                setSelectedDivision(
                  divisions.find((d) => d.id === e.target.value) || null
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

          <div>
            <label className="label">Recipient District</label>
            <select
              disabled={!selectedDivision}
              className="select select-bordered w-full"
              value={selectedDistrict?.id || ""}
              onChange={(e) =>
                setSelectedDistrict(
                  filteredDistricts.find((d) => d.id === e.target.value) || null
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

          <div>
            <label className="label">Recipient Upazila</label>
            <select
              disabled={!selectedDistrict}
              className="select select-bordered w-full"
              value={selectedUpazila?.id || ""}
              onChange={(e) =>
                setSelectedUpazila(
                  filteredUpazilas.find((u) => u.id === e.target.value) || null
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

          <div>
            <label className="label">Recipient Union</label>
            <select
              disabled={!selectedUpazila}
              className="select select-bordered w-full"
              value={selectedUnion?.id || ""}
              onChange={(e) =>
                setSelectedUnion(
                  filteredUnions.find((u) => u.id === e.target.value) || null
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

          <div>
            <label className="label">Hospital Name</label>
            <input
              {...register("hospitalName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="label">Full Address</label>
            <input
              {...register("fullAddress", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Blood Group</label>
            <select
              {...register("bloodGroup", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Donation Date</label>
            <input
              type="date"
              {...register("donationDate", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Donation Time</label>
            <input
              type="time"
              {...register("donationTime", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="label">Request Message</label>
            <textarea
              {...register("requestMessage", { required: true })}
              rows="4"
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="md:col-span-2">
            <Button
              size={true}
              type="submit"
              label={
                updateMutation.isPending
                  ? "Updating..."
                  : "Update Donation Request"
              }
              disabled={updateMutation.isPending}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditDonationRequest;
