const express = require('express')
const router=express.Router()
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')


//route for register
router.post('/register',userController.register)

//login 
router.post('/login',userController.login)
//add project
router.post('/addproject',jwtMiddleware,multerConfig.single('projectImage'), projectController.addProjects)
//gethomeproject
router.get('/home-projects',projectController.getHomeProjects)
//getallprojects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)

//get userprojects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)
//edit project
router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProject)
//delete project
router.delete('/project/remove/:pid',jwtMiddleware,projectController.removeProject)
//updateuser
router.put('/user/edit', jwtMiddleware, multerConfig.single('profileImage'), userController.editUser)
module.exports=router