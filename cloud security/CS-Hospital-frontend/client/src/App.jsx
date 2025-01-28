import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appointment from "./pages/Team 1/Appoinment"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/appoinment" element={<Appointment />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
