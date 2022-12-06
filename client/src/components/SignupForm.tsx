import '../assets/styles/LoginForm.scss';
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

  const handleSubmitError = (errors: typeof form.errors) => {
    if (errors.email) {
      showNotification({ message: 'Please provide a valid email', color: 'red' });
    } else if (errors.password) {
      showNotification({ message: 'Invalid password', color: 'red' });
    } else if (errors.name) {
      showNotification({ message: 'Please fill name field', color: 'red' });
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await apiClient.post('/api/v1/auth/signup', values);
      navigate(`/`);
    } catch (error: any) {
      showNotification({ message: error.response.data.message, color: 'red' });
    }
  };
  return (
    <form className="login-form" onSubmit={form.onSubmit(handleSubmit, handleSubmitError)}>
      <h1>Signup</h1>
      <TextInput mt="sm" label="Name" placeholder="Name" {...form.getInputProps('name')} />
      <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
      <PasswordInput mt="sm" label="Password" placeholder="Password" {...form.getInputProps('password')} />
      <div className="login-form__link-wrapper">
        <Link to={`/login`}>Back to login</Link>
      </div>
      <div className="submit">
        <Button type="submit" mt="sm" className="submit__btn">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
