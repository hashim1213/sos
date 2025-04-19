import { FormData } from '../types';

export const submitForm = async (formData: FormData): Promise<Response> => {
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    return response;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};