import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Admin() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchAllScores();
  }, []);

  const fetchAllScores = async () => {
    try {
      const snapshot = await getDocs(collection(db, "scores"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log("ADMIN DATA:", data);
      setScores(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="mb-6">
        <p className="text-gray-400">Total Entries</p>
        <h2 className="text-2xl font-bold">{scores.length}</h2>
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 gap-4">
        {scores.length === 0 && (
          <p className="text-gray-400">No data found</p>
        )}

        {scores.map((s) => (
          <div
            key={s.id}
            className="bg-white/10 backdrop-blur p-4 rounded-xl border border-gray-700"
          >
            <p className="text-sm text-gray-400">User</p>
            <p className="font-bold break-all">{s.userId}</p>

            <div className="flex justify-between mt-3">
              <p>
                Score: <span className="font-bold">{s.score}</span>
              </p>
              <p className="text-gray-400">{s.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}