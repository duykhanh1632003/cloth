import axios from "../ultils/axios"

const handleLoginApi = () => {
  return axios.get('/get-api-allcode');
};

const createNewUserData = (data) =>{
	return axios.post('/create-new-user',data);
}

const getAllUser = () =>{
	return axios.get('get-all-user-from-server');
}	

const handleDeleteUser = (id) =>{
	return axios.delete('/api/delete-new-user',{
		data: {
		  id:id   
		}
	  });
}	


let getDetailUser = (id) => {
	return axios.get(`/api/getDetailUser-by-id?id=${id}`);
  };

let handleEditAUser = (data) => {
	return axios.put('/api/Edit-ANewUser',data);
  };

let loginApi = (email, password) =>{
	return axios.post('/api/login',{email,password})
}
let handleSubmitDetailItem = (data) =>{
	return axios.post('/api/detail-item-submit',data)
}


let getItemHomePage = () =>{
	return axios.get('/api/detail-item-homepage')
}

let handleOnChangeDetailItem = (data) =>{
	console.log("Check dtaa gui" , data)
	return axios.put('/api/onchang-detail-item',data)
}


let handleDeleteAItem = (id) =>{
	return axios.delete('/api/delete-new-item',{
		data: {
		  id:id   
		}
	  });
}

let handleAddToBag = (data) =>{
	return axios.post('/api/get-detail-item-cart',data)
}

let getProductCartbyId = (id) =>{
	return axios.get(`/api/get-product-cart?id=${id}`)
}

let handleOnChangeNumber  = (data) =>{
	return axios.put("/api/change-numer-wantbuy",data)
}

let handleDeleteProductCart = (id) =>{
	return axios.delete('/api/delete-aProduct-cart',{
		data: {
		  id:id   
		}
	  });
}

let handleSubmitTotalMoney = (data) =>{
	return axios.put("/api/total-money-wantbuy",data)
}

let handleSubMitDone = (id) =>{
	return axios.delete(`/api/submit-done?id=${id}`)
}

let handleSubMitEmail = (data) =>{
	return axios.put("/api/submit-emai",data)
}

// let handleOnChangeNumberTotal = (data) =>{
// 	return axios.put("/api/change-while-submit",data)

// }

export{
	handleLoginApi,
	createNewUserData,
	getAllUser,
	handleDeleteUser,
	getDetailUser,
	handleEditAUser,
	loginApi,
	handleSubmitDetailItem,
	getItemHomePage,
	handleOnChangeDetailItem,
	handleDeleteAItem,
	handleAddToBag,
	getProductCartbyId,
	handleOnChangeNumber,
	handleDeleteProductCart,
	handleSubmitTotalMoney,
	handleSubMitDone,
	handleSubMitEmail,
}