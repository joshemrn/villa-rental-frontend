import React, { useState, useEffect } from 'react';
import { contractService } from '../services/api';
import { Link } from 'react-router-dom';

export default function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await contractService.getAll();
      setContracts(response.data);
    } catch (err) {
      console.error('Failed to fetch contracts', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Contracts</h1>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : contracts.length === 0 ? (
        <div className="text-center py-12">No contracts yet</div>
      ) : (
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{contract.contractNumber}</h3>
                  <p className="text-gray-600">{contract.propertyId?.title}</p>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  contract.status === 'fully-signed' ? 'bg-green-100 text-green-800' :
                  contract.status === 'guest-signed' ? 'bg-blue-100 text-blue-800' :
                  contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {contract.status}
                </span>
              </div>

              <div className="flex space-x-3">
                <a
                  href={contract.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  View PDF
                </a>
                {contract.status !== 'fully-signed' && (
                  <Link
                    to={`/sign-contract/${contract._id}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Sign Now
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
