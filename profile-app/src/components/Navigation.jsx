import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';

function Navigation() {

	return (
		<Navbar expand="lg">
			<Navbar.Brand href="/" className="fs-2">Profile Manager</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbar-nav" />
			<Navbar.Collapse id="navbar-nav" className="justify-content-end text-end my-3">
				<Nav>
					<NavLink className="d-inline px-2" to="/">
						Home
					</NavLink>
					<NavLink className="d-inline px-2" to="/department">
						Department
					</NavLink>
					<NavLink className="d-inline px-2" to="/employee">
						Employee
					</NavLink>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Navigation
