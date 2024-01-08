import { body, validationResult } from 'express-validator';

const newJobValidationRequest = async (req, res, next) => {
    const rules = [
        body('companyname').notEmpty().withMessage('Company Name is required'),
        body('jobcategory').notEmpty().withMessage('Job Category is required'),
        body('jobdesignation').notEmpty().withMessage('Job Designation is required'),
        body('joblocation').notEmpty().withMessage('Job Location is required'),
        body('salary').isLength({ min: 7 }).withMessage('Salary must be in 7 digits per Annum.'),
        body('skillsrequired').notEmpty().withMessage('Skills are required'),
        body('jobposted').isDate().withMessage('Job posted Date required'),
        body('numberofopenings').isLength({ gt: 0 }).withMessage('Number of opening Job must be greater then 0.'),
        // body('applyby').isDate().withMessage('Apply for Job Date required'),
    ];

    await Promise.all(rules.map((rule) => rule.run(req)));

    var validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.render('addNewJobPage', {
            errorMessage: validationErrors.array()[0].msg,
        })
    }
    next();
}

export default newJobValidationRequest;