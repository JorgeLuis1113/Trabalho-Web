import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicial from "./pages/Inicial";
import Cadastro from "./pages/Cadastro";
import Inscricoes from "./pages/Inscricoes";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Rep from "./pages/Rep";
import Republicas from "./pages/Republicas";
import Formulario from "./pages/Formulario";

function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicial/>}></Route>
                <Route path="/cadastro" element={<Cadastro/>}></Route>
                <Route path="/inscricoes" element={<Inscricoes/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/perfil" element={<Perfil/>}></Route>
                <Route path="/rep" element={<Rep/>}></Route>
                <Route path="/republicas" element={<Republicas/>}></Route>
                <Route path="/formulario" element={<Formulario/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes