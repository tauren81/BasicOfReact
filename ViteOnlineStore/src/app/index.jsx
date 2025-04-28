import { createContext, useContext, useState } from 'react';
import Page from '@components/mybuttons/Page';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Content from '@components/Content';
import Login from '@/pages/login';
import { ProtectedRoute } from '@components/ProtectedRoute';

import { BrowserRouter as Router, Routes, Route } from 'react-router';

//import { AuthContext } from '../stores/AuthContext';
import AuthProvider from '@/stores/AuthContext';
//import { useAuth } from '../hooks/useAuth';
//import Login from '@/pages/login';
//import LogoutButton from '@/pages/LogoutButton';
//import { CartContextProvider } from '../stores/CartContext';
import { ThemeContext } from '../stores/ThemeContext';
import { ReduxStore } from '../stores/ReduxStore';

import { atom, useAtom, Provider } from 'jotai';

import { Provider as Providerx } from 'react-redux';

const theme = atom('light');

//const ThemeContext = createContext();

function App() {
  //const { user, login, logout, setUser } = useAuth();
  const [theme, setTheme] = useState('light');

  return (
    <Page>
      <Provider store={ThemeContext}>
        <Router>
          {/*<ThemeContext.Provider value={{ theme, setTheme }}>*/}
          <AuthProvider>
            <Routes>
              <Route path="*" element={<Login />} />
              <Route
                path="/store"
                element={
                  <ProtectedRoute>
                    {/*<CartContextProvider>*/}
                    <Providerx store={ReduxStore}>
                      <Header />
                      <Content />
                      <Footer />
                    </Providerx>
                    {/*</CartContextProvider>*/}
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
          {/*</ThemeContext.Provider>*/}
        </Router>
      </Provider>
    </Page>
  );
}

export default App;
