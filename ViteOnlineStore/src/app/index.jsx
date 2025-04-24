import { createContext, useContext, useState } from 'react';
import Page from '@components/mybuttons/Page';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Content from '@components/Content';

import { AuthContext } from '../stores/AuthContext';
import { useAuth } from '../hooks/useAuth';
import Login from '@/pages/login';
import LogoutButton from '@/pages/LogoutButton';
//import { CartContextProvider } from '../stores/CartContext';
import { ThemeContext } from '../stores/ThemeContext';
import { ReduxStore } from '../stores/ReduxStore';

import { atom, useAtom, Provider } from 'jotai';

import { Provider as Providerx } from 'react-redux';

const theme = atom('light');

//const ThemeContext = createContext();

function App() {
  const { user, login, logout, setUser } = useAuth();
  const [theme, setTheme] = useState('light');

  return (
    <Page>
      <Provider store={ThemeContext}>
        {/*<ThemeContext.Provider value={{ theme, setTheme }}>*/}
        <AuthContext.Provider value={{ user, setUser }}>
          {/*<CartContextProvider>*/}
          <Login />
          <LogoutButton />
          <Providerx store={ReduxStore}>
            <Header />
            <Content />
            <Footer />
          </Providerx>
          {/*</CartContextProvider>*/}
        </AuthContext.Provider>
        {/*</ThemeContext.Provider>*/}
      </Provider>
    </Page>
  );
}

export default App;
