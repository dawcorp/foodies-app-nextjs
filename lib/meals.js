import sqlite from "better-sqlite3";

const db = sqlite("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // throw new Error("Failed to fetch meals."); test error
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  return meal;
}
