import { RowDataPacket } from "mysql2/index";
import { IComment, IProduct, IProductFilterPayload, IAuthRequisites } from "@Shared/types";


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

export interface IProductSearchFilter extends IProductFilterPayload {}

export type ProductCreatePayload = Omit<IProduct, "id" | "comments">;

export interface IProductImageEntity extends RowDataPacket {
    image_id: string;
    url: string;
    product_id: string;
    main: number;
}

export interface IUserRequisitesEntity extends IAuthRequisites, RowDataPacket {
    id: number;
} 