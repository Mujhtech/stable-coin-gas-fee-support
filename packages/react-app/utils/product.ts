export interface Product {
  index: number;
  name: string;
  creator: string;
  image: string;
  content: string;
  price: number;
  location: string;
  bought: boolean;
}

export const transformProductData = (data: any, i: number): Product => {
  return {
    index: i,
    creator: data[0],
    name: data[1],
    image: data[2],
    price: Number(data[5]),
    bought: Number(data[6]) == 1 ? true : false,
    content: data[3],
    location: data[4],
  };
};
