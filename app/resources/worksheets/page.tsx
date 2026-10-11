export default function WorksheetsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FAFAF7",
        color: "#19253A",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <a href="/" style={{ color: "#927020" }}>
          ← Back to home
        </a>

        <h1 style={{ marginTop: "32px", fontSize: "40px" }}>
          Free Worksheets
        </h1>

        <p style={{ marginTop: "16px", color: "#4D5D73" }}>
          Mathematics worksheets for teachers and students.
        </p>

        <p style={{ marginTop: "32px", color: "#4D5D73" }}>
          Worksheets will be added here soon.
        </p>
      </div>
    </main>
  );
}