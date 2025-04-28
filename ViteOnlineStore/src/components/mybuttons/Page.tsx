import { atom, useAtom } from 'jotai';

const theme = atom('light');

export default function Page(props: { children: React.ReactNode }) {
  const [appTheme, setAppTheme] = useAtom(theme);
  const handleClick = () =>
    setAppTheme(appTheme === 'light' ? 'dark' : 'light');

  const light = {
    background: '#FFFFFF',
  };

  const dark = {
    //color: '#2d2d2d',
    background: '#2d2d2d',
  };

  return (
    <div style={appTheme === 'light' ? light : dark}>
      {/*<div className={appTheme} >*/}
      <h1>This is a theme switcher</h1>
      <button onClick={handleClick}>
        {appTheme === 'light' ? 'DARK' : 'LIGHT'}
      </button>
      {props.children}
    </div>
  );
}
