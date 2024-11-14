import * as Yup from 'yup';
export const passwordFormik = (() => {
  return {
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email required')
        .matches(
          /^[A-Za-z0-9_]{3,}[@]{1}[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,7}$/,
          'please enter valid email'
        ),
      password: Yup.string()
        .required('password required')
        .matches(
          /^(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{8,16}$/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number'
        ),
    }),
    onSubmit: (values: any) => {},
  };
})();
