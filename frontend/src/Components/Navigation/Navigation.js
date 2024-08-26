import React, { useEffect } from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { signout } from "../../utils/icons";
import { menuItems } from "../../utils/menuItems";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";

function Navigation({ active, setActive, isNavOpen, handleMenuToggle }) {
  const navigate = useNavigate();
  const { setIsAuthenticated, getUserDetails, userDetails } = useGlobalContext();

  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <NavStyled isNavOpen={isNavOpen}>
      <div className="user-con">
        <img src={avatar} alt="User Avatar" />
        <div className="text">
          <h2>
            <span>{userDetails?.firstName}</span>
            <br />
            <span>{userDetails?.lastName}</span>
          </h2>
          <p>{userDetails?.email}</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.id} className={active === item.id ? "active" : ""} onClick={() => setActive(item.id)}>
            <Link to={item.link}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="bottom-nav">
        <li onClick={handleSignOut}>{signout} Sign Out</li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 92%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isNavOpen }) => (isNavOpen ? "translateX(0)" : "translateX(-100%)")};
  z-index: 5;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    li {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: rgba(34, 34, 96, 0.6);
      transition: all 0.4s ease-in-out;
      i {
        margin-right: 1rem;
      }
      &:hover {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  @media (min-width: 769px) {
    .user-con img {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 768px) {
    .user-con img {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 500px) {
    width: 100%;
  }

  @media (max-width: 1500px) {
    height: 100%;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
  }
`;

export default Navigation;
