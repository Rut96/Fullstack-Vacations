import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
           <header>
                <div className="header-content">
                    <Header />
                    <Menu />
                </div>
            </header>
            <main>
                <Routing />
            </main>
        </div>
    );
}
