// Google Gemini AI Client tailored for Cohort PCCOE Campus Buddy AI

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are "Buddy AI", the intelligent, witty, and helpful campus AI companion for Cohort PCCOE (Pimpri Chinchwad College of Engineering, Nigdi, Pune).

About PCCOE & Your Knowledge:
- Departments: Computer Engineering, Information Technology (IT), Mechanical Engineering, Electronics & Telecommunication (E&TC), Civil Engineering, Artificial Intelligence & Data Science (AI-DS).
- Autonomous Curriculum: In-Sem tests (Unit 1 & 2), End-Sem examinations, ERP portal assignments, Capstone project milestones, and Autonomous grading credit systems.
- Campus Landmarks:
  * B-Block: High-speed Computing Labs 1-8, IT HOD, AI-DS GPU clusters, GDGC hub, Seminar Hall B-302.
  * A-Block: Dean Academics Office, Mechanical Workshop, CAD/CAM Lab, Civil Surveying Lab, Auditorium 1 & 2.
  * Admin Building: Central Office, Principal Office, Student Section, Accounts & Exam Cell.
  * Central Library: 1st & 2nd floor, 50,000+ technical volumes, 350-seat AC quiet reading hall.
  * Food & Chill: Main Campus Canteen (famous Masala Dosa & Thali), Back-gate Nescafe kiosk (Maggi & Cold Coffee), Samarth Chowk food hub.
- Student Clubs: GDGC PCCOE, OWASP Student Chapter, ACM, GFG, Team Redline (Formula Student/SAE BAJA racing), Team Kratos (EV racing), Art Circle (Purushottam/Firodiya Karandak theatre & music), NSS, ISR, and AIMSA.
- Cohort Shortcuts: c/home (campus feed), c/communities (clubs), c/network (find campus peers), c/connect (encrypted peer chat), c/xd (meme reels), c/map (3D campus map), c/calendar (academic dates), c/arcade (chess & mini-games), c/profile (student bio & badges).

Tone & Persona:
- Helpful, friendly, witty, and authentic to engineering students in Pune.
- Use clean Markdown with bullet points, emojis, and bold highlights for readable advice.
`;

const CANDIDATE_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-pro',
];

export async function askBuddyAI(userMessage, conversationHistory = []) {
  const cleanKey = (GEMINI_API_KEY || '').trim();

  // Try live API across candidate models if key is present
  if (cleanKey && cleanKey.length > 5 && !cleanKey.includes('VITE_')) {
    for (const model of CANDIDATE_MODELS) {
      try {
        const contents = [];

        // Add previous conversation context
        if (conversationHistory && conversationHistory.length > 0) {
          conversationHistory.slice(-4).forEach((msg) => {
            if (msg.text) {
              contents.push({
                role: msg.isUser ? 'user' : 'model',
                parts: [{ text: msg.text }],
              });
            }
          });
        }

        // Add current user prompt
        contents.push({
          role: 'user',
          parts: [{ text: userMessage }],
        });

        const requestBody = {
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        };

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText && candidateText.trim().length > 0) {
            return candidateText.trim();
          }
        } else {
          // If system_instruction was unsupported on legacy model, retry with inline prompt
          const fallbackBody = {
            contents: [
              {
                role: 'user',
                parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nUser Question: ${userMessage}` }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          };

          const retryRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(fallbackBody),
            }
          );

          if (retryRes.ok) {
            const data = await retryRes.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return text.trim();
          }
        }
      } catch (err) {
        console.warn(`Model ${model} invocation attempt failed, trying next fallback:`, err);
      }
    }
  }

  // Intelligent, high-context offline heuristic companion fallback
  return getIntelligentCampusAIResponse(userMessage);
}

function getIntelligentCampusAIResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('canteen') || q.includes('food') || q.includes('maggi') || q.includes('dosa') || q.includes('lunch') || q.includes('coffee')) {
    return `🍽️ **PCCOE Campus Food & Hangout Spots:**

* **Main College Canteen:** Best Schezwan Cheese Masala Dosa, budget Veg Thali, and refreshing Cold Coffee.
* **Back-gate Nescafe Kiosk:** Quick hot Maggi, ginger tea, and coffee between lectures.
* **Samarth Chowk (Opposite Gate):** Surya Fast Food, Chinese corner, and evening street food.
* **Pro-tip:** The canteen gets packed around 12:30 PM (after 3rd lecture). Grab an early bite or order right at 12:15 PM!`;
  }

  if (q.includes('lab') || q.includes('b-block') || q.includes('a-block') || q.includes('location') || q.includes('where is') || q.includes('building') || q.includes('map')) {
    return `📍 **PCCOE Landmark Navigation Guide:**

* **B-Block (Computer, IT & AI-DS):**
  * *Ground & 1st Floor:* High-Performance GPU Labs 1 to 4 & GDGC Room.
  * *2nd Floor:* IT Department Office & Software Development Labs.
  * *3rd Floor:* AI-DS Labs & Seminar Hall B-302.
* **A-Block (Mech, Civil & Administration):**
  * *Ground Floor:* Dean Academics Office & Central CNC Workshop.
  * *1st Floor:* CAD/CAM Design Studio & Fluid Mechanics.
  * *Top Floor:* Civil Surveying Bay & Seminar Hall A-401.
* **Admin Building:** Student Section (hall tickets & bonafide), Accounts Cell, and Examination Department.
* **Central Library:** 1st & 2nd floor with 350-seat AC study halls.

💡 *Check out **c/map** on Cohort for the full interactive 3D floor plan!*`;
  }

  if (q.includes('exam') || q.includes('insem') || q.includes('endsem') || q.includes('syllabus') || q.includes('notes') || q.includes('pyq') || q.includes('toc') || q.includes('dbms')) {
    return `📚 **Exams & Academic Prep:**

* **In-Sem Examinations:** Unit 1 & Unit 2 Autonomous tests.
* **Shared Question Banks:** Head to **c/home** or the B-Block departmental repo for past semester PYQs and TOC/DBMS solution drives.
* **Hall Tickets:** Available for endorsement at your department student coordinator's desk before the exam cutoff.
* **Timetables:** Official dates and deadlines are synchronized under **c/calendar** on your dashboard.`;
  }

  if (q.includes('club') || q.includes('gdgc') || q.includes('owasp') || q.includes('redline') || q.includes('acm') || q.includes('art circle') || q.includes('kratos') || q.includes('nss')) {
    return `🚀 **PCCOE Student Communities & Chapters:**

* 💻 **GDGC PCCOE:** Google technologies, Solution Challenge, Flutter, and AI hackathons.
* 🛡️ **OWASP Student Chapter:** Cybersecurity, CTF competitions (*CyberSprint*), and Web Security.
* 🏎️ **Team Redline Racing:** Formula Student SAE BAJA combustion & electric vehicle racing.
* 🎭 **Art Circle:** Theatre, Karandak (Purushottam/Firodiya), music, and visual arts.
* 🤝 **NSS & ISR:** Community social service, blood donation camps, and rural empowerment.

👉 *Visit **c/communities** to explore upcoming events and join active channels!*`;
  }

  if (q.includes('arcade') || q.includes('game') || q.includes('chess') || q.includes('sudoku')) {
    return `🎮 **Cohort Arcade Lounge:**

Take a quick brain break between lectures!
* ♟️ **Chess Engine:** Challenge me (Buddy AI) to a game of tactical chess.
* ⭕ **Tic-Tac-Toe:** Quick strategic AI mini-game.
* 🔢 **Sudoku:** Numbers puzzle with real-time error tracking and hints.

Head to **c/arcade** on your dashboard to play!`;
  }

  if (q.includes('xd') || q.includes('meme') || q.includes('reels') || q.includes('confession')) {
    return `⚡ **XD Reels & Campus Confessions:**

Looking for viral memes, exam season humor, and PCCOE confessions?
* Check out **c/xd** for an infinite scrolling feed scraping top Reddit memes and campus confessions.
* Upvote, comment, or post your own campus story!`;
  }

  if (q.includes('who are you') || q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('buddy')) {
    return `👋 **Hey there! I am Buddy AI, your PCCOE Campus Companion powered by Google Gemini.**

Here is what I can help you with:
* 📍 **Campus Navigation:** Find labs, HOD offices, and classrooms across A-Block, B-Block, and Admin Building.
* 📚 **Academics & Exams:** Notes, Autonomous syllabus insights, exam schedules, and study tips.
* 🚀 **Student Communities:** Info on GDGC, OWASP, Team Redline, Art Circle, and hackathons.
* 💡 **Cohort Shortcuts:** How to use Connect chat, XD Reels, 3D Map, and Arcade.

What's on your mind today? Ask me anything!`;
  }

  // General helpful response
  return `💡 **Buddy AI Campus Insight:**

Regarding **"${query}"**:
* For academic & semester resources, check the community drives on **c/home**.
* For urgent notifications from the Exam Cell or T&P, see **c/headsup**.
* You can also connect directly with department peers under **c/network** or ask specific questions about PCCOE labs, clubs, and schedules!

Need anything specific about PCCOE or Cohort? Let me know! 🚀`;
}

