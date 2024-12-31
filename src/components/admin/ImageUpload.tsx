import React from 'react';
import { validateImageFile } from '../../utils/imageUtils';
import { toast } from 'react-hot-toast';

interface ImageUploadProps {
  onChange: (file: File) => void;
  accept?: string;
}

export function ImageUpload({ onChange, accept = "image/*" }: ImageUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateImageFile(file);
      onChange(file);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error uploading image');
      e.target.value = ''; // Reset input
    }
  };

  return (
    <input
      type="file"
      onChange={handleChange}
      accept={accept}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
    />
  );
}