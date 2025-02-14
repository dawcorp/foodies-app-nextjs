import sqlite from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "fs";
import { error } from "console";

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

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // store image in public folder
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image.");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    "INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)"
  ).run(meal);
}
