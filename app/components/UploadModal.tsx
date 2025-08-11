"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import useStopScroll from "@/hooks/useStopScroll";
import Button from "./Button";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imageName, setImageName] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);

  useStopScroll(isOpen);

  const handleSendEmail = async () => {
    if (!uploadedImageUrl) return;

    setSendingEmail(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "image",
          imageName: imageName || undefined,
          imageUrl: uploadedImageUrl,
          // userEmail: "jilljelly6@gmail.com", // Admin email
        }),
      });

      if (response.ok) {
        setEmailSent(true);
        console.log("Admin notification sent successfully");
      } else {
        console.error("Failed to send email");
        alert("Failed to send email notification. Please try again.");
      }
    } catch (error) {
      console.error("Email error:", error);
      alert("Failed to send email notification. Please try again.");
    } finally {
      setSendingEmail(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ocean_2"); // Your unsigned upload preset
      formData.append("cloud_name", "dqbqblutj"); // Your cloud name

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dqbqblutj/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response not OK:", response.status, errorText);
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Upload success result:", result);

      // Get the live URL
      const liveUrl = result.secure_url;
      if (!liveUrl) {
        console.error("No secure_url in result:", result);
        throw new Error("No URL returned from upload");
      }

      setUploadedImageUrl(liveUrl);
      setIsSuccess(true);
      setUploadProgress(100);

      // Don't auto-close, let user decide when to send email
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setUploadedImageUrl("");
    setIsSuccess(false);
    setIsUploading(false);
    setUploadProgress(0);
    setImageName("");
    setEmailSent(false);
    setSendingEmail(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 z-50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              <h2 className="font-heading text-xl font-bold text-gray-900">
                Upload Image
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">
                  Upload Successful!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your image has been uploaded and is now live!
                </p>
                {uploadedImageUrl && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {imageName && (
                      <div className="mb-3 text-center">
                        <p className="text-sm font-medium text-gray-900">
                          {imageName}
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mb-2">
                      Live Image URL:
                    </p>
                    <div className="w-32 h-32 mx-auto mb-3">
                      <Image
                        src={uploadedImageUrl}
                        alt={imageName || "Uploaded image"}
                        width={128}
                        height={128}
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="bg-blue-50 p-2 rounded border border-blue-200">
                      <p className="text-xs text-blue-800 break-all font-mono">
                        {uploadedImageUrl}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(uploadedImageUrl)
                      }
                      className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                    >
                      Copy URL
                    </button>

                    {/* Send Email Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      {emailSent ? (
                        <div className="text-center">
                          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Email Sent!
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={handleSendEmail}
                          disabled={sendingEmail}
                          className={`w-full px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
                            sendingEmail
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-105"
                          }`}
                        >
                          {sendingEmail ? (
                            <div className="flex items-center justify-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Sending...
                            </div>
                          ) : (
                            "📧 Send to Admin"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Image Name Input */}

                {/* File Upload */}
                <div className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(file);
                      }
                    }}
                    className="hidden"
                    id="file-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`inline-flex items-center px-6 py-3 font-medium rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      isUploading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {isUploading ? "Uploading..." : "Choose Image"}
                  </label>
                </div>

                {/* Image Name Input */}
                <div className="text-center">
                  <label
                    htmlFor="image-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Image Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="image-name"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    placeholder="Enter a name for your image..."
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    disabled={isUploading}
                  />
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Uploading to Cloudinary...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="text-center text-sm text-gray-600">
                  <p>Click to upload your image</p>
                  <p className="mt-1">
                    Supports: JPG, PNG, GIF, WebP up to 10MB
                  </p>
                  <p className="mt-1 text-xs text-blue-600">
                    Your image will get a live, shareable URL!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModal;
