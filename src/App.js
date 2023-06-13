import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  border-radius: 10px;
  border: rgb(209, 222, 63) solid 1px;
  background-color: black;
  padding: 10px;
  color: rgb(209, 222, 63);
  width: 155px;
  height: 40px;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  @media (min-width: 380px) and (max-width: 540px) {
    width: 100px;
    height: 37px;
    // margin-left: 60px;
    margin-top: "12px";
    border-radius: 10px;
    border: rgb(209, 222, 63) solid 1px;
    background-color: black;
    padding: 1px;
    color: rgb(209, 222, 63);
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0px;
  }
  @media (min-width: 320px) and (max-width: 380px) {
    width: 100px;
    height: 37px;
    // margin-left: 60px;
    margin-top: "12px";
    border-radius: 10px;
    border: rgb(209, 222, 63) solid 1px;
    background-color: black;
    padding: 1px;
    color: rgb(209, 222, 63);
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0px;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  background-color: black;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #ffffff;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const Navbar = styled.div`
  display: flex;
  justify-content: left;
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;
export const StyledGifImg = styled.img`
  background-color: #111;
  width: 200px;
  @media (min-width: 250px) and (max-width: 500px) {
    width: 200px;
  }
  @media (min-width: 500px) and (max-width: 750px) {
    width: 250px;
  }
  @media (min-width: 750px) and (max-width: 1000px) {
    width: 300px;
  }
  @media (min-width: 1000px) and (max-width: 1250px) {
    width: 350px;
  }
  @media (min-width: 1250px) and (max-width: 1500px) {
    width: 350px;
  }
  @media (min-width: 1500px) and (max-width: 1750px) {
    width: 350px;
  }
  @media (min-width: 1750px) and (max-width: 2000px) {
    width: 350px;
    // margin-left: 170px;
  }
  @media (min-width: 2000px) {
    width: 350px;
    height: 350px;
    // margin-left: 200px;
  }
  transition: width 0.5s;
`;
//image background color
export const StyledImgLogo = styled.img`
  background-color: #111;
  width: 200px;
  @media (min-width: 250px) and (max-width: 500px) {
    width: 100px;
    margin-top: 15px;
  }
  @media (min-width: 500px) and (max-width: 750px) {
    width: 100px;
    margin-left: 40px;
    margin-top: 20px;
  }
  @media (min-width: 750px) and (max-width: 1000px) {
    width: 110px;
    margin-left: 60px;
    margin-top: 20px;
  }
  @media (min-width: 1000px) and (max-width: 1250px) {
    width: 120px;
    margin-left: 100px;
    margin-top: 20px;
  }
  @media (min-width: 1250px) and (max-width: 1500px) {
    width: 130px;
    margin-left: 120px;
    margin-top: 10px;
  }
  @media (min-width: 1500px) and (max-width: 1750px) {
    width: 140px;
    margin-left: 130px;
  }
  @media (min-width: 1750px) and (max-width: 2000px) {
    width: 150px;
    margin-left: 270px;
  }
  @media (min-width: 2000px) {
    width: 180px;
    margin-left: 200px;
  }
  transition: width 0.5s;
`;
export const StyledImg = styled.img`
  background-color: #111;
  width: 200px;
  @media (min-width: 250px) and (max-width: 500px) {
    width: 100px;
  }
  @media (min-width: 500px) and (max-width: 750px) {
    width: 100px;
    // margin-left: 40px;
  }
  @media (min-width: 750px) and (max-width: 1000px) {
    width: 100px;
    // margin-left: 60px;
    // margin-top: 10px;
  }
  @media (min-width: 1000px) and (max-width: 1250px) {
    width: 100px;
    // margin-left: 100px;
  }
  @media (min-width: 1250px) and (max-width: 1500px) {
    width: 100px;
    // margin-left: 120px;
  }
  @media (min-width: 1500px) and (max-width: 1750px) {
    width: 100px;
    // margin-left: 170px;
  }
  @media (min-width: 1750px) and (max-width: 2000px) {
    width: 150px;
    // margin-left: 170px;
  }
  @media (min-width: 2000px) {
    width: 180px;
    margin-left: 200px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  useEffect(() => {
    if (blockchain.account) {
      navigate("/mint");
    }
  }, [blockchain]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        // Here you can change the backgound image and color.
        style={{ backgroundColor: "#000" }}
        // image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.jpg" : null}
      >
        <Navbar
          style={{
            backgroundColor: "#111",
            width: "100%",
            height: "100px",
            borderBottom: "3px solid #d1de3f",
          }}
        >
          <a href="/">
            <StyledImgLogo alt={"logo"} src={"/config/images/newlogo.png"} />
          </a>
          <s.SpacerLarge className="space" />
          <div className="aaa">
            {/* <div style={{marginTop: "2%", marginLeft: "6%"}}> */}
            <a
              target="_blank"
              class="logo-icons"
              style={{ color: "#d1de3f" }}
              href="https://discord.gg/pxmayc"
            >
              <svg
                className="icon"
                viewBox="0 0 71 55"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)" fill="currentColor">
                  <path
                    d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="71" height="55"></rect>
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              target="_blank"
              class="logo-icons"
              style={{ marginLeft: "15px", color: "#d1de3f" }}
              href="https://opensea.io/collection/pxmayc"
            >
              <svg
                className="icon"
                viewBox="0 0 90 90"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.328 38.448 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.398 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.299 37.134 52.029C37.206 51.921 37.278 51.813 37.368 51.687C37.971 50.823 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.463C40.959 31.203 40.545 29.97 40.095 28.818C39.933 28.359 39.753 27.918 39.564 27.486C39.294 26.82 39.015 26.217 38.763 25.65C38.628 25.389 38.52 25.155 38.412 24.912C38.286 24.642 38.16 24.372 38.025 24.111C37.935 23.913 37.827 23.724 37.755 23.544L36.963 22.086C36.855 21.888 37.035 21.645 37.251 21.708L42.201 23.049H42.219C42.228 23.049 42.228 23.049 42.237 23.049L42.885 23.238L43.605 23.436L43.866 23.508V20.574C43.866 19.152 45 18 46.413 18C47.115 18 47.754 18.288 48.204 18.756C48.663 19.224 48.951 19.863 48.951 20.574V24.939L49.482 25.083C49.518 25.101 49.563 25.119 49.599 25.146C49.725 25.236 49.914 25.38 50.148 25.56C50.337 25.704 50.535 25.884 50.769 26.073C51.246 26.46 51.822 26.955 52.443 27.522C52.605 27.666 52.767 27.81 52.92 27.963C53.721 28.71 54.621 29.583 55.485 30.555C55.728 30.834 55.962 31.104 56.205 31.401C56.439 31.698 56.7 31.986 56.916 32.274C57.213 32.661 57.519 33.066 57.798 33.489C57.924 33.687 58.077 33.894 58.194 34.092C58.554 34.623 58.86 35.172 59.157 35.721C59.283 35.973 59.409 36.252 59.517 36.522C59.85 37.26 60.111 38.007 60.273 38.763C60.327 38.925 60.363 39.096 60.381 39.258V39.294C60.435 39.51 60.453 39.744 60.471 39.987C60.543 40.752 60.507 41.526 60.345 42.3C60.273 42.624 60.183 42.93 60.075 43.263C59.958 43.578 59.85 43.902 59.706 44.217C59.427 44.856 59.103 45.504 58.716 46.098C58.59 46.323 58.437 46.557 58.293 46.782C58.131 47.016 57.96 47.241 57.816 47.457C57.609 47.736 57.393 48.024 57.168 48.285C56.97 48.555 56.772 48.825 56.547 49.068C56.241 49.437 55.944 49.779 55.629 50.112C55.449 50.328 55.251 50.553 55.044 50.751C54.846 50.976 54.639 51.174 54.459 51.354C54.144 51.669 53.892 51.903 53.676 52.11L53.163 52.569C53.091 52.641 52.992 52.677 52.893 52.677H48.951V57.726H53.91C55.017 57.726 56.07 57.339 56.925 56.61C57.213 56.358 58.482 55.26 59.985 53.604C60.039 53.541 60.102 53.505 60.174 53.487L73.863 49.527C74.124 49.455 74.376 49.644 74.376 49.914V52.812V52.812Z"></path>
              </svg>
            </a>
            <a
              target="_blank"
              class="logo-icons"
              style={{ marginLeft: "15px", color: "#d1de3f" }}
              href="https://twitter.com/pxMAYC"
            >
              <svg
                className="icon"
                fill="currentColor"
                version="1.1"
                id="Logo"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 248 204"
              >
                <g id="Logo_1_">
                  <path d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04 C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66 c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64 c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76 c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26 c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z"></path>
                </g>
              </svg>
            </a>
          </div>

          <s.ButtonPart style={{ marginLeft: "25px" }}>
            {blockchain.account === "" || blockchain.smartContract === null ? (
              <s.Container ai={"center"} jc={"center"}>
                <StyledButton
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                    getData();
                  }}
                >
                  Connect Wallet
                </StyledButton>
                {blockchain.errorMsg !== "" ? (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {blockchain.errorMsg}
                    </s.TextDescription>
                  </>
                ) : null}
              </s.Container>
            ) : (
              <>
                <s.TextDescription>{feedback}</s.TextDescription>
                <s.SpacerMedium />
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                  <StyledRoundButton
                    style={{ lineHeight: 0.4 }}
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      decrementMintAmount();
                    }}
                  >
                    -
                  </StyledRoundButton>
                  <s.SpacerMedium />
                  <s.TextDescription>{mintAmount}</s.TextDescription>
                  <s.SpacerMedium />
                  <StyledRoundButton
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      incrementMintAmount();
                    }}
                  >
                    +
                  </StyledRoundButton>
                </s.Container>
                <s.SpacerSmall />
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                  <StyledButton
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      claimNFTs();
                      getData();
                    }}
                  >
                    {claimingNft ? "BUSY" : "BUY"}
                  </StyledButton>
                </s.Container>
              </>
            )}
          </s.ButtonPart>
        </Navbar>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "155px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              alignItems: "flex-start",
              color: "#fff",
              marginRight: "60px",
              marginLeft: "30px",
            }}
          >
            <s.TextDescLarge
              style={{ letterSpacing: "1px", textAlign: "center" }}
            >
              6666 PXMAYC
            </s.TextDescLarge>
            <s.TextDescMiddle
              style={{ letterSpacing: "1px", textAlign: "center" }}
            >
              Ready to be unleashed
            </s.TextDescMiddle>
            <s.TextDescSmall
              style={{ letterSpacing: "1px", textAlign: "center" }}
            >
              Pixel Mutant Apes have escaped the lab.
              <br /> Get ready, stealth launch is inbound!
            </s.TextDescSmall>
            <s.MintButton>
              <Link
                style={{
                  width: "230px",
                  color: "rgb(209, 222, 63)",
                  backgroundColor: "#000",
                  padding: "10px 25px",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "35px",
                  border: "3px solid #d1de3f",
                  borderRadius: "10px",
                  letterSpacing: "3px",
                  margin: "auto",
                }}
                to="/mint"
              >
                Mint
              </Link>
            </s.MintButton>
            <s.MintButton>
              <Link
                style={{
                  width: "230px",
                  color: "rgb(209, 222, 63)",
                  backgroundColor: "#000",
                  padding: "10px 25px",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "35px",
                  border: "3px solid #d1de3f",
                  borderRadius: "10px",
                  letterSpacing: "3px",
                  margin: "auto",
                }}
                to="/"
              >
                Stake
              </Link>
            </s.MintButton>
          </div>

          <div>
            <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
              <s.ShadowDiv
                flex={2}
                jc={"center"}
                ai={"center"}
                style={{
                  backgroundColor: "#000",
                  padding: "0px",
                  position: "relative",
                  paddingTop: "300px",
                  width: "350px",
                  height: "350px",
                  overflow: "hidden",
                  marginTop: "-10px",
                }}
              >
                <s.Container
                  flex={1}
                  jc={"center"}
                  ai={"center"}
                  style={{
                    position: "absolute",
                    top: "0",
                  }}
                >
                  <StyledGifImg
                    alt={"example"}
                    src={"/config/images/gif.gif"}
                    // style={{
                    //   width: "350px",
                    //   height: "350px",
                    // }}
                  />
                </s.Container>
              </s.ShadowDiv>
            </ResponsiveWrapper>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "155px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
              <s.ShadowDiv
                flex={2}
                jc={"center"}
                ai={"center"}
                style={{
                  backgroundColor: "#122858",
                  padding: "0px",
                  position: "relative",
                  paddingTop: "285px",
                  width: "200px",
                  height: "285px",
                  overflow: "hidden",
                  marginTop: "20px",
                }}
              >
                <s.Container
                  flex={1}
                  jc={"center"}
                  ai={"center"}
                  style={{
                    position: "absolute",
                    top: "0",
                  }}
                >
                  <StyledImg
                    alt={"example"}
                    src={"/config/images/middlelogo.png"}
                    style={{
                      width: "200px",
                      height: "285px",
                      backgroundColor: "rgb(0,0,0)",
                    }}
                  />
                </s.Container>
              </s.ShadowDiv>
            </ResponsiveWrapper>
          </div>

          <div
            style={{
              alignItems: "flex-start",
              color: "#fff",
              flexDirection: "column",
              marginRight: "60px",
              marginLeft: "30px",
            }}
          >
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                fontSize: "3rem",
                textAlign: "center",
              }}
            >
              What is PxMayc?
            </s.TextDescLarge>
            <s.TextDescSmall
              style={{ letterSpacing: "1px", textAlign: "center" }}
            >
              pxMAYC is a collection of 6666 unique and randomly generated
              <br /> Pixelated Mutant Apes, Our Vision is to create a welcoming
              and tight <br /> knit community for those within the NFT Space who
              cannot obtain <br /> Mutant Apes, but want to feel the inclusivity
              that the MAYC
              <br /> community offers
              <br />
              Our plan is to dedicate 100% of our royalties into purchasing MAYC{" "}
              <br /> and fractionalizing them. In doing so we will provide the
              foundation <br /> for the pxMAYC DAO where all holders will have a
              vote deciding the <br /> future of pxMAYC. We are not affiliated
              with Bored Ape Yacht Club, but pxMAYC is a <br /> derivative of
              their Mutant Ape Yacht Club Collection.
              <br />
              Commercial ownership rights are given to each unique pxMAYC NFT
              you <br /> own.
            </s.TextDescSmall>
          </div>
        </div>

        <div style={{ marginTop: " 150px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                color: "white",
                justifyContent: "center",
              }}
            >
              ROADMAP
            </s.TextDescLarge>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                fontSize: "3rem",
                display: "flex",
                marginTop: "70px",
              }}
            >
              Phase 1
            </s.TextDescLarge>
            <StyledImg
              alt={"example"}
              src={"/config/images/save.gif"}
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "rgb(0,0,0)",
                marginTop: "50px ",
                marginLeft: "10px",
                display: "flex",
              }}
            />
          </div>
          <div>
            <s.TextDescSmall>
              <div style={{ textAlign: "center" }}>
                -WEBSITE LIVE, STEALTH LAUNCH, MINTING LIVE.
              </div>
              <div style={{ textAlign: "center" }}>
                -EXCLUSIVE HOLDER RAFFLES AND GIVEAWAYS
              </div>
              <div style={{ textAlign: "center" }}>
                -COMMUNITY OUTREACH TO GROW PXMAYC COMMUNITY
              </div>
            </s.TextDescSmall>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                fontSize: "3rem",
                display: "flex",
                marginTop: "180px",
              }}
            >
              Phase 2
            </s.TextDescLarge>
          </div>
          <div>
            <s.TextDescSmall>
              <div style={{ textAlign: "center" }}>
                -LAUNCH OF $SERUM TOKEN
                <br />
              </div>
              <div style={{ textAlign: "center" }}>
                -WE'LL BE PUTTING A PERCENT OF MINT INTO THE COMMUNITY WALLET
                <br />
              </div>
              <div style={{ textAlign: "center" }}>
                -100% OF PXMAYC ROYALTIES TO PURCHASE AND FRACTIONALIZE MAYC
                <br />
              </div>
              <div style={{ textAlign: "center" }}>
                PXMAYC DAO WHERE HOLDERS WILL BE ABLE TO GOVERN AND VOTE ON THE
                FUTURE OF PXMAYC
              </div>
            </s.TextDescSmall>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                fontSize: "3rem",
                display: "flex",
                marginTop: "190px",
              }}
            >
              Phase 3
            </s.TextDescLarge>
          </div>
          <div>
            <s.TextDescSmall>
              <div style={{ textAlign: "center" }}>
                -BURN $SERUM TO CREATE SOMETHING THAT MIGHT “HEAL” YOUR PXMAYC
                <br />
              </div>
              <div style={{ textAlign: "center" }}>-TBA</div>
            </s.TextDescSmall>
          </div>
        </div>

        <div style={{ marginTop: " 150px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                color: "white",
                justifyContent: "center",
                marginTop: "-70px",
              }}
            >
              FAQ
            </s.TextDescLarge>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                fontSize: "3rem",
                display: "flex",
                marginTop: "40px",
              }}
            >
              Official Launch
            </s.TextDescLarge>
          </div>
          <div>
            <s.TextDescSmall style={{ textAlign: "center" }}>
              January Stealth Mint
            </s.TextDescSmall>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                fontSize: "3rem",
                display: "flex",
                marginTop: "20px",
              }}
            >
              Mint Price
            </s.TextDescLarge>
          </div>
          <div>
            <s.TextDescSmall style={{ textAlign: "center" }}>
              First 1000 free, then each PXMAYC is .01 ETH
            </s.TextDescSmall>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                fontSize: "3rem",
                display: "flex",
                marginTop: "20px",
              }}
            >
              Total Supply
            </s.TextDescLarge>
          </div>
          <div>
            <s.TextDescSmall style={{ textAlign: "center" }}>
              6666
            </s.TextDescSmall>
          </div>
          <div>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                fontSize: "3rem",
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              How many can I mint?
            </s.TextDescLarge>
          </div>
          <div>
            <s.TextDescSmall style={{ textAlign: "center" }}>
              10 per tx
            </s.TextDescSmall>
          </div>
          <div>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                fontSize: "3rem",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Reveal?
            </s.TextDescLarge>
          </div>
          <div>
            <s.TextDescSmall style={{ textAlign: "center" }}>
              All pxMAYC will be revealed 24 hours after mint sells out
            </s.TextDescSmall>
          </div>
        </div>

        <div style={{ marginTop: " 150px" }}>
          <div>
            <s.TextDescLarge
              style={{
                letterSpacing: "1px",
                color: "white",
                textAlign: "center",
              }}
            >
              Meet The Team
            </s.TextDescLarge>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "50px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <StyledImg
                alt={"example"}
                src={"/config/images/team1.png"}
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: "rgb(0,0,0)",
                  display: "block",
                }}
              />
              <p
                style={{
                  display: "block",
                  color: "rgb(209, 222, 63)",
                  fontSize: "1.4rem",
                  display: "flex",
                  marginTop: "0.4rem",
                  justifyContent: "center",
                }}
              >
                pxDex
              </p>
              <p
                style={{
                  display: "block",
                  color: "white",
                  display: "flex",
                  fontSize: "1.1rem",
                  justifyContent: "center",
                }}
              >
                Founder
              </p>
            </div>
            <s.SpacerLarge />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <StyledImg
                alt={"example"}
                src={"/config/images/team2.png"}
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: "rgb(0,0,0)",
                  display: "flex",
                }}
              />
              <p
                style={{
                  display: "block",
                  color: "rgb(209, 222, 63)",
                  fontSize: "1.4rem",
                  display: "flex",
                  marginTop: "0.4rem",
                  justifyContent: "center",
                }}
              >
                pxSouls
              </p>
              <p
                style={{
                  display: "block",
                  color: "white",
                  display: "flex",
                  fontSize: "1.1rem",
                  justifyContent: "center",
                }}
              >
                Artist
              </p>
            </div>
            <s.SpacerLarge />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <StyledImg
                alt={"example"}
                src={"/config/images/team3.png"}
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: "rgb(0,0,0)",
                  display: "flex",
                }}
              />
              <p
                style={{
                  display: "block",
                  color: "rgb(209, 222, 63)",
                  fontSize: "1.4rem",
                  display: "flex",
                  marginTop: "0.4rem",
                  justifyContent: "center",
                }}
              >
                pxConcord
              </p>
              <p
                style={{
                  display: "block",
                  color: "white",
                  display: "flex",
                  fontSize: "1.1rem",
                  justifyContent: "center",
                }}
              >
                Dev
              </p>
            </div>
          </div>
        </div>
        <s.SpacerLarge />
      </s.Container>
    </s.Screen>
  );
}

export default App;
