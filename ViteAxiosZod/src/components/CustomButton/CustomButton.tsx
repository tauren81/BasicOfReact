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
        Загрузка всех постов
      </Button>
      <div>
        <ul>
          {getResult?.map((record: any, i: any) => (
            <li>
              <div className="card">
                <div className="card-header">{record.title}</div>
                <div className="card-body">
                  <div>{record.body}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomButton;
