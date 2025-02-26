import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { supabase } from '../lib/supabase';
import type { Test } from '../types/database';

const SearchTests = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setTests(data || []);
    } catch (err) {
      setError('Failed to fetch tests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      await fetchTests();
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .ilike('name', `%${searchQuery}%`)
        .order('name');
      
      if (error) throw error;
      setTests(data || []);
    } catch (err) {
      setError('Failed to search tests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Find Lab Tests</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for tests, packages, or health conditions"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button 
            className="flex items-center justify-center space-x-2 w-full sm:w-auto"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading tests...</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tests.map((test) => (
            <div key={test.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{test.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {test.description}
              </p>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Category:</span> {test.category}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Report Time:</span> {test.report_time_hours}h
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/compare?testId=${test.id}`)}
                >
                  Compare Prices
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchTests;