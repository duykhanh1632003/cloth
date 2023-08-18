import React from "react";

const UserContext = React.createContext({ email: '', auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ email: '', auth: false });

  const loginContext = (email) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setUser((user) => ({
      email: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

function UnauthApp() {
  const { loginContext } = React.useContext(UserContext); // Sử dụng tên hàm login thay vì loginContext
  const [email, setEmail] = React.useState('');

  return (
    <>
      <h1>Please, log in!</h1>
      <label>Email:</label>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <button onClick={() => loginContext(email)}>Log in</button>
    </>
  );
}

function AuthApp() {
  const { user, logout } = React.useContext(UserContext);

  return (
    <>
      <h1>Hello, {user.email}!</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}

function App() {
  const { user } = React.useContext(UserContext);

  return user.auth ? <AuthApp /> : <UnauthApp />;
}

export { UserContext, UserProvider, App };
