import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetBuildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then((res) => {
        setBuildings(res.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      axios.post('http://localhost:5000', { name })
        .then((res) => {
          setName('');
          setBuildings(res.data); // update list after add
        }).catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/buildings/${id}`)
      .then(response => {
        setId('');
        // Remove deleted building from UI
        setBuildings(buildings.filter(b => b.id !== parseInt(id)));
      })
      .catch(error => {
        console.error('Error deleting building:', error);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">All Buildings</h1>
      <ul className="mb-6">
        {buildings.map(b => (
          <li key={b.id} className="py-1 px-2 border-b last:border-b-0">{b.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2 text-green-700">Add Building</h2>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
          placeholder="Enter building name"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2 text-red-700">Delete Building</h2>
      <form onSubmit={handleDelete} className="flex items-center gap-2">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Building ID"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default GetBuildings;