import Admin from './pages/Admin';
import Home from './pages/Home';
import Signin from './pages/Signin';
import { Route, Routes } from "react-router-dom";
import Protected from './utils/Protected';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} exact/>
            <Route path="/signin" element={<Signin/>} />
            <Route path="/admin" element={<Protected><Admin/></Protected>} />
        </Routes>
    );
}

export default App;