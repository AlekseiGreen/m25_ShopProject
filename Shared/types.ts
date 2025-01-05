import { RowDataPacket } from "mysql2/index";


export interface IComment{
    id: string;
    name: string;
    email: string;
    body: string;
    productId: string;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    comments?: IComment[];
}
