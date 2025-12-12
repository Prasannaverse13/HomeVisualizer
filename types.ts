export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface Designer {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: string;
}

export enum RoomType {
  Living = "Living",
  Bedroom = "Bedroom",
  Dining = "Dining",
  Kitchen = "Kitchen",
  Office = "Office"
}

export interface DesignStyle {
  id: string;
  title: string;
  image: string;
}