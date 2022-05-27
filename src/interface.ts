
export interface User {
    name: string;
    age: number;
    address: Address
}

export interface Address {
    zip: string;
    country: string;
    street: string;
}