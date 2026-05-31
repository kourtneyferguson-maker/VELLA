import React, { useMemo, useState } from "react";

const posts = [
  {
    id: 1,
    tab: "Fashion Finds",
    creator: "Mia Luxe Wear",
    title: "Op-shop outfit glow up",
    caption: "Save this outfit, add it to a list, or plan a shopping day.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    tab: "Dinner Ideas",
    creator: "Kitchen Glow",
    title: "Creamy garlic pasta night",
    caption: "Save the recipe so you can actually find it later.",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    tab: "Workout Saves",
    creator: "Soft Fit Club",
    title: "10 minute reset workout",
    caption: "Save it, set a reminder, and tick it off when done.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&auto=format&fit=crop",
  },
];

const startingFolders = ["Fashion Finds", "Dinner Ideas", "Workout Saves", "Wishlist"];

export default function App() {
  const [page, setPage] = useState("home");
  const [activeTab, setActiveTab] = useState("All");
  const [folders, setFolders] = useState(startingFolders);
  const [saved, setSaved] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [savePost, setSavePost] = useState(null);
  const [toast, setToast] = useState("");
  const [newFolder, setNewFolder] = useState("");

  const filteredPosts = useMemo(() => {
    if (activeTab === "All") return posts;
    return posts.filter((post) => post.tab === activeTab);
  }, [activeTab]);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  }

  function saveToFolder(folder) {
    if (!savePost) return;

    const alreadySaved = saved.some(
      (item) => item.id === savePost.id && item.folder === folder
    );

    if (!alreadySaved) {
      setSaved([
        ...saved,
        {
          ...savePost,
          folder,
          savedAt: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setSavePost(null);
    showToast(`Saved to ${folder} ✨`);
  }

  function addFolder() {
    const clean = newFolder.trim();
    if (!clean) return;

    if (!folders.includes(clean)) {
      setFolders([...folders, clean]);
      showToast(`${clean} folder created 📁`);
    }

    setNewFolder("");
  }

  const folderItems = saved.filter((item) => item.folder === selectedFolder);

  return (
    <div style={styles.page}>
      <div style={styles.phone}>
        <div style={styles.glowOne} />
        <div style={styles.glowTwo} />

        <header style={styles.header}>
          <div>
            <p style={styles.kicker}>Hello Vella</p>
            <h1 style={styles.logo}>Vella</h1>
          </div>
          <button style={styles.smallPill}>+ Save</button>
        </header>

        {toast && <div style={styles.toast}>{toast}</div>}

        <main style={styles.main}>
          {page === "home" && (
            <>
              <section style={styles.hero}>
                <p style={styles.badge}>✨ Today’s Vella Flow</p>
                <h2 style={styles.heroTitle}>Save it. Find it. Actually use it.</h2>
                <p style={styles.heroText}>
                  Vella turns saved videos, outfits, recipes and workouts into folders,
                  reminders, lists and plans.
                </p>
              </section>

              <section style={styles.card}>
                <div style={styles.rowBetween}>
                  <h2 style={styles.sectionTitle}>Feed pages</h2>
                  <button onClick={() => showToast("Demo ideas added ✨")} style={styles.linkBtn}>
                    Add demo ideas
                  </button>
                </div>

                <div style={styles.tabs}>
                  {["All", "Fashion Finds", "Dinner Ideas", "Workout Saves"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        ...styles.tab,
                        ...(activeTab === tab ? styles.activeTab : {}),
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </section>

              {filteredPosts.map((post) => (
                <article key={post.id} style={styles.postCard}>
                  <img src={post.image} alt={post.title} style={styles.postImage} />

                  <div style={styles.postContent}>
                    <p style={styles.badge}>📌 {post.tab}</p>
                    <h3 style={styles.postTitle}>{post.title}</h3>
                    <p style={styles.creator}>@{post.creator}</p>
                    <p style={styles.caption}>{post.caption}</p>

                    <div style={styles.actionGrid}>
                      <button style={styles.actionBtn}>♡ Like</button>
                      <button style={styles.actionBtn}>💬 Chat</button>
                      <button style={styles.actionBtn}>↗ Share</button>
                      <button onClick={() => setSavePost(post)} style={styles.saveBtn}>
                        ⭐ Save
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </>
          )}

          {page === "vault" && (
            <>
              {!selectedFolder ? (
                <>
                  <section style={styles.card}>
                    <h2 style={styles.sectionTitle}>Vella Vault</h2>
                    <p style={styles.muted}>
                      Your saved ideas live here in folders so they don’t disappear.
                    </p>

                    <div style={styles.inputRow}>
                      <input
                        value={newFolder}
                        onChange={(e) => setNewFolder(e.target.value)}
                        placeholder="New folder name"
                        style={styles.input}
                      />
                      <button onClick={addFolder} style={styles.addBtn}>
                        +
                      </button>
                    </div>
                  </section>

                  <div style={styles.folderGrid}>
                    {folders.map((folder) => {
                      const count = saved.filter((item) => item.folder === folder).length;

                      return (
                        <button
                          key={folder}
                          onClick={() => setSelectedFolder(folder)}
                          style={styles.folderCard}
                        >
                          <span style={styles.folderIcon}>📁</span>
                          <strong>{folder}</strong>
                          <small style={styles.muted}>{count} saved</small>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <button onClick={() => setSelectedFolder(null)} style={styles.backBtn}>
                    ← Back to Vault
                  </button>

                  <section style={styles.card}>
                    <h2 style={styles.sectionTitle}>{selectedFolder}</h2>
                    <p style={styles.muted}>{folderItems.length} saved items</p>
                  </section>

                  {folderItems.length === 0 ? (
                    <section style={styles.empty}>
                      Nothing saved here yet. Go to Home and press ⭐ Save.
                    </section>
                  ) : (
                    folderItems.map((item) => (
                      <article key={`${item.id}-${item.folder}`} style={styles.postCard}>
                        <img src={item.image} alt={item.title} style={styles.postImageSmall} />
                        <div style={styles.postContent}>
                          <h3 style={styles.postTitle}>{item.title}</h3>
                          <p style={styles.caption}>{item.caption}</p>

                          <div style={styles.actionGrid}>
                            <button
                              onClick={() => showToast("Reminder created 🔔")}
                              style={styles.actionBtn}
                            >
                              🔔 Remind
                            </button>
                            <button
                              onClick={() => showToast("Added to plan 🗓️")}
                              style={styles.actionBtn}
                            >
                              🗓️ Plan
                            </button>
                            <button
                              onClick={() => showToast("Added to list 🛍️")}
                              style={styles.actionBtn}
                            >
                              🛍️ List
                            </button>
                            <button
                              onClick={() => showToast("Shared with friend 💌")}
                              style={styles.saveBtn}
                            >
                              💌 Share
                            </button>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </>
              )}
            </>
          )}

          {page === "plans" && (
            <section style={styles.card}>
              <p style={styles.badge}>⏰ Plans</p>
              <h2 style={styles.sectionTitle}>Next action</h2>
              <div style={styles.planCard}>
                <strong>Op-shop outfit glow up</strong>
                <span>Tonight · 6:30 PM · Just me</span>
                <button onClick={() => showToast("Ticked off 🎉")} style={styles.bigBtn}>
                  Tick off
                </button>
              </div>
              <div style={styles.planCard}>
                <strong>10 minute reset workout</strong>
                <span>Tomorrow · 9:00 AM · With friend</span>
                <button onClick={() => showToast("Reminder ready 🔔")} style={styles.bigBtn}>
                  Remind me
                </button>
              </div>
            </section>
          )}

          {page === "lists" && (
            <section style={styles.card}>
              <p style={styles.badge}>🛍️ Lists</p>
              <h2 style={styles.sectionTitle}>Shopping and idea lists</h2>
              <div style={styles.listItem}>Birthday outfit ideas</div>
              <div style={styles.listItem}>Easy dinners</div>
              <div style={styles.listItem}>Glow up saves</div>
              <div style={styles.listItem}>Workout reset plan</div>
            </section>
          )}

          {page === "me" && (
            <section style={styles.card}>
              <p style={styles.badge}>👤 Profile</p>
              <h2 style={styles.sectionTitle}>Courtney’s Vella</h2>
              <p style={styles.muted}>
                Your vault, your saves, your reminders and your next actions.
              </p>

              <div style={styles.stats}>
                <div style={styles.statBox}>
                  <strong>{saved.length}</strong>
                  <span>Saves</span>
                </div>
                <div style={styles.statBox}>
                  <strong>{folders.length}</strong>
                  <span>Folders</span>
                </div>
                <div style={styles.statBox}>
                  <strong>2</strong>
                  <span>Plans</span>
                </div>
              </div>
            </section>
          )}
        </main>

        {savePost && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2 style={styles.sectionTitle}>Save to Vault</h2>
              <p style={styles.muted}>{savePost.title}</p>

              <div style={styles.folderGridModal}>
                {folders.map((folder) => (
                  <button
                    key={folder}
                    onClick={() => saveToFolder(folder)}
                    style={styles.modalFolder}
                  >
                    📁 {folder}
                  </button>
                ))}
              </div>

              <button onClick={() => setSavePost(null)} style={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <nav style={styles.nav}>
          {[
            ["home", "✨", "Home"],
            ["vault", "🤍", "Vault"],
            ["plans", "⏰", "Plans"],
            ["lists", "🛍️", "Lists"],
            ["me", "♡", "Me"],
          ].map(([key, icon, label]) => (
            <button
              key={key}
              onClick={() => {
                setPage(key);
                setSelectedFolder(null);
              }}
              style={{
                ...styles.navBtn,
                ...(page === key ? styles.navActive : {}),
              }}
            >
              <span>{icon}</span>
              <small>{label}</small>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020005",
    color: "white",
    display: "flex",
    justifyContent: "center",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },
  phone: {
    width: "100%",
    maxWidth: 460,
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #16001f 0%, #09000f 45%, #030006 100%)",
    position: "relative",
    overflow: "hidden",
    borderLeft: "1px solid rgba(255,255,255,.08)",
    borderRight: "1px solid rgba(255,255,255,.08)",
  },
  glowOne: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "rgba(217,70,239,.22)",
    filter: "blur(70px)",
    top: -120,
    left: -90,
  },
  glowTwo: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: "50%",
    background: "rgba(125,211,252,.18)",
    filter: "blur(80px)",
    top: 120,
    right: -120,
  },
  header: {
    position: "relative",
    zIndex: 2,
    padding: "22px 18px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kicker: {
    margin: 0,
    color: "#f0abfc",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  logo: {
    margin: 0,
    fontSize: 38,
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: -1,
    textShadow: "0 0 24px rgba(217,70,239,.9)",
  },
  smallPill: {
    border: "1px solid rgba(255,255,255,.18)",
    background: "rgba(255,255,255,.1)",
    color: "white",
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 800,
  },
  toast: {
    position: "fixed",
    top: 16,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20,
    background: "rgba(217,70,239,.95)",
    color: "white",
    padding: "12px 18px",
    borderRadius: 999,
    fontWeight: 900,
    boxShadow: "0 0 30px rgba(217,70,239,.65)",
  },
  main: {
    position: "relative",
    zIndex: 2,
    padding: "8px 16px 110px",
    height: "calc(100vh - 70px)",
    overflowY: "auto",
  },
  hero: {
    border: "1px solid rgba(255,255,255,.14)",
    background:
      "linear-gradient(135deg, rgba(217,70,239,.23), rgba(125,211,252,.12))",
    borderRadius: 32,
    padding: 20,
    marginBottom: 14,
    boxShadow: "0 20px 60px rgba(0,0,0,.35)",
  },
  badge: {
    display: "inline-block",
    margin: "0 0 10px",
    fontSize: 12,
    fontWeight: 900,
    color: "#f5d0fe",
    background: "rgba(255,255,255,.1)",
    border: "1px solid rgba(255,255,255,.1)",
    padding: "7px 10px",
    borderRadius: 999,
  },
  heroTitle: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1,
    letterSpacing: -1,
  },
  heroText: {
    color: "#ead5ff",
    fontSize: 14,
    lineHeight: 1.5,
  },
  card: {
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.07)",
    borderRadius: 28,
    padding: 16,
    marginBottom: 14,
    boxShadow: "0 18px 40px rgba(0,0,0,.28)",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
  },
  sectionTitle: {
    margin: 0,
    fontSize: 22,
    letterSpacing: -0.5,
  },
  muted: {
    color: "#d8b4fe",
    fontSize: 14,
    lineHeight: 1.45,
  },
  linkBtn: {
    background: "transparent",
    border: 0,
    color: "#f5d0fe",
    fontWeight: 900,
  },
  tabs: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    paddingTop: 14,
  },
  tab: {
    flex: "0 0 auto",
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.07)",
    color: "#ede9fe",
    borderRadius: 999,
    padding: "11px 14px",
    fontWeight: 900,
  },
  activeTab: {
    background: "linear-gradient(135deg,#fce7f3,#bae6fd)",
    color: "#15001f",
  },
  postCard: {
    border: "1px solid rgba(255,255,255,.13)",
    background: "rgba(255,255,255,.07)",
    borderRadius: 32,
    overflow: "hidden",
    marginBottom: 18,
    boxShadow: "0 24px 55px rgba(0,0,0,.42)",
  },
  postImage: {
    width: "100%",
    height: 380,
    objectFit: "cover",
    display: "block",
  },
  postImageSmall: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    display: "block",
  },
  postContent: {
    padding: 16,
  },
  postTitle: {
    margin: "0 0 4px",
    fontSize: 22,
    letterSpacing: -0.5,
  },
  creator: {
    margin: "0 0 8px",
    color: "#f0abfc",
    fontSize: 13,
    fontWeight: 800,
  },
  caption: {
    color: "#e9d5ff",
    fontSize: 14,
    lineHeight: 1.45,
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 14,
  },
  actionBtn: {
    border: "1px solid rgba(255,255,255,.13)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    borderRadius: 18,
    padding: "13px 10px",
    fontWeight: 900,
  },
  saveBtn: {
    border: "1px solid rgba(240,171,252,.35)",
    background: "rgba(217,70,239,.28)",
    color: "white",
    borderRadius: 18,
    padding: "13px 10px",
    fontWeight: 950,
  },
  inputRow: {
    display: "flex",
    gap: 8,
    marginTop: 14,
  },
  input: {
    flex: 1,
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(0,0,0,.25)",
    color: "white",
    borderRadius: 18,
    padding: "13px 14px",
    outline: "none",
  },
  addBtn: {
    width: 50,
    border: 0,
    borderRadius: 18,
    background: "linear-gradient(135deg,#d946ef,#7dd3fc)",
    fontSize: 24,
    fontWeight: 950,
    color: "white",
  },
  folderGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  folderCard: {
    minHeight: 145,
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    borderRadius: 28,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    textAlign: "left",
  },
  folderIcon: {
    fontSize: 32,
  },
  backBtn: {
    border: 0,
    background: "transparent",
    color: "#f5d0fe",
    fontWeight: 900,
    marginBottom: 12,
  },
  empty: {
    border: "1px dashed rgba(255,255,255,.2)",
    color: "#d8b4fe",
    borderRadius: 26,
    padding: 22,
    textAlign: "center",
  },
  planCard: {
    border: "1px solid rgba(255,255,255,.13)",
    background: "rgba(0,0,0,.24)",
    borderRadius: 24,
    padding: 14,
    marginTop: 12,
    display: "grid",
    gap: 7,
  },
  bigBtn: {
    marginTop: 8,
    border: 0,
    borderRadius: 18,
    padding: "13px 14px",
    background: "linear-gradient(135deg,#fce7f3,#bae6fd)",
    color: "#16001f",
    fontWeight: 950,
  },
  listItem: {
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.08)",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    fontWeight: 850,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 10,
    marginTop: 16,
  },
  statBox: {
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.08)",
    borderRadius: 22,
    padding: 14,
    display: "grid",
    gap: 4,
    textAlign: "center",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 30,
    background: "rgba(0,0,0,.74)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  modal: {
    width: "100%",
    maxWidth: 460,
    background: "#14001d",
    borderTop: "1px solid rgba(240,171,252,.35)",
    borderRadius: "30px 30px 0 0",
    padding: 18,
    boxShadow: "0 -20px 50px rgba(0,0,0,.5)",
  },
  folderGridModal: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 14,
  },
  modalFolder: {
    border: "1px solid rgba(255,255,255,.13)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    borderRadius: 20,
    padding: 16,
    fontWeight: 900,
    textAlign: "left",
  },
  cancelBtn: {
    width: "100%",
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.08)",
    color: "#e9d5ff",
    borderRadius: 20,
    padding: 14,
    marginTop: 12,
    fontWeight: 900,
  },
  nav: {
    position: "fixed",
    left: "50%",
    bottom: 0,
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 460,
    zIndex: 25,
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 6,
    padding: "10px 10px 12px",
    background: "rgba(10,0,16,.88)",
    backdropFilter: "blur(18px)",
    borderTop: "1px solid rgba(255,255,255,.12)",
  },
  navBtn: {
    border: "1px solid rgba(255,255,255,.1)",
    background: "rgba(255,255,255,.07)",
    color: "#e9d5ff",
    borderRadius: 18,
    padding: "9px 4px",
    display: "grid",
    gap: 2,
    justifyItems: "center",
    fontWeight: 800,
  },
  navActive: {
    background: "linear-gradient(135deg,#fce7f3,#bae6fd)",
    color: "#16001f",
  },
};
