# Multi-Link Opener 🚀

Bulk URL Launcher with Sequential & Instant Open Modes

Multi-Link Opener is a lightweight, browser-based productivity tool that allows you to open multiple URLs at once. It validates links automatically, lets you choose between sequential opening with delay or instant bulk opening, and provides real-time progress tracking for efficient workflow automation.

---

## 📌 What Is Multi-Link Opener?

Multi-Link Opener is a web application built with HTML, CSS, and JavaScript that enables users to:

* Paste multiple links (one per line)
* Automatically validate URLs (HTTP/HTTPS)
* Open links sequentially with adjustable delay
* Open all links instantly in separate tabs
* Track progress in real time
* Stop the process mid-way
* Copy or open individual links manually
* Clear all inputs or load example links quickly

It is ideal for developers, marketers, researchers, QA testers, and power users who regularly handle batches of URLs.

---

## 🎯 Why Use Multi-Link Opener?

Opening dozens of links manually is inefficient and time-consuming. This tool:

* Saves time by automating tab opening
* Prevents browser overload with controlled delay
* Improves workflow efficiency
* Helps with bulk research and testing
* Requires no installation or backend

Because it runs entirely in the browser, there are no external dependencies or server requirements.

---

## ✨ Features

* ✅ **Automatic URL validation**: Validates links as you type (HTTP & HTTPS supported).
* 🔄 **Sequential opening**: Opens links one by one with an adjustable delay (500ms–5000ms).
* ⚡ **All At Once mode**: Opens all valid links instantly.
* 📊 **Real-time progress**: Dynamic progress bar and status display during opening.
* 🛑 **Stop functionality**: Cancel sequential execution at any time.
* 📋 **Individual actions**: Copy links to clipboard or open them individually.
* 🧹 **Quick controls**: "Load Example" for testing and "Clear All" for a fresh start.
* 🎛 **Modern UI**: Clean, responsive design with dark mode aesthetics and FontAwesome icons.
* 💾 **Session memory**: Remembers if you've used the tool before to provide a better first-time experience.

---

## 🛠️ How It Works (Technical Overview)

The application:

1. Extracts links line-by-line from the `textArea`.
2. Validates each entry using the JavaScript `URL` constructor.
3. Renders a dynamic list of links with validation status.
4. Opens links using `window.open()`:
   * **Sequential mode**: Uses `async/await` with `setTimeout` to manage delays.
   * **Instant mode**: Loops through all valid links and opens them immediately.
5. Updates UI state dynamically (progress bar, link status classes, and animations).

There is:

* No backend
* No database
* No API calls
* No tracking

It is fully client-side and privacy-focused.

---

## 📥 Installation & Usage

### Option 1 – Local Use

1. Download or clone this repository.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox).
3. **Important**: Allow pop-ups when prompted by the browser.
4. Paste your links (one per line).
5. Choose your opening mode and click **Open**.

### Option 2 – Deploy to GitHub Pages

1. Create a new repository on GitHub.
2. Upload the `index.html`, `css/`, and `js/` folders.
3. Go to **Settings → Pages**.
4. Select the `main` branch and folder `/ (root)`.
5. Your tool will be live at `https://yourusername.github.io/your-repo-name/`.

---

## 📘 Tutorial – Step by Step

### 1️⃣ Paste Links

Enter URLs in the text area. Each link must be on its own line. You can also use the **Load Example** button to see how it works.

### 2️⃣ Choose Opening Mode

* **Sequential**: Opens links one by one with a delay. Best for stability and avoiding popup blockers.
* **All At Once**: Opens everything instantly. Faster but may be blocked by some browsers.

### 3️⃣ Adjust Delay (Sequential Only)

Use the slider to set a delay between 500ms and 5000ms. A delay of 1500ms-2000ms is recommended for the best experience.

### 4️⃣ Monitor Progress

Watch the progress bar and current status. If you need to stop, click the **Stop** button that appears during sequential opening.

---

## 🔐 Important Notes

* **Pop-up Blocker**: You must allow pop-ups for this site/file in your browser settings.
* **Link Types**: Only HTTP and HTTPS links are supported for validation.
* **Browser Limits**: Opening 100+ links at once might trigger browser security limits or performance issues.
* **Best Experience**: Works best in modern browsers like Chrome, Brave, or Edge.

---

## 📂 Project Structure

```text
linkOpener/
├── index.html       # Main HTML structure
├── css/
│   └── style.css    # Modern UI styling
└── js/
    └── main.js     # Core logic and link handling
```

---

## 🚀 Future Improvements

* Export/import link lists to CSV/JSON.
* Save and name different link sessions.
* Browser extension version for even faster access.
* Duplicate link filtering.
* Custom naming for link batches.

---

## 📜 License

MIT License

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, improve the UI, or add new features.
