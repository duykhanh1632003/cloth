import actionType from "../action/actionType"

const INITIAL_STATE = {
  account: {
    email: "",
    auth: false,
    errCode: "",
    role: '',
    id: ''
  },
  isLoading: false,
  isError: false,
  getAllProductCartRedux: []
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.FETCH_USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case actionType.FETCH_USER_SUCCESS:
      localStorage.getItem("role",action.data.role)
      return {
        ...state,
        account: {
          email: action.data.email,
          auth: true,
          role: action.data.role,
          id: action.data.id
        },
        isLoading: false,
        isError: false,
      };
    case actionType.FETCH_USER_ERROR:
      return {
        ...state,
        account: {
          auth: false,
        },
        isLoading: false,
        isError: true,
      };
    case actionType.USER_LOGOUT:
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");
      localStorage.removeItem("role")
      localStorage.removeItem("id")
      return {
        account: {
          email: "",
          auth: false,
          role: "",
          id: ""
        },
      };
    case actionType.USER_REFRESH:
      return {
        ...state,
        account: {
          email: localStorage.getItem("email"),
          auth: true,
          role: localStorage.getItem("role"),
          id: localStorage.getItem("id")
        },
      };

      case actionType.FETCH_PROTDUCT_CART_SUCCESS:
        return {
          ...state,
          getAllProductCartRedux: action.data,
        };
      case actionType.FETCH_PROTDUCT_CART_FAILED:
        return {
          ...state,
          getAllProductCartRedux: [],
        };
        case actionType.SUBMIT_TOTAL_MONEY_SUCCESS:
          return{
            ...state,
          }
        case actionType.SUBMIT_TOTAL_MONEY_FAILED:
        return{
          ...state,
          
        }

           
	  
    default:
      return state;
  }
};

export default userReducer;
