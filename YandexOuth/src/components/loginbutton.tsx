export const LoginButton = () => {
  const handleLogin = () => {
    const clientId = 'd9ff50ec155f4aed98859bcf27710588';
    const redirectUri = 'http://localhost:3000/callback'; //encodeURIComponent('http://localhost:3000/callback');
    const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    //`https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = yandexAuthUrl;
  };

  return <button onClick={handleLogin}>Login with Yandex</button>;
};
