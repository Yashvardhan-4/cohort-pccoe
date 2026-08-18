// Gemini API Client tailored for Cohort PCCOE Campus Buddy AI

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are "Buddy AI", the intelligent, witty, and helpful campus AI companion for Cohort PCCOE (Pimpri Chinchwad College of Engineering, Nigdi, Pune).

About You & PCCOE:
- You know everything about PCCOE: Departments (Computer Engineering, IT, Mechanical, E&TC, Civil, AI-DS), Autonomous syllabus, In-Sem and End-Sem exams, ERP submission deadlines, Central Library timings, and academic calendars.
- Campus landmarks: B-Block (Comp/IT labs & GDGC center), A-Block (Mech/Civil & Dean Academics), Admin Building, Central Library reading hall, Main Canteen, Back-gate Nescafe, and Team Redline SAE BAJA garage.
- Student Clubs: GDGC PCCOE, OWASP Student Chapter, ACM, IEEE, Team Redline (Formula Student/SAE BAJA), Team Kratos (EV Racing), Art Circle (Purushottam/Firodiya Karandak drama & music), NSS, ISR, and IIC.
- Platform shortcuts: c/home (feed), c/communities (clubs), c/network (find campus peers), c/connect (encrypted chats), c/xd (meme reels), c/maps (3D campus map), c/calendar (academic dates), c/arcade (chess & mini-games), c/profile (student bio & department stamp).

Behavior & Tone:
- Keep answers concise, helpful, friendly, and authentic to engineering student life in Pune.
- Use markdown formatting with bullet points and bold text where helpful.
- Help students with academic questions, campus navigation, coding advice, study planning, and platform help.
`;

export async function askBuddyAI(userMessage, conversationHistory = []) {
  if (!GEMINI_API_KEY) {
    return 'Buddy AI is initializing. Please ensure your VITE_GEMINI_API_KEY is configured in your environment.';
  }

  try {
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nUser Question: ${userMessage}` }],
      },
    ];

    // Append past messages if any
    conversationHistory.slice(-6).forEach((msg) => {
      contents.push({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }],
      });
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API response error:', errText);
      return getFallbackBuddyResponse(userMessage);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidate) {
      return candidate;
    }
    return getFallbackBuddyResponse(userMessage);
  } catch (error) {
    console.error('Buddy AI fetch exception:', error);
    return getFallbackBuddyResponse(userMessage);
  }
}

function getFallbackBuddyResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('canteen') || q.includes('food') || q.includes('maggi') || q.includes('dosa')) {
    return '🍽️ **PCCOE Food Guide:**\n- **Main Canteen:** Best Masala Dosa, Thali, and Cold Coffee.\n- **Back-gate Kiosk:** Quick Maggi & tea between lectures.\n- **Samarth Chowk:** Surya Fast Food and street snacks right opposite campus gate.';
  }
  if (q.includes('library') || q.includes('book') || q.includes('reading')) {
    return '📚 **Central Library (Admin Building 1st & 2nd Floor):**\n- Over 50,000+ technical volumes and IEEE digital access.\n- 350-seat air-conditioned reading hall open till late during exam season.';
  }
  if (q.includes('exam') || q.includes('insem') || q.includes('endsem') || q.includes('toc') || q.includes('notes')) {
    return '📝 **Exams & Resources:**\n- Check **c/home** for shared TOC solution drives and B-Block question banks.\n- Autonomous In-Sem timetable is published on **c/calendar**!';
  }
  if (q.includes('club') || q.includes('gdgc') || q.includes('redline') || q.includes('art circle')) {
    return '🚀 **PCCOE Student Communities:**\n- Head over to **c/communities** to join GDGC PCCOE, OWASP, Team Redline Racing, Art Circle, and SDW clubs!';
  }
  return `👋 **Hey there! I am Buddy AI, your PCCOE Campus Companion.**\n\nI can help you with:\n- 📍 Locating labs, classrooms & faculty in A-Block or B-Block\n- 📚 Exam prep resources, question papers & autonomous syllabus\n- 🏎️ Joining campus clubs (GDGC, Team Redline, Art Circle, NSS)\n- 💬 Navigating Cohort features\n\nWhat would you like to know today?`;
}
