export interface Product {
  id: number;
  name: string;
  small_description: string;
  description: string;
  price: number;
  weight: string;
  tag?: string | null;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Pavê Supremo de Chocolate',
    small_description: 'Isso é uma pequena descrição',
    description:
      'Camadas generosas de creme belga, biscoito champanhe umedecido e ganache meio amargo.',
    price: 79.9,
    weight: '1,2kg',
    tag: 'Mais Vendido',
    image:
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Panetone Trufado com Frutas',
    small_description: 'Isso é uma pequena descrição',
    description:
      'Massa de fermentação natural recheada com trufa de chocolate branco, nozes e frutas cristalizadas.',
    price: 89.9,
    weight: '950g',
    tag: 'Edição Limitada',
    image:
      'https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Bolo Veludo Vermelho de Festas',
    small_description: 'Isso é uma pequena descrição',
    description:
      'Massa aveludada Red Velvet com recheio cremoso de cream cheese e cobertura de frutas vermelhas.',
    price: 99.9,
    weight: '1,5kg',
    tag: 'Especial Ceia',
    image:
      'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80',
  },
];

export const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });