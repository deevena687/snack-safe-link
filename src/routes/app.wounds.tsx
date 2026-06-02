import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useCallback } from "react";
import { Upload, X, CheckCircle, ImagePlus } from "lucide-react";
import { format } from "date-fns";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { patients, woundImages, type WoundImage, type HealingStage } from "@/lib/mock-data";

export const Route = createFileRoute("/app/wounds")({
  head: () => ({ meta: [{ title: "Wound Monitoring — BiopolyHeal" }] }),
  component: Wounds,
});

interface UploadedImage extends WoundImage {
  isUploaded?: boolean;
}

function Wounds() {
  const [selected, setSelected] = useState(patients[2].id);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockImgs = woundImages.filter((w) => w.patientId === selected);
  const localUploads = uploadedImages.filter((w) => w.patientId === selected);
  const allImgs = [...mockImgs, ...localUploads];
  const p = patients.find((x) => x.id === selected)!;

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const validFiles = Array.from(files).filter((f) => {
        if (!f.type.startsWith("image/")) return false;
        if (f.size > 10 * 1024 * 1024) return false; // 10 MB limit
        return true;
      });

      if (validFiles.length === 0) return;

      const newImages: UploadedImage[] = validFiles.map((file, idx) => {
        const objectUrl = URL.createObjectURL(file);
        const stages: HealingStage[] = ["Hemostasis", "Inflammatory", "Proliferative", "Remodeling"];
        return {
          id: `upload-${Date.now()}-${idx}`,
          patientId: selected,
          capturedAt: format(new Date(), "yyyy-MM-dd"),
          url: objectUrl,
          stage: stages[Math.floor(Math.random() * stages.length)],
          notes: `Uploaded: ${file.name}`,
          isUploaded: true,
        };
      });

      setUploadedImages((prev) => [...prev, ...newImages]);
      setUploadSuccess(`${validFiles.length} image${validFiles.length > 1 ? "s" : ""} uploaded successfully!`);
      setTimeout(() => setUploadSuccess(null), 3000);
    },
    [selected],
  );

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = ""; // reset so the same file can be re-selected
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveUploaded = (id: string) => {
    setUploadedImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <PageHeader
        title="Wound monitoring"
        subtitle="Image history, healing timeline and stage classification."
        actions={
          <Button className="gradient-primary text-primary-foreground" onClick={handleButtonClick}>
            <Upload className="size-4" /> Upload image
          </Button>
        }
      />

      {/* Upload success toast */}
      {uploadSuccess && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-soft animate-in fade-in slide-in-from-top-2 duration-300 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300">
          <CheckCircle className="size-4 shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-[280px_1fr] gap-5">
        <div className="rounded-2xl border bg-card p-3 shadow-soft h-fit">
          <p className="px-2 py-1.5 text-xs uppercase tracking-wide text-muted-foreground">Patients</p>
          <ul className="space-y-1">
            {patients.slice(0, 8).map((pt) => (
              <li key={pt.id}>
                <button onClick={() => setSelected(pt.id)} className={`w-full flex items-center gap-3 rounded-xl p-2 text-left transition ${selected === pt.id ? "bg-primary/10" : "hover:bg-accent"}`}>
                  <img src={pt.avatar} alt="" className="size-9 rounded-full bg-muted" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{pt.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{pt.woundType}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.woundType} · admitted {p.admittedOn}</p>
              </div>
              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">{p.healingPercent}% healed</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full gradient-heal" style={{ width: `${p.healingPercent}%` }} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {allImgs.map((w) => (
              <div key={w.id} className="rounded-2xl border bg-card overflow-hidden shadow-soft group relative">
                <div className="aspect-square bg-muted overflow-hidden">
                  <img src={w.url} alt={w.notes} className="w-full h-full object-cover" />
                </div>
                {"isUploaded" in w && w.isUploaded && (
                  <button
                    onClick={() => handleRemoveUploaded(w.id)}
                    className="absolute top-2 right-2 rounded-full bg-destructive/90 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    title="Remove uploaded image"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
                <div className="p-3">
                  <p className="text-xs text-muted-foreground">{w.capturedAt}</p>
                  <p className="font-medium text-sm">{w.stage}</p>
                  <p className="text-xs text-muted-foreground mt-1">{w.notes}</p>
                  {"isUploaded" in w && w.isUploaded && (
                    <span className="inline-block mt-1.5 text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5">
                      New upload
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Drag & drop zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleButtonClick}
            className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors duration-200 ${
              isDragging
                ? "border-primary bg-primary/10 scale-[1.01]"
                : "bg-accent/30 hover:border-primary/50 hover:bg-accent/50"
            }`}
          >
            {isDragging ? (
              <>
                <ImagePlus className="size-8 mx-auto text-primary animate-bounce" />
                <p className="mt-2 font-semibold text-primary">Release to upload</p>
              </>
            ) : (
              <>
                <Upload className="size-6 mx-auto text-muted-foreground" />
                <p className="mt-2 font-medium">Drop a wound photo here</p>
                <p className="text-sm text-muted-foreground">
                  PNG / JPG / WebP up to 10 MB · auto-analyzed by BiopolyAI
                </p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse files</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
