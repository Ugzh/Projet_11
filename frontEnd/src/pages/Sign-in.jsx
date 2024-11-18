import { Footer } from "../components/footer";
import { Navbar } from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { loggedIn } from "../features/user/userStatement";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const userStatement = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [invalidField, setInvalidField] = useState(false);
  const [serverError, setServerError] = useState(false);
  const ENDPOINT = `http://localhost:3001/api/v1/user/login`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const request = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await request.json();

    if (response.status === 200 && rememberMe) {
      localStorage.setItem("Token", response.body.token);
      dispatch(loggedIn());
      navigate("/profile");
    } else if (response.status === 400) {
      setInvalidField(!invalidField);
      setEmail("");
      setPassword("");
    } else if (response.status === 500) {
      setEmail("");
      setPassword("");
      setServerError(!serverError);
    } else {
      sessionStorage.setItem("Token", response.body.token);
      dispatch(loggedIn());
      navigate("/profile");
    }
  };

  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        {userStatement ? (
          <>
            <h2 className="manage-connection-already">
              You are already connected
            </h2>
            <a href="/">Click here to go home</a>
          </>
        ) : (
          <section className="sign-in-content">
            <FontAwesomeIcon icon={faCircleUser} />
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  id="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="input-remember">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button type="submit" className="sign-in-button">
                Sign-in
              </button>
            </form>
            {invalidField && <p>One or more field are invalid</p>}
            {serverError && <p>An internal error has occured</p>}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
