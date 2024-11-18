import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../features/user/userStatement";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const userStatement = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          {userStatement ? (
            <button
              className="main-button-item"
              onClick={() => {
                dispatch(loggedOut());
                navigate("/");
              }}
            >
              <FontAwesomeIcon icon={faCircleUser} />
              Sign Out
            </button>
          ) : (
            <a className="main-nav-item" href="./sign-in">
              <FontAwesomeIcon icon={faCircleUser} />
              Sign In
            </a>
          )}
        </div>
      </nav>
    </>
  );
};
