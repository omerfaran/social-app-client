import { BsCheckCircleFill } from "react-icons/bs";

const ToastSuccess = ({ children }) => {
  return (
    <span style={{ display: "flex" }}>
      <BsCheckCircleFill style={{ color: "green" }} />
      <p style={{ color: "black", fontSize: "1rem", marginLeft: "8px" }}>
        {children}
      </p>
    </span>
  );
};

export default ToastSuccess;
