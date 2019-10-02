import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, password) =>
          oldPassword ? password.required() : password
        ),
      confirmPassword: Yup.string().when(
        'password',
        (confirmPassword, password) =>
          confirmPassword
            ? password.required().oneOf([Yup.ref('password')])
            : password
      ),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
