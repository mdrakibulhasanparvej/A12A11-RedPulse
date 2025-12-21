import { motion } from "framer-motion";

const Button = ({
  label,
  onClick,
  glass,
  disabled = false,
  loading = false,
  outline,
  small,
  icon: Icon,
  size,
}) => {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type="submit"
      disabled={isDisabled}
      onClick={onClick}
      whileHover={!isDisabled ? { scale: 1.01 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      className={`
        relative
        rounded-lg
        transition
        px-4
        ${size ? "w-full" : ""}
        ${isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:opacity-80"}
        ${outline ? "bg-white border-black text-black" : "bg-lime-500 border-pink-700 text-white"}
        ${small ? "text-sm py-1 font-light border" : "text-md py-3 font-semibold border-2"}
        ${
          glass
            ? "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-xl px-10 text-xl"
            : outline
              ? "bg-white border-2 border-black text-black"
              : "bg-linear-to-r from-[#B32346] to-[#6A0B37] border-2 text-white shadow-md px-10 text-xl"
        }
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}

      {loading ? "Please wait..." : label}
    </motion.button>
  );
};

export default Button;
