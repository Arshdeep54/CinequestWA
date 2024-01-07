import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CircleUser, Menu, X } from 'lucide-react';
import '../cssFiles/Navbar.css';
export default class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      menuOpen: false,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  handleMenuClick() {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen,
    }));
  }
  render() {
    return (
      <nav>
        <Link to='/' className='title'>
          CineQuest
        </Link>
        <div
          className={this.state.menuOpen ? 'menu open' : 'menu close'}
          onClick={this.handleMenuClick}
        >
          {this.state.menuOpen ? <X /> : <Menu />}
        </div>
        <ul className={this.state.menuOpen ? 'open' : 'close'}>
          <li>
            <NavLink to='/'>Movies</NavLink>
          </li>
          <li>
            <NavLink to='/about'>About</NavLink>
          </li>

          <li>
            <NavLink to='/contact'>Contact</NavLink>
          </li>
        </ul>
        {localStorage.getItem('access') ? (
          <NavLink
            className={
              this.state.menuOpen ? 'profileIcon open' : 'profileIcon close'
            }
            to='/auth/profile'
          >
            <CircleUser color='#F4FAFF' />
          </NavLink>
        ) : (
          <NavLink className='login' to='/auth/login'>
            log in
          </NavLink>
        )}
      </nav>
    );
  }
}
