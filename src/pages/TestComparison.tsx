import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { supabase } from '../lib/supabase';
import type { LabTestPrice, Lab, Test } from '../types/database';

const TestComparison = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const testId = searchParams.get('testId');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prices, setPrices] = useState<LabTestPrice[]>([]);
  const [test, setTest] = useState<Test | null>(null);

  useEffect(() => {
    if (testId) {
      fetchTestAndPrices();
    }
  }, [testId]);

  const fetchTestAndPrices = async () => {
    try {
      // Fetch test details
      const { data: testData, error: testError } = await supabase
        .from('tests')
        .select('*')
        .eq('id', testId)
        .single();

      if (testError) throw testError;
      setTest(testData);

      // Fetch prices with lab details
      const { data: pricesData, error: pricesError } = await supabase
        .from('lab_test_prices')
        .select(`
          *,
          lab:labs(*)
        `)
        .eq('test_id', testId);

      if (pricesError) throw pricesError;
      setPrices(pricesData || []);
    } catch (err) {
      setError('Failed to fetch comparison data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading comparison...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!test) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No test selected for comparison</p>
        <Button 
          className="mt-4"
          onClick={() => navigate('/search')}
        >
          Search Tests
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{test.name}</h1>
        <p className="text-gray-600 mb-4">{test.description}</p>
        <div className="space-y-2">
          <p><span className="font-medium">Category:</span> {test.category}</p>
          <p><span className="font-medium">Parameters:</span> {test.parameters.join(', ')}</p>
          <p><span className="font-medium">Preparation:</span> {test.preparation_instructions}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left">Lab Details</th>
              <th className="p-4 text-center">Rating</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Report Time</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price) => (
              <tr key={price.id} className="border-t">
                <td className="p-4">
                  <h3 className="font-semibold">{price.lab?.name}</h3>
                  <p className="text-sm text-gray-600">{price.lab?.address}</p>
                  {price.lab?.accredited && (
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded mt-1">
                      Accredited
                    </span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <span className="font-medium">{price.lab?.rating}</span>
                  <span className="text-yellow-500">★</span>
                </td>
                <td className="p-4 text-center">
                  <p className="font-bold text-blue-600">₹{price.price}</p>
                  {price.home_collection_available && (
                    <p className="text-sm text-gray-600">
                      +₹{price.home_collection_fee} for home collection
                    </p>
                  )}
                </td>
                <td className="p-4 text-center">
                  <p className="text-sm text-gray-600">{test.report_time_hours} hours</p>
                </td>
                <td className="p-4 text-center">
                  <Button 
                    size="sm"
                    onClick={() => navigate(`/book/${price.id}`)}
                  >
                    Book Now
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestComparison;