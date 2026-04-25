import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import CharitySelector from "../components/CharitySelector";
import DrawSystem from "../components/DrawSystem";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Wait for auth before fetching data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchScores(user);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch scores
  const fetchScores = async (userParam) => {
    const user = userParam || auth.currentUser;
    if (!user) return;

   
    const q = query(
  collection(db, "scores"),
  where("userId", "==", user.uid)
);

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setScores(data);
  };

  // ✅ Add score
  const addScore = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage("User not logged in");
        return;
      }

      const today = new Date().toISOString().slice(0, 10);

      const q = query(
        collection(db, "scores"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // ❌ Prevent duplicate date
      if (data.find(s => s.date === today)) {
        setMessage("Already added today");
        return;
      }

      // ❌ Keep only last 5 scores
      if (data.length >= 5) {
        const oldest = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        )[0];

        await deleteDoc(doc(db, "scores", oldest.id));
      }

      // ✅ Add new score
      await addDoc(collection(db, "scores"), {
        userId: user.uid,
        score: Math.floor(Math.random() * 45) + 1,
        date: today,
        createdAt: new Date()
      });

      setMessage("Score added successfully!");
      fetchScores(user);

      // auto clear message
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      console.log(err);
      setMessage(err.message);
    }
  };

  const today = new Date().toISOString().slice(0, 10);
  const alreadyAdded = scores.find(s => s.date === today);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">

      {/* Message */}
      {message && (
        <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4">
          {message}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold">Play. Win. Give Back.</h1>
          <p className="text-gray-400">
            Track your performance and support a cause.
          </p>
        </div>

        <button
          onClick={addScore}
          disabled={alreadyAdded}
          className={`px-4 py-2 rounded-lg ${
            alreadyAdded
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {alreadyAdded ? "Already Added Today" : "+ Add Score"}
        </button>
      </div>

      {/* Stats */}
      <CharitySelector />
      <div className="mt-20 mb-10">
  <DrawSystem scores={scores} />
</div>
      <div className="grid md:grid-cols-3 gap-4 mb-12">

        <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
          <p className="text-gray-300">Total Scores</p>
          <h2 className="text-2xl font-bold">{scores.length}</h2>
        </div>

        <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
          <p className="text-gray-300">Best Score</p>
          <h2 className="text-2xl font-bold">
            {scores.length ? Math.max(...scores.map(s => s.score)) : 0}
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
          <p className="text-gray-300">Latest Score</p>
          <h2 className="text-2xl font-bold">
            {scores[0]?.score || 0}
          </h2>
        </div>

      </div>

      {/* Score List */}
      <div>
        <h2 className="text-xl mb-4">Your Scores</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {scores.length === 0 && (
            <p className="text-gray-400">No scores yet</p>
          )}

          {scores.map((s) => (
            <div
              key={s.id}
              className="bg-white/10 backdrop-blur p-4 rounded-xl hover:scale-105 transition"
            >
              <p className="text-lg font-semibold">Score: {s.score}</p>
              <p className="text-sm text-gray-300">{s.date}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}