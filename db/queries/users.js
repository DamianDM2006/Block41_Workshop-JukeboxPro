import db from "#db/client";

export async function createUser(userName, password) {
  const sql = `
  INSERT INTO users (username, password)
  VALUES ($1, $2)
  RETURNING *
  `;
  const { rows: [user] } = await db.query(sql, [userName, password]);
  return user;
}