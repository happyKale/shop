import React from "react";
import styled from "styled-components";

function Image(props: {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  margin?: string;
}) {
  const { src } = props;

  return <StyledImg {...props} src={src} />;
}

Image.defaultProps = {
  width: "150px",
  height: "150px",
};

const StyledImg = styled.img<{
  width?: string;
  height?: string;
  margin?: string;
}>`
  ${(props) => (props.width ? `width: ${props.width}` : "")};
  ${(props) => (props.height ? `height: ${props.height}` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
`;

export { Image };
