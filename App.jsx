import React, { useMemo, useState } from "react";

const today = "31 May 2026";

const categories = [
  { id: "fashion", icon: "👗", title: "Fashion", desc: "Outfits, stores, lives and style groups" },
  { id: "dinner", icon: "🍝", title: "Dinner Ideas", desc: "Recipes, meal plans and grocery saves" },
  { id: "workouts", icon: "💪", title: "Workouts", desc: "Fitness videos, challenges and reminders" },
  { id: "shopping", icon: "🛍️", title: "Shopping", desc: "Choose what you want to buy today" },
  { id: "beauty", icon: "💄", title: "Beauty", desc: "Makeup, skincare, hair and routines" },
  { id: "home", icon: "🏠", title: "Home Ideas", desc: "Decor, cleaning, organising and cosy spaces" },
  { id: "fixing", icon: "🔨", title: "DIY & Fixing", desc: "Hardware, repairs, tools and home fixes" },
  { id: "gifts", icon: "🎁", title: "Gifts", desc: "Birthday, Christmas and surprise ideas" },
];

const shoppingCategories = [
  { id: "clothing", icon: "👗", title: "Clothing" },
  { id: "beauty-shop", icon: "💄", title: "Beauty" },
  { id: "hardware-shop", icon: "🔨", title: "Hardware" },
  { id: "home-shop", icon: "🏠", title: "Home" },
  { id: "tech", icon: "📱", title: "Tech" },
  { id: "pets", icon: "🐾", title: "Pets" },
  { id: "gaming", icon: "🎮", title: "Gaming" },
  { id: "gifts-shop", icon: "🎁", title: "Gifts" },
];

const content = [
  {
    id: 1,
    category: "fashion",
    type: "Feed",
    title: "Black dress outfit idea",
    creator: "Mia Luxe",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop",
    text: "Save this look for your next night out.",
  },
  {
    id: 2,
    category: "dinner",
    type: "Recipe",
    title: "Creamy garlic pasta",
    creator: "Kitchen Glow",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&auto=format&fit=crop",
    text: "A simple dinner idea you can save and find later.",
  },
  {
    id: 3,
    category: "workouts",
    type: "Workout",
    title: "10 minute reset workout",
    creator: "Soft Fit Club",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&auto=format&fit=crop",
    text: "Save it, set a reminder, and actually do it.",
  },
  {
    id: 4,
    category: "beauty",
    type: "Beauty",
    title: "Soft glow makeup",
    creator: "Glow Girl",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&auto=format&fit=crop",
    text: "Makeup and skincare saves in one easy place.",
  },
  {
    id: 5,
    category: "home",
    type: "Home",
    title: "Cosy room reset",
    creator: "Home Mood",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&auto=format&fit=crop",
    text: "Save room ideas, cleaning routines and decor finds.",
  },
  {
    id: 6,
    category: "fixing",
    type: "DIY",
    title: "Fix a loose cupboard handle",
    creator: "Fix It Fast",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=900&auto=format&fit=crop",
    text: "Hardware and fixing tips without random feeds.",
  },
];

const moreItems = [
  "Plans",
  "Lists",
  "Groups",
  "Rankings",
  "Creator Tools",
  "Settings",
  "About Vella",
  "Invite Friends",
];

export default function App() {
  const [page, setPage] = useState("home");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeShopping, setActiveShopping] = useState(null);
  const [saved, setSaved] = useState([]);
  const [saveTarget, setSaveTarget] = useState(null);
  const [toast, setToast] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  const folders = ["Fashion", "Dinner", "Workouts", "Wishlist", "Beauty", "Home", "Fixing"];

  const categoryFeed = useMemo(() => {
    if (!activeCategory) return [];
    return content.filter((item) => item.category === activeCategory.id);
  }, [activeCategory]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  function saveItem(folder) {
    if (!saveTarget) return;
    const item = { ...saveTarget, folder, savedAt: new Date().toLocaleTimeString() };
    setSaved([...saved, item]);
    setSaveTarget(null);
    showToast(`Saved to ${folder} ✨`);
  }

  function openCategory(cat) {
    if (cat.id === "shopping") {
      setPage("shopping");
      setActiveCategory(null);
    } else {
      setActiveCategory(cat);
      setPage("category");
    }
  }

  return (
    <div style={s.app}>
      <div style={s.phone}>
        <div style={s.glowPink} />
        <div style={s.glowBlue} />

        <header style={s.header}>
          <div>
            <p style={s.smallText}>Hello Vella</p>
            <h1 style={s.logo}>Vella</h1>
          </div>
          <button onClick={() => showToast("Quick save coming soon ✨")} style={s.topBtn}>
            + Save
          </button>
        </header>

        {toast && <div style={s.toast}>{toast}</div>}

        <main style={s.main}>
          {page === "home" && (
            <>
              <section style={s.heroSmall}>
                <h2 style={s.heroTitle}>Choose your world today</h2>
                <p style={s.muted}>
                  No random algorithm. You pick what you want to watch, save, buy or plan.
                </p>
              </section>

              {categories.map((cat) => (
                <button key={cat.id} onClick={() => openCategory(cat)} style={s.categoryCard}>
                  <span style={s.bigIcon}>{cat.icon}</span>
                  <span>
                    <strong style={s.cardTitle}>{cat.title}</strong>
                    <p style={s.cardDesc}>{cat.desc}</p>
                  </span>
                  <span style={s.arrow}>›</span>
                </button>
              ))}
            </>
          )}

          {page === "category" && activeCategory && (
            <>
              <button onClick={() => setPage("home")} style={s.back}>← Back to Home</button>

              <section style={s.heroSmall}>
                <p style={s.smallText}>{activeCategory.icon} {activeCategory.title}</p>
                <h2 style={s.heroTitle}>{activeCategory.title} Feed</h2>
                <p style={s.muted}>Only {activeCategory.title.toLowerCase()} content lives here.</p>
              </section>

              <div style={s.tabs}>
                {["Feed", "Stores", "Lives", "Groups"].map((tab) => (
                  <button key={tab} style={s.tab}>{tab}</button>
                ))}
              </div>

              {categoryFeed.length ? categoryFeed.map((item) => (
                <article key={item.id} style={s.post}>
                  <img src={item.image} alt={item.title} style={s.image} />
                  <div style={s.postBody}>
                    <p style={s.badge}>{item.type}</p>
                    <h3 style={s.postTitle}>{item.title}</h3>
                    <p style={s.creator}>@{item.creator}</p>
                    <p style={s.muted}>{item.text}</p>
                    <div style={s.actions}>
                      <button style={s.action}>♡ Like</button>
                      <button style={s.action}>💬 Chat</button>
                      <button style={s.action}>↗ Share</button>
                      <button onClick={() => setSaveTarget(item)} style={s.save}>⭐ Save</button>
                    </div>
                  </div>
                </article>
              )) : (
                <section style={s.empty}>More {activeCategory.title} content coming soon.</section>
              )}
            </>
          )}

          {page === "shopping" && (
            <>
              <button onClick={() => setPage("home")} style={s.back}>← Back to Home</button>

              <section style={s.heroSmall}>
                <p style={s.smallText}>🛍️ Shopping World</p>
                <h2 style={s.heroTitle}>What do you want to buy?</h2>
                <p style={s.muted}>Choose a shopping category instead of waiting for an algorithm.</p>
              </section>

              <div style={s.grid}>
                {shoppingCategories.map((shop) => (
                  <button
                    key={shop.id}
                    onClick={() => setActiveShopping(shop)}
                    style={s.square}
                  >
                    <span style={s.squareIcon}>{shop.icon}</span>
                    <strong>{shop.title}</strong>
                  </button>
                ))}
              </div>

              {activeShopping && (
                <section style={s.heroSmall}>
                  <h2 style={s.heroTitle}>{activeShopping.icon} {activeShopping.title} Feed</h2>
                  <p style={s.muted}>
                    This will show only {activeShopping.title.toLowerCase()} products, creators, stores and lives.
                  </p>
                  <button
                    onClick={() =>
                      setSaveTarget({
                        id: Date.now(),
                        title: `${activeShopping.title} shopping idea`,
                        creator: "Vella Store",
                        type: "Shopping",
                        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&auto=format&fit=crop",
                        text: `Saved from the ${activeShopping.title} shopping feed.`,
                      })
                    }
                    style={s.bigBtn}
                  >
                    Save demo {activeShopping.title} item
                  </button>
                </section>
              )}
            </>
          )}

          {page === "vault" && (
            <>
              <section style={s.heroSmall}>
                <h2 style={s.heroTitle}>Vella Vault</h2>
                <p style={s.muted}>Everything you save goes into folders so you can find it again.</p>
              </section>

              {!selectedFolder ? (
                <div style={s.grid}>
                  {folders.map((folder) => {
                    const count = saved.filter((x) => x.folder === folder).length;
                    return (
                      <button key={folder} onClick={() => setSelectedFolder(folder)} style={s.square}>
                        <span style={s.squareIcon}>📁</span>
                        <strong>{folder}</strong>
                        <small style={s.muted}>{count} saved</small>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <>
                  <button onClick={() => setSelectedFolder(null)} style={s.back}>← Back to Vault</button>
                  <h2>{selectedFolder}</h2>
                  {saved.filter((x) => x.folder === selectedFolder).length === 0 ? (
                    <section style={s.empty}>Nothing saved here yet.</section>
                  ) : (
                    saved.filter((x) => x.folder === selectedFolder).map((item, index) => (
                      <article key={index} style={s.savedCard}>
                        <img src={item.image} alt={item.title} style={s.savedImg} />
                        <div>
                          <h3>{item.title}</h3>
                          <p style={s.muted}>{item.text}</p>
                          <div style={s.actions}>
                            <button onClick={() => showToast("Reminder set 🔔")} style={s.action}>🔔 Remind</button>
                            <button onClick={() => showToast("Shared 💌")} style={s.save}>💌 Share</button>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </>
              )}
            </>
          )}

          {page === "inbox" && (
            <section style={s.heroSmall}>
              <h2 style={s.heroTitle}>Inbox</h2>
              <p style={s.muted}>Friend shares, group plans and reminders will live here.</p>
            </section>
          )}

          {page === "more" && (
            <>
              <section style={s.heroSmall}>
                <h2 style={s.heroTitle}>More</h2>
                <p style={s.muted}>Extra tools live here so Home stays clean.</p>
              </section>

              {moreItems.map((item) => (
                <button
                  key={item}
                  onClick={() => showToast(`${item} opening soon ✨`)}
                  style={s.moreRow}
                >
                  <span>{item}</span>
                  <span>›</span>
                </button>
              ))}

              <section style={s.about}>
                <h3>About Vella</h3>
                <p style={s.muted}>
                  Vella helps people choose what they want to see, save ideas into folders,
                  and turn saved content into reminders, plans, lists, groups and shopping actions.
                </p>
                <p style={s.smallText}>Updated: {today}</p>
              </section>
            </>
          )}
        </main>

        {saveTarget && (
          <div style={s.modalWrap}>
            <div style={s.modal}>
              <h2>Save to Vault</h2>
              <p style={s.muted}>{saveTarget.title}</p>
              <div style={s.grid}>
                {folders.map((folder) => (
                  <button key={folder} onClick={() => saveItem(folder)} style={s.modalFolder}>
                    📁 {folder}
                  </button>
                ))}
              </div>
              <button onClick={() => setSaveTarget(null)} style={s.cancel}>Cancel</button>
            </div>
          </div>
        )}

        <nav style={s.nav}>
          <button onClick={() => setPage("home")} style={page === "home" ? s.navOn : s.navBtn}>🏠<small>Home</small></button>
          <button onClick={() => setPage("vault")} style={page === "vault" ? s.navOn : s.navBtn}>📁<small>Vault</small></button>
          <button onClick={() => showToast("Choose something to save from a feed ✨")} style={s.plus}>+</button>
          <button onClick={() => setPage("inbox")} style={page === "inbox" ? s.navOn : s.navBtn}>💬<small>Inbox</small></button>
          <button onClick={() => setPage("more")} style={page === "more" ? s.navOn : s.navBtn}>⋯<small>More</small></button>
        </nav>
      </div>
    </div>
  );
}

const s = {
  app: {
    minHeight: "100vh",
    background: "#020005",
    color: "white",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  phone: {
    width: "100%",
    maxWidth: 460,
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(180deg,#170022,#07000d,#020005)",
    borderLeft: "1px solid rgba(255,255,255,.08)",
    borderRight: "1px solid rgba(255,255,255,.08)",
  },
  glowPink: {
    position: "absolute",
    top: -90,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: "50%",
    background: "rgba(217,70,239,.25)",
    filter: "blur(70px)",
  },
  glowBlue: {
    position: "absolute",
    top: 120,
    right: -90,
    width: 240,
    height: 240,
    borderRadius: "50%",
    background: "rgba(125,211,252,.18)",
    filter: "blur(70px)",
  },
  header: {
    position: "relative",
    zIndex: 2,
    padding: "22px 18px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallText: {
    color: "#f0abfc",
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 1,
    margin: 0,
  },
  logo: {
    margin: 0,
    fontSize: 38,
    fontWeight: 950,
    textShadow: "0 0 25px rgba(217,70,239,.9)",
  },
  topBtn: {
    border: "1px solid rgba(255,255,255,.15)",
    background: "rgba(255,255,255,.1)",
    color: "white",
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 900,
  },
  main: {
    position: "relative",
    zIndex: 2,
    padding: "10px 16px 105px",
    height: "calc(100vh - 72px)",
    overflowY: "auto",
  },
  heroSmall: {
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.07)",
    borderRadius: 30,
    padding: 18,
    marginBottom: 14,
  },
  heroTitle: {
    margin: "3px 0 8px",
    fontSize: 26,
    lineHeight: 1,
    letterSpacing: -1,
  },
  muted: {
    color: "#d8b4fe",
    fontSize: 14,
    lineHeight: 1.45,
  },
  categoryCard: {
    width: "100%",
    border: "1px solid rgba(255,255,255,.13)",
    background: "linear-gradient(135deg,rgba(255,255,255,.11),rgba(255,255,255,.05))",
    color: "white",
    borderRadius: 28,
    padding: 18,
    marginBottom: 12,
    display: "grid",
    gridTemplateColumns: "48px 1fr 20px",
    gap: 12,
    alignItems: "center",
    textAlign: "left",
    boxShadow: "0 18px 40px rgba(0,0,0,.28)",
  },
  bigIcon: { fontSize: 34 },
  cardTitle: { fontSize: 20 },
  cardDesc: { margin: "5px 0 0", color: "#d8b4fe", fontSize: 13 },
  arrow: { fontSize: 34, color: "#f0abfc" },
  back: {
    background: "transparent",
    border: 0,
    color: "#f5d0fe",
    fontWeight: 900,
    marginBottom: 10,
  },
  tabs: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    marginBottom: 14,
  },
  tab: {
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 900,
  },
  post: {
    border: "1px solid rgba(255,255,255,.13)",
    background: "rgba(255,255,255,.07)",
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 360,
    objectFit: "cover",
  },
  postBody: { padding: 16 },
  badge: {
    display: "inline-block",
    background: "rgba(217,70,239,.22)",
    border: "1px solid rgba(240,171,252,.25)",
    borderRadius: 999,
    padding: "7px 10px",
    fontSize: 12,
    fontWeight: 900,
    color: "#f5d0fe",
  },
  postTitle: { margin: "10px 0 4px", fontSize: 23 },
  creator: { color: "#f0abfc", fontSize: 13, fontWeight: 900 },
  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 14,
  },
  action: {
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    borderRadius: 18,
    padding: 13,
    fontWeight: 900,
  },
  save: {
    border: "1px solid rgba(240,171,252,.35)",
    background: "rgba(217,70,239,.28)",
    color: "white",
    borderRadius: 18,
    padding: 13,
    fontWeight: 950,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  square: {
    minHeight: 130,
    border: "1px solid rgba(255,255,255,.13)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    borderRadius: 26,
    padding: 16,
    display: "grid",
    gap: 8,
    justifyItems: "start",
    textAlign: "left",
  },
  squareIcon: { fontSize: 32 },
  bigBtn: {
    width: "100%",
    border: 0,
    borderRadius: 20,
    padding: 14,
    background: "linear-gradient(135deg,#fce7f3,#bae6fd)",
    color: "#170022",
    fontWeight: 950,
  },
  empty: {
    border: "1px dashed rgba(255,255,255,.2)",
    borderRadius: 24,
    padding: 22,
    color: "#d8b4fe",
    textAlign: "center",
  },
  savedCard: {
    border: "1px solid rgba(255,255,255,.13)",
    background: "rgba(255,255,255,.07)",
    borderRadius: 26,
    overflow: "hidden",
    marginBottom: 14,
  },
  savedImg: {
    width: "100%",
    height: 190,
    objectFit: "cover",
  },
  moreRow: {
    width: "100%",
    border: "1px solid rgba(255,255,255,.13)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    borderRadius: 22,
    padding: 16,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 900,
  },
  about: {
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.06)",
    borderRadius: 26,
    padding: 16,
    marginTop: 14,
  },
  toast: {
    position: "fixed",
    top: 14,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 50,
    background: "rgba(217,70,239,.95)",
    padding: "12px 18px",
    borderRadius: 999,
    fontWeight: 950,
  },
  modalWrap: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.75)",
    zIndex: 40,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  modal: {
    width: "100%",
    maxWidth: 460,
    background: "#15001f",
    borderRadius: "30px 30px 0 0",
    padding: 18,
    borderTop: "1px solid rgba(240,171,252,.3)",
  },
  modalFolder: {
    border: "1px solid rgba(255,255,255,.13)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    borderRadius: 20,
    padding: 15,
    fontWeight: 900,
    textAlign: "left",
  },
  cancel: {
    width: "100%",
    marginTop: 12,
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    borderRadius: 20,
    padding: 14,
    fontWeight: 900,
  },
  nav: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 460,
    zIndex: 30,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 64px 1fr 1fr",
    gap: 7,
    padding: "10px 10px 12px",
    background: "rgba(8,0,14,.92)",
    backdropFilter: "blur(18px)",
    borderTop: "1px solid rgba(255,255,255,.12)",
  },
  navBtn: {
    border: "1px solid rgba(255,255,255,.1)",
    background: "rgba(255,255,255,.07)",
    color: "#e9d5ff",
    borderRadius: 18,
    padding: "8px 2px",
    display: "grid",
    justifyItems: "center",
    gap: 2,
    fontWeight: 900,
  },
  navOn: {
    border: "1px solid rgba(255,255,255,.1)",
    background: "linear-gradient(135deg,#fce7f3,#bae6fd)",
    color: "#16001f",
    borderRadius: 18,
    padding: "8px 2px",
    display: "grid",
    justifyItems: "center",
    gap: 2,
    fontWeight: 950,
  },
  plus: {
    border: 0,
    background: "linear-gradient(135deg,#d946ef,#7dd3fc)",
    color: "white",
    borderRadius: 999,
    fontSize: 32,
    fontWeight: 950,
    boxShadow: "0 0 28px rgba(217,70,239,.7)",
  },
};
