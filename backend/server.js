require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const BlockedApp = require("./models/BlockedApp");

const appLibrary = {
  social: [
    "facebook.exe",
    "instagram.exe",
    "twitter.exe",
    "tiktok.exe",
    "snapchat.exe",
    "discord.exe",
    "whatsapp.exe",
    "messenger.exe"
  ],
  design: [
    "canva.exe",
    "photoshop.exe",
    "figma.exe",
    "illustrator.exe",
    "xd.exe",
    "sketch.exe"
  ],
  browser: [
    "chrome.exe",
    "firefox.exe",
    "msedge.exe",
    "brave.exe",
    "opera.exe"
  ],
  productivity: [
    "notepad.exe",
    "word.exe",
    "excel.exe",
    "powerpnt.exe",
    "outlook.exe"
  ],
  communication: [
    "zoom.exe",
    "teams.exe",
    "skype.exe",
    "slack.exe"
  ],
  entertainment: [
    "spotify.exe",
    "steam.exe",
    "vlc.exe",
    "epicgames.exe"
  ],
  utility: [
    "taskmgr.exe",
    "cmd.exe",
    "powershell.exe",
    "terminal.exe"
  ]
};

const categoryAliases = {
  social: ["social", "media", "facebook", "instagram", "twitter", "tiktok", "snapchat", "discord", "whatsapp", "messenger"],
  design: ["design", "creative", "canva", "photoshop", "figma", "illustrator", "sketch", "xd"],
  browser: ["browser", "chrome", "firefox", "edge", "opera", "brave"],
  productivity: ["productivity", "work", "office", "word", "excel", "notepad", "powerpoint"],
  communication: ["communication", "meeting", "zoom", "teams", "skype", "slack"],
  entertainment: ["music", "video", "game", "spotify", "steam", "vlc", "netflix"],
  utility: ["utility", "system", "task manager", "cmd", "powershell", "terminal"]
};

function stripExtension(name) {
  if (!name) return name;
  return name.replace(/\.(exe|app|deb|msi|dmg|bin|sh|jar|apk)$/i, "");
}

const allKnownAppsSet = new Set();
const appCategoryMap = {};
Object.entries(appLibrary).forEach(([category, apps]) => {
  apps.forEach((app) => {
    const lower = app.toLowerCase();
    const stripped = stripExtension(lower);
    allKnownAppsSet.add(lower);
    allKnownAppsSet.add(stripped);
    if (!appCategoryMap[lower]) appCategoryMap[lower] = category;
    if (!appCategoryMap[stripped]) appCategoryMap[stripped] = category;
  });
});
const allKnownApps = [...allKnownAppsSet];
const categoryNames = Object.keys(appLibrary);

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "supersecretkey123";

// ================= DATABASE =================
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/appblocker";
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================= AUTH =================
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1d4ed8&color=ffffff`
  });
  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1d" });
  res.json({
    message: "User registered",
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
      lastLogin: newUser.lastLogin,
      isActive: newUser.isActive
    },
  });
});

app.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  const loginValue = email || username;

  if (!loginValue || !password) {
    return res.status(400).json({ message: "Email/username and password are required" });
  }

  const user = await User.findOne({
    $or: [
      { email: loginValue.toLowerCase() },
      { name: { $regex: new RegExp(`^${escapeRegex(loginValue)}$`, 'i') } }
    ]
  });

  if (!user) return res.status(400).json({ message: "User not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });
  user.lastLogin = new Date();
  await user.save();
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      isActive: user.isActive
    }
  });
});

// ================= AUTH MIDDLEWARE =================
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.warn("authMiddleware: Access denied (no auth header)");
    return res.status(401).json({ message: "Access denied, token missing" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    console.warn("authMiddleware: Access denied (empty token)");
    return res.status(401).json({ message: "Access denied, token missing" });
  }
  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.warn("authMiddleware: Invalid token", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// ================= BLOCKED APPS =================
app.get("/blocked", authMiddleware, async (req, res) => {
  const apps = await BlockedApp.find();
  res.json(apps);
});

app.delete("/blocked/:id", authMiddleware, async (req, res) => {
  await BlockedApp.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// helper untuk pencarian case-insensitive
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseAppType(name) {
  const lower = (name || "").toLowerCase();
  if (lower.endsWith(".exe")) return "exe";
  if (lower.endsWith(".app")) return "app";
  if (lower.endsWith(".deb")) return "deb";
  if (lower.endsWith(".msi")) return "msi";
  if (lower.endsWith(".dmg")) return "dmg";
  if (lower.endsWith(".bin")) return "bin";
  if (lower.endsWith(".sh")) return "sh";
  if (lower.endsWith(".jar")) return "jar";
  if (lower.endsWith(".apk")) return "apk";
  if (lower.includes("/")) return "custom";
  return "custom";
}

function normalizeAppName(name) {
  if (!name) return "";
  return name.toLowerCase().replace(/\.(exe|app|deb|msi|dmg|bin|sh|jar|apk)$/i, "");
}

app.post("/blocked", authMiddleware, async (req, res) => {
  const name = (req.body.name || "").trim();
  const path = (req.body.path || null);
  const blockedReason = (req.body.blockedReason || "User blocked").trim();

  if (!name) return res.status(400).json({ message: "Nama aplikasi tidak boleh kosong" });

  const exists = await BlockedApp.findOne({
    name: { $regex: new RegExp(`^${escapeRegex(name)}$`, "i") }
  });
  if (exists) return res.status(409).json({ message: "Aplikasi sudah diblokir" });

  const normalized = normalizeAppName(name);
  const category = appCategoryMap[normalized] || appCategoryMap[name.toLowerCase()] || "unknown";
  const appType = parseAppType(name);
  const newApp = new BlockedApp({ name, category, appType, path, blockedReason });
  await newApp.save();
  res.json(newApp);
});

app.get("/suggestions", authMiddleware, async (req, res) => {
  const blocked = await BlockedApp.find();
  const blockedNames = blocked.map(a => a.name.toLowerCase());
  const suggestions = allKnownApps
    .filter(name => !blockedNames.includes(name.toLowerCase()))
    .map(name => ({ name, category: appCategoryMap[name] || "unknown" }));
  res.json({ suggestions, categories: categoryNames });
});

app.get("/analytics", authMiddleware, async (req, res) => {
  const apps = await BlockedApp.find();
  const total = apps.length;
  const byCategory = apps.reduce((acc, app) => {
    const category = app.category || "unknown";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const recent = apps
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)
    .map((app) => ({ name: app.name, category: app.category, blockedAt: app.createdAt, appType: app.appType }));

  res.json({ total, byCategory, recent });
});

app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("name email role avatar createdAt lastLogin isActive");
  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }
  res.json({ user });
});

function normalizeCommand(command) {
  return (command || "").toLowerCase().trim();
}

function matchCategory(command) {
  return categoryNames.find((category) =>
    categoryAliases[category].some((alias) => command.includes(alias))
  );
}

function matchApps(command) {
  return allKnownApps.filter((app) => {
    const key = app.replace(".exe", "");
    return command.includes(key) || command.includes(key.replace(".", " "));
  });
}

app.post("/ai/command", authMiddleware, async (req, res) => {
  const commandText = normalizeCommand(req.body.command);
  if (!commandText) {
    return res.status(400).json({ message: "Command AI diperlukan" });
  }

  const category = matchCategory(commandText);
  const matchedApps = matchApps(commandText);
  const wantSuggest = commandText.includes("suggest") || commandText.includes("recommend") || commandText.includes("what should");
  const wantBlock = commandText.includes("block") || commandText.includes("prevent") || commandText.includes("disable");
  const wantUnblock = commandText.includes("unblock") || commandText.includes("allow") || commandText.includes("remove");
  const wantStatus = commandText.includes("status") || commandText.includes("analytics") || commandText.includes("report");

  if (wantStatus) {
    const apps = await BlockedApp.find();
    const total = apps.length;
    const byCategory = apps.reduce((acc, app) => {
      const cat = app.category || "unknown";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    return res.json({ message: "Status analytics terkini", total, byCategory });
  }

  if (wantSuggest) {
    const blocked = await BlockedApp.find();
    const blockedNames = blocked.map((a) => a.name.toLowerCase());
    const suggestions = allKnownApps
      .filter((name) => !blockedNames.includes(name.toLowerCase()))
      .slice(0, 8)
      .map((name) => ({ name, category: appCategoryMap[name] || "unknown" }));
    return res.json({ message: "Rekomendasi blokir aplikasi", suggestions });
  }

  if (wantBlock || wantUnblock) {
    let targets = matchedApps;
    if (category && targets.length === 0) {
      targets = appLibrary[category] || [];
    }

    if (targets.length === 0) {
      return res.json({
        message: "Maaf, saya belum tahu aplikasi spesifik dari perintah tersebut. Coba tulis: block social media apps atau unblock notepad.exe",
        category,
        suggestions: Object.entries(appLibrary).map(([cat, apps]) => ({ category: cat, apps: apps.slice(0, 3) }))
      });
    }

    if (wantBlock) {
      const added = [];
      const already = [];
      for (const name of targets) {
        const exists = await BlockedApp.findOne({ name: { $regex: new RegExp(`^${escapeRegex(name)}$`, "i") } });
        if (exists) {
          already.push(name);
          continue;
        }
        const app = new BlockedApp({ name, category: appCategoryMap[name] || category || "unknown" });
        await app.save();
        added.push(name);
      }
      return res.json({
        message: `Berhasil memproses perintah block.`,
        blocked: added,
        alreadyBlocked: already
      });
    }

    if (wantUnblock) {
      const removed = [];
      const notFound = [];
      for (const name of targets) {
        const existed = await BlockedApp.findOne({ name: { $regex: new RegExp(`^${escapeRegex(name)}$`, "i") } });
        if (!existed) {
          notFound.push(name);
          continue;
        }
        await BlockedApp.findByIdAndDelete(existed._id);
        removed.push(name);
      }
      return res.json({ message: "Berhasil memproses perintah unblock.", removed, notFound });
    }
  }

  return res.json({
    message: "Tolong gunakan perintah yang mendukung: block, unblock, suggest, report.",
    example: "block social media apps"
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
