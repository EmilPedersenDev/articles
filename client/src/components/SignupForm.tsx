import '../assets/styles/auth-form.scss';
import apiClient from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

const SignupForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { name: '', email: '', password: '' },

    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 8
          ? 'Password must have at least 8 letters'
          : !value.match(/[A-Z]/)
          ? 'Password must contain uppercase letter'
          : !value.match(/[0-9]/)
          ? 'Password must contain number'
          : null,
    },
  });

  const handleSubmitError = (errors: typeof form.errors): void => {
    if (errors.email) {
      showNotification({ message: 'Invalid email', color: 'red' });
    } else if (errors.password) {
      showNotification({ message: 'Invalid password', color: 'red' });
    } else if (errors.name) {
      showNotification({ message: 'Invalid name', color: 'red' });
    } else {
      showNotification({ message: 'Invalid form', color: 'red' });
    }
  };

  const handleSubmit = async (values: typeof form.values): Promise<void> => {
    try {
      await apiClient.post('/api/v1/auth/signup', values);
      navigate(`/`);
    } catch (error: any) {
      showNotification({ message: error?.response?.data?.message, color: 'red' });
    }
  };
  return (
    <form className="auth-form signup" onSubmit={form.onSubmit(handleSubmit, handleSubmitError)}>
      <h1>Signup</h1>
      <TextInput mt="sm" withAsterisk label="Name" placeholder="Name" {...form.getInputProps('name')} />
      <TextInput mt="sm" withAsterisk label="Email" placeholder="Email" {...form.getInputProps('email')} />
      <PasswordInput mt="sm" withAsterisk label="Password" placeholder="Password" {...form.getInputProps('password')} />
      <div className="login-form__link-wrapper">
        <Link to={`/login`}>Back to login</Link>
      </div>
      <div className="auth-form__submit">
        <Button type="submit" mt="sm">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
