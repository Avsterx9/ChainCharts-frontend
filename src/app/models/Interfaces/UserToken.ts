export interface UserTokenLite{
    tokenId: string;
    quantity: number;
}

export interface UserToken{
    tokenId: string;
    quantity: number;
    image: string;
    price: number;
    name: string;
    symbol: string;
}