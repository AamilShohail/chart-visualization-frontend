import Styled from "styled-components";

export const Wrapper = Styled.div`
    margin: 10px;
`;

export const Content = Styled.div`
    width:250px;
    height:100px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border-radius:3px;
    background-image: linear-gradient(306deg,${(props) =>
      props.colors[0]} 0%, ${(props) => props.colors[1]} 100%);
    color:var(--white);
    transition:all 0.4s;

    h1{
      font-size:15px;
      color: var(--white);
    }

    p{
      font-size:10px;
    }

    :hover{
      transform:scale(1.05);
      cursor: pointer;
    }
`;
