import IProduct from "./IProduct";

export default interface ICategory {
  id: number;
  code: string;
  description: string;
  products: IProduct[];
}
