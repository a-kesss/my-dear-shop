import { Route, Routes } from 'react-router';
import Layout from './Layout';
import MainPage from './pages/MainPage';
import { UserProvider } from './UserContext';
import ProfilePage from './pages/ProfileRedact';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/profileredact" element={<ProfilePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<h1>НЕТ ТАКОЙ СТРАНИЦЫ БРАТАН</h1>} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
