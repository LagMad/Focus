import { useLocation } from "react-router-dom";

const Button = ({
  variation,
  type,
  children,
  onClick,
  className,
  path,
  disabled = false,
}) => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };
  const getButtonVariation = (variation, path) => {
    switch (variation) {
      case "primary":
        return "py-2 md:py-3 px-3 md:px-16 text-xl bg-cust-pink-light hover:bg-cust-pink-lighter rounded-full text-cust-white font-bold font-SfProDisplay";
      case "primary-smaller":
        return "py-2 md:py-2 px-3 md:px-10 text-xl bg-cust-pink-light hover:bg-cust-pink-lighter rounded-full text-cust-white font-bold font-SfProDisplay";
      case "primary-smallest":
        return "py-2 md:py-2 px-3 md:px-8 text-xl bg-cust-pink-light hover:bg-cust-pink-lighter border-2 border-cust-pink-light hover:border-cust-pink-lighter rounded-full text-cust-white font-bold font-SfProDisplay";
      case "primary-smallest-alt":
        return "py-2 md:py-2 px-3 md:px-8 text-xl bg-cust-white hover:bg-cust-pink-lighter border-2 border-cust-pink-light hover:border-cust-pink-lighter rounded-full text-cust-black font-bold font-SfProDisplay";
      case "secondary":
        return "py-2 px-8 text-xl bg-cust-blue-light hover:bg-cust-blue-lighter border-2 border-cust-blue-light hover:border-cust-blue-lighter rounded-full text-cust-white font-bold font-SfProDisplay";
      case "secondary-alt":
        return "py-2 px-8 text-xl bg-cust-white hover:bg-cust-blue-lighter border-2 border-cust-blue-light hover:border-cust-blue-lighter rounded-full text-cust-black font-bold font-SfProDisplay";
      case "secondary-circle":
        return "py-2 px-2 text-xl bg-cust-blue-light hover:bg-cust-blue-lighter rounded-full text-cust-white font-bold font-SfProDisplay";
      case "secondary-rectangle":
        return "py-2 md:py-2.5 px-3 md:px-8 bg-white hover:bg-cust-orange-normal text-cust-orange-normal hover:text-cust-white rounded-xl font-semibold border-2 border-cust-orange-normal hover:border-2 hover:border-white";
      case "primary-round":
        return "bg-cust-green-normal hover:bg-white py-3 px-3 rounded-full text-cust-white hover:text-cust-green-normal border-transparent border-2 hover:border-2 hover:border-white drop-shadow-lg";
      case "secondary-round":
        return "bg-white hover:bg-cust-green-normal py-3 px-3 text-cust-green-normal hover:text-cust-white rounded-full";
      case "navbar":
        return isActive(path)
          ? "text-cust-white rounded-none border-b-cust-white hover:border-b-cust-pink-light border-b-2 text-lg font-bold"
          : "text-cust-white rounded-none border-b-transparent hover:border-b-cust-white border-b-2 text-lg font-bold";
      case "special":
        return "rainbow-btn";

      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonVariation(variation, path)}
       transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
