import { Row } from "antd";
import React from "react";
import { Wrapper } from "../Card/Card";
import { CardItems } from "../Card/Items";
import CardMenu from '../Card'

export default function CardItem() {
  return (
    <Wrapper>
      <Row align="middle">
        {CardItems.map((item) => (
          <CardMenu
            key={item.id}
            title={item.title}
            colors={item.colors}
            subtitle={item.subtitle}
          />
        ))}
      </Row>
    </Wrapper>
  );
}
