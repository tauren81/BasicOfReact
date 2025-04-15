import { Tabs } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@chakra-ui/react/preset';

function CustomTab() {
  return (
    <ChakraProvider value={system}>
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="First">Какой-то вкладка 1</Tabs.Trigger>
          <Tabs.Trigger value="Second">Какой-то вкладка 2</Tabs.Trigger>
          <Tabs.Trigger value="Third">Какой-то вкладка 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="First">Сделай что-то полезное 1</Tabs.Content>
        <Tabs.Content value="Second">Сделай что-то полезное 2</Tabs.Content>
        <Tabs.Content value="Third">Сделай что-то полезное 3</Tabs.Content>
      </Tabs.Root>
    </ChakraProvider>
  );
}

export default CustomTab;
