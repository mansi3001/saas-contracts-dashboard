import { useState } from 'react';
import { Send, MessageSquare, FileText, Loader } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { contractsAPI } from '../services/api';

const Query = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await contractsAPI.askQuestion(question);
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const exampleQuestions = [
    "What are the termination clauses in my contracts?",
    "Which contracts have liability caps?",
    "Show me payment terms across all contracts",
    "What are the key risks in my agreements?"
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Query Contracts</h1>
          <p className="text-gray-600">Ask questions about your contracts in natural language</p>
        </div>

        {/* Query Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ask a question about your contracts
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="e.g., What are the termination clauses in my contracts?"
                  rows={3}
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Ask Question
                  </>
                )}
              </button>
              
              {(question.trim() || result) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuestion('');
                    setResult(null);
                    setError('');
                  }}
                  className="btn-secondary flex items-center"
                  disabled={loading}
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {/* Example Questions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Example questions:</h3>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setQuestion(example)}
                  className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                  disabled={loading}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="card border-red-200 bg-red-50">
            <div className="text-red-700">
              <h3 className="font-medium mb-1">Error</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* AI Answer */}
            <div className="card">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">AI Answer</h3>
                  <p className="text-gray-700 leading-relaxed">{result.answer}</p>
                </div>
              </div>
            </div>

            {/* Retrieved Chunks */}
            {result.chunks && result.chunks.length > 0 && (
              <div className="card">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <h3 className="font-medium text-gray-900">Relevant Contract Excerpts</h3>
                </div>
                
                <div className="space-y-4">
                  {result.chunks.map((chunk, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">{chunk.metadata.contract_name}</span>
                          {chunk.metadata.page && (
                            <span className="ml-2">• Page {chunk.metadata.page}</span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-primary-600">
                          {chunk.relevance_score}% relevant
                        </div>
                      </div>
                      <p className="text-gray-800 leading-relaxed">{chunk.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!result && !error && !loading && (
          <div className="card">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ask Your First Question</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Use natural language to query your contracts. Our AI will search through your documents and provide relevant answers with supporting evidence.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Query;