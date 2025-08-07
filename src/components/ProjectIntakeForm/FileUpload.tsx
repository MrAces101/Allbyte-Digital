import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, File, Image, FileText } from 'lucide-react';
import { UploadedFile } from '../../types/project';

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  files, 
  onFilesChange, 
  maxFiles = 10, 
  maxSizePerFile = 10 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSizePerFile * 1024 * 1024) {
      return `File "${file.name}" is too large. Maximum size is ${maxSizePerFile}MB.`;
    }
    
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'text/plain', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return `File type "${file.type}" is not supported.`;
    }
    
    return null;
  };

  const processFiles = (fileList: FileList) => {
    setError(null);
    
    if (files.length + fileList.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const validationError = validateFile(file);
      
      if (validationError) {
        setError(validationError);
        return;
      }
      
      const uploadedFile: UploadedFile = {
        id: `${Date.now()}-${i}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
      };
      
      newFiles.push(uploadedFile);
    }
    
    onFilesChange([...files, ...newFiles]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  }, [files, maxFiles, maxSizePerFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const removeFile = (fileId: string) => {
    onFilesChange(files.filter(f => f.id !== fileId));
    setError(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image size={16} className="text-blue-500" />;
    if (type === 'application/pdf') return <FileText size={16} className="text-red-500" />;
    return <File size={16} className="text-gray-500" />;
  };

  return (
    <div className="space-y-3">
      {/* Compact Upload Area */}
      <motion.div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-200 ${
          isDragOver
            ? 'border-cyan-500 bg-cyan-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Upload className={`mx-auto mb-2 ${isDragOver ? 'text-cyan-500' : 'text-gray-400'}`} size={24} />
        <p className="text-sm font-medium text-gray-900 mb-1">
          Drop files here or click to upload
        </p>
        <p className="text-xs text-gray-500 mb-2">
          Images, PDF, Word documents, Text files
        </p>
        <p className="text-xs text-gray-400">
          Max {maxFiles} files, {maxSizePerFile}MB each
        </p>
        
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        <label
          htmlFor="file-upload"
          className="inline-block mt-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-4 py-1 rounded text-sm cursor-pointer transition-colors duration-200"
        >
          Choose Files
        </label>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-2"
          >
            <p className="text-red-700 text-xs">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Uploaded Files */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <h4 className="font-medium text-gray-900 text-sm">Uploaded Files ({files.length})</h4>
            <div className="space-y-1">
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-2"
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    {getFileIcon(file.type)}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 flex-shrink-0"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;