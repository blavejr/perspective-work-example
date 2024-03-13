import * as Yup from 'yup';

const create = Yup.object({
  firstName: Yup.string().required('firsName is required'),
  lastName: Yup.string().required('lastName is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
});

const getAll = Yup.object({
  created: Yup.number().oneOf([1, -1], 'Invalid sort value'),
});

export default {
  create,
  getAll,
};
