import actionType from "../action/actionType";
  
  const INITIAL_STATE = {
	isAdmin : false 
  };
  
  const adminReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	  case actionType.FETCH_USER_LOGIN:
		return {
		  ...state,
		  
		};
  

	  default:
		return state;
	}
  };
  
  export default adminReducer;
  