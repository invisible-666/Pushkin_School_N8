# How to connect the admin panel (Firebase setup)

Do this ONE TIME. It takes about 10 minutes. After this, the director can
change clubs, news, hours, and photos from `admin.html` — no coding needed.

## Step 1 — Create a free Firebase project
1. Go to https://console.firebase.google.com
2. Click **"Add project"**, name it (e.g. `pushkin-school-8`), finish the wizard.

## Step 2 — Create the database
1. In the left menu, click **Build > Firestore Database**.
2. Click **Create database** → choose **Start in production mode** → pick any location → Done.

## Step 3 — Turn on login (Authentication)
1. In the left menu, click **Build > Authentication** → **Get started**.
2. Under "Sign-in method", enable **Email/Password**.
3. Go to the **Users** tab → **Add user** → type the director's email + a password.
   This is the login the director will use on `admin.html`.

## Step 4 — Get your config keys
1. Click the gear icon (⚙) next to "Project Overview" → **Project settings**.
2. Scroll to "Your apps" → click the **</>** (web) icon → register app (any nickname).
3. Firebase shows you a code block with `firebaseConfig = { apiKey: ..., ... }`.
4. Copy those values into **firebase-config.js** in this project, replacing the
   placeholder text (`YOUR_API_KEY`, etc.)

## Step 5 — Set security rules (important!)
In Firestore Database → **Rules** tab, replace the rules with this, then click **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

This means: **everyone can see** clubs/news/photos on the website, but **only a
logged-in director** (through admin.html) can add, edit, or delete them.

## Step 6 — Upload the files
Upload all the files in this folder to your web host (the same place your
current site lives). Then open `admin.html` in the browser, log in with the
email/password from Step 3, and start adding clubs, news, hours, and photos.

## Where to put photos
Since Firebase Storage can need a paid plan, the easiest free way for the
director to add photos is:
1. Go to https://imgbb.com (free, no account needed)
2. Upload the photo
3. Copy the **direct image link** it gives you
4. Paste that link into the "Photo" field in the admin panel

That's it — every visitor will now see live content the director controls.
