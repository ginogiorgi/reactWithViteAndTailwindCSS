import { Layout } from "../../Components/Layout";
import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";

function MyAccount() {
  const [changeForm, setChangeForm] = useState(true);
  const accountInfo = JSON.parse(localStorage.getItem("account"));
  const form = useRef(null);

  function changeAccount() {
    const formData = new FormData(form.current);
    const newAccountData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      orders: JSON.parse(localStorage.getItem("account"))?.orders,
      id: JSON.parse(localStorage.getItem("account"))?.id,
    };
    const newAccountList = JSON.parse(localStorage.getItem("account-list"));

    newAccountList.splice(accountInfo.id, 1, newAccountData);
    localStorage.setItem("account", JSON.stringify(newAccountData));
    localStorage.setItem("account-list", JSON.stringify(newAccountList));
  }

  function renderView() {
    if (changeForm) {
      return (
        <div className="flex justify-center items-center w-full h-full">
          <div>
            <h2 className="text-3xl text-center">My Account</h2>
            <div className="items-center w-96">
              <p className="flex justify-between items-center gap-2 mt-1">
                <span className="font-light">Username:</span>
                <span className="font-light">
                  {JSON.parse(localStorage.getItem("account"))?.username}
                </span>
              </p>
              <p className="flex justify-between items-center gap-2 mt-1">
                <span className="font-light">Password: </span>
                <span className="font-light" type="password">
                  ••••••••••
                </span>
              </p>
              <p className="flex justify-between items-center mt-1 gap-2">
                <span className="font-light">Email: </span>
                <span className="font-light">
                  {JSON.parse(localStorage.getItem("account"))?.email}
                </span>
              </p>
            </div>
            <div className="-mt-1 mb-4 ml-1"></div>
            <NavLink
              to="/"
              onClick={() => {
                localStorage.setItem("sign-out", JSON.stringify(true));
                context.setSignOut(true);
              }}
            >
              <button className="relative w-full h-10 bg-blue-400 text-black font-medium cursor-pointer rounded-lg shadow-lg shadow-blue-400/20">
                Sign out
              </button>
            </NavLink>
            <button
              className="relative w-full h-10 bg-blue-400 text-black font-medium cursor-pointer rounded-lg shadow-lg shadow-blue-400/20"
              onClick={() => {
                setChangeForm(false);
              }}
            >
              Edit account
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center w-full h-full form-wrapper">
          <form ref={form}>
            <h2 className="text-3xl text-center">Edit account</h2>
            <div className="relative my-8 border-b-2 input-group">
              <input
                type="text"
                name="username"
                defaultValue={accountInfo.username}
                className="w-80 h-10 px-1 bg-transparent outline-none"
                required
              />
              <label className="bottom-1/2 absolute left-1 translate-y-1/2 pointer-events-none">
                Username
              </label>
            </div>
            <div className="relative my-8 border-b-2 input-group">
              <input
                type="email"
                name="email"
                defaultValue={accountInfo.email}
                className="w-80 h-10 px-1 bg-transparent outline-none"
                required
              />
              <label className="bottom-1/2 absolute left-1 translate-y-1/2 pointer-events-none">
                Email
              </label>
            </div>
            <div className="relative my-8 border-b-2 input-group">
              <input
                type="password"
                name="password"
                defaultValue={accountInfo.password}
                className="w-80 h-10 px-1 bg-transparent border-none outline-none"
                required
              />
              <label className="absolute bottom-1/2 left-1 translate-y-1/2 pointer-events-none">
                Password
              </label>
            </div>
            <button
              className="relative w-full h-10 bg-blue-400 text-black font-medium cursor-pointer rounded-lg shadow-lg shadow-blue-400/20"
              onClick={() => {
                changeAccount();
              }}
              type="submit"
            >
              Accept
            </button>
            <NavLink
              onClick={() => {
                setChangeForm(true);
              }}
            >
              <button className="relative w-full h-10 bg-blue-400 text-black font-medium cursor-pointer rounded-lg shadow-lg shadow-blue-400/20">
                Back
              </button>
            </NavLink>
          </form>
        </div>
      );
    }
  }
  return (
    <Layout>
      <div className="relative w-[400px] h-[500px] shadow-lg shadow-myGray/40 rounded-lg p-10">
        {renderView()}
      </div>
    </Layout>
  );
}

export { MyAccount };
