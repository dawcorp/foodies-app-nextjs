export default function MealDetailsPage({ params }) {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>Meal details</h1>
      <p>{params.mealSlug}</p>
    </main>
  );
}
