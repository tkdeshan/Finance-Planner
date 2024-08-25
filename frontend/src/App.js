import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation.js";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import Income from "./Components/Incomes/Income.js";
import Expenses from "./Components/Expenses/Expenses.js";
import Investments from "./Components/Investments/Investments.js";
import Savings from "./Components/Savings/Savings.js";
import { useGlobalContext } from "./context/globalContext.js";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Signin from "./pages/Sign-in.js";
import Signup from "./pages/Sign-up.js";

function App() {
  const [active, setActive] = useState(1);
  const location = useLocation();

  const global = useGlobalContext();
  console.log(global);

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const hideNav = location.pathname === '/' || location.pathname === '/Sign-up';

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        {!hideNav && <Navigation active={active} setActive={setActive} />}
        <main>
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
