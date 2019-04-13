export interface CreateProductDTO {
  title: string;
  description: string;
  image: string;
  price: number;
  createdAt: Date;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
