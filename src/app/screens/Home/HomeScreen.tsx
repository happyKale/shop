import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { productRepository } from "../../repositories";
import { Product } from "../../components";

function HomeScreen() {
  // state
  // 필터가 적용된 제품
  const [product, setProduct] = useState<
    {
      brand: string;
      category_id: number;
      color: string;
      id: number;
      image: string;
      name: string;
      original_price: number;
      retailer_id: number;
      sales_price: number;
    }[]
  >([]);

  // 선택된 필터
  const [clickedFilterData, setClickedFilterData] = useState<{
    color?: string;
    categoryId?: number;
    brand?: string;
    page?: number;
    maxPrice?: number;
    minPrice?: number;
  }>({});

  // 필터의 닫힘, 열림
  const [isFilterOpen, setIsFilterOpen] = useState<{
    brand: boolean;
    color: boolean;
    category: boolean;
  }>({
    brand: false,
    color: false,
    category: false,
  });

  // 필터
  const [filter, setFilter] = useState<{
    brand: Array<{ name: string }>;
    color: Array<{ name: string }>;
    category: Array<{
      name: string;
      id: number;
      parent_id: number | null;
      children: Array<{ name: string; id: number; parent_id: number | null }>;
    }>;
  }>({ brand: [], color: [], category: [] });

  // effect
  useEffect(() => {
    handleFilterData();
    handleProductData({ ...clickedFilterData });
  }, []);

  // handler
  // 선택된 필터를 적용해서 제품 정보를 업데이트.
  const handleProductData = async (filterData: {
    color?: string;
    categoryId?: number;
    brand?: string;
    page?: number;
    maxPrice?: number;
    minPrice?: number;
  }) => {
    const product = await productRepository
      .getProduct({ ...filterData })
      .then((res: any) => res.data);

    setProduct(product.products);
  };

  // 필터의 열림, 닫힘을 제어.
  const handleFilterOpen = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLLIElement>
  ) => {
    type name = "brand" | "color" | "category" | "";
    let type: name = "";

    if (e.currentTarget.id === "brand") {
      type = "brand";
    } else if (e.currentTarget.id === "color") {
      type = "color";
    } else {
      type = "category";
    }

    setIsFilterOpen({
      ...isFilterOpen,
      [type]: isFilterOpen[type] ? false : true,
    });
  };

  // 필터 목록을 가져옴.
  const handleFilterData = async () => {
    const brand = await productRepository.getBrand().then((res: any) => {
      return res.data;
    });
    const color = await productRepository
      .getColor()
      .then((res: any) => res.data);
    const category = await productRepository
      .getCategory()
      .then((res: any) => res.data);

    let treeCategory = category.filter(
      (item: { name: string; id: number; parent_id: number | null }) =>
        item.parent_id === null
    );

    for (let i = 0; i < category.length; i++) {
      if (category[i].parent_id !== null) {
        let position = treeCategory.findIndex(
          (element: any) => element.id === category[i].parent_id
        );
        if (!treeCategory[position].children) {
          treeCategory[position].children = [];
        }
        treeCategory[position].children.push(category[i]);
      }
    }

    setFilter({ brand, color, category: treeCategory });
  };

  // 선택한 필터 업데이트.
  const handleClickFilter = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    setClickedFilterData({
      ...clickedFilterData,
      [target.className]:
        target.className === "categoryId"
          ? Number(target.id)
          : target.textContent,
    });

    handleProductData({
      ...clickedFilterData,
      [target.className]:
        target.className === "categoryId"
          ? Number(target.id)
          : target.textContent,
    });
  };

  return (
    <Container>
      <div>
        <FilterBox>
          <StyledFilterName id="category" onClick={handleFilterOpen}>
            {isFilterOpen.category ? "CATEGORIES ▼" : "CATEGORIES ▲"}
          </StyledFilterName>
          <StyledUl>
            {isFilterOpen.category &&
              filter.category.map(
                (
                  item: {
                    name: string;
                    id: number;
                    parent_id: number | null;
                    children: Array<{
                      name: string;
                      id: number;
                      parent_id: number | null;
                    }>;
                  },
                  idx
                ) => {
                  return (
                    <li key={idx}>
                      {item.name}
                      <StyledUl>
                        {item.children.map((element, idx) => {
                          return (
                            <li
                              key={idx}
                              onClick={handleClickFilter}
                              className="categoryId"
                              id={`${element.id}`}
                            >
                              {element.name}
                            </li>
                          );
                        })}
                      </StyledUl>
                    </li>
                  );
                }
              )}
          </StyledUl>
        </FilterBox>
        <FilterBox>
          <StyledFilterName id="brand" onClick={handleFilterOpen}>
            {isFilterOpen.brand ? "BRANDS ▼" : "BRANDS ▲"}
          </StyledFilterName>
          <StyledUl>
            {isFilterOpen.brand &&
              filter.brand.map((item: { name: string }, idx) => {
                return (
                  <li key={idx} onClick={handleClickFilter} className="brand">
                    {item.name}
                  </li>
                );
              })}
          </StyledUl>
        </FilterBox>
      </div>
      <div>
        <div>가격 맞추기</div>
        <ProductContainer>
          {product.map((item) => {
            return <Product key={item.id} {...item} />;
          })}
        </ProductContainer>
        <div>페이지 네이션</div>
      </div>
      <FilterBox>
        <StyledFilterName id="color" onClick={handleFilterOpen}>
          {isFilterOpen.color ? "COLORS ▼" : "COLORS ▲"}
        </StyledFilterName>
        <StyledUl>
          {isFilterOpen.color &&
            filter.color.map((item: { name: string }, idx) => {
              return (
                <li key={idx} onClick={handleClickFilter} className="color">
                  {item.name}
                </li>
              );
            })}
        </StyledUl>
      </FilterBox>
    </Container>
  );
}

const FilterBox = styled.div`
  width: 150px;
  margin-bottom: 20px;
`;

const StyledFilterName = styled.div`
  &:hover {
    cursor: pointer;
  }
  border-bottom: 1px solid black;
  margin-bottom: 5px;
`;

const StyledUl = styled.ul`
  & > li {
    margin-bottom: 5px;
    cursor: pointer;
  }
  margin: 0;
  padding: 0;
  width: 130px;
  list-style-type: none;
  padding: 0 0 0 15px;
`;

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 200px minmax(800px, auto) 200px;
  justify-items: center;
`;

const ProductContainer = styled.div`
  & div {
    border: 1px solid black;
  }
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 300px);
`;

export { HomeScreen };
