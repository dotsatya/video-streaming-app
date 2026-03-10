export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Dot Streaming</h1>
      <p className="text-muted-foreground mt-2">
        Watch and share amazing videos.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">Video 1</div>
        <div className="rounded-lg border p-4">Video 2</div>
        <div className="rounded-lg border p-4">Video 3</div>
      </div>
    </main>
  );
}