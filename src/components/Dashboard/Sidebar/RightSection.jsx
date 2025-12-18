import { MdNotifications, MdOutlineDarkMode } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { BsHeartPulse } from "react-icons/bs";

const RightSection = () => {
  return (
    <aside className="hidden lg:flex flex-col gap-6">
      {/* Top Actions */}
      <div className="flex items-center justify-end gap-4">
        <button className="p-2 rounded-xl bg-white shadow hover:bg-gray-100 transition">
          <MdNotifications className="text-xl" />
        </button>
      </div>

      {/* Health Card */}
      <div className="bg-white rounded-2xl p-5 shadow">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">
          Blood Status
        </h3>

        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-red-100 text-red-600">
            <BsHeartPulse className="text-3xl" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Available Donors</p>
            <h2 className="text-2xl font-bold">1,248</h2>
          </div>
        </div>
      </div>

      {/* Active Users */}
      <div className="bg-white rounded-2xl p-5 shadow">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">
          Active Volunteers
        </h3>

        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-blue-100 text-blue-600">
            <FaUserFriends className="text-3xl" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Currently Online</p>
            <h2 className="text-2xl font-bold">87</h2>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-5 shadow">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">
          Recent Activity
        </h3>

        <ul className="space-y-3 text-sm">
          <li className="flex justify-between">
            <span>New donor registered</span>
            <span className="text-gray-400">2m ago</span>
          </li>
          <li className="flex justify-between">
            <span>Blood request approved</span>
            <span className="text-gray-400">12m ago</span>
          </li>
          <li className="flex justify-between">
            <span>Volunteer assigned</span>
            <span className="text-gray-400">1h ago</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default RightSection;
