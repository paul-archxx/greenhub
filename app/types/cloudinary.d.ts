declare module "react-cloudinary-upload-widget" {
  export interface CloudinaryUploadWidgetProps {
    uploadPreset: string;
    onSuccess?: (result: unknown) => void;
    onError?: (error: unknown) => void;
    options?: unknown;
  }

  export const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps>;
}
