import '../assets/styles/create-article.scss';
import { Button, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import BackButton from '../components/BackButton';

const CreateArticle = () => {
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: { title: '', content: '' },

    validate: {
      title: (value) => (value.length < 2 ? 'Title must be at least 2 letters' : null),
      content: (value) => (value.length < 10 ? 'Content must be at least 10 letters' : null),
    },
  });

  const onCreateNewArticleError = (errors: typeof form.errors): void => {
    if (errors.title) {
      showNotification({ message: 'Invalid title', color: 'red' });
    } else if (errors.content) {
      showNotification({ message: 'Invalid content', color: 'red' });
    } else if (errors.name) {
      showNotification({ message: 'Invalid form', color: 'red' });
    }
  };

  const onCreateNewArticle = async (values: typeof form.values): Promise<void> => {
    try {
      await apiClient.post('/api/v1/articles', values);
      navigate('/');
    } catch (error: any) {
      showNotification({ message: error?.response?.data?.message });
    }
  };
  return (
    <section id="create-article">
      <BackButton />
      <h1>Create Article</h1>
      <form onSubmit={form.onSubmit(onCreateNewArticle, onCreateNewArticleError)}>
        <TextInput
          mt="lg"
          size="md"
          withAsterisk
          label="Title"
          placeholder="Title..."
          {...form.getInputProps('title')}
        />
        <Textarea
          mt="lg"
          minRows={20}
          placeholder="Content..."
          label="Content"
          size="md"
          withAsterisk
          {...form.getInputProps('content')}
        />
        <div className="create-article__submit">
          <Button type="submit" mt="lg">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateArticle;
