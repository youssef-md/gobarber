import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string;
}

export default function getValidationErrors(
  errors: ValidationError
): ValidationErrors {
  return errors.inner.reduce(function mapPathWithItsError(acc, error) {
    return {
      ...acc,
      [error.path]: error.message,
    };
  }, {});
}
