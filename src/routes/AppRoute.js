import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import TableUser from "../components/TableUser";
import PrivateRoute from "./PrivateRoute";
import Register from "../components/Register";
import DetailItem from "../Vendor/DetailItem";
import DetailClothes from "../components/DetailClothes";
import TestPage from "../components/TestPage";
import CartIcon from "../Clinent/CartIcon";
import BuyProductDone from "../Clinent/BuyProductDone"


export const AppRoute = () => {
  return (
    <>
      <Routes>
      <Route path="/buydone" element={<BuyProductDone />} />
      <Route path="/products/:slug/:id" element={<DetailClothes />} />
      <Route path="/detailItem" element={<DetailItem />} />
      <Route path="/checkout/cart" element={<CartIcon />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
		<Route path="/Register" element={<Register/>}/>
        <Route path="*" element={<NotFound />} />
        
        <Route
          path="/tableUser"
          element={
            <PrivateRoute>
              <TableUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoute;
