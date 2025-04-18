import { useState } from 'react';
import { Button } from 'antd';
import getPosts from './GetPosts';

const CustomButton = () => {
  const [getResult, setGetResult] = useState<any>(null);

  return (
    <div>
      <Button
        type="primary"
        onClick={async () => {
          setGetResult(await getPosts());
        }}
      >
        Primary Button
      </Button>
      <div>
        <ul>
          {getResult?.map((record: any, i: any) => (
            <li key={i}>{record.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomButton;
