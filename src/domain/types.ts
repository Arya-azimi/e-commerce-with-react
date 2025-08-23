type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  slug: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
};

type User = {
  username: string;
  token: string;
  userId: string;
};

type AuthResult = {
  username: string;
  token: string;
  userId: string;
};

type CartItem = Product & {
  quantity: number;
};

export type { Product, User, AuthResult, CartItem };
