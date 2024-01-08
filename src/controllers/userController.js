import validationRequest from "../../middleware/registerationFormValidation.js";
import JobModel from "../models/jobModel.js";
import UserModel from "../models/userModel.js";
import JobControllers from "./jobControllers.js";

const jobControllers = new JobControllers();

export default class UserControllers {
    getUsers = async (req, res) => {
        await UserModel.getAllUsers();
        return res.render('landingPage')
    }
    getLoginPage = async (req, res) => {
        return res.render('loginPage', { errorMessage: null });
    }

    loginUser = async (req, res) => {

        const { email, password } = req.body;
        const userIsValid = await UserModel.loginValidUser(email, password);

        if (!userIsValid) {
            return res.render('loginPage', { errorMessage: 'Invalid username or password' });
        }
        req.session.userEmail = email;
        const allJobs = await JobModel.getAllJobsModel();

        return res.render('jobsPage', { Jobs: allJobs, userEmail: req.session.userEmail })
    }

    getRegisterPage = async (req, res) => {
        return res.render('registerPage', { errorMessage: null, successMsg: null });
    }

    userRegisterController = async (req, res) => {
        const { name, email, password, contact, role } = req.body;
        UserModel.registerUserModel(name, email, password, contact, role);
        await UserModel.getAllUsers();
        return res.render('loginPage', { errorMessage: null });
    }

    getUserByIdController = async (req, res) => {
        const { id } = req.body;
        const userExist = await UserModel.getUserByIdModel(id);

        if (userExist) {
            return res.render('updateUserPage', { user: userExist, errorMessage: null, userEmail: req.session.userEmail });
        } else {
            return res.send(401).send('User is not Exist');
        }
    }

    userLogoutController = async (req, res) => {
        await req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                return res.redirect('login');
            }
        })



    }
}