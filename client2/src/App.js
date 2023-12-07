import { Route, Routes } from "react-router-dom";
import Sign from "./pages/Sign";
import Home from "./pages/Home";
// import ReqList from "./pages/reqList";
// import ReqAdd from "./pages/reqAdd";
// import Add from "./pages/Add";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign/" element={<Sign />} />
      {/* <Route path="reqlist/" element={<ReqList />} />
      <Route path="reqadd/" element={<ReqAdd />} />
      <Route path="add/" element={<Add />} /> */}
    </Routes>
  );
}

export default App;
