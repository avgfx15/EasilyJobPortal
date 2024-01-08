import { body, validationResult } from 'express-validator';

const validationRequest = async (req, res, next) => {

    const rules = [
        body('name').notEmpty().withMessage('Name is required'),

        body('email').isEmail().withMessage('Pleease enter valid email address'),

        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),

        body('contact').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be at least 10 digits'),

        body('role').notEmpty().withMessage('Role is required'),
    ];


    // 2. run those rules.
    await Promise.all(
        rules.map((rule) => rule.run(req))
    );

    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);

    // 4. if errros, return the error message
    if (!validationErrors.isEmpty()) {

        return res.render('registerPage', {
            errorMessage:
                validationErrors.array()[0].msg,
        });
    }
    next();

}

export default validationRequest;