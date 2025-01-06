import { RowDataPacket } from "mysql2/index";
import { IComment, IProduct } from "@Shared/types";


export interface ICommentEntity extends RowDataPacket {
    comment_id: string;
    name: string;
    email: string;
    body: string;
    product_Id: string;
}

export type CommentCreatePayload = Omit<IComment, "id">;

export interface IProductEntity extends IProduct, RowDataPacket {
    product_id: string;
}

export interface IProductSearchFilter {
    title?: string;
    description?: string;
    priceFrom?: number;
    priceTo?: number;
}

export type ProductCreatePayload = Omit<IProduct, "id" | "comments">;