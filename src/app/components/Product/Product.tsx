import React from "react";
import styled from "styled-components";
import { Image } from "../Image";

function Product(props: {
  id: number;
  name: string;
  image: string;
  category_id: number;
  brand: string;
  color: string;
  original_price: number;
  sales_price: number;
  retailer_id: number;
}) {
  const { id, image, brand, name, original_price, sales_price } = props;

  return (
    <Container key={id}>
      <Image src={image} alt={name} />
      <StyledSpan>{brand}</StyledSpan>
      <StyledSpan>{name}</StyledSpan>
      <StyledSpan>{original_price}</StyledSpan>
      <StyledSpan>{sales_price}</StyledSpan>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledSpan = styled.span`
  text-align: center;
`;

export { Product };
