// Loader.js
import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderStyled>
      <div className="spinner"></div>
    </LoaderStyled>
  );
};

const LoaderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top: 5px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
