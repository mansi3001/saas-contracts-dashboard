import { useState, useRef } from 'react';
import { X, Upload, File, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { contractsAPI } from '../../services/api';

const UploadModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    
    const fileObjects = newFiles.map(file => {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      const isValidType = allowedTypes.includes(fileExtension);
      
      return {
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        status: isValidType ? 'ready' : 'error'
      };
    });
    
    setFiles(prev => [...prev, ...fileObjects]);
  };

  const uploadFile = async (fileObj) => {
    setFiles(prev => prev.map(f => 
      f.id === fileObj.id ? { ...f, status: 'uploading' } : f
    ));

    try {
      await contractsAPI.uploadContract(fileObj.file);
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { ...f, status: 'success' } : f
      ));
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { ...f, status: 'error' } : f
      ));
    }
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status, fileName) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'success':
        return 'Uploaded';
      case 'ready':
        return 'Ready to upload';
      case 'error':
        const fileExtension = '.' + fileName.split('.').pop().toLowerCase();
        const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
        if (!allowedTypes.includes(fileExtension)) {
          return 'Invalid file type';
        }
        return 'Upload failed';
      default:
        return 'Pending';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Upload Contracts</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleChange}
              accept=".pdf,.doc,.docx,.txt"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to browse
            </h4>
            <p className="text-gray-600 mb-4">
              Support for PDF, DOC, DOCX, and TXT files
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary"
            >
              Select Files
            </button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(file.status)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)} • {getStatusText(file.status, file.name)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
            <button 
              onClick={async () => {
                // Upload all ready files
                const readyFiles = files.filter(f => f.status === 'ready');
                
                for (const fileObj of readyFiles) {
                  await uploadFile(fileObj);
                }
                
                // Clear files and close modal
                setFiles([]);
                onClose();
                // Force page refresh to show new contracts
                window.location.reload();
              }}
              className="btn-primary"
              disabled={files.some(f => f.status === 'uploading') || files.length === 0}
            >
              Upload & Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;