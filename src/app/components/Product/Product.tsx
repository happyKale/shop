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
  const { image, brand, name, original_price, sales_price } = props;

  let discount_rate = 0;
  if (original_price !== 0) {
    discount_rate =
      Math.round((100 - (100 * sales_price) / original_price) * 100) / 100;
  }

  return (
    <Container>
      <Image src={image} alt={name} margin="0 0 20px 0" />
      <StyledSpan>브랜드: {brand}</StyledSpan>
      <StyledSpan>상품명: {name}</StyledSpan>
      <StyledSpan>판매가: {sales_price}</StyledSpan>
      <StyledSpan>할인율: {discount_rate}%</StyledSpan>
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
  font-size: 12px;
  text-align: center;
`;

export { Product };
