import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, AlertTriangle, CheckCircle, Info, Eye } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatusBadge from '../components/ui/StatusBadge';
import { api } from '../services/api';

const ContractDetail = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEvidence, setShowEvidence] = useState(false);

  const loadContractDetails = async () => {
    try {
      setLoading(true);
      const data = await api.getContractDetails(id);
      if (!data) {
        setError('Contract not found');
      } else {
        setContract(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContractDetails();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'High':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'Medium':
        return <Info className="w-5 h-5 text-yellow-500" />;
      case 'Low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !contract) {
    return (
      <Layout>
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Contract Not Found</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{contract.name}</h1>
              <p className="text-gray-600">{contract.parties}</p>
            </div>
          </div>
          <button
            onClick={() => setShowEvidence(true)}
            className="btn-secondary flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Evidence
          </button>
        </div>

        {/* Contract Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Start Date</p>
                <p className="text-lg font-semibold text-gray-900">{formatDate(contract.start)}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-red-600 mb-2" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Expiry Date</p>
                <p className="text-lg font-semibold text-gray-900">{formatDate(contract.expiry)}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Status</p>
                <div className="mt-1">
                  <StatusBadge status={contract.status} />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mb-2" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Risk Score</p>
                <div className="mt-1">
                  <StatusBadge risk={contract.risk} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clauses Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contract Clauses</h2>
              <div className="space-y-4">
                {contract.clauses.map((clause, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{clause.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Confidence:</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${clause.confidence * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {Math.round(clause.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{clause.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Insights</h2>
              <div className="space-y-4">
                {contract.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                    {getRiskIcon(insight.risk)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <StatusBadge risk={insight.risk} />
                      </div>
                      <p className="text-gray-700 text-sm">{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Evidence Panel (Side Drawer) */}
        {showEvidence && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowEvidence(false)}></div>
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
              <div className="flex flex-col h-full">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Evidence</h3>
                    <button
                      onClick={() => setShowEvidence(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {contract.evidence.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary-600">{item.source}</span>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500">Relevance:</span>
                            <div className="ml-2 flex items-center">
                              <div className="w-12 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-green-500 h-1.5 rounded-full"
                                  style={{ width: `${item.relevance * 100}%` }}
                                ></div>
                              </div>
                              <span className="ml-1 text-xs font-medium text-gray-900">
                                {Math.round(item.relevance * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{item.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ContractDetail;