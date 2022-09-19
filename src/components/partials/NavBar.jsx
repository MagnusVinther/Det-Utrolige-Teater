
import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './NavBar.module.scss'

export const NavBar = () => {
	return (
		<nav className={Styles.navContainer}>
			<ul>
				<li><NavLink to="/">Forside</NavLink></li>
				<li><NavLink to="/events">Forestillinger &amp; Events</NavLink></li>
				<li><NavLink to="/skuespillere">Skuespillere</NavLink></li>
				<li><NavLink to="/login">Login</NavLink></li>
			</ul>
		</nav>
	)
}
