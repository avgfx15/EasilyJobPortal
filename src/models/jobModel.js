export default class JobModel {

    applicants = [];


    constructor(id, jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings, jobposted, applicants) {
        this.id = Number(id);
        this.jobcategory = jobcategory;
        this.jobdesignation = jobdesignation;
        this.joblocation = joblocation;
        this.companyname = companyname;
        this.salary = salary;
        this.applyby = applyby;
        this.skillsrequired = skillsrequired;
        this.numberofopenings = 0 || numberofopenings;
        this.jobposted = jobposted;
        this.applicants = 0 || applicants;

    }

    // @ GET All jobs Get Request
    static getAllJobsModel() {
        return jobs;
    }

    // @ GET Job By Id get Request
    static getJobDetailsByIdModel(id) {

        return jobs.find((job) => job.id == id)
    }

    //+ POST Add New Job post Request
    static addNewJobModel(jobObject) {


        const newJob = new JobModel(jobs.length + 1, jobObject.jobcategory, jobObject.jobdesignation, jobObject.joblocation, jobObject.companyname, jobObject.salary, jobObject.applyby, jobObject.skillsrequired, jobObject.numberofopenings, jobObject.jobposted, []);
        newJob.noOfApplicant = 0;

        // $ push new Job 
        jobs.push(newJob);

    }

    // * POST Update Job By Id POST Request 
    static updateJobByIDModel(jobObject) {
        const index = jobs.findIndex((job) => job.id == jobObject.id);

        jobs[index] = jobObject;

    }

    // - DELETE Delete Job By Id delete request

    static deleteJobByIDModel(id) {
        const index = jobs.findIndex((job) => job.id == id);

        jobs.splice(index, 1);
    }

    // @ GetAll Jobs By SearchText Model
    static getAllJobsBtSearchTextModel(searchText) {
        const allJobBySearch = jobs.filter(job => job.companyname == searchText)
        return allJobBySearch;
    }
}

var jobs = [
    new JobModel(1, "SDE oppertunity in GURGAON HR IND REMOTE at Coding Ninjas", "Tech SDE", "Gurgaon HR IND Remote", "Coding Ninjas", "14-20 Lpa", "2024-01-30", ["React", "Angular", "Node Js", "SQL", "JS"], 5, "2021-01-25", []),

    new JobModel(2, "Angular Developer oppertunity in PUNE IND ON-SITE at Google", "Tech SDE", "Surat Remote", "Google", "20 - 25 Lpa", "2024-01-02", ["c++", "React", "Node Js", "SQL", "JS"], 11, "2021-01-25", []),
    new JobModel(3, "SDE oppertunity in BANGALORE IND at Juspay", "Tech Full Stack Developer", "Surat Remote", "Juspay", "15-17 Lpa", "2024-01-30", ["React", "Angular", "Node Js", "MongoDB", "JS"], 13, "2021-01-25", []),
    new JobModel(4, "Simplilearn", "Tech Full Stack Developer", "Surat Remote", "Simplilearn", "10-12 Lpa", "2024-01-20", ["React", "Angular", "Node Js", "MongoDB", "JS"], 13, "2021-01-25", [],),
    new JobModel(5, "Simplilearn", "Tech Full Stack Developer", "Mumbai", "Simplilearn", "17-19 Lpa", "2024-01-20", ["React", "Node Js", "MongoDB", "JS"], 7, "2021-01-25", [],),
];

