import JobModel from '../models/jobModel.js';

export default class ApplicantModel {

    // % Constructor For Model
    constructor(applicantid, name, email, contact, resumePath) {
        this.applicantid = applicantid;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resumePath = resumePath;
    }

    // @ GET get All Applicant By Job Id
    static getAlllApplicantsModel() {
        return applicants;
    }

    // @GET Applicant Data By applicant Id
    static getAllApplicantByJobIdModel(id) {
        const jobExist = JobModel.getJobDetailsByIdModel(id);

        return jobExist.applicants;

    }

    // + Add Applicant In Job By Job Id
    static addApplicantInApplicantModel({ name, email, contact, resumePath }, id) {

        const jobExist = JobModel.getJobDetailsByIdModel(id);


        jobExist.applicants.push({ applicantid: jobExist.applicants.length + 1, email, name, contact, resumePath });

    }

    // @ GET Applicant Details By Applicant Id Get request

    static getApplicantDetailsByApplicantIdModel(jobId, applicantId) {
        const jobExist = JobModel.getJobDetailsByIdModel(jobId);
        const applyer = jobExist.applicants.find((applicant) => applicant.applicantid == applicantId);
        return applyer;
    }

    // * UPDATE Applicant Data Model
    static updateApplicantDataByApplicantIdModel(jobId, applicantId, { name, email, contact, resumePath }) {
        const jobExist = JobModel.getJobDetailsByIdModel(jobId);

        const allApplicants = jobExist.applicants;


        const index = allApplicants.findIndex((applicant) => applicant.applicantid == applicantId);
        console.log(allApplicants[index]);
        allApplicants[index] = {
            applicantid: applicantId,
            name, email, contact, resumePath
        };
        return allApplicants[index];
    }

    // - Delete Applicant By ApplicantId By JobId Model
    static deleteApplicantByApplicantIdByModel(jobId, applicantId) {
        const jobExist = JobModel.getJobDetailsByIdModel(jobId);
        if (jobExist) {
            const applicantExist = jobExist.applicants.find((applicant) => applicant.applicantid == applicantId);
            if (applicantExist) {
                const index = jobExist.applicants.find((applicant) => applicant.applicantid == applicantId);
                jobExist.applicants.splice(index, 1);
                return jobExist;
            } else {
                return res.status(401).send('Applicant does not exist');
            }
        } else {
            return res.status(401).send('Job does not exist');
        }
    }

}

var applicants = [
    new ApplicantModel(1, "a1@gmail.com", "Ashwin", 9851236588, "no path")
];



