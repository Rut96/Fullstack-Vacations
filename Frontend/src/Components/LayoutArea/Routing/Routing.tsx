import { Navigate, Route, Routes } from "react-router-dom";
import { AddVacation } from "../../DataArea/AddVacation/AddVacation";
import { List } from "../../DataArea/List/List";
import { About } from "../../PagesArea/About/About";
import { Home } from "../../PagesArea/Home/Home";
import { Reviews } from "../../PagesArea/Reviews/Reviews";
import { Login } from "../../UserArea/Login/Login";
import { Register } from "../../UserArea/Register/Register";
import { Page404 } from "../Page404/Page404";
import "./Routing.css";
import { EditVacation } from "../../DataArea/EditVacation/EditVacation";
import { VacationsReport } from "../../PagesArea/VacationsReport/VacationsReport";

export function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />

                <Route path="/home" element={<Home />} />

                <Route path="/about" element={<About />} />

                <Route path="/list" element={<List />} />
                
                <Route path="/add-vacation" element={<AddVacation />} />

                <Route path="/edit-vacation/:vacationId" element={<EditVacation />} />
                
                <Route path="/reviews" element={<Reviews />} />

                <Route path="/report" element={<VacationsReport />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
