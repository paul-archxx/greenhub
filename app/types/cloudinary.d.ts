declare module "react-cloudinary-upload-widget" {
  export interface CloudinaryUploadWidgetProps {
    uploadPreset: string;
    onSuccess?: (result: any) => void;
    onError?: (error: any) => void;
    options?: any;
  }

  export const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps>;
}
