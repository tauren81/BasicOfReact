import React, { useEffect, useState } from 'react';

const YandexAuth = () => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        //document.body.appendChild(script);
      });
    };

    const initYandexAuth = async () => {
      try {
        await loadScript(
          'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js',
        );
        await loadScript(
          'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js',
        );

        window.YaAuthSuggest.init(
          {
            client_id: 'd9ff50ec155f4aed98859bcf27710588',
            response_type: 'token',
            redirect_uri: 'http://localhost:3000/auth',
          },
          'http://localhost:3000',
        )
          .then(({ handler }) => handler())
          .then((data) => {
            console.log('Auth successful', data);
            window.YaSendSuggestToken('http://localhost:3000', {
              flag: true,
              headers: { 'Content-Type': 'application/json' },
              params: data,
            });
          })
          .catch((error) => console.log('Auth error', error));
      } catch (error) {
        console.error('Failed to load Yandex Auth scripts', error);
      }
    };

    initYandexAuth();
  }, []);

  return (
    <div>
      <h2>Yandex OAuth 2.0 Authorization</h2>
      <div id="yandexAuthButton"></div>
    </div>
  );
};

export default YandexAuth;

{
  /*
const useYandexAuth = (clientId, redirectUri) => {
  const [authData, setAuthData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initYandexAuth = () => {
    setIsLoading(true);
    setError(null);

    if (!window.YaAuthSuggest) {
      setError('Yandex SDK not loaded');
      setIsLoading(false);
      return;
    }

    window.YaAuthSuggest.init(
      {
        client_id: clientId,
        response_type: 'token',
        redirect_uri: redirectUri,
      },
      'http://localhost:3000',
      {
        view: 'button',
        parentId: 'yandex-auth-button',
        buttonView: 'main',
        buttonTheme: 'light',
      },
    )
      .then(({ handler }) => handler())
      .then((data) => {
        setAuthData(data);
        if (window.YaSendSuggestToken) {
          window.YaSendSuggestToken(data.access_token);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //useEffect(() => {
  //
  //const scriptSuggest = document.createElement('script');
  //scriptSuggest.src =
  //  'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
  //scriptSuggest.async = true;

  //const scriptToken = document.createElement('script');
  //scriptToken.src =
  //  'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js';
  //scriptToken.async = true;

  //document.body.appendChild(scriptSuggest);
  //document.body.appendChild(scriptToken);

  //return () => {
  //document.body.removeChild(scriptSuggest);
  //document.body.removeChild(scriptToken);
  //};
  //},
  //[]);

  return { initYandexAuth, authData, error, isLoading };
};

// Использование хука в компоненте
const YandexAuthButton = () => {
  const { initYandexAuth, isLoading, error } = useYandexAuth(
    'd9ff50ec155f4aed98859bcf27710588',
    'http://localhost:3000/auth',
  );

  if (error) {
    return (
      <div>
        Error: {error.message || error.code + ' ' + error.status || error}
      </div>
    );
  }

  return (
      <button
        id="yandex-auth-button"
        onClick={initYandexAuth}
        disabled={isLoading}
      >
        {isLoading ? 'Загрузка...' : 'Войти через Яндекс'}
      </button>
  );
};

export default YandexAuthButton;
*/
}
{
  /*
import React, { useEffect } from 'react';

function YandexAuth() { onAuthSuccess, onAuthError } {
  // ID вашего приложения в Яндекс OAuth
  const CLIENT_ID = 'd9ff50ec155f4aed98859bcf27710588';
  // Ссылка для перенаправления после авторизации (должна быть зарегистрирована в настройках приложения)
  const REDIRECT_URI = 'http://localhost:3000/auth';

  useEffect(() => {
    // Загружаем скрипт SDK динамически
    const loadYaAuthSDK = () => {
      const script = document.createElement('script');
      script.src =
        'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
      script.async = true;
      script.onload = initializeYaAuth;
      document.body.appendChild(script);
    };

    // Инициализация Yandex Auth Suggest
    const initializeYaAuth = () => {
      if (window.YaAuthSuggest) {
        window.YaAuthSuggest.init(
          {
            client_id: CLIENT_ID,
            response_type: 'token',
            redirect_uri: REDIRECT_URI,
          },
          'http://localhost',
          { view: 'default' },
        )
          .then(({ z }) => handler())
          .then((data) => {
            // Успешная авторизация
            console.info('Успешная авторизация');
            //if (onAuthSuccess) {
            //  onAuthSuccess(data);
            //}
          })
          .catch((error) => {
            // Ошибка авторизации
            console.info('Ошибка авторизации');
            //if (onAuthError) {
            //  onAuthError(error);
            //}
          });
      }
    };

    loadYaAuthSDK();

    // Удаляем скрипт при размонтировании компонента
    return () => {
      const script = document.querySelector(
        'script[src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"]',
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }); //, [onAuthSuccess, onAuthError]);

  return (
    <div>
      <div id="ya-auth-container"></div>
    </div>
  );
}

export default YandexAuth;
*/
}
