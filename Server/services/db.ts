import { createConnection, Connection } from "mysql2/promise";

const { DB_NAME } = process.env;

export async function initDataBase(): Promise<Connection | null> {
  let connection: Connection | null = null;

  try {
    connection = await createConnection({
      host: "localhost",
      port: 3306,
      password: '29aiVBpTG',
      user: "editor",
      database: "ProductsApplication",
    });
  } catch (e: any) {
    console.error(e.message || e);
    return null;
  }

  console.log(`Connection to DB ${DB_NAME} established`);

  return connection;
}
