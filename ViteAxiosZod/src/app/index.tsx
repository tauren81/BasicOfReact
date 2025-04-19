import CustomButton from '@components/CustomButton/CustomButton';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import apiClient from '@/types/api-client';
import { AxiosError } from 'axios';
import { fetchPost } from '@/types/api/fetchPost';
import { fetchPostComments } from '@/types/api/fetchPostComment';

function App() {
  const [getId, setGetId] = useState('');
  const [getResult, setGetResult] = useState<any>(null);
  const [getComments, setGetComments] = useState<any>(null);

  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isLoadingTutorial, refetch: getTutorialById } = useQuery(
    'query-tutorial-by-id',
    async () => {
      return await fetchPost(`${getId}`);
      //return await apiClient.get(`/tutorials/${getId}`);
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

        let ress = (
          <div className="card">
            <div className="card-header">{result?.data.title}</div>
            <div className="card-body">
              <div>{result?.data.body}</div>
              <button
                className="btn btn-sm btn-primary"
                onClick={async () => {
                  //понравился вариант явного приведения типов через Promise<xxxDTO>,
                  // результат явно содержит типизированный эелемент, который легче встраивать в разметку
                  let xxx = await fetchPostComments(`${getId}`);
                  setGetComments(xxx);

                  <div>
                    {xxx?.map((record: any, i: any) => (
                      <div className="card" key={record.id}>
                        <div className="card-header">
                          {record.name} ({record.email})
                        </div>
                        <div className="card-body">
                          <div>{record.body}</div>
                          <button className="btn btn-sm btn-primary">
                            Get comments
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>;
                }}
              >
                Get comments
              </button>
              <div>
                {getComments?.map((record: any, i: any) => (
                  <div className="card" key={record.id}>
                    <div className="card-header">
                      {record.name} ({record.email})
                    </div>
                    <div className="card-body">
                      <div>{record.body}</div>
                      <button className="btn btn-sm btn-primary">
                        Get comments
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

        setGetResult(ress);

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
    if (isLoadingTutorial) setGetResult('loading...');
  }, [isLoadingTutorial]);

  function getDataById() {
    if (getId) {
      try {
        getTutorialById();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  }

  /*
  const { isLoading: isSearchingTutorial, refetch: findTutorialsByTitle } =
    useQuery(
      'query-tutorials-by-title', // ["query-tutorials-by-title", getTitle],
      async () => {
        return await apiClient.get(`/tutorials?title=${getTitle}`);
      },
      {
        enabled: false,
        retry: 1,
        onSuccess: (res) => {
          const result = {
            status: res.status + '-' + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          setGetResult(fortmatResponse(result));
        },
        onError: (err: AxiosError) => {
          setGetResult(fortmatResponse(err.response?.data || err));
        },
      },
    );

  useEffect(() => {
    if (isSearchingTutorial) setGetResult('searching...');
  }, [isSearchingTutorial]);

  function getDataByTitle() {
    if (getTitle) {
      try {
        findTutorialsByTitle();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  }
    */

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
            </div>

            {/*
            <input
              type="text"
              value={getTitle}
              onChange={(e) => setGetTitle(e.target.value)}
              className="form-control ml-2"
              placeholder="Title"
            />
            <div className="input-group-append">
              <button
                className="btn btn-sm btn-primary"
                onClick={getDataByTitle}
              >
                Find By Title
              </button>
            </div>
*/}
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

          {getResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{getResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  /*
  return (
    <div>
      <h3>
        <CustomButton />
      </h3>
      {/*
      <div>
        <ul>
          {data.map((record, i) => (
            <li key={i}>{record.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  */
}

export default App;
