//// All module imports
import express from 'express';
import path from 'path'
import expressEjsLayouts from 'express-ejs-layouts';
import TestControllers from './src/controllers/testControllers.js';
import HomeController from './src/controllers/homeController.js';
import UserControllers from './src/controllers/userController.js';
import JobControllers from './src/controllers/jobControllers.js';
import validationRequest from './middleware/registerationFormValidation.js';
import ApplicantControllers from './src/controllers/applicantControllers.js';
import { upload } from './middleware/resumeUploadMiddleware.js';
import newJobValidationRequest from './middleware/newJobValidation.js';
import applicantFormValidationRequest from './middleware/applicantFormValidation.js';
import session from 'express-session';
import { auth } from './middleware/authMiddleware.js';
import Error404Controller from './src/controllers/404PageController.js';
import JobModel from './src/models/jobModel.js';

//// App setting with express
const app = express();

//// All Middleware Setup In Express

//$ Express Session setup
app.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))



// $ Middleware Setup For JSON Data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//// MVC Application Setup
app.use(express.static('public'));
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('views', path.resolve('src', 'views'))


//// All Cntroller Setup
const testroutes = new TestControllers();
const homeController = new HomeController();
const userControllers = new UserControllers();
const jobControllers = new JobControllers();
const applicantControllers = new ApplicantControllers();
const error404Controller = new Error404Controller()


//// All routes

//% Common Routes
app.get('/', homeController.getLandingPage)
app.get('/test', testroutes.getTestRoute)

// // All Auth Routes 

//@GET Request Register
app.get('/register', userControllers.getRegisterPage);
//+POST Request Register
app.post('/register', validationRequest, userControllers.userRegisterController);
//@GET Request Login
app.get('/login', userControllers.getLoginPage);
//+POST Request Login
app.post('/login', userControllers.loginUser);
//@ GET Logout Requset
app.get('/logout', auth, userControllers.userLogoutController);

//@ GET Users Data Request
app.get('/user', userControllers.getUsers)
//* PATCH / UPDATE User Request
app.patch('/updateuser', auth, userControllers.getUserByIdController)


// // All Jobs Routes 
//@GET All Jobs Request
app.get('/jobs', jobControllers.getAllJobs);
//@GET New Job Form Request
app.get('/addnewjob', auth, jobControllers.addNewJobPageController);
//+ POST New Job Form Request
app.post('/addnewjob', auth, newJobValidationRequest, jobControllers.addNewJobController);
//@GET Job Data By Job IdRequest
app.get('/jobdetails/:id', jobControllers.getJobDetailsByIdController);


// ? Job Routes /jobs/:id/update

// @GET Update form for a specific job Update By Id /jobs/:id/update
app.get('/jobs/:id/update', auth, jobControllers.getJobByIdUpdateFormController)
// * PATCH / Update Job By Id  /jobs/:id/update
app.post('/jobs/:id/update', auth, jobControllers.updateJobByIdController);


// - DELETE /: Delete a specific job listing by ID
app.get('/jobs/:id/delete', auth, jobControllers.deleteJobByIdController);


// ? Apply Routes - /apply/:id

// + POST Apply For Job By Id Uploading Resume

app.post('/apply/:id', upload.single('resumePath'), applicantControllers.applyJobApplicantController);




// ? Routes for /jobs/:id/applicants

// @ GET /: Retrieve all applicants for a specific job listing
app.get('/jobs/:id/applicants', auth, applicantControllers.getAllApplicantsByJobIdController);


// + POST /: Add a new applicant to a specific job listing

// @ GET /:applicantld: Retrieve a specific applicant by ID for a job listing

app.get('/jobs/:id/applicants/:applicantid', auth, applicantControllers.getApplicantInfoByApplicantIdController);

// * PUT /:applicantld: Update a specific applicant by ID for a job listing
app.get('/jobs/:id/applicants/:applicantid/update', auth, applicantControllers.getApplicantDataUpdateFormController);

app.post('/jobs/:id/applicants/:applicantid/update', auth, upload.single('resumePath'), applicantControllers.updateApplicantDataByApplicantIdController);

// -DELETE/:applicantld: Delete a specific applicant by ID for a job listing

app.get('/jobs/:id/applicants/:applicantid/delete', auth, applicantControllers.deleteApplicantByApplicantIdByController);

// + Search Job By Search tab

app.post('/:search', jobControllers.searchJobByCompanyNameController)

// ! Error Page - /404

// @ GET /: Render the 404 error page

app.get('*', error404Controller.getErrorPage);



//// PORT Set up

const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))