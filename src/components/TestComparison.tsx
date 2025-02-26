import { useEffect, useState } from 'react';
import { fetchJaipurLabs } from '../supabaseService';
import { bookLabTest } from '../supabaseService';

const TestComparison = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const getLabs = async () => {
      const fetchedLabs = await fetchJaipurLabs();
      setLabs(fetchedLabs);
    };
    getLabs();
  }, []);

  const handleBooking = async (labId) => {
    const userId = 'user123'; // Replace this with actual user authentication logic
    const success = await bookLabTest(labId, userId);
    if (success) {
      alert('Booking confirmed!');
    } else {
      alert('Booking failed!');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Nearby Labs in Jaipur</h2>
      <ul>
        {labs.map((lab) => (
          <li key={lab.id} className="border p-4 my-4 rounded shadow">
            <h3 className="font-semibold text-lg">{lab.name}</h3>
            <p>📍 {lab.address}</p>
            <p>💰 Price: ₹{lab.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => handleBooking(lab.id)}
            >
              Book Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestComparison;
