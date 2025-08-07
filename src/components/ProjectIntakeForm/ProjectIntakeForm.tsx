import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, X } from 'lucide-react';

import { ProjectFormData, projectFormSchema } from '../../lib/validation';
import { submitProject } from '../../lib/api';
import { PROJECT_TYPES, TIMELINE_OPTIONS, UploadedFile } from '../../types/project';

import FileUpload from './FileUpload';
import BudgetSlider from './BudgetSlider';

interface ProjectIntakeFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ProjectIntakeForm: React.FC<ProjectIntakeFormProps> = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stepTitles = ['Project Overview', 'Project Details', 'Budget & Timeline', 'Contact Information'];
  const totalSteps = stepTitles.length;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    mode: 'onChange',
    defaultValues: {
      budget: 2500,
      timeline: '1-month',
    },
  });

  const watchedBudget = watch('budget');

  const submitMutation = useMutation({
    mutationFn: submitProject,
    onSuccess: (data) => {
      if (data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          onSuccess();
        }, 3000);
      }
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof ProjectFormData)[] => {
    switch (step) {
      case 1:
        return ['businessName', 'projectType', 'projectDescription'];
      case 2:
        return ['goalsRequirements'];
      case 3:
        return ['budget', 'timeline'];
      case 4:
        return ['fullName', 'email'];
      default:
        return [];
    }
  };

  const onSubmit = (data: ProjectFormData) => {
    const formDataWithFiles = {
      ...data,
      files: uploadedFiles.map(f => f.file),
    };
    submitMutation.mutate(formDataWithFiles);
  };

  const handleFileChange = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    setValue('files', files.map(f => f.file));
  };

  const getProgressPercentage = () => {
    return Math.round((currentStep / totalSteps) * 100);
  };

  const formatBudget = (amount: number): string => {
    if (amount >= 10000) {
      return `$${(amount / 1000).toFixed(0)}k+`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount}`;
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Project Submitted Successfully!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Thank you for providing your project details. We'll review your requirements and get back to you within 24 hours.
          </p>
          
          <div className="space-y-3 text-sm text-gray-500">
            <p>✓ Project details received</p>
            <p>✓ Team notification sent</p>
            <p>✓ Initial review scheduled</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 relative flex-shrink-0 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <X size={20} />
          </button>
          
          <div className="pr-8">
            <h1 className="text-xl font-bold mb-1">Start Your Project</h1>
            <p className="text-gray-300 text-sm mb-3">Tell us about your vision and we'll bring it to life</p>
            
            {/* Progress Bar */}
            <div className="mb-1">
              <div className="flex justify-between text-sm mb-2">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{getProgressPercentage()}% Complete</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Content - Exact height calculation */}
        <div className="flex-1 min-h-0">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              <form onSubmit={handleSubmit(onSubmit)} className="h-full">
                <AnimatePresence mode="wait">
                  {/* Step 1 - Project Overview */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-1">Project Overview</h2>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Business Name *
                        </label>
                        <input
                          {...register('businessName')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                          placeholder="Your business name"
                        />
                        {errors.businessName && (
                          <p className="mt-1 text-xs text-red-600">{errors.businessName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Type *
                        </label>
                        <select
                          {...register('projectType')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                        >
                          <option value="">Select project type</option>
                          {PROJECT_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                        {errors.projectType && (
                          <p className="mt-1 text-xs text-red-600">{errors.projectType.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Description *
                        </label>
                        <textarea
                          {...register('projectDescription')}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                          placeholder="Describe your project in detail..."
                        />
                        {errors.projectDescription && (
                          <p className="mt-1 text-xs text-red-600">{errors.projectDescription.message}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 - Project Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-1">Project Details</h2>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Goals & Requirements *
                        </label>
                        <textarea
                          {...register('goalsRequirements')}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                          placeholder="What are your main goals? What features do you need? Who is your target audience?"
                        />
                        {errors.goalsRequirements && (
                          <p className="mt-1 text-xs text-red-600">{errors.goalsRequirements.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Upload Files (Optional)
                        </label>
                        <FileUpload
                          files={uploadedFiles}
                          onFilesChange={handleFileChange}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 - Budget & Timeline */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-1">Budget & Timeline</h2>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Range *
                        </label>
                        
                        {/* Simple Budget Display */}
                        <div className="text-center mb-4">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {formatBudget(watchedBudget || 2500)}
                          </div>
                        </div>

                        {/* Budget Slider */}
                        <div className="relative mb-4">
                          <div className="relative h-2 bg-gray-200 rounded-full">
                            <motion.div
                              className="absolute h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              style={{ width: `${((watchedBudget || 2500) - 500) / (10000 - 500) * 100}%` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${((watchedBudget || 2500) - 500) / (10000 - 500) * 100}%` }}
                              transition={{ duration: 0.3 }}
                            />
                            <motion.div
                              className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-4 border-cyan-500 rounded-full shadow-lg cursor-pointer"
                              style={{ left: `calc(${((watchedBudget || 2500) - 500) / (10000 - 500) * 100}% - 12px)` }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            />
                          </div>
                          
                          <input
                            type="range"
                            min={500}
                            max={10000}
                            step={250}
                            value={watchedBudget || 2500}
                            onChange={(e) => setValue('budget', Number(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>

                        {/* Budget Range Labels */}
                        <div className="flex justify-between text-sm text-gray-500 mb-4">
                          <span>$500</span>
                          <span>$10,000+</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Timeline *
                        </label>
                        <select
                          {...register('timeline')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                        >
                          <option value="">Select timeline</option>
                          {TIMELINE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label} - {option.description}
                            </option>
                          ))}
                        </select>
                        {errors.timeline && (
                          <p className="mt-1 text-xs text-red-600">{errors.timeline.message}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4 - Contact Information */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-1">Contact Information</h2>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            {...register('fullName')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                            placeholder="Your full name"
                          />
                          {errors.fullName && (
                            <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            {...register('email')}
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                            placeholder="your@email.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number (Optional)
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                          placeholder="Your phone number"
                        />
                      </div>

                      {/* What Happens Next */}
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3 border border-cyan-200">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">What happens next?</h3>
                        <div className="space-y-1 text-xs text-gray-700">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">1</div>
                            <span>We'll review your project details within 24 hours</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">2</div>
                            <span>Schedule a discovery call to discuss your vision</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">3</div>
                            <span>Receive a detailed proposal and timeline</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">4</div>
                            <span>Begin development once you approve the proposal</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Footer with Navigation Buttons - Fixed at bottom */}
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t flex-shrink-0 rounded-b-2xl">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
              >
                Previous
              </button>

              <div className="flex space-x-3">
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                  >
                    Next Step
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={submitMutation.isPending || !isValid}
                    className="flex items-center bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin mr-1" size={16} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Project
                        <CheckCircle size={16} className="ml-1" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectIntakeForm;