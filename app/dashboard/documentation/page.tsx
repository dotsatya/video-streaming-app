export default function DocumentationPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-20">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-3">Dot Streaming Documentation</h1>
        <p className="text-muted-foreground text-lg">
          Official documentation for the Dot Streaming platform. Learn how to
          upload, manage and stream videos efficiently.
        </p>
      </div>

      {/* Introduction */}
      <section id="introduction" className="space-y-4">
        <h2 className="text-2xl font-semibold">Introduction</h2>

        <p>
          Dot Streaming is a modern video streaming platform designed for
          efficient media upload, management and playback.
        </p>

        <p>
          The platform allows users to upload videos, store them securely,
          and stream them with optimized performance.
        </p>

        <h3 className="font-semibold mt-4">Core Features</h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>Video and image uploads</li>
          <li>Cloud-based media storage</li>
          <li>Optimized video streaming</li>
          <li>Secure user authentication</li>
          <li>Video metadata management</li>
        </ul>
      </section>

      {/* Get Started */}
      <section id="get-started" className="space-y-4">
        <h2 className="text-2xl font-semibold">Get Started</h2>

        <p>Follow these steps to start using Dot Streaming:</p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Create an account or login.</li>
          <li>Navigate to the Upload section.</li>
          <li>Enter video title and description.</li>
          <li>Select your video file.</li>
          <li>Click <strong>Publish Video</strong>.</li>
        </ol>

        <p className="text-muted-foreground">
          After publishing, your video will appear in the <strong>All Videos</strong> page.
        </p>

        <h3 className="font-semibold mt-4">Supported Formats</h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>MP4</li>
          <li>WebM</li>
          <li>MOV</li>
          <li>JPEG / PNG images</li>
        </ul>
      </section>

      {/* Tutorials */}
      <section id="tutorials" className="space-y-4">
        <h2 className="text-2xl font-semibold">Tutorials</h2>

        <p>Learn common workflows for managing your content.</p>

        <div className="space-y-4">

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Uploading Your First Video</h3>
            <p className="text-muted-foreground">
              Add a title, description and upload your video using the upload form.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Managing Uploaded Videos</h3>
            <p className="text-muted-foreground">
              View, organize and manage your uploaded videos from the dashboard.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Optimizing Video Playback</h3>
            <p className="text-muted-foreground">
              Learn how adaptive streaming and compression improve playback.
            </p>
          </div>

        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>

        <p>
          The platform exposes API endpoints for uploading videos and retrieving
          video data.
        </p>

        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">Upload Video</h3>

          <p className="text-muted-foreground">
            Uploads a new video file and stores metadata in the database.
          </p>

          <pre className="bg-muted p-3 rounded text-sm overflow-auto">
{`POST /api/video

Body:
{
  title: string
  description: string
  videoUrl: string
}`}
          </pre>
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">Get All Videos</h3>

          <pre className="bg-muted p-3 rounded text-sm overflow-auto">
{`GET /api/video`}
          </pre>
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">Get Single Video</h3>

          <pre className="bg-muted p-3 rounded text-sm overflow-auto">
{`GET /api/video/:id`}
          </pre>
        </div>
      </section>

      {/* Changelog */}
      <section id="changelog" className="space-y-4">
        <h2 className="text-2xl font-semibold">Changelog</h2>

        <ul className="space-y-2">

          <li>
            <strong>v1.0</strong> — Initial release
          </li>

          <li>
            Video upload functionality added
          </li>

          <li>
            Streaming support implemented
          </li>

          <li>
            Dashboard and documentation pages created
          </li>

        </ul>
      </section>

    </div>
  )
}