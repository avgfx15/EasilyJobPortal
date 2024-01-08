import { body, validationResult } from 'express-validator';

const applicantFormValidationRequest = async (req, res, next) => {
    console.log("Applicant Form Validation");
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),

        body('email').isEmail().withMessage('Pleease enter valid email address'),

        body('contact').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be at least 10 digits'),
        body('resumePath').custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Resume File must required')
            }
            return true;
        })
    ]

    await Promise.all(rules.map((rule) => rule.run(req)));
    const validationErrors = validationResult(req);
    console.log(validationErrors);

    if (!validationErrors.isEmpty()) {
        return res.render('jobDetailsPage', {
            errorMessage: validationErrors.array()[0].msg,
        })
    }
    next();
}

export default applicantFormValidationRequest;