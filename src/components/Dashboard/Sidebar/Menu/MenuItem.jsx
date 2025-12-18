import { NavLink } from "react-router";
import { motion } from "framer-motion";

const MenuItem = ({ icon: Icon, label, address }) => {
  return (
    <NavLink to={address} end>
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.03 }}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
          transition relative
          ${
            isActive
              ? "bg-gradient-to-br from-[#6A0B37] to-[#B32346] text-white shadow-lg shadow-[#6A0B37]/40 p-4 rounded-lg"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="activeGlow"
              className="absolute inset-0 rounded-lg bg-linear-to-br from-[#6A0B37] to-[#B32346]  -z-10"
            />
          )}

          <Icon className="text-lg" />
          <span className="font-medium">{label}</span>
        </motion.div>
      )}
    </NavLink>
  );
};

export default MenuItem;
