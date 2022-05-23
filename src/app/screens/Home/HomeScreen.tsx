import React, { useEffect, useState } from "react";
import { productRepository } from "../../repositories";

function HomeScreen() {
  // state
  const [data, setData] = useState<{
    brand: Array<{ name: string }>;
    color: Array<{ name: string }>;
    category: Array<{ name: string; id: number; parent_id: null }>;
  }>({ brand: [], color: [], category: [] });

  // effect
  useEffect(() => {
    handleGetData();
  }, []);

  // handler
  const handleGetData = async () => {
    const brand = await productRepository.getBrand().then((res: any) => {
      return res.data;
    });
    const color = await productRepository
      .getColor()
      .then((res: any) => res.data);
    const category = await productRepository
      .getCategory()
      .then((res: any) => res.data);
    setData({ brand, color, category });
  };

  return (
    <div>
      홈
      <div>
        <div>
          브랜드
          {data.brand.map((item: { name: string }, idx) => {
            return <div key={idx}>{item.name}</div>;
          })}
        </div>
        <div>
          색
          {data.color.map((item: { name: string }, idx) => {
            return <div key={idx}>{item.name}</div>;
          })}
        </div>
        <div>
          카테고리
          {data.category.map(
            (item: { name: string; id: number; parent_id: null }, idx) => {
              return <div key={idx}>{item.name}</div>;
            }
          )}
        </div>
      </div>
    </div>
  );
}

export { HomeScreen };
