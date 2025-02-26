import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { supabase } from '../lib/supabase';
import type { LabTestPrice, Lab, Test } from '../types/database';

const BookingPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<{
    price: LabTestPrice & { lab: Lab; test: Test } | null;
    date: string;
    time: string;
    isHomeCollection: boolean;
  }>({
    price: null,
    date: '',
    time: '',
    isHomeCollection: true
  });

  useEffect(() => {
    if (testId) {
      fetchBookingDetails();
    }
  }, [testId]);

  const fetchBookingDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('lab_test_prices')
        .select(`
          *,
          lab:labs(*),
          test:tests(*)
        `)
        .eq('id', testId)
        .single();

      if (error) throw error;
      setBooking(prev => ({ ...prev, price: data }));
    } catch (err) {
      setError('Failed to fetch booking details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBooking(prev => ({ ...prev, date: e.target.value }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBooking(prev => ({ ...prev, time: e.target.value }));
  };

  const handleCollectionTypeChange = (isHome: boolean) => {
    setBooking(prev => ({ ...prev, isHomeCollection: isHome }));
  };

  const calculateTotal = () => {
    if (!booking.price) return 0;
    let total = booking.price.price;
    if (booking.isHomeCollection) {
      total += booking.price.home_collection_fee;
    }
    return total;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading booking details...</p>
      </div>
    );
  }

  if (error || !booking.price) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error || 'Invalid booking details'}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold mb-4">{booking.price.test.name}</h1>
          <p className="text-gray-600 mb-4">{booking.price.test.description}</p>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Test Includes:</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {booking.price.test.parameters.map((param, index) => (
                <li key={index}>{param}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Lab Details</h2>
          <div className="space-y-2">
            <p className="font-medium">{booking.price.lab.name}</p>
            <p className="text-gray-600">{booking.price.lab.address}</p>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">★</span>
              <span>{booking.price.lab.rating}</span>
              {booking.price.lab.accredited && (
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                  Accredited
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Collection Type</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant={booking.isHomeCollection ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => handleCollectionTypeChange(true)}
            >
              Home Collection
            </Button>
            <Button
              variant={!booking.isHomeCollection ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => handleCollectionTypeChange(false)}
            >
              Lab Visit
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Select Date & Time</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={booking.date}
                onChange={handleDateChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <select
                value={booking.time}
                onChange={handleTimeChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select time slot</option>
                <option value="07:00">7:00 AM - 8:00 AM</option>
                <option value="08:00">8:00 AM - 9:00 AM</option>
                <option value="09:00">9:00 AM - 10:00 AM</option>
                <option value="10:00">10:00 AM - 11:00 AM</option>
                <option value="11:00">11:00 AM - 12:00 PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-4">
        <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Calendar className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-gray-600">
                {booking.date || 'Select a date'}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Clock className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-gray-600">
                {booking.time ? `${booking.time} slot` : 'Select a time slot'}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="font-medium">Collection Type</p>
              <p className="text-gray-600">
                {booking.isHomeCollection ? 'Home Collection' : 'Lab Visit'}
              </p>
            </div>
          </div>
          <hr />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Test Price</span>
              <span className="font-semibold">₹{booking.price.price}</span>
            </div>
            {booking.isHomeCollection && (
              <div className="flex justify-between">
                <span>Home Collection Fee</span>
                <span className="font-semibold">₹{booking.price.home_collection_fee}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>
          
          {(!booking.date || !booking.time) && (
            <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-md text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Please select date and time to proceed</span>
            </div>
          )}
          
          <Button 
            className="w-full"
            disabled={!booking.date || !booking.time}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;