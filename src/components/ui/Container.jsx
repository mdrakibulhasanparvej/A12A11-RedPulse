const Container = ({ className = "", children }) => {
  return (
    <div
      className={`${className} max-w-screen-2xl mx-auto xl:px-20 md:px-10 sm:px-2 px-4`}
    >
      {children}
    </div>
  );
};

export default Container;
