import {Navbar, Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const NavBarComponent = () => {
    return (<>
        <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                    <NavLink to="/" className={"nav-link"}>
                        To-Do App
                    </NavLink>
                </Navbar.Brand>
            </Container>
        </Navbar>
    </>)
}

export default NavBarComponent