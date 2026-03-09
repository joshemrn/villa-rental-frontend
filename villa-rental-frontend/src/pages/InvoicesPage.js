import React, { useState, useEffect } from 'react';
import { invoiceService } from '../services/api';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await invoiceService.getAll();
      setInvoices(response.data);
    } catch (err) {
      console.error('Failed to fetch invoices', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Invoices</h1>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : invoices.length === 0 ? (
        <div className="text-center py-12">No invoices yet</div>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{invoice.invoiceNumber}</h3>
                  <p className="text-gray-600">{invoice.propertyId?.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">${invoice.total}</p>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Issued: {new Date(invoice.issuedDate).toLocaleDateString()}
              </p>
              <a
                href={invoice.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
