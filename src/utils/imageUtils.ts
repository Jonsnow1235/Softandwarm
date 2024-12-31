import type { ProductImage } from '../types';

// Helper to create image URL for product images
export function createProductImageUrl(filename: string): string {
  // For local development, images are served from /images directory
  return `/images/${filename}`;
}

// Helper to process uploaded images
export async function processUploadedImage(file: File, color: string): Promise<ProductImage> {
  // In production, you would upload to storage here
  // For now, we'll just use the file name
  return {
    url: file.name, // Just store the filename, the path will be added when displaying
    color,
    isPrimary: false
  };
}

// Validate image file
export function validateImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPG, PNG, or WebP images.');
  }

  if (file.size > maxSize) {
    throw new Error('File too large. Maximum size is 5MB.');
  }

  return true;
}