import Link from "next/link";

export default function MealsPage() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>Meals page</h1>
      <ul>
        <li>
          <Link href="/meals/first-meal">First meal</Link>
        </li>
        <li>
          <Link href="/meals/second-meal">Second meal</Link>
        </li>
      </ul>
    </main>
  );
}
