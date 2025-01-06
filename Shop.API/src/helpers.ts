import { IComment, IProduct } from "@Shared/types";
import { CommentCreatePayload, ICommentEntity, IProductSearchFilter } from "../types";
import { mapCommentEntity } from "./services/mapping";


type CommentValidator = (comment: CommentCreatePayload) => string | null;

/**
 * решение задания 34.5.2 – реализовать функцию validateComment
 */
export const validateComment: CommentValidator = (comment) => {
  if (!comment || !Object.keys(comment).length) {
    return "Comment is absent or empty";
  }

  const requiredFields = new Set<keyof CommentCreatePayload>([
    "name",
    "email",
    "body",
    "productId"
  ]);

  let wrongFieldName;

  requiredFields.forEach((fieldName) => {
    if (!comment[fieldName]) {
      wrongFieldName = fieldName;
      return;
    }
  });

  if (wrongFieldName) {
    return `Field '${wrongFieldName}' is absent`;
  }

  return null;
}

const compareValues = (target: string, compare: string): boolean => {
  return target.toLowerCase() === compare.toLowerCase();
}

export const checkCommentUniq = (payload: CommentCreatePayload, comments: IComment[]): boolean => {
  const byEmail = comments.find(({ email }) => compareValues(payload.email, email));

  if (!byEmail) {
    return true;
  }

  const { body, name, productId } = byEmail;
  return !(
    compareValues(payload.body, body) &&
    compareValues(payload.name, name) &&
    compareValues(payload.productId.toString(), productId.toString())
  );
}

export const enhanceProductsComments = (
  products: IProduct[],
  commentRows: ICommentEntity[]
): IProduct[] => {
  const commentsByProductId = new Map < string, IComment[]> ();

  for (let commentEntity of commentRows) {
      const comment = mapCommentEntity(commentEntity);
      if (!commentsByProductId.has(comment.productId)) {
          commentsByProductId.set(comment.productId, []);
      }

      const list = commentsByProductId.get(comment.productId);
      commentsByProductId.set(comment.productId, [...list, comment]);
  }

  for (let product of products) {
      if (commentsByProductId.has(product.id)) {
          product.comments = commentsByProductId.get(product.id);
      }
  }

  return products;
}

export const getProductsFilterQuery = (
  filter: IProductSearchFilter
): [string, string[]] => {
  const { title, description, priceFrom, priceTo } = filter;

  let query = "SELECT * FROM products WHERE ";
  const values = []

  if (title) {
      query += "title LIKE ? ";
      values.push(`%${title}%`);
  }

  if (description) {
      if (values.length) {
          query += " OR ";
      }

      query += "description LIKE ? ";
      values.push(`%${description}%`);
  }

  if (priceFrom || priceTo) {
      if (values.length) {
          query += " OR ";
      }

      query += `(price > ? AND price < ?)`;
      values.push(priceFrom || 0);
      values.push(priceTo || 999999);
  }

  return [query, values];
}