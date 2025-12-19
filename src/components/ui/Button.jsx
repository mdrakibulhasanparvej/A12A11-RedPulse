import { motion } from "framer-motion";

const Button = ({
  label,
  onClick,
  glass,
  disabled,
  outline,
  small,
  icon: Icon,
  size,
}) => {
  return (
    <motion.button
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          cursor-pointer
          px-4
          ${size ? "w-full" : ""}
          ${outline ? "bg-white" : "bg-lime-500"}
          ${outline ? "border-black" : "border-pink-700"}
          ${outline ? "text-black" : "text-white"}
          ${small ? "text-sm" : "text-md"}
          ${small ? "py-1" : "py-3"}
          ${small ? "font-light" : "font-semibold"}
          ${small ? "border" : "border-2"}
          ${
            glass
              ? "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30  shadow-xl px-10 text-xl"
              : outline
                ? "bg-white border-2 border-black text-black hover:opacity-80"
                : "bg-linear-to-r from-[#B32346] to-[#6A0B37] border-2 text-white hover:opacity-90 shadow-md  px-10 text-xl"
          }
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
              absolute
              left-4
              top-3
            "
        />
      )}
      {label}
    </motion.button>
  );
};

export default Button;
