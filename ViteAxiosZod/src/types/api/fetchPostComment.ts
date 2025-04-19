import AxiosInstance from '../api-client';
import { PostsDTO, PostSchema } from '../schemaPost';

export const fetchPostComments = async (id: string) => {
  const response = await AxiosInstance.get(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
  );
  return response.data;
};
