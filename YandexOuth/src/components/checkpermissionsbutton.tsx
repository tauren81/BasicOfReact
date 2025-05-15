import { useAuthStore } from '../store/authstore';

export const CreatePostButton = () => {
  const { hasPermission } = useAuthStore();

  if (!hasPermission('create_post')) {
    return null;
  }

  return <button>Create Post</button>;
};
