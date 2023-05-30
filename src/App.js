import React from "react";
import {Routes,Route} from 'react-router-dom'
import SearchPage from "./Pages/SearchPage/SearchPage";
import CaptionPage from "./Pages/CaptionPage/CaptionPage";
function App() {
  return(
  <Routes>
    <Route path="/" element={<SearchPage/>}/>
    <Route path="/caption" element={<CaptionPage/>}/>
  </Routes>
  )
}

export default App;
