import {Link} from 'react-router-dom'
import Logo from "../assets/logo.png";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link to="/"><img src={Logo} className="logo"></img></Link>
        <h1 className="header-text">
          Luxury Residences, <span className="maldives">Maldives</span>
        </h1>
        <nav>
          <a href="/">
            <p className="nav-button">Home</p>
          </a>
          <a href="#images">
            <p className="nav-button">Images</p>
          </a>
          <a href="#about">
            <p className="nav-button">About</p>
          </a>
          <a href="#book">
            <p className="nav-button">Book</p>
          </a>
          <a href="#contact">
            <p className="nav-button">Contact</p>
          </a>
        </nav>
      </header>
    </>
  );
}
