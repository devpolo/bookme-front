import styled from "styled-components"

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  /* .container {
  }

  @media screen and (max-width: 400px) {
  }

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 992px) {
  } */
`

interface ISideProps {
  hidedOnMobile?: boolean
}

export const Side = styled.div<ISideProps>`
  width: 50%;
  /* align-items: center; */
  /* justify-content: center; */

  .container {
  }

  img {
    object-fit: cover;
    height: 100vh;
    width: 100%;
  }

  @media screen and (max-width: 400px) {
    display: ${(props) => (props.hidedOnMobile ? "none" : "flex")};
  }

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 992px) {
  }
`
