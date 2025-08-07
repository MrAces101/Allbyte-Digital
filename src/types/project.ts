export interface ProjectFormData {
  // Step 1 - Project Overview
  businessName: string;
  projectType: 'new-website' | 'website-redesign' | 'ecommerce-store' | 'web-application' | 'wordpress-site' | 'custom-development';
  projectDescription: string;
  
  // Step 2 - Project Details
  goalsRequirements: string;
  files: File[];
  
  // Step 3 - Budget & Timeline
  budget: number;
  timeline: 'asap' | '1-2-weeks' | '1-month' | '2-3-months' | 'flexible';
  
  // Step 4 - Contact Information
  fullName: string;
  email: string;
  phone?: string;
}

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export const PROJECT_TYPES = [
  { value: 'new-website', label: 'New Website' },
  { value: 'website-redesign', label: 'Website Redesign' },
  { value: 'ecommerce-store', label: 'E-commerce Store' },
  { value: 'web-application', label: 'Web Application' },
  { value: 'wordpress-site', label: 'WordPress Site' },
  { value: 'custom-development', label: 'Custom Development' },
] as const;

export const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'ASAP (Rush Job)', description: 'Need it done as quickly as possible' },
  { value: '1-2-weeks', label: '1-2 Weeks', description: 'Standard turnaround time' },
  { value: '1-month', label: '1 Month', description: 'Allows for detailed planning' },
  { value: '2-3-months', label: '2-3 Months', description: 'Complex project timeline' },
  { value: 'flexible', label: 'Flexible', description: 'No specific deadline' },
] as const;