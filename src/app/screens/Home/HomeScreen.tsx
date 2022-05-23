import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { productRepository } from "../../repositories";
import { Product } from "../../components";

function HomeScreen() {
  // state
  // 필터가 적용된 제품
  const [product, setProduct] = useState<{
    list: {
      brand: string;
      category_id: number;
      color: string;
      id: number;
      image: string;
      name: string;
      original_price: number;
      retailer_id: number;
      sales_price: number;
    }[];
    size: number;
  }>({ list: [], size: 0 });

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
      isOpen: boolean;
    }>;
  }>({ brand: [], color: [], category: [] });

  // 선택된 서브 카테고리 이름
  const [subCategory, setSubCategory] = useState("");

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
    setProduct({ list: product.products, size: product.total });
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
        if (!treeCategory[position].isOpen) {
          treeCategory[position].isOpen = false;
        }
        if (!treeCategory[position].children) {
          treeCategory[position].children = [];
        }
        treeCategory[position].children.push(category[i]);
      }
    }

    setFilter({ brand, color, category: treeCategory });
  };

  // 선택한 필터 업데이트.
  const handleClickFilter = (
    e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = e.currentTarget;
    if (target.tagName === "BUTTON") {
      if (target.id === "categoryId") {
        setSubCategory("");
      }
      setClickedFilterData({
        ...clickedFilterData,
        [target.id]: "",
      });
      handleProductData({
        ...clickedFilterData,
        [target.id]: "",
      });
    } else {
      // NOTE: 선택한 서브 카테고리에 이름을 넣어야되는데 못 넣음.
      // 이름 대신 아이디를 넣음. 이름으로 바꿔야 함.
      if (target.className === "categoryId") {
        setSubCategory(target.id);
      }
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
    }
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
                    isOpen: boolean;
                  },
                  idx
                ) => {
                  return (
                    <li
                      key={idx}
                      className="subCategory"
                      onClick={(event) => {
                        if (event.target === event.currentTarget) {
                          let newCateroy = filter.category.map((c) => {
                            if (c.name === item.name) {
                              return { ...c, isOpen: c.isOpen ? false : true };
                            } else {
                              return c;
                            }
                          });
                          setFilter({
                            ...filter,
                            category: newCateroy,
                          });
                        }
                      }}
                    >
                      {item.name}
                      {item.isOpen && (
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
                      )}
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
        <CategoryBox>
          <div>
            {`선택한 카테고리: ${subCategory ? subCategory : "없음!"}`}
            <DeleteButton id="categoryId" onClick={handleClickFilter}>
              삭제
            </DeleteButton>
          </div>
          <div>
            {`선택한 브랜드: ${
              clickedFilterData.brand ? clickedFilterData.brand : "없음!"
            }`}
            <DeleteButton id="brand" onClick={handleClickFilter}>
              삭제
            </DeleteButton>
          </div>
          <div>
            {`선택한 색: ${
              clickedFilterData.color ? clickedFilterData.color : "없음!"
            }`}
            <DeleteButton id="color" onClick={handleClickFilter}>
              삭제
            </DeleteButton>
          </div>
        </CategoryBox>
        <ProductContainer>
          {product.list.map((item) => {
            return <Product key={item.id} {...item} />;
          })}
        </ProductContainer>
        <div>
          <div></div>
        </div>
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

const DeleteButton = styled.button`
  margin-left: 10px;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
`;

export { HomeScreen };
