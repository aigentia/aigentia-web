'use strict';

const CONTENT = {

  welcome: {
    title: 'Welcome',
    text: `AiGENTiA is an AI Management Agency.\n\nWe work with organisations navigating the transition from AI experimentation to AI operation — designing, deploying, and governing the autonomous systems that will define how work gets done.\n\nThe shift to agent-based AI is not primarily a technology problem. It is a governance problem, an organisational problem, and a human problem. Most AI consultancies approach it as the former. We address all three.\n\nOur practice spans five phases: **Assess → Design → Deploy → Manage → Govern.**\n\nWhat would you like to explore?`,
    followups: ['how-we-work', 'what-is-ai-agent', 'portfolio'],
  },

  philosophy: {
    title: 'Our Philosophy',
    text: `AiGENTiA was built on a specific observation: the organisations that will thrive in the agent economy are not those that adopt AI fastest, but those that govern it best — and that governance capacity must be built deliberately, not assumed.\n\n**Governance First.**\nEvery service we deliver has governance built in from the outset — not added as a compliance afterthought. This is non-negotiable.\n\n**Methodology Over Enthusiasm.**\nWe do not chase hype. The Assess→Design→Deploy→Manage→Govern framework exists because sequencing matters and mistakes are expensive.\n\n**Interdisciplinary Rigour.**\nOur work draws on economic sociology, AI safety research, strategic advisory and executive coaching — because agent adoption is a human system challenge, not just a technical one.\n\n**Continuous Intelligence.**\nWe do not deliver a strategy and disappear. Our Advisory practice provides ongoing intelligence on the forces that will invalidate strategies built on outdated assumptions.\n\n**Vendor Independence.**\nAiGENTiA has no commercial relationship with any AI model provider, platform vendor or tool company. Our recommendations are based solely on client fit.`,
    followups: ['who-is-behind', 'how-we-work', 'portfolio'],
  },

  'who-is-behind': {
    title: 'Who Is Behind AiGENTiA',
    text: `AiGENTiA was founded by **M. Cenan Demirel** — a practitioner whose background spans economic and organisational sociology, AI safety and prompt analysis at a frontier AI laboratory, Wharton AI Strategy and Governance certification, ICF Level 1 Coaching with neuroscience specialisation, and multiple AI advisory and product management roles.\n\nThe firm was built on the conviction that the organisations that will thrive in the agent economy are not those that adopt AI fastest, but those that govern it best — and that governance capacity must be built deliberately, not assumed.\n\n**Credentials:**\n· PhD Candidacy, Economic & Organisational Sociology\n· ICF Level 1 Coaching · Neuroscience Specialisation\n· AI Safety & Prompt Analysis, Frontier AI Laboratory\n· Wharton AI Strategy & Governance Certification\n\nBased in Germany with international engagements.\n\n**The Name.**\nAiGENTiA breaks down as Ai · GENT · iA — AI, gentes (people), and intelligent agency. The Latin tagline Agens Intelligens translates as Intelligent Agency — a system that acts with intelligence, on behalf of people. This is not a coincidence. It is a commitment.`,
    followups: ['philosophy', 'how-we-work', 'contact'],
  },

  portfolio: {
    title: 'Agency Portfolio',
    text: `AiGENTiA offers eleven integrated services spanning the complete arc of AI adoption — from initial readiness assessment to ongoing governance. Each service is designed to be deployed independently or as part of a full transformation programme.\n\n**ASSESS**\n· AI Readiness Audit — structured diagnostic across people, process, data and technology\n\n**DESIGN**\n· Agent Architecture & Design — blueprint multi-agent systems aligned to business goals\n· Agent Workflow Mapping — define what each agent does, in what sequence, with what data\n\n**DEPLOY**\n· Agent Implementation — build, test, integrate and deploy AI agents\n· AI Marketing & Campaign Agents — autonomous agents for campaigns, content and optimisation\n\n**MANAGE**\n· AI Training & Change Management — prepare your people for an agent-augmented organisation\n· Agent Performance Management — continuous monitoring of accuracy, cost and compliance\n\n**GOVERN**\n· AI Governance & Safety — policy design, control frameworks and risk registers\n· AI Brand & Communication Strategy — shaping the narrative for customers, staff and regulators\n· AI Governance Retainer — ongoing advisory on governance and regulatory changes\n\nEvery service AiGENTiA delivers has governance built in — not added afterwards. This is the foundational distinction between AI adoption and AI operation.`,
    followups: ['architecture', 'governance', 'how-we-work'],
  },

  'how-we-work': {
    title: 'How AiGENTiA Works',
    text: `Every AiGENTiA engagement follows a disciplined five-phase methodology. The sequence is not rigid — phases may overlap or be revisited — but the logic is invariable: you cannot govern what you have not assessed, and you cannot deploy what you have not designed.\n\n**01 · ASSESS**\nUnderstanding before action. We map your organisation's readiness across people, process, data, technology and governance. No assumptions. No vendor agenda. Honest diagnosis.\n\n**02 · DESIGN**\nArchitecture before code. We blueprint agent systems, workflow logic, AOS requirements and human oversight structures. The design phase prevents the most expensive mistakes.\n\n**03 · DEPLOY**\nControlled implementation. Agents are built, tested and deployed against the approved design. Integration, QA and safety testing are mandatory steps, not optional extras.\n\n**04 · MANAGE**\nOperations and optimisation. Deployed agents require active management — performance monitoring, model updates, cost control and continuous alignment with business objectives.\n\n**05 · GOVERN**\nAuthority and oversight. Governance is not a phase — it is a permanent condition. We establish the policies, controls and structures that keep agents operating within mandate.\n\nThe methodology exists because the failure modes of AI adoption are well-documented: organisations deploy before they design, operate without governing, and scale before they understand. We reverse that sequence.`,
    followups: ['ai-readiness', 'portfolio', 'philosophy'],
  },

  contact: {
    title: 'Contact the Agent',
    text: `Every engagement starts with a conversation.\n\nThe best first step is always an AI Readiness Assessment — a structured diagnostic that maps where your organisation actually stands, with no vendor agenda and no predetermined conclusion.\n\n**Get in touch:**\n\n· Email: [copy:hello@aigentia.com]\n· Web: [copy:aigentia.com]\n· Founder: M. Cenan Demirel\n\nIf you would like to begin the AI Readiness Assessment directly, you can do so now — it takes approximately five minutes and produces an immediate readiness profile for your organisation.\n\nAiGENTiA · AI Management Agency · Agens Intelligens · 2025`,
    followups: ['ai-readiness', 'how-we-work', 'philosophy'],
  },

  'what-is-ai-agent': {
    title: 'What Is an AI Agent?',
    text: `An AI agent is an autonomous software system that perceives its environment, processes information, and takes actions to achieve defined goals — without requiring step-by-step human instruction for every decision. Understanding agents is the starting point for governing them.\n\nUnlike traditional software, which executes fixed commands in a predetermined sequence, an AI agent **reasons.** It assesses the situation it finds itself in, selects tools and actions, calls external services, coordinates with other agents, and adapts its approach based on feedback — all in pursuit of a goal set by a human operator.\n\n**The distinction matters enormously.** Traditional software does what it is told, exactly when told. An agent does what is necessary to achieve what it has been asked to achieve. The difference is the difference between a calculator and a colleague.\n\n**Core Characteristics:**\n· Autonomy — acts without constant human direction, within defined boundaries\n· Perception — reads and interprets data from APIs, documents, databases, screens\n· Reasoning — evaluates options, selects tools, sequences actions\n· Action — executes tasks, sends communications, writes and deploys code\n· Memory — retains context across sessions, short-term and long-term\n· Learning — improves through structured feedback and evaluation loops\n\n**Types of Agent:**\n· Task Agent — single-purpose automation\n· Research Agent — searches, synthesises and summarises\n· Coding Agent — writes, tests, debugs and deploys software\n· Orchestrator Agent — coordinates multiple specialist agents\n· Guardian Agent — monitors other agents, enforces policies, flags escalations\n\nAn agent is not a chatbot. It is not a search engine. It is a system that acts — autonomously, persistently, and with consequence. This is why governance is not optional.`,
    followups: ['agent-os', 'agent-economy', 'how-we-work'],
  },

  'agent-os': {
    title: 'Agent Operating System',
    text: `Just as an operating system manages the resources, processes and security of a computer, an Agent Operating System governs the agents running within an organisation. Without one, agents are ungoverned processes — useful in isolation, dangerous at scale.\n\nWhen an organisation deploys dozens of agents across departments — each calling APIs, accessing data, sending communications, and triggering workflows — the challenge becomes structural. Who authorises what? Who monitors decisions? What happens when an agent fails, loops, or exceeds its mandate?\n\nAn Agent Operating System (AOS) is the answer. It is the orchestration and governance layer that sits between your business logic and your deployed agents.\n\n**Core AOS Functions:**\n· Orchestration — routes tasks to the appropriate agent based on capability, availability and cost\n· Authentication & Permissions — defines which agents can access which systems and under what conditions\n· Monitoring & Audit Logging — records every agent action, decision and tool call\n· Resource Management — controls API call budgets, token limits and cost thresholds\n· Inter-Agent Communication — structured protocols governing how agents pass tasks and context\n· Error Handling & Escalation — defines what happens when agents fail or encounter ambiguity\n· Human-in-the-Loop Controls — configurable approval gates for high-stakes actions\n\n**Risks of Operating Without an AOS:**\n· Uncontrolled costs — agents calling paid APIs in loops with no budget ceiling\n· Security vulnerabilities — agents with excessive permissions accessing sensitive data\n· Regulatory exposure — no audit trail means no compliance evidence under EU AI Act or GDPR\n· Brand risk — agents communicating without appropriate tone or authorisation controls\n· Operational opacity — no visibility into what agents are doing or why`,
    followups: ['what-is-ai-agent', 'governance', 'architecture'],
  },

  'agent-economy': {
    title: 'The Agent Economy',
    text: `The transition from AI experimentation to AI operation is not happening in a vacuum. It is shaped by chip conflicts, energy constraints, regulatory divergence and a rapidly changing landscape of models and frameworks. Organisations that ignore these forces make expensive strategic mistakes.\n\n**Geopolitical Landscape**\nUS-China chip conflict restricts access to advanced semiconductors in certain jurisdictions. The EU AI Act creates tiered compliance obligations for high-risk AI systems, with full enforcement from August 2026. Export controls on AI models, training data and hardware are evolving rapidly — what is permitted today may be restricted tomorrow.\n\n**Hardware Bottlenecks**\nGPU scarcity remains structural. NVIDIA H100/H200/B200 allocation is controlled by hyperscalers and enterprise agreements. Procurement lead times for on-premise GPU infrastructure can reach 6–18 months in 2025.\n\n**Energy & Sustainability**\nAI data centres are projected to consume 8% of US electricity by 2030. Energy cost is becoming a material factor in AI cost modelling. Sustainability reporting requirements — CSRD in Europe, SEC climate rules in the US — intersect directly with AI energy consumption disclosures.\n\n**The Model Landscape**\nOpen-source models — Llama, Mistral, Qwen — are closing the gap with proprietary models while eliminating API dependency. Specialised vertical models are outperforming general models on domain-specific tasks. Agentic frameworks are maturing, but fragmentation remains high.\n\nAI strategy cannot be set once and forgotten. The hardware changes. The regulations change. The competitive landscape changes. Continuous intelligence is the only viable posture.`,
    followups: ['ai-advisory', 'philosophy', 'how-we-work'],
  },

  'ai-advisory': {
    title: 'AI Advisory',
    text: `AI strategy requires continuous intelligence. The competitive, regulatory and technical landscape changes faster than annual planning cycles. AiGENTiA's Advisory practice provides structured, ongoing intelligence on the forces shaping the agent economy — enabling leadership teams to make decisions based on current reality, not last year's assumptions.\n\n**Geopolitical Intelligence Reports**\nMonthly briefings on AI-relevant geopolitical developments: chip export controls, bilateral agreements, sanctions, national AI policies and their direct implications for enterprise AI procurement, deployment and compliance.\n\n**Hardware & Compute Bottleneck Analysis**\nQuarterly analysis of GPU availability, cloud capacity constraints, emerging silicon alternatives and the implications for your infrastructure roadmap. Includes procurement timing recommendations.\n\n**Energy & Sustainability Advisory**\nAssessment of your AI energy footprint, alignment with CSRD and ESG reporting requirements, and strategic options for sustainable AI infrastructure — including renewable procurement and edge deployment strategies.\n\n**Regulatory Compliance Intelligence**\nContinuous tracking of EU AI Act implementation, GDPR intersection with AI data practices, and sector-specific regulations with their compliance implications.\n\n**New Player & Model Landscape Tracker**\nBi-monthly assessment of significant new AI models and agentic frameworks. Includes capability benchmarks, cost comparisons and strategic recommendations for model portfolio management.\n\n**Competitive Intelligence**\nSector-specific analysis of how your competitive landscape is adopting AI — capability gaps, automation opportunities and differentiation strategies.\n\nDelivered as a monthly or quarterly retainer, including a standing briefing document, executive summary, and on-call access to AiGENTiA advisors.`,
    followups: ['agent-economy', 'governance', 'contact'],
  },

  governance: {
    title: 'AI Governance & Safety',
    text: `Governance is not a phase — it is a permanent condition.\n\nAiGENTiA's Governance practice spans three integrated services:\n\n**AI Governance & Safety**\nPolicy design, control frameworks, risk registers and oversight protocols for AI systems. Aligned to EU AI Act, ISO 42001 and organisational risk appetite. We establish the authority structures that keep agents operating within mandate — and the audit trails that demonstrate it.\n\n**AI Brand & Communication Strategy**\nHow you communicate about AI to customers, staff and regulators defines your market position. We shape the narrative, tone and disclosure framework — ensuring your AI communications are accurate, compliant and strategically positioned.\n\n**AI Governance Retainer**\nOngoing advisory on governance, policy updates and regulatory changes. Monthly briefings, policy reviews and on-call access to AiGENTiA advisors. As the EU AI Act moves toward full enforcement in August 2026, organisations need governance that evolves with the regulatory landscape.\n\n**Key Governance Dimensions:**\n· EU AI Act compliance and tiered risk classification\n· ISO 42001 AI Management System alignment\n· GDPR intersection with AI data processing\n· Board-level AI risk reporting frameworks\n· Agent audit trails and accountability structures\n· Human oversight and escalation protocols\n· AI communication and disclosure standards`,
    followups: ['agent-os', 'ai-advisory', 'how-we-work'],
  },

  architecture: {
    title: 'Agent Architecture & Design',
    text: `Architecture before code. The design phase is where the most expensive mistakes are either made or avoided.\n\n**Agent Architecture & Design**\nWe blueprint multi-agent systems aligned to business goals before a line of code is written. This includes:\n· Agent topology — which agents, how many, in what configuration\n· Tool integrations — which external APIs, databases and systems each agent connects to\n· Memory structures — short-term context within conversations, long-term context across deployments\n· Escalation pathways — when and how agents hand off to humans or other agents\n· AOS requirements — the governance infrastructure required to operate the system safely\n\n**Agent Workflow Mapping**\nWe define what each agent does, in what sequence, with what data, under what conditions, and with which human checkpoints. The operational specification that prevents agent drift.\n\n**Agent drift** — where deployed agents gradually diverge from their intended behaviour — is one of the most common and costly failure modes in enterprise AI deployment. It is prevented by design, not by monitoring alone.\n\nThe Architecture & Design phase is mandatory for all AiGENTiA transformation programmes and is recommended as a standalone engagement before any agent deployment of meaningful scale.`,
    followups: ['how-we-work', 'agent-os', 'portfolio'],
  },

  'marketing-agents': {
    title: 'AI Marketing & Campaign Agents',
    text: `Autonomous agents for campaign personalisation, content generation, audience segmentation and performance optimisation — operating within brand and compliance guardrails.\n\nMarketing is one of the highest-ROI applications of agent-based AI, and one of the highest-risk if deployed without governance. AiGENTiA's Marketing Agent practice addresses both dimensions simultaneously.\n\n**What Marketing Agents Do:**\n· Campaign personalisation at scale — dynamic content adapting to audience segments in real time\n· Content generation — briefs, copy, social content and performance variants within brand guidelines\n· Audience segmentation — autonomous analysis of behavioural and demographic data\n· Performance optimisation — continuous A/B testing and budget allocation across channels\n· Reporting and insight generation — automated performance analysis and strategic recommendations\n\n**The Governance Imperative**\nMarketing agents communicate at scale on behalf of your brand. Without appropriate guardrails — tone policies, compliance rules, approval gates for regulated content — a single agent error becomes a brand event. AiGENTiA deploys marketing agents with governance built in: defined content boundaries, human approval workflows for sensitive outputs, and full audit trails.\n\nAll Marketing Agent deployments include an AI Brand & Communication Strategy as a prerequisite.`,
    followups: ['portfolio', 'governance', 'architecture'],
  },

  'ai-readiness': {
    title: 'AI Readiness Assessment',
    text: `Before any organisation invests in AI agents, it must understand where it actually stands — not where it hopes it stands.\n\nThe AiGENTiA AI Readiness Assessment is a structured diagnostic that maps current capability across four dimensions, identifies critical gaps, and produces a prioritised action plan.\n\n**Assessment Dimensions:**\n· People & Culture — AI literacy, change readiness, leadership alignment, skills gaps\n· Process & Data — data quality, accessibility, governance maturity, integration architecture\n· Technology & Infrastructure — stack compatibility, API availability, cloud architecture, AOS readiness\n· Governance & Risk — existing AI policies, regulatory exposure, compliance obligations\n\n**Deliverables:**\n· AI Maturity Score across all four dimensions with benchmark comparison\n· Prioritised gap analysis with effort/impact mapping\n· 90-day quick-win action plan and 12-month transformation roadmap\n· Executive briefing and board-ready risk summary\n· Technology vendor shortlist aligned to your architecture and budget\n\nThe Assessment is delivered over 3–6 weeks through structured interviews, process walkthroughs and technical reviews. It is the mandatory starting point for all AiGENTiA transformation programmes.\n\nTake the quick assessment below to receive your immediate readiness profile.`,
    followups: ['how-we-work', 'portfolio', 'ai-finance'],
    hasAssessment: true,
    assessmentKey: 'readiness',
  },

  'ai-finance': {
    title: 'AI Transformation Finance',
    text: `AI transformation is a significant capital commitment. Infrastructure, talent, tooling, integration, governance and ongoing management each carry costs that are frequently underestimated. AiGENTiA provides financial advisory services that help organisations understand, model and fund their AI investment.\n\n**Total Cost of Agent Ownership (TCAO):**\n· Initial Deployment — architecture, development, integration, testing and launch\n· Model API Costs — per-token costs for commercial models, scaling with agent usage volume\n· Infrastructure — compute, storage, monitoring tools and AOS platform\n· Human Oversight — ongoing cost of human reviewers, escalation handlers and governance functions\n· Maintenance & Updates — model updates, prompt optimisation, integration maintenance\n· Compliance & Audit — regulatory reporting, audit logging infrastructure, legal review\n\n**ROI Framework:**\nAiGENTiA models AI ROI across three value categories: cost reduction (process automation, headcount redeployment), revenue enhancement (faster sales cycles, improved customer experience) and risk reduction (compliance, error reduction). Payback periods for well-scoped agent programmes typically range from 8 to 24 months.\n\n**Funding Options:**\n· EU Horizon Europe & Digital Europe Programmes\n· UK Innovate UK — Smart Grants and AI Adoption programmes for SMEs\n· German KfW Digital Infrastructure — low-interest loans for digital transformation\n· Internal Capital Reallocation from process automation savings\n· AI-as-a-Service pricing — converting capital expenditure to operational expenditure\n\nTake the Finance Assessment below to receive a personalised investment and funding recommendation.`,
    followups: ['ai-readiness', 'how-we-work', 'contact'],
    hasAssessment: true,
    assessmentKey: 'finance',
  },

  tokenization: {
    title: 'AI Token Economics',
    text: `Token economics is the hidden dimension of AI cost management. As organisations scale from AI pilots to production deployments, token consumption — and the costs associated with it — become a significant operational variable.\n\n**What Are Tokens?**\nTokens are the unit of processing for large language models. Roughly one token equals four characters of English text. Every input to and output from a commercial AI model — OpenAI, Anthropic, Google — is measured and billed in tokens.\n\n**Why Token Economics Matters at Scale:**\n· An agent processing 1,000 documents per day at current API pricing can cost €3,000–15,000 per month\n· Multi-agent orchestrations multiply token consumption — each agent-to-agent communication incurs cost\n· Context window size directly impacts cost — agents retaining long conversation histories consume significantly more tokens\n· Model selection is a major cost lever — frontier models cost 10–30x more per token than efficient alternatives for comparable tasks\n\n**AiGENTiA's Token Governance Framework:**\n· Per-agent and per-workflow token budgets with hard ceilings\n· Model routing — automatically selecting the appropriate model tier for each task type\n· Context window management — intelligent compression of agent memory\n· Cost monitoring dashboards with alert thresholds\n· Monthly token spend analysis and optimisation recommendations\n\nTake the Token Economics Assessment below to understand your current position and receive targeted recommendations.`,
    followups: ['ai-finance', 'agent-os', 'portfolio'],
    hasAssessment: true,
    assessmentKey: 'tokenization',
  },

  'ai-training': {
    title: 'AI Training & Change Management',
    text: `The most sophisticated AI agent system will fail if the humans working alongside it are unprepared. Technology adoption is fundamentally a human challenge.\n\nAiGENTiA's Training & Change Management practice prepares organisations for an operational model where agents are colleagues — handling tasks autonomously, escalating when necessary, and integrating with human workflows at every level.\n\n**Role-Specific AI Literacy**\nTraining calibrated to actual job functions — not generic awareness content. Sales teams learn to work with prospecting and qualification agents. Finance teams learn to work with reporting and analysis agents. Leadership teams learn to set mandate and evaluate agent performance.\n\n**Change Communication Strategy**\nInternal and external communication frameworks for AI adoption. Addressing employee concerns about automation. Positioning AI as workforce augmentation — where that is the genuine intent.\n\n**Adoption Frameworks**\nStructured rollout plans that move from pilot to full deployment in stages, with feedback loops that allow human colleagues to refine agent behaviour over time.\n\n**The Governance Connection**\nChange management and governance are inseparable. Employees who understand the boundaries of AI systems — what agents can do, what they cannot, and when to escalate — are the first line of governance. Training is not a soft skill add-on. It is a risk management function.`,
    followups: ['governance', 'how-we-work', 'portfolio'],
  },

  calendar: {
    title: 'Calendar & Events',
    text: `AiGENTiA hosts a rolling programme of briefings, workshops and open assessments for leadership teams navigating AI adoption.\n\n**Upcoming:**\n· AI Readiness Workshops — Berlin & Online, Q3 2025\n· Agent Economy Briefing — Online, Monthly\n· EU AI Act Compliance Clinic — Frankfurt, Q4 2025\n· Token Economics Masterclass — Online, Quarterly\n\nAll events are small-format, invitation-only or limited-registration — designed for substantive dialogue rather than broadcast.\n\nThe AiGENTiA Advisory retainer includes standing access to all briefings and events as a standard component.\n\n**Register interest or request a private briefing:**\n· Email: [copy:hello@aigentia.com]`,
    followups: ['ai-advisory', 'how-we-work', 'contact'],
  },

  unknown: {
    title: 'AiGENTiA',
    text: `I don't have specific information on that topic in my current scope.\n\nI can tell you about AiGENTiA's services, methodology, and the forces shaping the agent economy. You can also begin one of our three assessments — AI Readiness, AI Finance, or AI Token Economics — directly from here.\n\nWhat would you like to explore?`,
    followups: ['how-we-work', 'what-is-ai-agent', 'portfolio'],
  },

};

const NAV_ITEMS = [
  { key: 'philosophy',      label: 'Our Philosophy',    icon: 'book-open' },
  { key: 'portfolio',       label: 'Agency Portfolio',  icon: 'layers' },
  { key: 'ai-readiness',    label: 'AI Readiness',      icon: 'bar-chart-2' },
  { key: 'ai-finance',      label: 'AI Finance',        icon: 'trending-up' },
  { key: 'tokenization',    label: 'Token Economics',   icon: 'coins' },
  { key: 'calendar',        label: 'Calendar & Events', icon: 'calendar' },
  { key: 'contact',         label: 'Contact the Agent', icon: 'mail' },
];

const STARTERS = [
  { label: 'SHOW ME YOUR AI IMPLEMENTATION PROCESS', key: 'how-we-work' },
  { label: 'WHO IS BEHIND AIGENTIA?',                key: 'who-is-behind' },
  { label: 'WHAT IS AN AI AGENT?',                  key: 'what-is-ai-agent' },
  { label: 'BEGIN THE AI READINESS ASSESSMENT',     key: 'ai-readiness' },
];

const TRIGGER_MAP = {
  'our philosophy':                     'philosophy',
  'philosophy':                         'philosophy',
  'agency portfolio':                   'portfolio',
  'portfolio':                          'portfolio',
  'services':                           'portfolio',
  'our services':                       'portfolio',
  'contact':                            'contact',
  'contact the agent':                  'contact',
  'get in touch':                       'contact',
  'show me your ai implementation':     'how-we-work',
  'implementation process':             'how-we-work',
  'how aigentia works':                 'how-we-work',
  'how you work':                       'how-we-work',
  'methodology':                        'how-we-work',
  'who is behind':                      'who-is-behind',
  'founder':                            'who-is-behind',
  'about you':                          'who-is-behind',
  'what is an ai agent':                'what-is-ai-agent',
  'what is an agent':                   'what-is-ai-agent',
  'ai agent':                           'what-is-ai-agent',
  'agent operating system':             'agent-os',
  'what is an aos':                     'agent-os',
  'aos':                                'agent-os',
  'the agent economy':                  'agent-economy',
  'agent economy':                      'agent-economy',
  'geopolitical':                       'agent-economy',
  'ai advisory':                        'ai-advisory',
  'advisory':                           'ai-advisory',
  'ai governance':                      'governance',
  'governance':                         'governance',
  'safety':                             'governance',
  'agent architecture':                 'architecture',
  'architecture':                       'architecture',
  'design':                             'architecture',
  'ai marketing':                       'marketing-agents',
  'marketing agents':                   'marketing-agents',
  'marketing':                          'marketing-agents',
  'ai readiness':                       'ai-readiness',
  'readiness assessment':               'ai-readiness',
  'readiness':                          'ai-readiness',
  'ai finance':                         'ai-finance',
  'transformation finance':             'ai-finance',
  'finance':                            'ai-finance',
  'token':                              'tokenization',
  'tokenization':                       'tokenization',
  'token economics':                    'tokenization',
  'ai training':                        'ai-training',
  'change management':                  'ai-training',
  'training':                           'ai-training',
  'calendar':                           'calendar',
  'events':                             'calendar',
  'calendar and events':                'calendar',
  'upcoming events':                    'calendar',
};
