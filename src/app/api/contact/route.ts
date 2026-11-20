import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json().catch(() => ({}));

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const countryCode = (body.countryCode || "+91").trim();
    const phone = (body.phone || "").trim();
    const message = (body.message || "").trim();

    const errors: Record<string, string> = {};

    // 1. Validate Name
    if (!name) {
      errors.name = "Please enter your name.";
    } else if (name.length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    // 2. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Please enter your email address.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // 3. Validate Phone Number
    const digitsOnly = phone.replace(/\D/g, "");
    if (!phone) {
      errors.phone = "Please enter your phone number.";
    } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      errors.phone = "Please enter a valid phone number (7 to 15 digits).";
    }

    // 4. Validate Message
    if (!message) {
      errors.message = "Please enter your message.";
    } else if (message.length < 5) {
      errors.message = "Message must be at least 5 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please correct the errors in the form.",
          errors,
        },
        { status: 400 },
      );
    }

    // Full validated phone
    const fullPhone = `${countryCode} ${phone}`.trim();

    // Log the contact inquiry for boldfuse operations
    console.log("[Boldfuse Contact Inquiry Received]", {
      name,
      email,
      phone: fullPhone,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out! Your message has been received. Our team will get back to you shortly.",
        data: {
          name,
          email,
          phone: fullPhone,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("[Boldfuse Contact API Error]", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try again.",
      },
      { status: 500 },
    );
  }
}
