import React, { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';

function CustomCalendar() {
  return (
    <MantineProvider>
      <DatePicker locale="ru" />
    </MantineProvider>
  );
}

export default CustomCalendar;
