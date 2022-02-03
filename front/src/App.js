import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/common/Header';
import HeaderContainer from './container/common/HeaderContainer';

function App() {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Jua&family=Pacifico&family=Patua+One&display=swap" rel="stylesheet" />
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
    </div>
  );
}

export default App;
