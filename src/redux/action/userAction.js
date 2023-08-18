import { NotificationManager } from "react-notifications";
import { loginApi, getProductCartbyId ,handleSubmitTotalMoney } from "../../service/userService";
import actionType from "./actionType";
import { act } from "react-dom/test-utils";

export const handleLoginRedux = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: actionType.FETCH_USER_LOGIN });

    try {
      const res = await loginApi(email.trim(), password);

      if (res && res.errCode === 0) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", email);
        localStorage.setItem("role", res.user.roleId);
        localStorage.setItem("id", res.user.id);

        dispatch({
          type: actionType.FETCH_USER_SUCCESS,
          data: { email, errCode: res.user.errCode, role: res.user.roleId },
        });

        NotificationManager.success("Login successful!", "Success");
      } else {
        dispatch({ type: actionType.FETCH_USER_ERROR });

        NotificationManager.error(
          "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: actionType.FETCH_USER_ERROR });
      NotificationManager.error("An error occurred. Please try again.");
    }
  };
};

export const handleLogOutRedux = () => {
  return { type: actionType.USER_LOGOUT };
};

export const handleRefresh = (navigate) => {
  return (dispatch) => {
    dispatch({
      type: actionType.USER_REFRESH,
    });
    navigate(-1);
  };
};

export const getProductCartbyIdItem = () => {
  return async (dispatch) => {
    try {
      const id = localStorage.getItem("id");
      if (!id) {
        throw new Error("User ID not found in local storage.");
      }

      const data = await getProductCartbyId(id);
      if (data) {
        dispatch({
          type: actionType.FETCH_PROTDUCT_CART_SUCCESS,
          data: data,
        });
      } else {
        dispatch({ type: actionType.FETCH_PROTDUCT_CART_FAILED });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: actionType.FETCH_PROTDUCT_CART_FAILED });
      NotificationManager.error("An error occurred while fetching cart data.");
    }
  };
};

export const handleSubmitTotalMoneyRedux = (data) =>{
  return async (dispatch) =>{
    try{
      const response = await handleSubmitTotalMoney(data)
      if(response && response.errCode ===0){
        dispatch({type: actionType.SUBMIT_TOTAL_MONEY_SUCCESS})
        dispatch(getProductCartbyIdItem())
      }
      else{
        dispatch({type: actionType.SUBMIT_TOTAL_MONEY_FAILED})
      }
    }
    catch(e){
      dispatch({type: actionType.SUBMIT_TOTAL_MONEY_FAILED})

    }
  }
}
