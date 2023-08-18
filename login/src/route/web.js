import express from "express"
import userController from "../controllers/userController"

let router = express.Router()

let initWebRoutes = (app) =>{
	router.get("/get-api-allcode",userController.getAllcode)
	router.post("/create-new-user",userController.createANewUser)
	router.get("/get-all-user-from-server",userController.getAllUser)
	router.delete('/api/delete-new-user', userController.handleDeleteUser)
	router.get('/api/getDetailUser-by-id',userController.getDetailDoctorById)
	router.put('/api/Edit-ANewUser',userController.handleEditAUser)
	router.post('/api/login', userController.handleLogin);
	router.post('/api/detail-item-submit', userController.handleSubmitDetailItem)
	router.get('/api/detail-item-homepage',userController.getItemHomePage)
	router.put('/api/onchang-detail-item',userController.handleOnChangeDetailItem)
	router.delete('/api/delete-new-item', userController.handleDeleteAItem)
	router.post('/api/get-detail-item-cart', userController.getDetailItemCart)
	router.get('/api/get-product-cart',userController.getProductCartbyId)
	router.put('/api/change-numer-wantbuy',userController.handleOnChangeNumber)
	router.delete('/api/delete-aProduct-cart', userController.handleDeleteProductCart)
	router.put('/api/total-money-wantbuy',userController.handleSubmitTotalMoney)
	router.delete('/api/submit-done', userController.handleSubMitDone)
	router.put('/api/submit-emai', userController.handleSubMitEmail)
	
	return app.use("/",router)
}

module.exports = initWebRoutes