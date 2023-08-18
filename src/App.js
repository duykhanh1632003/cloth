import "./App.scss";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo đã import CSS của Bootstrap
import Header from "./components/Header";
import { UserContext } from "./contex/userContext";
import { useContext } from "react";
import { useEffect } from "react";
import AppRoute from "./routes/AppRoute";
import { useDispatch } from "react-redux";
import { handleRefresh } from "./redux/action/userAction";
import { setCurrentPage } from "./redux/action/userAction";
import { useNavigate } from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      dispatch(handleRefresh(navigate));
    }

  }, []);

  useEffect(() => {
    
    if (!localStorage.getItem("isLoggedIn")) {
      navigate(-1)
    }
  }, []);



  return (
    <div className="App">
      <Header />
        <AppRoute />
    </div>
  );
}

export default App;





