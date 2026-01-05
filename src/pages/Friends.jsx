import { useEffect, useState } from "react";

/* ---------- SEED DATA ---------- */
const SEED_FRIENDS = [
  { id: 1, name: "Priyam", amount: -200 },
  { id: 2, name: "Yatharth", amount: 150 },
  { id: 3, name: "Srishti", amount: -50 },
];

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("friends");

    if (saved) {
      setFriends(JSON.parse(saved));
    } else {
      setFriends(SEED_FRIENDS);
      localStorage.setItem("friends", JSON.stringify(SEED_FRIENDS));
    }
  }, []);

  /* ---------- SAVE DATA ---------- */
  useEffect(() => {
    if (friends.length > 0) {
      localStorage.setItem("friends", JSON.stringify(friends));
    }
  }, [friends]);

  /* ---------- ADD FRIEND ---------- */
  function addFriend() {
    if (!name.trim() || amount === "") return;

    setFriends((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        amount: Number(amount),
      },
    ]);

    setName("");
    setAmount("");
    setShowModal(false);
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Friends</h1>
          <p className="text-gray-500">Add and manage friends</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
        >
          + Add Friend
        </button>
      </div>

      {/* FRIENDS LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{friend.name}</h3>
              <p className="text-sm text-gray-500">Friend</p>
            </div>

            <p
              className={`font-semibold ${
                friend.amount >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {friend.amount >= 0
                ? `Gets ₹${friend.amount}`
                : `Owes ₹${Math.abs(friend.amount)}`}
            </p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-xl p-6 w-[380px]">
            <h2 className="text-lg font-semibold mb-4">Add Friend</h2>

            <label className="text-sm text-gray-300">Friend Name</label>
            <input
              className="w-full mt-2 mb-4 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700"
              placeholder="e.g. Rahul"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="text-sm text-gray-300">
              Amount ( + gets / - owes )
            </label>
            <input
              type="number"
              className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700"
              placeholder="-200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={addFriend}
                className="px-4 py-2 rounded-lg bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
