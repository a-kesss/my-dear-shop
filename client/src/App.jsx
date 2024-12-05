import { Route, Routes } from 'react-router';
import Layout from './Layout';
import MainPage from './pages/MainPage';
import { UserProvider } from './UserContext';

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
