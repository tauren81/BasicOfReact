import { useState } from 'react';
import { Button } from 'antd';
import getPosts from './GetPosts';

const CustomButton = () => {
  return (
    <Button type="primary" onClick={() => getPosts()}>
      Primary Button
    </Button>
  );
};

export default CustomButton;
