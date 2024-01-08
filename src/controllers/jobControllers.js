import JobModel from "../models/jobModel.js";


export default class JobControllers {

    // @GET Get All Jobs get request
    getAllJobs = async (req, res) => {
        const allJobs = await JobModel.getAllJobsModel();

        return res.render('jobsPage', { Jobs: allJobs, userEmail: req.session.userEmail })
    }

    // @ GET get Job By Id get request
    getJobDetailsByIdController = async (req, res) => {
        // % GTE Job Id From Browser get request
        const id = req.params.id;

        const jobExist = await JobModel.getJobDetailsByIdModel(id);

        if (jobExist) {

            let noOfApplicant = jobExist.applicants.length;
            jobExist.noOfApplicants = noOfApplicant;

            return res.render('jobDetailsPage', { jobDetails: jobExist, errorMessage: null, userEmail: req.session.userEmail, noOfApplicant: noOfApplicant })
        } else {
            return res.status(401).send('Searching Job is not Exist')
        }
    }

    // @ GET Add New Job Form get requ  
    addNewJobPageController = async (req, res) => {
        return res.render('addNewJobPage', { errorMessage: null, userEmail: req.session.userEmail });
    }

    // + POST Add New Job post request
    addNewJobController = async (req, res) => {

        // const { jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings, jobposted, postBy, applicants } = req.body;
        const userEmail = req.session.userEmail;

        await JobModel.addNewJobModel(req.body, { userEmail });
        let jobs = await JobModel.getAllJobsModel();

        return res.render('jobsPage', { Jobs: jobs, noOfApplicant: null, userEmail: req.session.userEmail })

    }

    // @ GET Update Job By Job Id get Update Form get Request
    getJobByIdUpdateFormController = async (req, res) => {
        const id = req.params.id;

        const jobExist = await JobModel.getJobDetailsByIdModel(id);

        if (jobExist) {
            return res.render('updateJobPage', { errorMessage: null, jobExist: jobExist, userEmail: req.session.userEmail });

        } else {
            return res.status(401).send('Product not found');
        }
    }

    // * POST Update Job By Job Id POST Request
    updateJobByIdController = async (req, res) => {

        const id = Number(req.params.id);

        const jobExist = await JobModel.getJobDetailsByIdModel(id);

        if (jobExist) {
            await JobModel.updateJobByIDModel(req.body);
            let jobs = await JobModel.getAllJobsModel();

            return res.render('jobsPage', { Jobs: jobs, userEmail: req.session.userEmail })

        } else {
            return res.status(401).send('Job not found');
        }
    }

    // - DELETE delete JobBy Id delete request

    deleteJobByIdController = async (req, res) => {

        const id = req.params.id;


        const jobExist = await JobModel.getJobDetailsByIdModel(id);

        if (!jobExist) {
            return res.status(401).send('Product not found');
        }

        await JobModel.deleteJobByIDModel(id);

        const allJobs = await JobModel.getAllJobsModel();

        return res.render('jobsPage', { Jobs: allJobs, userEmail: req.session.userEmail })
    }

    //+ Search Job By Company Name Controller 
    searchJobByCompanyNameController = async (req, res) => {
        const { searchText } = req.body;
        const jobs = await JobModel.getAllJobsBtSearchTextModel(searchText);

        return res.render('jobsPage', { Jobs: jobs, userEmail: req.session.userEmail })
    }
}