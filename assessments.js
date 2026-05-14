'use strict';

const ASSESSMENTS = {

  readiness: {
    title: 'AI READINESS ASSESSMENT',
    subtitle: 'Understand where your organisation stands before you move.',
    questions: [
      {
        dimension: 'People & Culture',
        text: 'How would you describe AI literacy across your leadership team?',
        options: [
          { label: 'Limited awareness — AI is discussed but not understood', score: 1 },
          { label: 'Growing interest — leadership is exploring and learning', score: 2 },
          { label: 'Active engagement — leadership is informed and curious', score: 3 },
          { label: 'AI-literate — leadership can evaluate and direct AI strategy', score: 4 },
        ],
      },
      {
        dimension: 'People & Culture',
        text: 'How ready is your organisation for the operational changes AI agents will require?',
        options: [
          { label: 'Resistant — significant cultural barriers to change', score: 1 },
          { label: 'Cautious — open in principle, slow in practice', score: 2 },
          { label: 'Receptive — change programmes are already underway', score: 3 },
          { label: 'Agile — the organisation adapts readily and quickly', score: 4 },
        ],
      },
      {
        dimension: 'Process & Data',
        text: 'What proportion of your business-critical data is structured, accessible and clean?',
        options: [
          { label: 'Less than 25% — data is siloed, inconsistent or inaccessible', score: 1 },
          { label: '25–50% — partial data governance in some areas', score: 2 },
          { label: '50–75% — most core data is structured and accessible', score: 3 },
          { label: 'Over 75% — high data quality with strong governance', score: 4 },
        ],
      },
      {
        dimension: 'Process & Data',
        text: 'Which best describes your current level of process automation?',
        options: [
          { label: 'Primarily manual — most processes rely on human execution', score: 1 },
          { label: 'Basic automation — some RPA or workflow tools in use', score: 2 },
          { label: 'Significant automation — key workflows are automated', score: 3 },
          { label: 'Advanced automation — complex processes run autonomously', score: 4 },
        ],
      },
      {
        dimension: 'Technology & Infrastructure',
        text: 'How would you describe your current technology infrastructure?',
        options: [
          { label: 'Legacy systems — limited APIs, difficult to integrate', score: 1 },
          { label: 'Mixed — combination of modern and legacy platforms', score: 2 },
          { label: 'Predominantly modern — cloud-present, API-accessible', score: 3 },
          { label: 'Cloud-native — API-first, highly composable architecture', score: 4 },
        ],
      },
      {
        dimension: 'Technology & Infrastructure',
        text: 'What is the current state of AI or ML tools within your organisation?',
        options: [
          { label: 'None deployed — AI is not yet operational in any function', score: 1 },
          { label: 'Experimental — one or two pilots running in isolation', score: 2 },
          { label: 'Several in use — AI tools active across multiple functions', score: 3 },
          { label: 'AI is operational — embedded in core business processes', score: 4 },
        ],
      },
      {
        dimension: 'Governance & Risk',
        text: 'Does your organisation have formal AI governance policies?',
        options: [
          { label: 'None — no AI policies or oversight mechanisms exist', score: 1 },
          { label: 'In development — governance is being drafted or discussed', score: 2 },
          { label: 'Basic policies in place — informal controls and guidelines', score: 3 },
          { label: 'Comprehensive framework — aligned to EU AI Act or ISO 42001', score: 4 },
        ],
      },
      {
        dimension: 'Governance & Risk',
        text: 'How does your leadership team approach AI risk?',
        options: [
          { label: 'Risk-averse — AI risk concerns are blocking progress', score: 1 },
          { label: 'Cautious — decisions are slow, approvals difficult to obtain', score: 2 },
          { label: 'Pragmatic — risk is managed without blocking innovation', score: 3 },
          { label: 'Risk-intelligent — AI risk is a governance discipline, not a blocker', score: 4 },
        ],
      },
    ],
    score(total) {
      if (total <= 14) return {
        band: 'Early Stage',
        colour: '#5E4B38',
        summary: 'Your organisation is at the starting line.',
        detail: 'Significant foundations need to be built before agent deployment is viable. The AiGENTiA AI Readiness Audit will produce a clear, prioritised roadmap — identifying the highest-impact investments and the blockers to address first. Beginning with assessment rather than implementation is the right move at this stage.',
        cta: 'ai-readiness',
      };
      if (total <= 22) return {
        band: 'Developing',
        colour: '#5E4B38',
        summary: 'Real foundations exist, but gaps remain.',
        detail: 'Your organisation has genuine capability in some dimensions, but critical gaps in others. A full AI Readiness Audit will identify exactly where to invest for maximum impact. Agent Architecture & Design — building the blueprint before touching code — is the right next step once those gaps are mapped.',
        cta: 'architecture',
      };
      if (total <= 28) return {
        band: 'Advanced',
        colour: '#221D5C',
        summary: 'Your organisation is positioned for structured deployment.',
        detail: 'Strong foundations across most dimensions. The priority is now controlled, well-governed implementation — using the Assess→Design→Deploy methodology to ensure agents are deployed at the right scope and with the right oversight. An AI Governance & Safety framework should be established in parallel.',
        cta: 'governance',
      };
      return {
        band: 'AI-Ready',
        colour: '#221D5C',
        summary: 'Your organisation is primed for full agent deployment.',
        detail: 'You have the people, data, infrastructure and governance posture to move with confidence. The focus is now architecture quality and performance management — ensuring the agents you deploy are well-designed, well-monitored, and continuously aligned with business objectives.',
        cta: 'how-we-work',
      };
    },
  },

  finance: {
    title: 'AI FINANCE ASSESSMENT',
    subtitle: 'Model your investment, identify funding, and set realistic expectations.',
    questions: [
      {
        dimension: 'Investment Capacity',
        text: 'What is your estimated annual budget for AI transformation?',
        options: [
          { label: 'Under €50,000 — exploring with very limited budget', score: 1 },
          { label: '€50,000–€250,000 — meaningful but constrained investment', score: 2 },
          { label: '€250,000–€1,000,000 — dedicated programme budget', score: 3 },
          { label: 'Over €1,000,000 — substantial multi-year investment', score: 4 },
        ],
      },
      {
        dimension: 'Investment Capacity',
        text: 'How is AI transformation currently funded in your organisation?',
        options: [
          { label: 'No dedicated budget — funded ad hoc or not at all', score: 1 },
          { label: 'Internal capex only — no external funding explored', score: 2 },
          { label: 'Mix of capex and opex — some programme structure in place', score: 3 },
          { label: 'Multi-source strategy — grants, opex, reallocation all considered', score: 4 },
        ],
      },
      {
        dimension: 'ROI Expectations',
        text: 'What is your target payback period for AI investment?',
        options: [
          { label: 'Under 12 months — rapid ROI required to justify spend', score: 1 },
          { label: '12–18 months — moderate time horizon acceptable', score: 2 },
          { label: '18–36 months — strategic investment with medium-term return', score: 3 },
          { label: '36+ months or flexible — long-term capability building', score: 4 },
        ],
      },
      {
        dimension: 'ROI Expectations',
        text: 'What is your primary AI ROI objective?',
        options: [
          { label: 'Cost reduction — automating processes, reducing operational spend', score: 1 },
          { label: 'Revenue enhancement — faster cycles, better customer experience', score: 2 },
          { label: 'Risk reduction — compliance, error reduction, audit costs', score: 3 },
          { label: 'All three — an integrated transformation programme', score: 4 },
        ],
      },
      {
        dimension: 'Financial Readiness',
        text: 'Have you explored external funding mechanisms for AI transformation?',
        options: [
          { label: 'Not at all — unaware of available programmes', score: 1 },
          { label: 'Aware but not pursued — know options exist, have not applied', score: 2 },
          { label: 'Currently exploring — applications in progress or planned', score: 3 },
          { label: 'Already benefiting — grants or loans secured and deployed', score: 4 },
        ],
      },
    ],
    score(total) {
      if (total <= 8) return {
        band: 'Constrained',
        colour: '#5E4B38',
        summary: 'Significant funding constraints identified.',
        detail: 'Your current budget and timeline expectations create real constraints for a comprehensive AI transformation programme. The good news: EU Horizon Europe, UK Innovate UK and German KfW programmes offer meaningful grant and loan funding for qualifying organisations. A Finance Assessment engagement will identify the funding mechanisms available to you and design a phased approach that works within your constraints.',
        cta: 'contact',
      };
      if (total <= 13) return {
        band: 'Developing',
        colour: '#5E4B38',
        summary: 'Budget is available — structure and phasing are the priority.',
        detail: 'You have meaningful investment capacity, but the programme needs to be structured carefully to deliver ROI within your timeline. A phased approach — beginning with Assess and Design — maximises the return on early investment and builds the evidence base for subsequent phases. External funding programmes may also supplement your budget meaningfully.',
        cta: 'how-we-work',
      };
      if (total <= 17) return {
        band: 'Ready to Invest',
        colour: '#221D5C',
        summary: 'Investment capacity supports a comprehensive programme.',
        detail: 'Your budget, timeline and ROI objectives are well-aligned for a full Assess→Design→Deploy engagement. The priority is ensuring investment is allocated correctly — front-loading governance and architecture before implementation to avoid the costly rework that comes from deploying without adequate design.',
        cta: 'architecture',
      };
      return {
        band: 'Strategic Investor',
        colour: '#221D5C',
        summary: 'Full-scale transformation programme is viable.',
        detail: 'You have the investment capacity, strategic patience and multi-source funding approach for a comprehensive, multi-year AI transformation programme. The focus should be on governance infrastructure and programme management — ensuring that investment at this scale produces proportionate, measurable returns with appropriate oversight.',
        cta: 'governance',
      };
    },
  },

  tokenization: {
    title: 'AI TOKEN ECONOMICS ASSESSMENT',
    subtitle: 'Understand your token consumption and take control of AI operating costs.',
    questions: [
      {
        dimension: 'Current Usage',
        text: 'Does your organisation currently use commercial AI APIs (OpenAI, Anthropic, Google, etc.)?',
        options: [
          { label: 'No — AI APIs are not yet in use', score: 1 },
          { label: 'Experimental — used by individuals, not in workflows', score: 2 },
          { label: 'Regular use — integrated into business workflows', score: 3 },
          { label: 'Production scale — high-volume, mission-critical deployment', score: 4 },
        ],
      },
      {
        dimension: 'Current Usage',
        text: 'What is your current estimated monthly AI API spend?',
        options: [
          { label: 'Nothing yet — no current spend', score: 1 },
          { label: 'Under €500/month — early exploration stage', score: 2 },
          { label: '€500–€5,000/month — meaningful but manageable costs', score: 3 },
          { label: 'Over €5,000/month — significant operational cost line', score: 4 },
        ],
      },
      {
        dimension: 'Cost Visibility',
        text: 'How much visibility does your organisation have into AI API costs?',
        options: [
          { label: 'No visibility — costs are unknown or unchecked', score: 1 },
          { label: 'Basic billing review — someone checks invoices periodically', score: 2 },
          { label: 'Tracked but not optimised — costs are monitored but not managed', score: 3 },
          { label: 'Fully monitored — dashboards, alerts and optimisation in place', score: 4 },
        ],
      },
      {
        dimension: 'Token Governance',
        text: 'Do you have per-agent or per-workflow token budgets defined?',
        options: [
          { label: 'No concept of token budgets — never been addressed', score: 1 },
          { label: 'Aware of the concept — not yet implemented', score: 2 },
          { label: 'Partially implemented — token budgets in some areas', score: 3 },
          { label: 'Full token governance — hard limits, routing and alerts in place', score: 4 },
        ],
      },
      {
        dimension: 'Model Strategy',
        text: 'How does your organisation currently select AI models for different tasks?',
        options: [
          { label: 'Use only one model — the same model for everything', score: 1 },
          { label: 'By familiarity — use what the team already knows', score: 2 },
          { label: 'Basic comparison — some performance evaluation before selection', score: 3 },
          { label: 'Cost-performance routing — right model for each task type', score: 4 },
        ],
      },
    ],
    score(total) {
      if (total <= 8) return {
        band: 'Unaware',
        colour: '#5E4B38',
        summary: 'Token economics is a blind spot.',
        detail: 'As you begin AI adoption, establishing cost visibility from day one will prevent significant overspend at scale. Organisations that start without token governance consistently discover unexpected cost escalation when usage grows. The AiGENTiA AI Readiness Assessment includes a token economics framework as a standard component.',
        cta: 'ai-readiness',
      };
      if (total <= 13) return {
        band: 'Aware',
        colour: '#5E4B38',
        summary: 'Awareness exists — governance does not.',
        detail: 'You understand that token costs matter but have not yet built the structures to control them. This is a common inflection point: organisations in this position often see costs spike significantly when usage scales. An Agent Operating System with built-in resource management is the most effective intervention — establishing token budgets, model routing and cost alerts before scale creates pressure.',
        cta: 'agent-os',
      };
      if (total <= 17) return {
        band: 'Managing',
        colour: '#221D5C',
        summary: 'Active management in place — optimisation is the next step.',
        detail: 'You are monitoring costs and have some control mechanisms in place. The opportunity now is optimisation: intelligent model routing (matching each task to the right model tier), context window compression and usage pattern analysis. Quarterly Hardware & Compute Bottleneck Analysis will keep your model strategy current as pricing and model capabilities evolve.',
        cta: 'ai-advisory',
      };
      return {
        band: 'Optimised',
        colour: '#221D5C',
        summary: 'Strong token governance in place.',
        detail: 'You have built the cost visibility and control structures that most organisations lack. The focus now is strategic: ensuring your model portfolio evolves with the landscape (new models, new pricing structures, open-source alternatives) and that governance scales as agent deployment grows. AiGENTiA\'s Advisory retainer provides the continuous intelligence to keep your token strategy current.',
        cta: 'ai-advisory',
      };
    },
  },

};
