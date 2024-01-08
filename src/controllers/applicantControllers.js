import ApplicantModel from "../models/applicantModel.js";
import JobModel from "../models/jobModel.js";


export default class ApplicantControllers {

    // @ GET get Application Form get request
    getApplicantFormController = async (req, res) => {

        return res.render('applicantFormPage', { errorMessage: null, userEmail: req.session.userEmail });
    }

    // + Apply For Job By Id get Application request
    applyJobApplicantController = async (req, res) => {
        const jobId = req.params.id;
        const jobExist = JobModel.getJobDetailsByIdModel(jobId);

        const { name, email, contact } = req.body;
        const resumePath = '/resumes/' + req.file.filename;
        await ApplicantModel.addApplicantInApplicantModel({ name, email, contact, resumePath }, jobId);
        const allApplicants = ApplicantModel.getAllApplicantByJobIdModel(jobId);
        const noOfApplicant = allApplicants.length;

        jobExist.noOfApplicants = noOfApplicant;

        return res.render('jobDetailsPage', { jobDetails: jobExist, userEmail: req.session.userEmail })
    }

    // @ GET get All Applicants For Job By Job Id get Request

    getAllApplicantsByJobIdController = async (req, res) => {
        const jobId = req.params.id;
        const jobExist = await JobModel.getJobDetailsByIdModel(jobId);
        const allApplicants = ApplicantModel.getAllApplicantByJobIdModel(jobId);
        const noOfApplicants = allApplicants.length;

        return res.render('allApplicantsDetails', { errorMessage: null, jobExist: jobExist, allApplicants: allApplicants, noOfApplicants: noOfApplicants, userEmail: req.session.userEmail })
    }

    // @ GET get applicant Information By applicantid get Request
    getApplicantInfoByApplicantIdController = async (req, res) => {

        const jobId = req.params.id;
        const jobExist = await JobModel.getJobDetailsByIdModel(jobId);

        const applicantId = req.params.applicantid;

        const applyer = ApplicantModel.getApplicantDetailsByApplicantIdModel(jobId, applicantId);

        return res.render('applicantDataPage', { errorMessage: null, applicant: applyer, jobExist: jobExist, userEmail: req.session.userEmail })
    }

    // @ GET get form To Update Applicant Data By Applicant Id 
    getApplicantDataUpdateFormController = async (req, res) => {

        const jobId = req.params.id;
        const jobExist = await JobModel.getJobDetailsByIdModel(jobId);

        const applicantId = req.params.applicantid;

        const applyer = await ApplicantModel.getApplicantDetailsByApplicantIdModel(jobId, applicantId);
        // console.log(applyer.resumePath);

        return res.render('updateApplicantDetailsPage', { errorMessage: null, applicant: applyer, jobExist: jobExist, userEmail: req.session.userEmail })
    }


    // * Update Applicant Data By Applicant Id 
    updateApplicantDataByApplicantIdController = async (req, res) => {
        console.log("Updating applicant");

        const jobId = req.params.id;

        const applicantId = req.params.applicantid;

        const jobExist = await JobModel.getJobDetailsByIdModel(jobId);
        const allApplicants = ApplicantModel.getAllApplicantByJobIdModel(jobId);
        const noOfApplicants = allApplicants.length;

        if (jobExist) {

            const { name, email, contact } = req.body;
            const resumePath = '/resumes/' + req.file.filename;
            const applyer = await ApplicantModel.getApplicantDetailsByApplicantIdModel(jobId, applicantId);
            if (applyer) {
                const updateApplyer = await ApplicantModel.updateApplicantDataByApplicantIdModel(jobId, applicantId, { name, email, contact, resumePath });

                return res.render('allApplicantsDetails', { errorMessage: null, applicant: updateApplyer, jobExist: jobExist, allApplicants: jobExist.applicants, noOfApplicants: noOfApplicants, userEmail: req.session.userEmail })
            } else {
                return res.status(401).send('Applicant not found');
            }
        } else {
            return res.status(401).send('Job not found');
        }
    }

    // - Delete Applicant by ApplicantIdBy JobId
    deleteApplicantByApplicantIdByController = async (req, res) => {
        console.log('DeleteApplicantByApplicantId');
        const jobId = req.params.id;
        const applicantId = req.params.applicantid;
        const jobExist = await ApplicantModel.deleteApplicantByApplicantIdByModel(jobId, applicantId);
        const noOfApplicants = jobExist.applicants.length;
        return res.render('allApplicantsDetails', { errorMessage: null, jobExist: jobExist, allApplicants: jobExist.applicants, noOfApplicants: noOfApplicants, userEmail: req.session.userEmail });
    }

}