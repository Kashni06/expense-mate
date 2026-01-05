import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/* ---------------- SEED DATA ---------------- */

const SEED_GROUPS = [
  {
    id: 1,
    name: "Goa Trip",
    members: [
      { name: "You", balance: -2000 },
      { name: "Priyam", balance: 2200 },
      { name: "Srishti", balance: -200 },
    ],
    expenses: [
      {
        title: "Dinner",
        meta: "Food • 2025-08-11 • Paid by Srishti",
        amount: 1800,
      },
      {
        title: "Hotel",
        meta: "Travel • 2025-08-10 • Paid by Priyam",
        amount: 4200,
      },
    ],
  },
  {
    id: 2,
    name: "Flat Rent",
    members: [
      { name: "You", balance: 0 },
      { name: "Priyam", balance: 0 },
      { name: "Srishti", balance: 0 },
    ],
    expenses: [],
  },
];

export default function Groups() {
  const location = useLocation();

  const [groups, setGroups] = useState([]);
  const [activeGroupId, setActiveGroupId] = useState(null);

  /* ---------- MODALS ---------- */
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState("");

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("groups");
    if (saved) {
      const parsed = JSON.parse(saved);
      setGroups(parsed);
      setActiveGroupId(parsed[0]?.id);
    } else {
      setGroups(SEED_GROUPS);
      setActiveGroupId(SEED_GROUPS[0].id);
      localStorage.setItem("groups", JSON.stringify(SEED_GROUPS));
    }
  }, []);

  /* ---------- SAVE DATA ---------- */
  useEffect(() => {
    if (groups.length) {
      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }, [groups]);

  /* ---------- OPEN ADD EXPENSE FROM SIDEBAR ---------- */
  useEffect(() => {
    if (location.state?.openExpense) {
      setShowExpenseModal(true);
    }
  }, [location.state]);

  const activeGroup = groups.find((g) => g.id === activeGroupId);

  /* ---------- ADD GROUP ---------- */
  function addGroup() {
    if (!groupName.trim()) return;

    const members = groupMembers
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean)
      .map((name) => ({ name, balance: 0 }));

    const newGroup = {
      id: Date.now(),
      name: groupName,
      members: [{ name: "You", balance: 0 }, ...members],
      expenses: [],
    };

    setGroups([...groups, newGroup]);
    setActiveGroupId(newGroup.id);

    setGroupName("");
    setGroupMembers("");
    setShowGroupModal(false);
  }

  /* ---------- ADD EXPENSE ---------- */
  function addExpense() {
    if (!expenseDesc || !expenseAmount) return;

    setGroups((prev) =>
      prev.map((g) =>
        g.id === activeGroupId
          ? {
              ...g,
              expenses: [
                ...g.expenses,
                {
                  title: expenseDesc,
                  meta: "General • Today • Paid by You",
                  amount: Number(expenseAmount),
                },
              ],
            }
          : g
      )
    );

    setExpenseDesc("");
    setExpenseAmount("");
    setShowExpenseModal(false);
  }

  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      {/* LEFT */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Groups</h2>
          <button
            onClick={() => setShowGroupModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm"
          >
            + New
          </button>
        </div>

        {groups.map((g) => (
          <div
            key={g.id}
            onClick={() => setActiveGroupId(g.id)}
            className={`p-4 rounded-xl border cursor-pointer mb-3 ${
              g.id === activeGroupId
                ? "border-purple-500"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <h3 className="font-medium">{g.name}</h3>
            <p className="text-sm text-gray-500">
              {g.members.length} members • {g.expenses.length} expenses
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="md:col-span-2 space-y-6">
        {/* HEADER */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{activeGroup?.name}</h2>
              <p className="text-sm text-gray-500">
                {activeGroup?.members.length} members
              </p>
            </div>
            <button
              onClick={() => setShowExpenseModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm"
            >
              + Add Expense
            </button>
          </div>

          {activeGroup?.members.map((m, i) => (
            <div key={i} className="flex justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                  {m.name[0]}
                </div>
                {m.name}
              </div>
              <span
                className={m.balance >= 0 ? "text-green-500" : "text-red-500"}
              >
                {m.balance >= 0
                  ? `Gets ₹${m.balance}`
                  : `Owes ₹${Math.abs(m.balance)}`}
              </span>
            </div>
          ))}
        </div>

        {/* EXPENSES */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Expenses</h3>

          {activeGroup?.expenses.length === 0 && (
            <p className="text-sm text-gray-500">No expenses yet.</p>
          )}

          {activeGroup?.expenses.map((e, i) => (
            <div key={i} className="flex justify-between border-b py-3">
              <div>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-gray-500">{e.meta}</p>
              </div>
              <span className="font-semibold">₹{e.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ADD GROUP MODAL */}
      {showGroupModal && (
        <Modal title="Create Group" onClose={() => setShowGroupModal(false)}>
          <input
            className="input"
            placeholder="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <input
            className="input mt-3"
            placeholder="Members (comma separated)"
            value={groupMembers}
            onChange={(e) => setGroupMembers(e.target.value)}
          />
          <ModalActions
            onCancel={() => setShowGroupModal(false)}
            onConfirm={addGroup}
          />
        </Modal>
      )}

      {/* ADD EXPENSE MODAL */}
      {showExpenseModal && (
        <Modal title="Add Expense" onClose={() => setShowExpenseModal(false)}>
          <input
            className="input"
            placeholder="Description"
            value={expenseDesc}
            onChange={(e) => setExpenseDesc(e.target.value)}
          />
          <input
            type="number"
            className="input mt-3"
            placeholder="Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
          <ModalActions
            onCancel={() => setShowExpenseModal(false)}
            onConfirm={addExpense}
          />
        </Modal>
      )}
    </div>
  );
}

/* ---------------- MODAL ---------------- */

function Modal({ title, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[360px]">
        <h3 className="font-semibold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function ModalActions({ onCancel, onConfirm }) {
  return (
    <div className="flex justify-end gap-3 mt-6">
      <button onClick={onCancel} className="px-4 py-2 border rounded-xl">
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      >
        OK
      </button>
    </div>
  );
}
