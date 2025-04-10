import React from 'react';
//import MyTab from 'components/MyTab/MyTab';
/*
import MyButton from 'components/MyButton/MyButton';
import MyRating from 'components/MyRating/MyRating';
import MyDatePicker from 'components/MyDatePicker/MyDatePicker';
import MyModal from 'components/MyModal/MyModal';
*/

function App() {
  return (
    <div>
      {
        /* стили Chakra-ui перекрывают стили tailwind поэтому тут закомментировано
      нужно показывать или этот компонент или MyModal*/
        <h3>11111{/*<MyTab />*/}</h3>
      }
      {/*
      <h3>
        <MyButton />
      </h3>
      <h3>
        <MyRating />
      </h3>
      <h3>
        <MyDatePicker />
      </h3>
      <h3>
        <MyModal />
      </h3>
      */}
    </div>
  );
}

export default App();
