const Button = ({
  label,
  onClick,
  glass,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          cursor-pointer
          px-4
          w-full 
          ${outline ? "bg-white" : "bg-lime-500"}
          ${outline ? "border-black" : "border-pink-700"}
          ${outline ? "text-black" : "text-white"}
          ${small ? "text-sm" : "text-md"}
          ${small ? "py-1" : "py-3"}
          ${small ? "font-light" : "font-semibold"}
          ${small ? "border" : "border-2"}
          ${
            glass
              ? "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:scale-105 shadow-xl px-10 text-xl"
              : outline
                ? "bg-white border-2 border-black text-black hover:opacity-80"
                : "bg-linear-to-r from-[#B32346] to-[#6A0B37] border-2 text-white hover:opacity-90 shadow-md hover:scale-105 px-10 text-xl"
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
    </button>
  );
};

export default Button;
