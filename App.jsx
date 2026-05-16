import React, { useState } from "react";

const starterPlans = [
  {
    id: 1,
    title: "Mia’s Birthday Party",
    type: "Birthday",
    date: "Saturday, 2:00 PM",
    theme: "Pink Fairy Picnic",
    people: ["Courtney", "Mum", "Nan", "Aunty Jess"],
    bringList: [
      { name: "Birthday cake", person: "Courtney", done: true },
      { name: "Fruit platter", person: "Nan", done: false },
      { name: "Balloons", person: "Aunty Jess", done: false },
      { name: "Party bags", person: "Mum", done: true },
    ],
    shopping: ["Candles", "Pink plates", "Napkins", "Lollies", "Juice boxes"],
    videos: ["Cake inspo", "Balloon arch", "Kids party table"],
    reminders: ["Pick up cake at 10 AM", "Set table before guests arrive"],
  },
  {
    id: 2,
    title: "Christmas Lunch",
    type: "Christmas",
    date: "25 December, 12:30 PM",
    theme: "Cosy Aussie Christmas",
    people: ["Courtney", "Mum", "Dad", "Nan", "Rory"],
    bringList: [
      { name: "Potato bake", person: "Courtney", done: true },
      { name: "Seafood", person: "Dad", done: false },
      { name: "Dessert", person: "Nan", done: false },
      { name: "Drinks", person: "Rory", done: false },
    ],
    shopping: ["Cream", "Potatoes", "Cheese", "Christmas crackers", "Ice"],
    videos: ["Christmas table", "Easy dessert", "Gift wrapping"],
    reminders: ["Buy seafood Christmas Eve", "Charge speaker", "Wrap last gifts"],
  },
];

const planTypes = ["Birthday", "Christmas", "Dinner", "Camping", "Baby Shower"];

export default function App() {
  const [tab, setTab] = useState("home");
  const [plans, setPlans] = useState(starterPlans);
  const [selectedPlan, setSelectedPlan] = useState(starterPlans[0]);
  const [showCreate, setShowCreate] = useState(false);
  const [popup, setPopup] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Birthday");
  const [newDate, setNewDate] = useState("");
  const [newTheme, setNewTheme] = useState("");

  const [newBringItem, setNewBringItem] = useState("");
  const [newBringPerson, setNewBringPerson] = useState("");
  const [newShoppingItem, setNewShoppingItem] = useState("");
  const [newVideo, setNewVideo] = useState("");
  const [newReminder, setNewReminder] = useState("");

  const openPlan = (plan) => {
    setSelectedPlan(plan);
    setTab("plan");
  };

  const updateSelectedPlan = (updatedPlan) => {
    setSelectedPlan(updatedPlan);
    setPlans(plans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)));
  };

  const createPlan = () => {
    if (!newTitle.trim()) {
      setPopup("Give your plan a name first, like ‘Lily’s 5th Birthday’ or ‘Christmas Lunch’.");
      return;
    }

    const freshPlan = {
      id: Date.now(),
      title: newTitle,
      type: newType,
      date: newDate || "Date not set yet",
      theme: newTheme || "No theme yet",
      people: ["You"],
      bringList: [],
      shopping: [],
      videos: [],
      reminders: [],
    };

    setPlans([freshPlan, ...plans]);
    setSelectedPlan(freshPlan);
    setNewTitle("");
    setNewDate("");
    setNewTheme("");
    setNewType("Birthday");
    setShowCreate(false);
    setTab("plan");
  };

  const addBringItem = () => {
    if (!newBringItem.trim()) return;

    const updated = {
      ...selectedPlan,
      bringList: [
        ...selectedPlan.bringList,
        {
          name: newBringItem,
          person: newBringPerson || "Not chosen yet",
          done: false,
        },
      ],
    };

    updateSelectedPlan(updated);
    setNewBringItem("");
    setNewBringPerson("");
  };

  const toggleBringDone = (index) => {
    const updatedBringList = [...selectedPlan.bringList];
    updatedBringList[index].done = !updatedBringList[index].done;

    updateSelectedPlan({
      ...selectedPlan,
      bringList: updatedBringList,
    });
  };

  const addShoppingItem = () => {
    if (!newShoppingItem.trim()) return;

    updateSelectedPlan({
      ...selectedPlan,
      shopping: [...selectedPlan.shopping, newShoppingItem],
    });

    setNewShoppingItem("");
  };

  const addVideo = () => {
    if (!newVideo.trim()) return;

    updateSelectedPlan({
      ...selectedPlan,
      videos: [...selectedPlan.videos, newVideo],
    });

    setNewVideo("");
  };

  const addReminder = () => {
    if (!newReminder.trim()) return;

    updateSelectedPlan({
      ...selectedPlan,
      reminders: [...selectedPlan.reminders, newReminder],
    });

    setNewReminder("");
  };

  return (
    <div className="min-h-screen bg-[#06030a] text-white flex justify-center">
      <div className="relative w-full max-w-[430px] min-h-screen bg-gradient-to-b from-[#1a0827] via-[#090410] to-black overflow-hidden border-x border-white/10">
        <Glow />

        <main className="relative z-10 px-5 pt-6 pb-28">
          {tab === "home" && (
            <>
              <Header
                small="Hello Vella"
                title="Plan life together"
                text="Birthdays, Christmas, dinners, camping trips and family plans — all organised in one pretty place."
              />

              <button
                onClick={() => setShowCreate(true)}
                className="w-full rounded-3xl bg-white text-black py-4 font-black shadow-xl shadow-pink-500/20 mb-5 active:scale-[0.98]"
              >
                + Create New Plan
              </button>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <MiniAction
                  icon="🎂"
                  title="Birthday"
                  onClick={() => {
                    setNewType("Birthday");
                    setShowCreate(true);
                  }}
                />
                <MiniAction
                  icon="🎄"
                  title="Christmas"
                  onClick={() => {
                    setNewType("Christmas");
                    setShowCreate(true);
                  }}
                />
                <MiniAction
                  icon="🍝"
                  title="Dinner"
                  onClick={() => {
                    setNewType("Dinner");
                    setShowCreate(true);
                  }}
                />
                <MiniAction
                  icon="⛺"
                  title="Camping"
                  onClick={() => {
                    setNewType("Camping");
                    setShowCreate(true);
                  }}
                />
              </div>

              <SectionTitle title="Your plans" />

              <div className="space-y-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => openPlan(plan)}
                    className="w-full text-left rounded-[28px] bg-white/10 border border-white/10 p-4 shadow-xl backdrop-blur-xl active:scale-[0.99]"
                  >
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-xs text-pink-200 font-bold">{plan.type}</p>
                        <h2 className="text-xl font-black mt-1">{plan.title}</h2>
                        <p className="text-sm text-white/60 mt-1">{plan.date}</p>
                      </div>

                      <span className="h-fit text-xs rounded-full px-3 py-1 bg-pink-400/20 text-pink-100">
                        {plan.people.length} people
                      </span>
                    </div>

                    <p className="text-sm text-white/70 mt-3">{plan.theme}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {plan.people.slice(0, 5).map((person) => (
                          <Avatar key={person} name={person} />
                        ))}
                      </div>

                      <p className="text-xs text-white/50">
                        {plan.bringList.filter((item) => item.done).length}/{plan.bringList.length} done
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {tab === "plan" && selectedPlan && (
            <>
              <button onClick={() => setTab("home")} className="text-sm text-pink-200 mb-4">
                ← Back to plans
              </button>

              <div className="rounded-[32px] bg-white/10 border border-white/10 p-5 mb-5 shadow-xl">
                <p className="text-xs text-pink-200 font-bold">{selectedPlan.type}</p>
                <h1 className="text-3xl font-black mt-1">{selectedPlan.title}</h1>
                <p className="text-white/60 text-sm mt-2">{selectedPlan.date}</p>
                <p className="text-white/70 text-sm mt-3">{selectedPlan.theme}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setPopup("Invite link copied. In the real app, this would let family and friends join the plan.")}
                    className="flex-1 rounded-2xl bg-pink-400 text-black py-3 font-black"
                  >
                    Invite
                  </button>
                  <button
                    onClick={() => setPopup("AI Planner would help create food ideas, jobs, reminders and shopping lists.")}
                    className="flex-1 rounded-2xl bg-white/10 py-3 font-bold"
                  >
                    AI Plan
                  </button>
                </div>
              </div>

              <SectionTitle title="People in this plan" />
              <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                {selectedPlan.people.map((person) => (
                  <div key={person} className="min-w-fit rounded-2xl bg-white/10 border border-white/10 px-4 py-3">
                    <p className="font-bold">{person}</p>
                  </div>
                ))}
                <button
                  onClick={() => setPopup("In the real app, this opens your contacts so you can add a friend or family member.")}
                  className="min-w-fit rounded-2xl bg-pink-400 text-black px-4 py-3 font-black"
                >
                  + Add
                </button>
              </div>

              <SectionTitle title="Who’s bringing what" />
              <div className="space-y-3 mb-4">
                {selectedPlan.bringList.length === 0 && <Empty text="No dishes, jobs or items added yet." />}

                {selectedPlan.bringList.map((item, index) => (
                  <button
                    key={`${item.name}-${index}`}
                    onClick={() => toggleBringDone(index)}
                    className={`w-full rounded-3xl border p-4 flex items-center justify-between ${
                      item.done
                        ? "bg-green-400/15 border-green-300/30"
                        : "bg-white/10 border-white/10"
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-black">{item.name}</p>
                      <p className="text-sm text-white/60">{item.person}</p>
                    </div>
                    <span className="text-xl">{item.done ? "✅" : "⬜"}</span>
                  </button>
                ))}
              </div>

              <Card>
                <input
                  value={newBringItem}
                  onChange={(e) => setNewBringItem(e.target.value)}
                  placeholder="Add food, job or item..."
                  className="Input"
                />
                <input
                  value={newBringPerson}
                  onChange={(e) => setNewBringPerson(e.target.value)}
                  placeholder="Who is bringing it?"
                  className="Input"
                />
                <button onClick={addBringItem} className="PrimaryButton">
                  Add to plan
                </button>
              </Card>

              <SectionTitle title="Shopping list" />
              <Card>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedPlan.shopping.length === 0 && <Empty text="No shopping items yet." />}
                  {selectedPlan.shopping.map((item, index) => (
                    <span key={`${item}-${index}`} className="rounded-full bg-white/10 px-3 py-2 text-sm">
                      {item}
                    </span>
                  ))}
                </div>

                <input
                  value={newShoppingItem}
                  onChange={(e) => setNewShoppingItem(e.target.value)}
                  placeholder="Add shopping item..."
                  className="Input"
                />
                <button onClick={addShoppingItem} className="PrimaryButton">
                  Add shopping item
                </button>
              </Card>

              <SectionTitle title="Saved video ideas" />
              <div className="grid grid-cols-2 gap-3 mb-4">
                {selectedPlan.videos.map((video, index) => (
                  <button
                    key={`${video}-${index}`}
                    onClick={() => setPopup("This would open the saved video so everyone can see the idea.")}
                    className="h-36 rounded-[28px] bg-gradient-to-br from-pink-500/30 to-purple-500/20 border border-white/10 p-3 flex items-end text-left"
                  >
                    <p className="text-sm font-black">{video}</p>
                  </button>
                ))}
              </div>

              <Card>
                <input
                  value={newVideo}
                  onChange={(e) => setNewVideo(e.target.value)}
                  placeholder="Add saved video idea..."
                  className="Input"
                />
                <button onClick={addVideo} className="PrimaryButton">
                  Save video idea
                </button>
              </Card>

              <SectionTitle title="Reminders" />
              <Card>
                <div className="space-y-2 mb-3">
                  {selectedPlan.reminders.length === 0 && <Empty text="No reminders yet." />}
                  {selectedPlan.reminders.map((reminder, index) => (
                    <div key={`${reminder}-${index}`} className="rounded-2xl bg-black/30 px-4 py-3 text-sm">
                      ⏰ {reminder}
                    </div>
                  ))}
                </div>

                <input
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                  placeholder="Add reminder..."
                  className="Input"
                />
                <button onClick={addReminder} className="PrimaryButton">
                  Add reminder
                </button>
              </Card>

              <PremiumCard />
            </>
          )}

          {tab === "vault" && (
            <>
              <Header
                small="Vella Vault"
                title="Saved ideas"
                text="Save recipes, gift ideas, party inspo, outfits, shopping finds and videos into folders."
              />
              <VaultGrid />
            </>
          )}

          {tab === "calendar" && (
            <>
              <Header
                small="Calendar"
                title="What’s coming up"
                text="Your family events, birthdays, reminders and shared plans all live here."
              />
              <div className="space-y-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => openPlan(plan)}
                    className="w-full rounded-3xl bg-white/10 border border-white/10 p-4 text-left"
                  >
                    <p className="text-pink-200 text-sm">{plan.date}</p>
                    <p className="text-xl font-black">{plan.title}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {tab === "premium" && (
            <>
              <Header
                small="Vella Premium"
                title="Make planning easier"
                text="For families, mums, friend groups and busy people who organise everything."
              />
              <PremiumCard />
              <Card>
                <p className="font-black mb-2">Premium includes:</p>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>✨ Unlimited plans</li>
                  <li>✨ AI birthday and Christmas planner</li>
                  <li>✨ Shared reminders</li>
                  <li>✨ Group video folders</li>
                  <li>✨ Smart shopping lists</li>
                  <li>✨ Pretty themes</li>
                </ul>
              </Card>
            </>
          )}
        </main>

        <BottomNav tab={tab} setTab={setTab} />

        {showCreate && (
          <Modal title="Create a new plan" onClose={() => setShowCreate(false)}>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Plan name..."
              className="Input"
            />

            <select value={newType} onChange={(e) => setNewType(e.target.value)} className="Input">
              {planTypes.map((type) => (
                <option key={type} value={type} className="text-black">
                  {type}
                </option>
              ))}
            </select>

            <input
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              placeholder="Date or time..."
              className="Input"
            />

            <input
              value={newTheme}
              onChange={(e) => setNewTheme(e.target.value)}
              placeholder="Theme or vibe..."
              className="Input"
            />

            <button onClick={createPlan} className="PrimaryButton">
              Create plan
            </button>
          </Modal>
        )}

        {popup && (
          <Modal title="Coming soon" onClose={() => setPopup("")}>
            <p className="text-white/70 text-sm mb-4">{popup}</p>
            <button onClick={() => setPopup("")} className="PrimaryButton">
              Got it
            </button>
          </Modal>
        )}

        <style>{`
          .Input {
            width: 100%;
            background: rgba(0,0,0,0.35);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 18px;
            padding: 13px 15px;
            color: white;
            outline: none;
            margin-bottom: 10px;
          }

          .Input::placeholder {
            color: rgba(255,255,255,0.45);
          }

          .PrimaryButton {
            width: 100%;
            background: #f472b6;
            color: black;
            border-radius: 18px;
            padding: 13px;
            font-weight: 900;
            box-shadow: 0 12px 30px rgba(244, 114, 182, 0.22);
          }

          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
}

function Header({ small, title, text }) {
  return (
    <header className="mb-6">
      <p className="text-sm text-pink-200 font-bold">{small}</p>
      <h1 className="text-3xl font-black tracking-tight mt-1">{title}</h1>
      <p className="text-white/60 text-sm mt-2">{text}</p>
    </header>
  );
}

function SectionTitle({ title }) {
  return <h2 className="text-lg font-black mb-3 mt-6">{title}</h2>;
}

function Card({ children }) {
  return <div className="rounded-[28px] bg-white/10 border border-white/10 p-4 mb-5">{children}</div>;
}

function Empty({ text }) {
  return <p className="text-sm text-white/45">{text}</p>;
}

function Avatar({ name }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-purple-500 border border-white/30 flex items-center justify-center text-xs font-black">
      {name[0]}
    </div>
  );
}

function MiniAction({ icon, title, onClick }) {
  return (
    <button onClick={onClick} className="rounded-3xl bg-white/10 border border-white/10 p-4 text-left active:scale-[0.98]">
      <p className="text-2xl">{icon}</p>
      <p className="font-black mt-2">{title}</p>
      <p className="text-xs text-white/50">Start plan</p>
    </button>
  );
}

function VaultGrid() {
  const folders = [
    ["🎂", "Birthdays"],
    ["🎄", "Christmas"],
    ["🍝", "Recipes"],
    ["🎁", "Gift Ideas"],
    ["⛺", "Camping"],
    ["✨", "Inspo"],
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {folders.map(([icon, name]) => (
        <button key={name} className="h-32 rounded-[28px] bg-white/10 border border-white/10 p-4 text-left">
          <p className="text-3xl">{icon}</p>
          <p className="font-black mt-3">{name}</p>
          <p className="text-xs text-white/50">Saved videos</p>
        </button>
      ))}
    </div>
  );
}

function PremiumCard() {
  return (
    <div className="rounded-[32px] bg-white text-black p-5 shadow-xl mb-5">
      <p className="text-xs font-black text-pink-600">VELLA PREMIUM</p>
      <h2 className="text-2xl font-black mt-1">Unlock family planning magic</h2>
      <p className="text-sm text-black/65 mt-2">
        Unlimited plans, AI event help, shared reminders, smart shopping lists, custom themes and bigger video vaults.
      </p>
      <button className="w-full mt-4 rounded-2xl bg-black text-white py-3 font-black">
        Upgrade — $7.99/month
      </button>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center">
      <div className="w-full max-w-[430px] rounded-t-[34px] bg-[#13081f] border-t border-white/10 p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black">{title}</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function BottomNav({ tab, setTab }) {
  const nav = [
    ["home", "🏠", "Home"],
    ["vault", "💾", "Vault"],
    ["calendar", "📅", "Plans"],
    ["premium", "✨", "Pro"],
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black/85 backdrop-blur-xl border-t border-white/10 px-3 py-3 z-40">
      <div className="grid grid-cols-4 gap-2">
        {nav.map(([id, icon, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-2xl py-3 text-xs font-black ${
              tab === id
                ? "bg-pink-400 text-black shadow-lg shadow-pink-400/30"
                : "bg-white/10 text-white/65"
            }`}
          >
            <div>{icon}</div>
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Glow() {
  return (
    <>
      <div className="absolute top-[-80px] left-[-80px] w-64 h-64 rounded-full bg-pink-500/25 blur-3xl" />
      <div className="absolute bottom-20 right-[-90px] w-64 h-64 rounded-full bg-purple-500/25 blur-3xl" />
      <div className="absolute top-1/3 right-[-120px] w-52 h-52 rounded-full bg-fuchsia-400/10 blur-3xl" />
    </>
  );
}
