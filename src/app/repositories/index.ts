import { httpClient } from "../libs/http-client";

const productRepository = {
  getBrand() {
    return httpClient.get("/brands").then((res) => {
      return res;
    });
  },
  getColor() {
    return httpClient.get("/colors").then((res) => {
      return res;
    });
  },
  getCategory() {
    return httpClient.get("/categories").then((res) => {
      return res;
    });
  },
  getProduct(params: any) {
    return httpClient.get("/products", params).then((res) => {
      return res;
    });
  },
};

export { productRepository };
