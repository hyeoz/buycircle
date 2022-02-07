import { Route, Routes } from 'react-router';
import './App.css';
// import Header from './components/common/Header';
// import HeaderContainer from './container/common/HeaderContainer';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Jua&family=Pacifico&family=Patua+One&display=swap" rel="stylesheet" />
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
