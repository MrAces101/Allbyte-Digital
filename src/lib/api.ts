import { ProjectFormData } from './validation';

export async function submitProject(data: ProjectFormData): Promise<{ success: boolean; projectId?: string; error?: string }> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful submission
    const projectId = `proj_${Date.now()}`;
    
    console.log('Project submitted:', { ...data, projectId });
    
    return {
      success: true,
      projectId,
    };
  } catch (error) {
    console.error('Error submitting project:', error);
    return {
      success: false,
      error: 'Failed to submit project. Please try again.',
    };
  }
}