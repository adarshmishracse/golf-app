import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Admin() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const snapshot = await getDocs(collection(db, "scores"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setScores(data);
      } catch (err) {
        console.error("ADMIN ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white", padding: "20px" }}>
        Loading Admin...
      </div>
    );
  }

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h1>Admin Panel</h1>

      {scores.length === 0 ? (
        <p>No data found</p>
      ) : (
        scores.map((s) => (
          <div key={s.id} style={{ marginBottom: "10px" }}>
            <p>User: {s.userId}</p>
            <p>Score: {s.score}</p>
            <p>Date: {s.date}</p>
          </div>
        ))
      )}
    </div>
  );
}