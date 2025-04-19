// Define all shared types here

export type UserPathType = 'organizer' | 'professional' | null;

export interface OrganizerFormData {
  type: 'organizer';
  email: string;
  eventType: string;
}

export interface ProfessionalFormData {
  type: 'professional';
  name: string;
  email: string;
  phone: string;
  city: string;
  skill: string;
  experience: string;
  aboutExperience: string;
  agreeToCheck: boolean;
}

export type FormData = OrganizerFormData | ProfessionalFormData;