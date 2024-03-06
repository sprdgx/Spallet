import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Web from './web.js';


function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="content">
      
      <img src='https://raw.githubusercontent.com/sprdgx/SprD/main/PROJECTS/SPALLET.png' alt="logo" className="frontPageLogo" />
      <h2> Hey There 👋 </h2>
        <h4 className="h4"> Welcome to your Web3 Wallet</h4>
    <Web/>
        <Button
          onClick={() => navigate("/createwallet")}        
          className="frontPageButton"
          type="primary"
        >
          Create A Wallet
        </Button>
        <Button
          onClick={() => navigate("/recoverwallet")}        
          className="frontPageButton"
          type="default"
        >
          Sign In With Seed Phrase
        </Button>
        <p className="frontPageBottom">
          Find Alt Coin Gems:{" "}
          <a href="https://moralismoney.com/" target="_blank" rel="noreferrer">
            money.moralis.io
          </a>
        </p>
      </div>
    </>
  );
}

export default Home;
