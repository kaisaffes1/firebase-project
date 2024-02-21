import { useMutation } from "@tanstack/react-query";
import loginUser from "../utils/login";
import { Link } from "react-router-dom";

const isSignupPage = () => location.pathname.split("/").pop() == "signup";

export default function Auth() {
  const loginMutation = useMutation({
    mutationFn: ["login"],
    onMutate: handleSubmit,
  });
  console.log(isSignupPage());
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await loginUser(email, password);
    } catch (err) {
      throw err;
    }
  }

  return (
    <form className="form">
      <p className="form-title">
        {isSignupPage() ? "Sign up a new account" : "Login to your account"}
      </p>
      <div className="input-container">
        <input type="email" placeholder="Enter email" />
        <span></span>
      </div>
      <div className="input-container">
        <input type="password" placeholder="Enter password" />
      </div>
      <button type="submit" className="submit">
        {isSignupPage() ? " Sign up" : "Login"}
      </button>

      <p className="signup-link">
        {isSignupPage() ? "Have an account" : "No account"}?
        <Link to={`/auth/${isSignupPage() ? "login" : "signup"}`}>
          {" "}
          {isSignupPage() ? " Login" : "sign up"}
        </Link>
      </p>
    </form>
  );
}
