"use client";

import React, { useState } from "react";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    setSelectedFile(null);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
        <div className="bg-white lg:rounded-3xl shadow-2xl w-full lg:max-w-md max-lg:h-[100vh] max-lg:w-screen lg:max-h-[90vh] overflow-hidden">
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
                      setSelectedFile(file);
                      // Update the status display
                      const statusElement =
                        document.getElementById("file-status");
                      if (statusElement) {
                        statusElement.textContent = `Selected: ${file.name}`;
                        statusElement.className =
                          "text-sm text-green-600 font-medium";
                      }
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                  disabled={isUploading}
                />

                {!selectedFile ? (
                  // Upload container - shown when no file is selected
                  <label
                    htmlFor="file-upload"
                    className={`group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                      isUploading
                        ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                        : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className={`w-8 h-8 mb-3 transition-colors duration-300 ${
                          isUploading
                            ? "text-gray-400"
                            : "text-gray-400 group-hover:text-purple-500"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p
                        className={`mb-2 text-sm transition-colors duration-300 ${
                          isUploading
                            ? "text-gray-400"
                            : "text-gray-500 group-hover:text-purple-600"
                        }`}
                      >
                        <span className="font-medium">
                          {isUploading ? "Uploading..." : "Click to upload"}
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p
                        className={`text-xs transition-colors duration-300 ${
                          isUploading
                            ? "text-gray-400"
                            : "text-gray-400 group-hover:text-purple-500"
                        }`}
                      >
                        PNG, JPG, GIF, WEBP up to 10MB
                      </p>
                    </div>
                  </label>
                ) : (
                  // Image preview - shown when file is selected
                  <div className="relative">
                    <div className="w-full h-32 border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setImageName("");
                          const statusElement =
                            document.getElementById("file-status");
                          if (statusElement) {
                            statusElement.textContent = "No image selected";
                            statusElement.className = "text-sm text-gray-500";
                          }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors duration-200 shadow-lg"
                        title="Remove image"
                      >
                        <svg
                          className="w-4 h-4"
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
                    <div className="mt-2 text-sm text-gray-600">
                      {selectedFile.name}
                    </div>
                  </div>
                )}

                {/* File Selection Status */}
                <div className="mt-3">
                  <div id="file-status" className="text-sm text-gray-500">
                    No image selected
                  </div>
                </div>
              </div>

              {/* Image Name Input */}
              <div className="">
                <label
                  htmlFor="image-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Image Name *
                </label>
                <input
                  type="text"
                  id="image-name"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  placeholder="Enter a name for your image..."
                  className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                  disabled={isUploading}
                  required
                />
              </div>

              {/* Upload Progress */}
              {/* {isUploading && (
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
              )} */}
              {isSuccess && (
                <div className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-emerald-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <p className="text-red-400 text-sm font-medium">
                      An error occurred while uploading the wallet.
                    </p>
                  </div>
                </div>
              )}
              {/* Upload Button */}
              <Button
                className="w-full"
                disabled={!imageName.trim() || !selectedFile || isUploading}
                onClick={() => {
                  if (!imageName.trim()) {
                    alert("Please enter an image name");
                    return;
                  }
                  if (!selectedFile) {
                    alert("Please select an image file first");
                    return;
                  }
                  // Upload the selected file
                  handleFileUpload(selectedFile);
                }}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModal;
