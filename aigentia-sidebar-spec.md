# AiGENTiA Sidebar — Implementation Spec for Claude Code

## Structure (in order, top to bottom)

### Logo lockup (always visible, top)
- Mark (animated, pulsing) + name (Cormorant Garamond 400) + tagline (Inter 400)
- Collapsed state: mark only

### Navigation items
Each item triggers a response in the chat window.
On click: STOP any current typewriter, CLEAR the chat window, START new response.

| Label              | Key             | Icon (Lucide)    | Action                          |
|--------------------|-----------------|------------------|---------------------------------|
| About AiGENTiA     | about           | info             | Chat response                   |
| AI Management      | ai_management   | briefcase        | Chat response                   |
| AI Advisory        | ai_advisory     | compass          | Chat response                   |
| AI Finance         | ai_finance      | bar-chart-2      | Chat response                   |
| AI Readiness       | assess_readiness | clipboard-check  | Assessment in chat window       |
| Tokenization       | assess_token    | layers           | Assessment in chat window       |
| Finance Assessment | assess_finance  | coins            | Assessment in chat window       |
| Academy            | academy         | graduation-cap   | Chat response                   |
| Events             | events          | calendar-clock   | Chat response                   |
| Calendar           | calendar        | calendar         | Chat response + Calendly link   |
| Contact            | contact         | mail             | Contact form in chat window     |

### Social icons row (below Contact, before accent line)
Four icons side by side: YouTube, TikTok, LinkedIn, Instagram
Each opens link in new tab.
Collapsed state: hide social row or show single share-2 icon.

### Accent line (Ancient Bronze #5E4B38)

### Explore / Chat history section (below accent line)
Label: "Explore" (small caps, muted)
8 clickable items styled like Claude chat history:
1. What is Agent OS?
2. The Agent Economy
3. What is an AI Agent?
4. AI Governance Basics
5. The EU AI Act
6. What is Tokenization?
7. Cost of AI Transformation
8. AI Readiness in 2025

## Behaviour rules

1. CLEAR ON NAVIGATE: When any nav item or explore item is clicked,
   immediately stop any active typewriter animation,
   clear all messages from the chat window,
   then start the new response.

2. CONTACT: Render aigentia-contact.html content inside a chat message bubble.
   No typewriter for the form — render it instantly.
   Form submission: POST to Formspree (endpoint TBD — use placeholder).
   Copy-to-clipboard on email tap.

3. ASSESSMENTS: Call renderAssessment(id, container) from aigentia-assessments.js.
   Render inside a chat message bubble. No typewriter — render instantly.
   Assessment replaces any previous content (clear on navigate rule applies).

4. COLLAPSED STATE (mobile and desktop):
   Width: 54px. Show icons only. No labels. No social row text.
   Logo mark visible. Name/tagline hidden.
   Tap any icon to expand to 240px.
   Tap outside expanded sidebar to collapse.
