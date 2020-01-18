import * as yup from 'yup';

export default async function(req, res, next) {
  try {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(6),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, password) =>
          oldPassword ? password.required() : password
        ),
      confirmPassword: yup
        .string()
        .when('password', (password, confirmPassword) =>
          password
            ? confirmPassword.required().oneOf([yup.ref('password')])
            : confirmPassword
        ),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails!', message: error.inner });
  }
}
