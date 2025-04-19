/*
import { Button } from 'antd';
import getPosts from './GetPosts';

const CustomButton = () => {
 
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('api/product/')
      const json = await response.json()   
      console.log(response.ok)
      if (response.ok) {
        setProducts(json)
      }
    }
     

  return <Button type="primary" onClick={() => getPosts()}>Получи посты</Button>;
};

export default CustomButton;
*/
/*
function submitHandler(event) {
  event.preventDefault()
  fetch(`https://boiling-refuge-66454.herokuapp.com/images/237/comments`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'test name',
      comment: 'test comment',
    }),
  })
    .then((response) => {
      console.log('response', response)
      // "JSON" не отправляется при статусе "204 - No Content"
      // Итак, вы можете написать это:
      if (response.status === 204) {
        return new Promise((resolve) => resolve(null))
      }
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((json) => {
      // Его значение равно "null", потому что мы сделали "resolve (null)"
      console.log('Тут хочу получить json, но ничего не приходит', json)
    })
}
*/
