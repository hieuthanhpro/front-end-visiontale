# VisionTale Mobile - Quick Start (5 Minutes)

## ⚡ The Fastest Way to Run the App

### Step 1: Install & Setup (2 minutes)

```bash
cd mobile
npm install
cp .env.example .env.local
```

### Step 2: Start the Dev Server (1 minute)

```bash
npm start
```

You'll see:
```
› Press s to use Expo Go
› Press a to open Android
› Press i to open iOS
```

### Step 3: Open on Your Phone (2 minutes)

**Option A - Easiest (Expo Go):**
1. Install **Expo Go** app on your phone:
   - iPhone: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Open Expo Go
3. **Scan the QR code** shown in terminal
4. Wait for app to load (~30 seconds)

**Option B - Simulator (Mac only):**
1. Press `i` in terminal (opens iOS Simulator)

**Option C - Android Emulator:**
1. Start Android Emulator first
2. Press `a` in terminal

---

## 🎉 That's It!

Your app is now running. You should see:
- **Projects tab**: Create & manage video projects
- **Library tab**: Browse assets (characters, props, effects)
- **Storyboard tab**: Organize scenes
- **Profile tab**: User settings

---

## ⚙️ Configuration (Optional)

If you have a backend API running:

1. Edit `mobile/.env.local`:
   ```env
   EXPO_PUBLIC_API_BASE_URL=http://your-api-url.com/api
   ```

2. Press `r` in terminal to reload

---

## 📱 Common Commands

| Command | What it does |
|---------|-------------|
| `npm start` | Start dev server |
| `s` | Open in Expo Go (scan QR) |
| `i` | Open iOS Simulator |
| `a` | Open Android Emulator |
| `r` | Reload app |
| `c` | Clear console |
| `m` | Show menu options |
| `q` | Quit |

---

## 🆘 Troubleshooting

**"Can't scan QR code?"**
- Enter the URL manually shown in terminal
- Check device WiFi connection

**"Port 8081 already in use?"**
```bash
npm start -- --port 8082
```

**"Module not found errors?"**
```bash
rm -rf node_modules && npm install
npm start -- --clear
```

**"API errors / Network not working?"**
- Check `.env.local` has correct `EXPO_PUBLIC_API_BASE_URL`
- On Android emulator, use `10.0.2.2` instead of `localhost`

**"App stuck or frozen?"**
- Press `r` to reload in terminal
- Or restart: `Ctrl+C` then `npm start`

---

## 📚 Need More Info?

- Full setup guide: See `EXPO_SETUP_GUIDE.md`
- Project structure: See `README.md`
- Detailed troubleshooting: See `EXPO_SETUP_GUIDE.md` → Troubleshooting

---

## 🚀 Next Steps

1. ✅ App is running
2. Explore the different tabs
3. Try creating a project
4. Check out the code in `/app` folder
5. Start building! 💪

Happy coding! 🎉
