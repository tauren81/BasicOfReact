async function getPosts() {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (response.ok) {
    return await response.json();
  } else {
    return 'Ошибка HTTP ' + response.status;
  }
}

export default getPosts;
