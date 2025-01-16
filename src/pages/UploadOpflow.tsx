import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Upload, X } from 'lucide-react';

const UploadOpflow = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid CSV file');
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const csvData = event.target?.result as string;
        const rows = csvData.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const data = rows.slice(1).map(row => {
          const obj: Record<string, string> = {};
          headers.forEach((header, index) => {
            obj[header.trim()] = row[index]?.trim() || '';
          });
          return obj;
        });

        const { error } = await supabase
          .from('opflows')
          .insert([
            {
              project_id: 'default', // You might want to add project selection
              data: data,
            },
          ]);

        if (error) throw error;
        navigate('/threat-modeling');
      };
      reader.readAsText(file);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Opflow</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-primary-50 text-primary-600 hover:text-primary-700 px-4 py-2 rounded-md"
                >
                  Select CSV File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Only CSV files are supported
              </p>
            </div>

            {file && (
              <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/threat-modeling')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadOpflow;