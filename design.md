# AiGENTiA — Design Specification
**Version:** 1.0
**Philosophy:** Conversational Intelligence as Infrastructure

## 1. The Core Concept
The AiGENTiA website is not a "site"—it is a persistent, intelligent workspace. We move away from the traditional "Browse and Scroll" model to a **"Query and Stream"** model. The user never leaves the central canvas; information is brought to them through a generative delivery system that mimics the behavior of high-end AI products.

## 2. Layout Structure (The "Product" Blueprint)
The interface mirrors the standard 3-zone structure of top-tier AI platforms (Gemini, ChatGPT, Claude):

### A. Left Sidebar (Workspace & History)
* **Width:** 260px.
* **Background:** Deep Indigo (`#221D5C`).
* **Brand Lockup:** Contains the `.ag-lockup` (min-size 32px) at the top.
* **Navigation:** Vertical list of "Previous Sessions" or "Quick Nav" links (e.g., *Our Philosophy*, *Agency Portfolio*, *Contact the Agent*).

### B. Central Canvas (The Stream)
* **Background:** Warm Cream (`#F6F1E7`).
* **Function:** All content appears here. There is no global vertical scroll; only the conversation thread within this canvas grows.
* **Delivery:** Content is preloaded but appears to be typed in real-time.

### C. Prompt Bar (The Trigger)
* **Position:** Fixed at the bottom of the canvas.
* **Visuals:** Minimalist input field using `Inter` font.
* **Conversation Starters:** Floating cards above the input bar (e.g., *"Show me your AI implementation process"* or *"Who is behind AiGENTiA?"*).

## 3. Interaction & Animation
### The Typing Delivery
To maintain the "AI product" feel, content is delivered via a character-by-character typing effect.
* **Trigger:** Clicking a sidebar link or a Conversation Starter triggers an "Agent Response."
* **Visual Accent:** Use the `.ag-animated` class on the brand mark during data fetching/typing to signal "Processing."

### Non-Navigational Transitions
* **Zero Redirects:** All links are handled by the central chat controller.
* **Expansion:** If a user requests a "Case Study," the text types out, and a rich-media card appears within the stream.

## 4. Visual Identity & Brand Integration
* **Primary Palette:**
    * **Deep Indigo (#221D5C):** Primary UI containers and dark-mode brand lockups.
    * **Warm Cream (#F6F1E7):** Primary canvas color for a "premium paper" feel.
    * **Ancient Bronze (#5E4B38):** Restricted to thin dividers (`.ag-rule`) and the `.ag-accent` line.
* **Typography:**
    * **Brand Name:** `Cormorant Garamond` (400 weight).
    * **UI/Body:** `Inter` (400 weight). All tagline text and starters must be Uppercase.
* **Prohibition:** No purple gradients. We are an agency of intelligence, not an AI commodity.

## 5. Technical implementation
* **CSS Tokens:** Refer to `aigentia-tokens.css` for all variables.
* **Components:** Use `.ag-lockup ag-light` for light backgrounds and `.ag-lockup ag-dark` for the sidebar.
* **Animations:** Use the `ag-pulse` keyframes defined in `aigentia-brand.css`.
