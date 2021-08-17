import { Content, Wrapper } from "./Card";

const CardMenu = ({ title, subtitle, colors }) => {
    return (
      <Wrapper>
        <Content colors={colors}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </Content>
      </Wrapper>
    );
  };
  
  export default CardMenu;
  