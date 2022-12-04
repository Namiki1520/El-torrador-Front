export interface IProduto{
    id: number;
    description: string;
    price: number;
    expirationDate: Date;
    quantityInStock: number;
    active: boolean;
}