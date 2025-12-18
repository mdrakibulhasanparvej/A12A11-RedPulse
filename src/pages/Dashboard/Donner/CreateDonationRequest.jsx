import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useBDLocation from "../../../hooks/useBDLocation";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

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

  const onSubmit = async (data) => {
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
      created_at: new Date(),
    };

    try {
      await axiosSecure.post("/donation-requests", donationRequest);
      toast.success("Donation request created successfully");
      reset();
    } catch (error) {
      toast.error("Failed to create donation request", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Create Donation Request</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Requester Info */}
        <div>
          <label className="label">Requester Name</label>
          <input
            type="text"
            readOnly
            value={user?.displayName || ""}
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="label">Requester Email</label>
          <input
            type="email"
            readOnly
            value={user?.email || ""}
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="label">Recipient Name</label>
          <input
            {...register("recipientName", { required: true })}
            type="text"
            className="input input-bordered w-full"
          />
        </div>

        {/* Division */}
        <div>
          <label className="label">Recipient Division</label>
          <select
            {...register("recipientDivision", { required: true })}
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
          <label className="label">Recipient District</label>
          <select
            {...register("recipientDistrict", { required: true })}
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
          <label className="label">Recipient Upazila</label>
          <select
            {...register("recipientUpazila", { required: true })}
            className="select select-bordered w-full"
            disabled={!selectedDistrict}
            value={selectedUpazila?.id || ""}
            onChange={(e) => {
              const upa = filteredUpazilas.find((u) => u.id === e.target.value);
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
          <label className="label">Recipient Union</label>
          <select
            {...register("recipientUnion", { required: true })}
            className="select select-bordered w-full"
            disabled={!selectedUpazila}
            value={selectedUnion?.id || ""}
            onChange={(e) => {
              const uni = filteredUnions.find((u) => u.id === e.target.value);
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

        {/* Hospital */}
        <div>
          <label className="label">Hospital Name</label>
          <input
            {...register("hospitalName", { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Dhaka Medical College Hospital"
          />
        </div>

        {/* Full Address */}
        <div className="md:col-span-2">
          <label className="label">Full Address</label>
          <input
            {...register("fullAddress", { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Zahir Raihan Rd, Dhaka"
          />
        </div>

        {/* Blood Group */}
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

        {/* Donation Date */}
        <div>
          <label className="label">Donation Date</label>
          <input
            {...register("donationDate", { required: true })}
            type="date"
            className="input input-bordered w-full"
          />
        </div>

        {/* Donation Time */}
        <div>
          <label className="label">Donation Time</label>
          <input
            {...register("donationTime", { required: true })}
            type="time"
            className="input input-bordered w-full"
          />
        </div>

        {/* Request Message */}
        <div className="md:col-span-2">
          <label className="label">Request Message</label>
          <textarea
            {...register("requestMessage", { required: true })}
            rows="4"
            className="textarea textarea-bordered w-full"
            placeholder="Explain why blood is needed"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <Button type="submit" label="Request Blood Donation" />
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
