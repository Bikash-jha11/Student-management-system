import NavBar from "./components/NavBar";
import Student from "./pages/Student";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ContestHistory from "./components/ContestHistory";

function App() {
  return (
    <>
      <BrowserRouter>
         <NavBar/>
        <Routes>
         <Route path="/" element={<Student />}></Route>
         <Route path="/analytics/:id" element={<ContestHistory />}></Route>
         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
