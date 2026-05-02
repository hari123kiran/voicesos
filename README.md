# VoiceSOS

A women's safety app that listens, understands, and acts.

Built for EPOCH '26 hackathon at Vemana Institute of Technology. Track: AI for Social Good.

## What it does

You say "help" or "plis help" or "halp halp", and the app figures out you're in trouble. It triggers a 10-second cancel countdown, grabs your location, records 20 seconds of audio as evidence, and opens WhatsApp with a pre-filled SOS message ready to send to your trusted contacts.

The point is, you shouldn't have to unlock your phone, find an app, and tap a button when something is going wrong. You just talk.

## Why we built our own AI instead of using an API

Most safety apps are button-press apps. bSafe, Himmat, Raksha, same idea different logos. None of them actually understand what the user is saying. The voice ones that exist need exact phrases like "Hey Siri", which fails the moment someone with an Indian accent panics and says "plis save me" instead of "please save me".

So we built our own distress classifier. Not an API call. Not a Kaggle download. We wrote the logic ourselves in frontend/src/ai/distressModel.js.

It works in 4 steps:

1. Look for exact emergency phrases (we have 20)
2. Fuzzy match against accent variations using Levenshtein edit distance. This is what catches "halp" as "help" and "plis" as "please".
3. Scan for distress keywords (help, save, danger, scared, etc.)
4. Apply a penalty if non-emergency context is detected. So "help me with homework" should NOT trigger SOS.

Every result comes with a confidence score 0-100 and a list of reasons explaining what the AI noticed. So users (and judges) see exactly why the app made its call.

## What's in the dataset

We avoided Kaggle because emergency voice data is sensitive and rarely India-localized. Instead, we hand-wrote 43 samples grouped into three buckets:

- 20 emergency phrases ("help me", "i am in danger", "someone is following me")
- 13 accent and typo variations ("halp", "plis help", "sabe me", "im scared")
- 10 non-emergency context phrases used as penalties ("help me with homework", "emergency meeting")

It's a small dataset on purpose. Hackathon scope. The point is the approach. Fuzzy matching plus custom data plus explainability beats API-wrapping plus Kaggle for this specific problem.

## Tech stack

Frontend: React with Vite, plain CSS, lucide-react icons. Browser-native APIs only. SpeechRecognition for voice input, Geolocation for GPS, MediaRecorder for the 20-second audio clip, SpeechSynthesis for spoken alerts.

Backend: Node with Express. JSON file storage in backend/data/. Multer for audio file uploads. No database, that would be overkill for 24 hours.

Storage: localStorage on the device for trusted contacts. Backend keeps a copy too in case we want to add a guardian dashboard view later.

## How it actually flows

1. First-time setup: user adds up to 3 trusted contacts (Primary, Secondary, Tertiary). Like Mom, Dad, and a friend. Takes 30 seconds. After this you never see the setup screen again.

2. User taps "Start Voice Detection" when entering a situation she's unsure about. Walking home alone, in a cab, late at night.

3. From here it's hands-free. Phone can be in a pocket. The app listens. If she says any phrase the AI flags as distress (confidence over 70%), the SOS countdown starts.

4. There's a 10-second cancel window so a false alarm doesn't escalate. Tap to cancel.

5. If she doesn't cancel, the app captures GPS, records 20 seconds of audio, uploads everything to the backend, and opens WhatsApp with a pre-filled message containing the location, AI confidence, the trigger phrase, and a link to the audio.

6. The trusted contact gets the WhatsApp message. They don't need our app installed. Just WhatsApp, which everyone in India has.

7. Everything gets logged in the Guardian Dashboard so the user (or her family) can review past alerts.

## Demo phrases that show off the AI

Click these chips on the home screen during the demo:

- help help is around 95% Emergency
- plis help me is around 84% (fuzzy match catches the typo)
- halp halp is around 75% (Indian accent variation)
- i am in danger is around 85%
- hello how are you is 0% Safe
- help me with homework is 0% Safe (penalty fires here, prevents false alarm)

The first three are the magic moments. They prove the AI isn't just keyword matching.

## Future scope

Stuff we know is missing. We thought it was more honest to leave these in scope notes than to fake them.

- Real police integration (ERSS-112), needs government API access we don't have
- Cascade alerting (auto-escalate if Primary doesn't reply in 60 seconds), needs Twilio Business API for delivery confirmation
- Wearable sync, needs hardware product
- Multilingual detection (Hindi, Kannada, Tamil), needs more dataset work
- Background listening when phone is locked, browsers don't allow this. Would need a native Android app.
- Real-time location streaming, needs auth and persistent socket connection

Most of these aren't 24-hour builds for anyone, not just us.

## Run it

git clone https://github.com/hari123kiran/voicesos.git
cd voicesos/VoiceSOS
npm run install-all
npm run dev

Open http://localhost:5173 in Chrome. SpeechRecognition only works in Chromium-based browsers, which is why we recommend Chrome specifically.

Backend runs at http://localhost:5000.

## Ethics notes

- Voice detection is user-activated, never passive. The app doesn't listen until the user taps the button.
- Audio recording starts only after the SOS countdown finishes and the user grants mic permission.
- We show consent text on the setup screen.
- We don't claim crime prediction. We classify distress intent in user-spoken phrases. Different thing.
- We don't claim police integration as a present feature. It's labeled future scope.
- All data stays local. Browser localStorage and a JSON file on the backend. No tracking, no analytics, no third-party services beyond WhatsApp's deep-link.

## Team

- Harikiran (Leo): built the AI engine, backend, full-stack integration. 
- Vrunda: frontend polish and mobile feel
- Prajwal: demo phrases, AI test cases, content
- Anusha: pitch deck and presentation

Built for EPOCH '26 at Vemana IEEE Student Branch Chapter, May 1-2, 2026.
