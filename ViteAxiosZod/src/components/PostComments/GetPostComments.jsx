import { useState } from 'react';
import { fetchPostComments } from '@/types/api/fetchPostComment';

async function GetPostComments(idPost, setComments) {
  setComments(await fetchPostComments(`${idPost}`));
  return '200';
}

export default GetPostComments;
