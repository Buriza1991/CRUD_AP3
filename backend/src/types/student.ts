export type MartialArt = 'jiujitsu' | 'muaythai';

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface StudentAttributes {
  id: number;
  name: string;
  age: number;
  belt?: string;
  weight: number;
  martialArts: MartialArt[];
  phone: string;
  email: string;
  address: string; // JSON string no banco
  startDate: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentInput {
  name: string;
  age: number;
  belt?: string;
  weight: number;
  martialArts: MartialArt[];
  phone: string;
  email: string;
  address: string;
  startDate: Date;
  active: boolean;
}

export interface StudentResponse extends StudentAttributes {}

export const VALID_MARTIAL_ARTS: MartialArt[] = ['jiujitsu', 'muaythai'];
export const VALID_BELTS = ['white', 'blue', 'purple', 'brown', 'black']; 