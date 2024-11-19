import { Footer } from "../components/footer";
import { Navbar } from "../components/Navbar";
import { PreviewAccount } from "../components/PreviewAccount";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setUserInformations } from "../features/user/userStatement";

export function Profile() {
  const userStatement = useSelector((state) => state.user.value);
  const userInformations = useSelector((state) => state.user.informations);
  const [editInformations, setEditInformations] = useState(false);
  const [invalidField, setInvalidField] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [username, setUsername] = useState(userInformations.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ENDPOINT = `http://localhost:3001/api/v1/user/profile`;
  const token =
    localStorage.getItem("Token") || sessionStorage.getItem("Token");

  useEffect(() => {
    if (!userStatement) {
      navigate("/error-user");
    }
  }, [userStatement, navigate]);
  
  const getProfile = async () => {
    const request = await fetch(ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();
    const { email, firstName, lastName, userName } = response.body;

    dispatch(setUserInformations({ email, firstName, lastName, userName }));
    console.log(userInformations);
  };
  useEffect(() => {
    getProfile();
  }, [userStatement]);

  // const fullname = `${userInformations.firstName} ${userInformations.lastName}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const request = await fetch(ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userName: username,
      }),
    });
    const response = await request.json();

    if (response.status === 400) {
      setInvalidField(!invalidField);
    } else if (response.status === 500) {
      setServerError(!serverError);
    } else {
      setEditInformations(!editInformations);
      dispatch(
        setUserInformations({
          email: userInformations.email,
          firstName: userInformations.firstName,
          lastName: userInformations.lastName,
          userName: username,
        }),
      );
    }
  };
  return (
    userStatement && (
      <>
        <Navbar />
        <main className="main bg-dark">
          <div className="header">
            <h1>
              {editInformations ? (
                "Edit user info"
              ) : (
                <>
                  Welcome back <br />
                  {userInformations && userInformations.userName}{" "}
                </>
              )}
            </h1>
            {!editInformations && (
              <button
                className="edit-button"
                onClick={() => setEditInformations(!editInformations)}
              >
                Edit Name
              </button>
            )}
            {editInformations && (
              <>
                <form className="edit-informations" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">User name :</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="first-name">First name :</label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={userInformations.firstName}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name">Last name : </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      value={userInformations.lastName}
                      disabled
                    />
                  </div>
                  <div className="button">
                    <button className="edit-button" type="submit">
                      Save
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditInformations(!editInformations);
                        setUsername(userInformations.userName);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                {(invalidField || serverError) && <p>Something went wrong !</p>}
              </>
            )}
          </div>
          <h2 className="sr-only">Accounts</h2>
          <PreviewAccount
            accountTitle={`Argent Bank Checking (x8349)`}
            accountAmout={`$2,082.79`}
            accountDescription={`Available Balance`}
          ></PreviewAccount>
          <PreviewAccount
            accountTitle={`Argent Bank Savings (x6712)`}
            accountAmout={`$10,928.42`}
            accountDescription={`Available Balance`}
          ></PreviewAccount>
          <PreviewAccount
            accountTitle={`Argent Bank Credit Card (x8349)`}
            accountAmout={`$184.30`}
            accountDescription={`Current Balance`}
          ></PreviewAccount>
        </main>
        <Footer />
      </>
    )
  );
}
