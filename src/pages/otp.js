import { Link } from "react-router-dom";

const Otp = () => {
  return (
    <div>
      <h1>Payment Done you can Move to Home page</h1>
      <Link to={"/"}>
        <button>Home Page</button>
      </Link>
    </div>
  );
};

export default Otp;
