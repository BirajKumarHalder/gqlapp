
export interface Category {
    id: string,
    name: string,
    products: Product[]
}
export interface Product {
    id: string,
    name: string,
    description: string,
    quantity: number,
    price: number,
    image?: string,
    onSale: boolean,
    category?: Category,
    reviews?: Review[]
}
export interface Review {
    id: string,
    date: string,
    title: string,
    comment: string,
    rating: number
}
