async function getPosts() {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (response.ok) {
    return JSON.stringify(await response.json(), null, 2);
  } else {
    return 'Ошибка HTTP ' + response.status;
  }
}

export default getPosts;
