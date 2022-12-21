import '../assets/styles/auth-form.scss';
import apiClient from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useContext } from 'react';
import { StoreContext } from '../App';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser }: any = useContext(StoreContext);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { email: '', password: '' },

    validate: {
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
      showNotification({ message: 'Please provide a valid email', color: 'red' });
    } else if (errors.password) {
      showNotification({ message: 'Invalid password', color: 'red' });
    }
  };

  const handleSubmit = async (values: typeof form.values): Promise<void> => {
    try {
      const response: any = await apiClient.post('/api/v1/auth/login', values);
      const loggedInUser = Object.assign({}, response.data.data.user);
      setUser(loggedInUser);
      navigate('/');
    } catch (error: any) {
      showNotification({ message: error.response.data.message, color: 'red' });
    }
  };
  return (
    <form className="auth-form login" onSubmit={form.onSubmit(handleSubmit, handleSubmitError)}>
      <h1>Login</h1>
      <TextInput mt="sm" withAsterisk label="Email" placeholder="Email" {...form.getInputProps('email')} />
      <PasswordInput mt="sm" withAsterisk label="Password" placeholder="Password" {...form.getInputProps('password')} />
      <div className="login-form__link-wrapper">
        <Link to={`/signup`}>Sign up</Link>
      </div>
      <div className="auth-form__submit">
        <Button type="submit" mt="sm">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
