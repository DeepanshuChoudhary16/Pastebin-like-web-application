# PasteLink (Pastebin-Lite)

**Candidate ID: Naukri0126**
**Deployed URL :** https://pastelink-sigma.vercel.app/

PasteLink is a lightweight Pastebin-like web application that allows users to
create text pastes, share them via a unique link, and optionally restrict access
using time-based expiration (TTL) and maximum view limits.

---

## Features

- Create a paste via a web UI
- Share pastes using a unique link
- Optional expiration using TTL (time-to-live)
- Optional maximum view count
- Health check API for service monitoring
- Deterministic testing support via TEST_MODE

---

## Persistence Layer

The application uses **MongoDB** as its persistence layer.
Each paste is stored as a document containing the paste content, expiration
timestamp, maximum allowed views, and a view counter.
MongoDB Atlas is used in production.

---

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/DeepanshuChoudhary16/pastelink
cd pastelink
```

### 2.Install dependencies

```bash
npm install
```

### 3.Configure environment variables

Create a file named .env.local in the project root:
MONGODB_URI=your_mongodb_connection_string
TEST_MODE=0

### 4.Start the development server

```bash
npm run dev
```

The application will be available at:
🔗http://localhost:3000

Test Mode
When TEST_MODE=1, the API accepts a request header named x-test-now-ms
to simulate the current time. This is used for deterministic automated testing
of TTL-based expiration and is disabled by default.

##✅ Where this file MUST be located

Your repo structure should look like this:
pastelink/
├── README.md ✅ (here)
├── package.json
├── app/
├── lib/
├── models/

NOT inside:

- ❌ `app/`
- ❌ `docs/`
- ❌ `src/`

---

## ✅ How to double-check before submission

Run these commands:

```bash
ls
```

You MUST see:

README.md
package.json
app

Then:
git status
If README.md is untracked:
git add README.md
git commit -m "Add README"
git push
