const { check } = require('express-validator');

const passwordCheck = check('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches('[0-9]')
  .withMessage('Password Must Contain a Number')
  .matches('[A-Z]')
  .withMessage('Password Must Contain an Uppercase Letter')
  .trim()
  .escape();
const emailCheck = check('email', 'Username Must Be an Email Address').isEmail().trim().escape().normalizeEmail();

export const signUpValidation = [
  check('name', 'Name can`t be empty').not().isEmpty().trim().escape(),
  passwordCheck,
  emailCheck,
];

export const loginValidation = [passwordCheck, emailCheck];
