
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../App/Auth/Auth'
import Styles from './NavBar.module.scss'

export const NavBar = () => {
	const { loginData } = useAuth()
	return (
		<nav className={Styles.navContainer}>
			<ul>
				<li><NavLink to="/">Forside</NavLink></li>
				<li><NavLink to="/events">Forestillinger &amp; Events</NavLink></li>
				<li><NavLink to="/actors">Skuespillere</NavLink></li>
				<li><NavLink to="/login">{!loginData.access_token ? 'LOGIN' : 'MIN SIDE'}</NavLink></li>
			</ul>
		</nav>
	)
}
