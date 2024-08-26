import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Incomes/Income";
import Expenses from "./Components/Expenses/Expenses";
import Investments from "./Components/Investments/Investments";
import Savings from "./Components/Savings/Savings";
import { useGlobalContext } from "./context/globalContext";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Signin from "./pages/Sign-in";
import Signup from "./pages/Sign-up";
import { FaBars } from "react-icons/fa";

function App() {
  const [active, setActive] = useState(1);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const global = useGlobalContext();
  console.log(global);

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  // Determine whether to hide the navigation and menu button based on the current route
  const hideNav = location.pathname === "/" || location.pathname === "/Sign-up";

  const handleMenuToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        {!hideNav && (
          <button className="menu-btn" onClick={handleMenuToggle}>
            <FaBars size={24} /> {/* Display the menu icon */}
          </button>
        )}
        {!hideNav && (
          <Navigation
            active={active}
            setActive={setActive}
            isNavOpen={isNavOpen}
            handleMenuToggle={handleMenuToggle}
          />
        )}
        <main className={isNavOpen ? "nav-open" : ""}>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Incomes" element={<Income />} />
            <Route path="/Expenses" element={<Expenses />} />
            <Route path="/Investments" element={<Investments />} />
            <Route path="/Savings" element={<Savings />} />
            <Route path="/" element={<Signin />} />
            <Route path="/Sign-up" element={<Signup />} />
          </Routes>
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  .menu-btn {
    display: block;
    position: absolute;
    top: 3rem;
    left: 2.8rem;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1000;
  }

  @media (min-width: 1500px) {
    main.nav-open {
      margin-left: 360px;
    }
  }

  @media (max-width: 1500px) {
    .menu-btn {
      top: 1rem;
      left: 1rem;
    }
  }

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
