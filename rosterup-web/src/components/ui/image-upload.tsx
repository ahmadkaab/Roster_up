"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/contexts/ToastContext";
import { createClient } from "@/lib/supabase/client";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  bucket: "avatars" | "achievements";
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  bucket,
  className,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setLoading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      
      onChange(data.publicUrl);
      toast("Image uploaded successfully", "success");
    } catch (error: any) {
      console.error(error);
      toast(error.message || "Failed to upload image", "error");
    } finally {
      setLoading(false);
    }
  };

  if (value) {
    return (
      <div className={`relative h-40 w-40 overflow-hidden rounded-lg border border-white/10 ${className}`}>
        <div className="absolute right-2 top-2 z-10">
          <Button
            type="button"
            onClick={onRemove}
            variant="destructive"
            size="icon"
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Image
          fill
          src={value}
          alt="Upload"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`flex h-40 w-40 items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 transition-colors hover:bg-white/10 ${className}`}>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2">
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        ) : (
          <ImagePlus className="h-6 w-6 text-muted-foreground" />
        )}
        <span className="text-xs text-muted-foreground">
          {loading ? "Uploading..." : "Upload Image"}
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onUpload}
          disabled={loading}
        />
      </label>
    </div>
  );
}
