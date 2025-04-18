import AxiosInstance from '../api-client';
import { PostsDTO, PostSchema } from '../schemaPost';

export const fetchUser = async (id: string): Promise<PostsDTO> => {
  const response = await AxiosInstance.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  return PostSchema.parse(response.data); // Валидация данных
};
