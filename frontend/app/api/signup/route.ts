import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

// Define types for our form data
interface BaseFormData {
  email: string;
  timestamp: string;
  type: 'organizer' | 'professional';
}

interface OrganizerFormData extends BaseFormData {
  type: 'organizer';
  eventType?: string;
}

interface ProfessionalFormData extends BaseFormData {
  type: 'professional';
  name: string;
  phone: string;
  city: string;
  skill: string;
  experience: string;
  aboutExperience?: string;
}

type FormData = OrganizerFormData | ProfessionalFormData;

// Initialize Resend with your API key
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const formData: FormData = await request.json();

    // Add timestamp
    formData.timestamp = new Date().toISOString();

    // Format email content
    const emailContent = formatEmailContent(formData);

    // Send email if Resend is initialized
    if (resend) {
      const { error } = await resend.emails.send({
        from: 'SOS Form <onboarding@resend.dev>', // Use a verified domain in production
        to: 'staffonshift.sos@gmail.com', // Your email address
        subject: `New ${formData.type} signup from ${formData.type === 'organizer' ? formData.email : formData.name}`,
        html: emailContent,
      });

      if (error) {
        console.error('Error sending email:', error);
        // Still return success since we processed the submission, but log the email error
      }
    } else {
      console.warn('Resend API key not configured. Email not sent.');
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully'
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: 'Error processing submission' },
      { status: 500 }
    );
  }
}

function formatEmailContent(formData: FormData): string {
  if (formData.type === 'organizer') {
    return `
      <h1>New Event Organizer Signup</h1>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Event Type:</strong> ${(formData as OrganizerFormData).eventType || 'Not specified'}</p>
      <p><strong>Timestamp:</strong> ${formData.timestamp}</p>
    `;
  } else {
    const professionalData = formData as ProfessionalFormData;
    return `
      <h1>New Event Professional Signup</h1>
      <p><strong>Name:</strong> ${professionalData.name}</p>
      <p><strong>Email:</strong> ${professionalData.email}</p>
      <p><strong>Phone:</strong> ${professionalData.phone}</p>
      <p><strong>City:</strong> ${professionalData.city}</p>
      <p><strong>Skill:</strong> ${professionalData.skill}</p>
      <p><strong>Experience:</strong> ${professionalData.experience}</p>
      <p><strong>About:</strong> ${professionalData.aboutExperience || 'Not provided'}</p>
      <p><strong>Timestamp:</strong> ${professionalData.timestamp}</p>
    `;
  }
}