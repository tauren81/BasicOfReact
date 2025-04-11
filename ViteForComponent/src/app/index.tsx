import React from 'react';
import CustomTab from '@components/CustomTab/CustomTab';
import CustomButton from '@components/CustomButton/CustomButton';
import CustomRating from '@components/CustomRating/CustomRating';
import CustomCalendar from '@components/CustomCalendar/CustomCalendar';
import CustomModal from '@components/CustomModal/CustomModal';

function App() {
  return (
    <div>
      {/* стили Chakra-ui перекрывают стили tailwind поэтому тут закомментировано
      нужно показывать или этот компонент или MyModal*/}
      <h3>
        <CustomTab />
      </h3>
      <h3>
        <CustomButton />
      </h3>
      <h3>
        <CustomRating />
      </h3>
      <h3>
        <CustomCalendar />
      </h3>
      <h3>
        <CustomModal />
      </h3>
    </div>
  );
}

export default App;
