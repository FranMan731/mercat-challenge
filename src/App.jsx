import { BrowserRouter, Route, Routes } from 'react-router-dom';
//CSS
import "./styles/globals.scss";
import 'antd/dist/antd.min.css';
//redux
import { Provider } from "react-redux";
//pages
import Inicio from "./pages/inicio";
import Search from "./pages/search";

function App({store}) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
