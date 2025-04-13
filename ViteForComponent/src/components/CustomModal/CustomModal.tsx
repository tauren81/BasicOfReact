import * as React from 'react';
import { Dialog } from 'radix-ui';
import { Cross2Icon } from '@radix-ui/react-icons';
import './CustomModal.css';
//import './styles.css';
//import { Button } from '@radix-ui/react-button';

const CustomModal = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      {/*<Button className="bg-blue-500 text-white p-2 rounded">
        Edit profile
      </Button>*/}
      {/*<button className="Button violet">Edit profile</button>*/}
      <button className="tw-bg-indigo-600 tw-text-white font-semibold px-10">
        Edit profile
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        aria-hidden="true"
      />
      <Dialog.Content className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
          Edit profile
        </Dialog.Title>
        <Dialog.Description className="text-xl font-semibold text-gray-900 dark:text-white">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        <div
          style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}
        >
          <Dialog.Close asChild>
            <button className="tw-inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">
              Save changes
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default CustomModal;
