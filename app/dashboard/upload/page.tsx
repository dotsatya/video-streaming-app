import FileUpload from "@/app/components/FileUpload";

export default function UploadPage() {
  return (
    <div className="p-6">
      <FileUpload onSuccess={() => {}} onProgress={() => {}} />
    </div>
  );
}