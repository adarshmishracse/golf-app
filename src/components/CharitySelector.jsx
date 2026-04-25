import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

export default function CharitySelector() {
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetchCharities();
    loadUserSelection();
  }, []);

  // 🔹 get all charities
  const fetchCharities = async () => {
    const snapshot = await getDocs(collection(db, "charities"));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCharities(data);
  };

  // 🔹 load saved selection
  const loadUserSelection = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSelected(docSnap.data().charityId);
    }
  };

  // 🔹 select charity
  const selectCharity = async (charityId) => {
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
      { charityId: charityId },
      { merge: true }
    );

    setSelected(charityId);
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl mb-4">Choose Your Charity</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {charities.map(c => (
         <div
  key={c.id}
  onClick={() => selectCharity(c.id)}
  className={`p-4 rounded-xl cursor-pointer border transition hover:scale-105 ${
    selected === c.id
      ? "border-purple-500 bg-purple-500/20"
      : "border-gray-600 hover:border-purple-400"
  }`}
>
  <img
    src={c.image}
    alt={c.name}
    className="rounded mb-3 w-full h-40 object-cover"
  />

  <h3 className="font-bold text-lg">{c.name}</h3>
  <p className="text-sm text-gray-400 mt-1">{c.description}</p>
</div>
        ))}
      </div>
    </div>
  );
}