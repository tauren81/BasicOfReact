import CustomButton from '@components/CustomButton/CustomButton';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { fetchPost } from '@/types/api/fetchPost';
import GetPostComments from '@components/PostComments/GetPostComments';
import PostComments from '@components/PostComments/PostComments';

function App() {
  const [getId, setGetId] = useState('');
  const [getResult, setGetResult] = useState<any>(null);
  const [Comments, setComments] = useState<any>(null);

  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isLoadingPost, refetch: getPostById } = useQuery(
    'query-post-by-id',
    async () => {
      return await fetchPost(`${getId}`);
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        const result = {
          status: 200,
          headers: 'application/json',
          data: res,
        };

        setGetResult(res);

        <button
          className="btn btn-sm btn-warning ml-2"
          onClick={clearGetOutput}
        >
          Clear
        </button>;
      },
      onError: (err: any) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    },
  );

  useEffect(() => {
    if (isLoadingPost) setGetResult('loading...');
  }, [isLoadingPost]);

  function getDataById() {
    if (getId) {
      try {
        getPostById();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  }

  const clearGetOutput = () => {
    setGetResult('');
  };

  return (
    <div id="app" className="container">
      <div className="card">
        <div className="card-header">Загрузка поста, по ид</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <input
              type="text"
              value={getId}
              onChange={(e) => setGetId(e.target.value)}
              className="form-control ml-2"
              placeholder="Id"
            />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataById}>
                Get by Id
              </button>

              <div className="card">
                <div className="card-header">{getResult?.title}</div>
                <div className="card-body">
                  <div>{getResult?.body}</div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={async () => {
                      await GetPostComments(`${getId}`, setComments);
                    }}
                  >
                    Get comments
                  </button>
                  <div>
                    <ul>{PostComments(Comments)}</ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btn btn-sm btn-warning ml-2"
              onClick={clearGetOutput}
            >
              Clear
            </button>
          </div>

          <h3>
            <CustomButton />
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
