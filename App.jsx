import React, { useState } from "react";

const eventsData = [
  {
    id: 1,
    title: "Mia’s Birthday Party",
    date: "Saturday 2:00 PM",
    people: ["Mum", "Aunty Jess", "Courtney", "Nan"],
    theme: "Pink Fairy Picnic",
    items: [
      { name: "Cake", person: "Courtney", done: true },
      { name: "Fruit platter", person: "Nan", done: false },
      { name: "Balloons", person: "Aunty Jess", done: false },
      { name: "Party bags", person: "Mum", done: true },
    ],
    videos: ["Cake inspo video", "Balloon arch idea", "Party table setup"],
  },
  {
    id: 2,
    title: "Christmas Lunch",
    date: "25 Dec, 12:30 PM",
    people: ["Mum", "Dad", "Courtney", "Rory", "Nan"],
    theme: "Cosy Aussie Christmas",
    items: [
      { name: "Potato bake", person: "Courtney", done: true },
      { name: "Seafood", person: "Dad", done: false },
      { name: "Dessert", person: "Nan", done: false },
      { name: "Drinks", person: "Rory", done: false },
    ],
    videos: ["Christmas table idea", "Easy dessert video", "Gift wrapping hack"],
  },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [selectedEvent, setSelectedEvent] = useState(eventsData[0]);
  const [items, setItems] = useState(eventsData[0].items);
  const [newItem, setNewItem] = useState("");
  const [newPerson, setNewPerson] = useState("");

  const openEvent = (event) => {
    setSelectedEvent(event);
    setItems(event.items);
    setTab("event");
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([
      ...items,
      {
        name: newItem,
        person: newPerson || "Not picked yet",
        done: false,
      },
    ]);
    setNewItem("");
    setNewPerson("");
  };

  const toggleDone = (index) => {
    const updated = [...items];
    updated[index].done = !updated[index].done;
    setItems(updated);
  };

  return (
    <div className="min-h-screen bg-[#07040d] text-white flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-gradient-to-b from-[#15071f] via-[#09040f] to-black relative overflow-hidden border-x border-white/10">
        
        <div className="absolute top-[-80px] left-[-80px] w-56 h-56 bg-pink-500/25 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-[-80px] w-56 h-56 bg-purple-500/25 blur-3xl rounded-full" />

        <main className="relative z-10 pb-28 px-5 pt-6">
          {tab === "home" && (
            <>
              <header className="mb-6">
                <p className="text-sm text-pink-200">Hello Vella</p>
                <h1 className="text-3xl font-bold tracking-tight">
                  Plan life together ✨
                </h1>
                <p className="text-white/60 text-sm mt-2">
                  Events, lists, videos, reminders and who’s bringing what — all in one place.
                </p>
              </header>

              <button className="w-full mb-5 rounded-3xl bg-white text-black font-bold py-4 shadow-lg shadow-pink-500/20">
                + Create New Plan
              </button>

              <section className="space-y-4">
                {eventsData.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => openEvent(event)}
                    className="w-full text-left rounded-3xl bg-white/10 border border-white/10 p-4 backdrop-blur-xl shadow-xl"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold">{event.title}</h2>
                        <p className="text-pink-200 text-sm">{event.date}</p>
                      </div>
                      <span className="text-xs bg-pink-400/20 text-pink-100 px-3 py-1 rounded-full">
                        {event.people.length} people
                      </span>
                    </div>

                    <p className="mt-3 text-white/70 text-sm">{event.theme}</p>

                    <div className="mt-4 flex -space-x-2">
                      {event.people.map((person) => (
                        <div
                          key={person}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-purple-500 border border-white/30 flex items-center justify-center text-xs font-bold"
                        >
                          {person[0]}
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </section>
            </>
          )}

          {tab === "event" && (
            <>
              <button
                onClick={() => setTab("home")}
                className="text-sm text-pink-200 mb-4"
              >
                ← Back to plans
              </button>

              <header className="rounded-3xl bg-white/10 border border-white/10 p-5 mb-5 shadow-xl">
                <p className="text-pink-200 text-sm">{selectedEvent.date}</p>
                <h1 className="text-3xl font-bold mt-1">{selectedEvent.title}</h1>
                <p className="text-white/60 mt-2">{selectedEvent.theme}</p>
              </header>

              <section className="mb-5">
                <h2 className="text-lg font-bold mb-3">Who’s bringing what</h2>

                <div className="space-y-3">
                  {items.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => toggleDone(index)}
                      className={`w-full rounded-2xl p-4 flex justify-between items-center border ${
                        item.done
                          ? "bg-green-400/15 border-green-300/30"
                          : "bg-white/10 border-white/10"
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-white/60">{item.person}</p>
                      </div>
                      <span>{item.done ? "✅" : "⬜"}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-3xl bg-white/10 border border-white/10 p-4">
                  <input
                    className="w-full bg-black/30 rounded-2xl px-4 py-3 mb-2 outline-none"
                    placeholder="Add item, dish or job..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                  <input
                    className="w-full bg-black/30 rounded-2xl px-4 py-3 mb-3 outline-none"
                    placeholder="Who is bringing it?"
                    value={newPerson}
                    onChange={(e) => setNewPerson(e.target.value)}
                  />
                  <button
                    onClick={addItem}
                    className="w-full bg-pink-400 text-black font-bold rounded-2xl py-3"
                  >
                    Add to plan
                  </button>
                </div>
              </section>

              <section className="mb-5">
                <h2 className="text-lg font-bold mb-3">Saved videos</h2>
                <div className="grid grid-cols-2 gap-3">
                  {selectedEvent.videos.map((video) => (
                    <div
                      key={video}
                      className="h-36 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-500/20 border border-white/10 p-3 flex items-end"
                    >
                      <p className="text-sm font-semibold">{video}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-white text-black p-5 shadow-xl">
                <h2 className="text-xl font-bold">Vella Premium</h2>
                <p className="text-sm mt-2 text-black/70">
                  Unlock unlimited plans, AI party planning, shopping lists, reminders,
                  shared videos and custom themes.
                </p>
                <button className="mt-4 w-full bg-black text-white rounded-2xl py-3 font-bold">
                  Upgrade — $7.99/month
                </button>
              </section>
            </>
          )}

          {tab === "lists" && (
            <section>
              <h1 className="text-3xl font-bold mb-4">Shopping Lists</h1>
              <div className="rounded-3xl bg-white/10 border border-white/10 p-5">
                <p className="text-white/70">
                  Create shared grocery, gift, party and recipe lists here.
                </p>
              </div>
            </section>
          )}

          {tab === "calendar" && (
            <section>
              <h1 className="text-3xl font-bold mb-4">Calendar</h1>
              <div className="rounded-3xl bg-white/10 border border-white/10 p-5">
                <p className="text-white/70">
                  Birthdays, Christmas plans, dinners, reminders and friend events live here.
                </p>
              </div>
            </section>
          )}

          {tab === "vault" && (
            <section>
              <h1 className="text-3xl font-bold mb-4">Vella Vault</h1>
              <div className="rounded-3xl bg-white/10 border border-white/10 p-5">
                <p className="text-white/70">
                  Save videos, recipes, gift ideas, outfit ideas and inspo into event folders.
                </p>
              </div>
            </section>
          )}
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black/80 backdrop-blur-xl border-t border-white/10 px-4 py-3 z-20">
          <div className="grid grid-cols-4 gap-2 text-xs">
            <button onClick={() => setTab("home")} className={navClass(tab === "home")}>
              🏠 Home
            </button>
            <button onClick={() => setTab("lists")} className={navClass(tab === "lists")}>
              🛒 Lists
            </button>
            <button onClick={() => setTab("calendar")} className={navClass(tab === "calendar")}>
              📅 Calendar
            </button>
            <button onClick={() => setTab("vault")} className={navClass(tab === "vault")}>
              💾 Vault
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

function navClass(active) {
  return `rounded-2xl py-3 font-bold ${
    active
      ? "bg-pink-400 text-black shadow-lg shadow-pink-400/30"
      : "bg-white/10 text-white/70"
  }`;
}
