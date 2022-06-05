import React from "react";
import Auth from "./components/Auth/Auth";
import { Container } from '@material-ui/core';
import Home from './components/Home/Home';
import { BrowserRouter, Routes , Route } from 'react-router-dom';



const App = () => (
    <BrowserRouter>
    <Container maxWidth="lg">
        <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/auth" exact element={<Auth/>} />
        </Routes>
    </Container>
  </BrowserRouter>
)

export default App;