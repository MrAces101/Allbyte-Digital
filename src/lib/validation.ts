import { z } from 'zod';

export const projectFormSchema = z.object({
  // Step 1 - Project Overview
  businessName: z.string().min(1, 'Business name is required').max(100, 'Business name must be less than 100 characters'),
  projectType: z.enum(['new-website', 'website-redesign', 'ecommerce-store', 'web-application', 'wordpress-site', 'custom-development'], {
    required_error: 'Please select a project type',
  }),
  projectDescription: z.string().min(10, 'Please provide at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  
  // Step 2 - Project Details
  goalsRequirements: z.string().min(10, 'Please provide at least 10 characters').max(2000, 'Requirements must be less than 2000 characters'),
  files: z.array(z.any()).optional(),
  
  // Step 3 - Budget & Timeline
  budget: z.number().min(500, 'Minimum budget is $500').max(10000, 'Maximum budget is $10,000+'),
  timeline: z.enum(['asap', '1-2-weeks', '1-month', '2-3-months', 'flexible'], {
    required_error: 'Please select a timeline',
  }),
  
  // Step 4 - Contact Information
  fullName: z.string().min(1, 'Full name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;