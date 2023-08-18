import { reject } from "lodash";
import userService from "../service/userService";

let getAllcode = async (req, res) => {
  try {
    let data = await userService.getAllcode();
    return res.status(200).json({
      data,
	  errCode: 0 
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};

let createANewUser = async (req ,res) =>{
  try{
    let infor = await userService.createANewUser(req.body)
    return res.status(200).json({
      errCode: infor.errCode
    })
  }
  catch(e){
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server"
    })
  }
}

let getAllUser =async (req, res) =>{
  try{
    let data = await userService.getAllUser()
    res.status(200).json({
      errCode: 0, 
      data
    })
  }
  catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server"
    });
  }
}

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!"
    });
  }

  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getDetailDoctorById =async (req , res) => {
	try{
		let infor = await userService.getDetailDoctorById(req.query.id)
		res.status(200).json(infor)
	}
	catch(e){
		console.log(e)
		return res.status(200).json({
			errCode: -1 ,
			errMessage : "Error from the sever"
		})
	}
}

let handleEditAUser =async (req ,res) =>{
  try{
    console.log("check res",req.body)
    let response = await userService.handleEditAUser(req.body)

    res.status(200).json(response)
  }
  catch(e){
    console.log(e)
    res.status(500).json({
      errCode: -1,
      errMessage: "Missing required parameter"
    })
  }
}

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Missing input parameters!'
    });
  }

  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {}
  });
};

let handleSubmitDetailItem =async (req , res) =>{
  try{
    let response = await userService.handleSubmitDetailItem(req.body)
    res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({
      errCode: -1,
      errMessage: "Missing required parameter"
    })
  }
}

let getItemHomePage = async (req,res) =>{
  try{
    let data =await userService.getItemHomePage()
    res.status(200).json(data)
  }
  catch(e){
    console.log(e)
    res.status(200).json({
      errCode:0,
      errMessage:"Error from server"
    })
  }
}

let handleOnChangeDetailItem = async (req ,res) =>{
  try{
    let response = await userService.handleOnChangeDetailItem(req.body)
    res.status(200).json({
      errCode : response.errCode,
      errMessage : response.errMessage
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({
      errCode: -1 ,
      errMessage : "Error from server"
    })
  }
}

let handleDeleteAItem =async (req , res) =>{
  try{
    let response = await userService.handleDeleteAItem(req.body.id)
    
    res.status(200).json({
      errCode: response.errCode,
      errMessage : response.errMessage
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({
      errCode: -1 ,
      errMessage : "Error from server"
    })
  }
}
let getDetailItemCart = async (req ,res) =>{
  try{
    let response = await userService.getDetailItemCart(req.body)
    res.status(200).json({
      errCode: response.errCode
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({
      errCode: -1 ,
      errMessage:"Missing required parameter"
    })
  }
}

let getProductCartbyId =async (req ,res) =>{
  try{
    let infor = await userService.getProductCartbyId(req.query.id)
    res.status(200).json(infor)
  }
  catch(e){
    reject(e)
  }
}

let handleOnChangeNumber = async (req ,res) =>{
  try{
    let response = await userService.handleOnChangeNumber(req.body)
    res.status(200).json({
      errCode: 0,
      errMessage: "done"
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({
      errCode: -1 ,
      errMessage: "Missing required parameter"
    })
  }
}


let handleDeleteProductCart =async (req, res) =>{
  try{
    let response = await userService.handleDeleteProductCart(req.body.id)
    res.status.json({
      errCode: 0,
      errMessage:"Done"
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({
      errCode: -1,
      errMessage:"Missing required parameter"
    })
  }
}

let handleSubmitTotalMoney =async (req, res) =>{
  try{
    let response = await userService.handleSubmitTotalMoney(req.body)
    res.status(200).json({
      errCode:0 , 
      errMessage:"done"
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({
      errCode: -1,
      errMessage:"Missing required parameter"
    })
  }
}


let handleSubMitDone =async (req, res) =>{
  try{
    let response = await userService.handleSubMitDone(req.query.id)
    res.status(200).json({
      errCode:0 , 
      errMessage:"done"
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({
      errCode: -1,
      errMessage:"Missing required parameter"
    })
  }
}

let handleSubMitEmail =async (req, res) =>{
  try{
    await userService.handleSubMitEmail(req.body)
    res.status(200).json({
      errCode: 0,
      errMessage:"Missing required parameter"
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({
      errCode: -1,
      errMessage:"Missing required parameter"
    })
  }
}


module.exports = {
  getAllcode,
  createANewUser,getAllUser,
  handleDeleteUser,
  getDetailDoctorById,
  handleEditAUser,
  handleLogin,
  handleSubmitDetailItem,
  getItemHomePage,
  handleOnChangeDetailItem,
  handleDeleteAItem,
  getDetailItemCart,
  getProductCartbyId,
  handleOnChangeNumber,
  handleDeleteProductCart,
  handleSubmitTotalMoney,
  handleSubMitDone,
  handleSubMitEmail,
};
