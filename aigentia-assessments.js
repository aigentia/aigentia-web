// AiGENTiA — Assessment Data
// Three assessments: AI Readiness, Tokenization, AI Finance
// Embed in chat window via renderAssessment(id, container)

const AIGENTIA_ASSESSMENTS = {
  readiness:    {
  "id": "readiness",
  "title": "AI Readiness Assessment",
  "subtitle": "12 questions across four dimensions. Understand where your organisation stands before you invest.",
  "cta_label": "Begin with a conversation",
  "cta_url": "https://calendly.com/aigentia/discovery-call",
  "categories": [
    "People & Culture",
    "Process & Data",
    "Technology & Infrastructure",
    "Governance & Risk"
  ],
  "cat_colors": {
    "People & Culture": "#5B6FA8",
    "Process & Data": "#C8A96B",
    "Technology & Infrastructure": "#2D7A5A",
    "Governance & Risk": "#8B3A3A"
  },
  "scoring": [
    {
      "min": 0,
      "max": 12,
      "label": "AI Aware",
      "cls": "lvl-0",
      "msg": "You are at the beginning. The right time to build foundations deliberately — before pressure forces the decision."
    },
    {
      "min": 13,
      "max": 24,
      "label": "AI Exploring",
      "cls": "lvl-1",
      "msg": "Momentum is building. A structured programme will accelerate your progress and protect early investments."
    },
    {
      "min": 25,
      "max": 32,
      "label": "AI Advancing",
      "cls": "lvl-2",
      "msg": "Strong foundations in place. Governance capability will unlock the next level of deployment and scale."
    },
    {
      "min": 33,
      "max": 36,
      "label": "AI Operating",
      "cls": "lvl-3",
      "msg": "You are ahead of most organisations. Continuous governance and competitive intelligence will sustain that advantage."
    }
  ],
  "questions": [
    {
      "cat": "People & Culture",
      "text": "How would you describe AI literacy across your organisation?",
      "opts": [
        {
          "t": "AI literacy is embedded across most roles with structured programmes.",
          "s": 3
        },
        {
          "t": "Several teams are actively using AI tools with some training in place.",
          "s": 2
        },
        {
          "t": "Some awareness exists but limited hands-on use or guidance.",
          "s": 1
        },
        {
          "t": "Most staff have no awareness of AI tools or their implications.",
          "s": 0
        }
      ]
    },
    {
      "cat": "People & Culture",
      "text": "How aligned is your leadership team on AI strategy?",
      "opts": [
        {
          "t": "Clear mandate with executive ownership and a funded strategy.",
          "s": 3
        },
        {
          "t": "Broad alignment forming; early strategy discussions underway.",
          "s": 2
        },
        {
          "t": "AI has been discussed but no clear direction has been set.",
          "s": 1
        },
        {
          "t": "AI has not been discussed seriously at leadership level.",
          "s": 0
        }
      ]
    },
    {
      "cat": "People & Culture",
      "text": "How prepared is your workforce for AI-augmented roles?",
      "opts": [
        {
          "t": "A structured adoption programme is in place with role redesign underway.",
          "s": 3
        },
        {
          "t": "Some role-specific training is underway in key departments.",
          "s": 2
        },
        {
          "t": "Awareness communications exist but no structured preparation.",
          "s": 1
        },
        {
          "t": "No change management or training has been initiated.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Process & Data",
      "text": "How mapped are your business processes for AI automation potential?",
      "opts": [
        {
          "t": "Comprehensive process inventory with agent-readiness scoring completed.",
          "s": 3
        },
        {
          "t": "Several processes have been mapped and prioritised for AI deployment.",
          "s": 2
        },
        {
          "t": "A few obvious manual tasks have been identified informally.",
          "s": 1
        },
        {
          "t": "Processes have not been mapped for AI readiness.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Process & Data",
      "text": "How would you describe the quality and accessibility of your data?",
      "opts": [
        {
          "t": "Data is well-governed, integrated and API-accessible across the organisation.",
          "s": 3
        },
        {
          "t": "Core data is clean and accessible to key teams with some integration.",
          "s": 2
        },
        {
          "t": "Some data is accessible but quality and consistency vary significantly.",
          "s": 1
        },
        {
          "t": "Data is siloed, inconsistent and poorly documented.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Process & Data",
      "text": "How mature is your data governance framework?",
      "opts": [
        {
          "t": "Mature governance aligned to regulatory requirements with defined ownership.",
          "s": 3
        },
        {
          "t": "Formal governance exists with defined ownership across most data assets.",
          "s": 2
        },
        {
          "t": "Basic policies exist but are inconsistently applied.",
          "s": 1
        },
        {
          "t": "No formal data governance is in place.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Technology & Infrastructure",
      "text": "How compatible is your technology stack with AI agent frameworks?",
      "opts": [
        {
          "t": "Cloud-native, API-first architecture ready for agent integration.",
          "s": 3
        },
        {
          "t": "Modern stack with API coverage across core business systems.",
          "s": 2
        },
        {
          "t": "Some APIs available but fragmented; significant integration effort required.",
          "s": 1
        },
        {
          "t": "Legacy systems with no meaningful API layer.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Technology & Infrastructure",
      "text": "How would you describe your cloud and security posture?",
      "opts": [
        {
          "t": "Cloud-first with mature security, identity management and zero-trust controls.",
          "s": 3
        },
        {
          "t": "Hybrid cloud with defined security frameworks and consistent enforcement.",
          "s": 2
        },
        {
          "t": "Partial cloud migration with basic security policies.",
          "s": 1
        },
        {
          "t": "On-premise infrastructure with minimal cloud adoption.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Technology & Infrastructure",
      "text": "Have you evaluated any Agent Operating System (AOS) solutions?",
      "opts": [
        {
          "t": "An AOS has been selected or is partially deployed.",
          "s": 3
        },
        {
          "t": "Evaluation is underway or a proof of concept is planned.",
          "s": 2
        },
        {
          "t": "We are aware of AOS but no evaluation has started.",
          "s": 1
        },
        {
          "t": "We are not familiar with the concept of an Agent Operating System.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Governance & Risk",
      "text": "Do you have AI policies or governance frameworks in place?",
      "opts": [
        {
          "t": "A comprehensive AI governance framework is in place and actively maintained.",
          "s": 3
        },
        {
          "t": "A formal AI policy has been drafted but is not yet fully implemented.",
          "s": 2
        },
        {
          "t": "Informal guidelines exist but nothing formally documented.",
          "s": 1
        },
        {
          "t": "No AI policies of any kind exist.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Governance & Risk",
      "text": "How aware are you of your obligations under the EU AI Act?",
      "opts": [
        {
          "t": "Obligations are fully mapped with a compliance plan and timeline in place.",
          "s": 3
        },
        {
          "t": "A compliance assessment is currently underway.",
          "s": 2
        },
        {
          "t": "We are aware of the Act but no compliance work has been initiated.",
          "s": 1
        },
        {
          "t": "We are not familiar with the EU AI Act or its implications.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Governance & Risk",
      "text": "How do you currently manage AI-specific risk?",
      "opts": [
        {
          "t": "A dedicated AI risk register exists with defined oversight protocols.",
          "s": 3
        },
        {
          "t": "AI risk is included in the existing enterprise risk register.",
          "s": 2
        },
        {
          "t": "Risk has been discussed but is not formally managed.",
          "s": 1
        },
        {
          "t": "No AI risk management is in place.",
          "s": 0
        }
      ]
    }
  ]
},
  tokenization: {
  "id": "tokenization",
  "title": "Tokenization Assessment",
  "subtitle": "12 questions across four dimensions. Assess your readiness for the tokenized, agent-native economy.",
  "cta_label": "Define your tokenization strategy",
  "cta_url": "https://calendly.com/aigentia/discovery-call",
  "categories": [
    "Token Economics",
    "Data Tokenization",
    "Process Tokenization",
    "Strategic Positioning"
  ],
  "cat_colors": {
    "Token Economics": "#C8A96B",
    "Data Tokenization": "#5B6FA8",
    "Process Tokenization": "#2D7A5A",
    "Strategic Positioning": "#8B3A3A"
  },
  "scoring": [
    {
      "min": 0,
      "max": 12,
      "label": "Tokenization Unaware",
      "cls": "lvl-0",
      "msg": "The tokenized economy is arriving. The window to prepare deliberately is now — before competitive pressure forces reactive decisions."
    },
    {
      "min": 13,
      "max": 24,
      "label": "Tokenization Aware",
      "cls": "lvl-1",
      "msg": "You see the shift. A structured strategy will translate awareness into competitive readiness before the market moves."
    },
    {
      "min": 25,
      "max": 32,
      "label": "Tokenization Ready",
      "cls": "lvl-2",
      "msg": "Strong foundations in place. Governance and strategic positioning will compound your advantage in the tokenized economy."
    },
    {
      "min": 33,
      "max": 36,
      "label": "Tokenization Native",
      "cls": "lvl-3",
      "msg": "You are operating at the frontier of the tokenized economy. Let us ensure your governance and strategy keep pace with your capability."
    }
  ],
  "questions": [
    {
      "cat": "Token Economics",
      "text": "How well does your organisation understand AI token consumption and its cost implications?",
      "opts": [
        {
          "t": "Full token cost model in place with per-agent budgets and real-time alerts.",
          "s": 3
        },
        {
          "t": "Token usage is tracked for key workloads with budget oversight.",
          "s": 2
        },
        {
          "t": "We are aware that token usage drives cost but have no monitoring.",
          "s": 1
        },
        {
          "t": "We are not aware that token consumption is a significant cost driver.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Token Economics",
      "text": "Have you optimised your AI workflows and prompts to reduce token consumption?",
      "opts": [
        {
          "t": "Systematic token optimisation applied across all agent deployments.",
          "s": 3
        },
        {
          "t": "Prompt optimisation has been applied to specific high-cost use cases.",
          "s": 2
        },
        {
          "t": "There is some awareness of prompt efficiency but no structured optimisation.",
          "s": 1
        },
        {
          "t": "No optimisation of any kind has been considered.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Token Economics",
      "text": "How do you manage token allocation across different AI models and providers?",
      "opts": [
        {
          "t": "Dynamic token routing across models based on task type and cost profile.",
          "s": 3
        },
        {
          "t": "A multi-model strategy with cost and capability trade-off analysis is in place.",
          "s": 2
        },
        {
          "t": "We are beginning to evaluate multi-model approaches.",
          "s": 1
        },
        {
          "t": "We use a single provider with no token allocation strategy.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Data Tokenization",
      "text": "Have you assessed which of your data assets are candidates for tokenization?",
      "opts": [
        {
          "t": "A tokenization strategy is defined with a governance framework and ownership.",
          "s": 3
        },
        {
          "t": "Specific data assets have been identified and mapped for tokenization.",
          "s": 2
        },
        {
          "t": "High-level discussion has taken place but no formal mapping.",
          "s": 1
        },
        {
          "t": "Data asset tokenization has not been considered.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Data Tokenization",
      "text": "How mature is your approach to data privacy in tokenized data flows?",
      "opts": [
        {
          "t": "Privacy-by-design is embedded in all tokenized data architecture.",
          "s": 3
        },
        {
          "t": "Privacy impact assessments have been completed for key data flows.",
          "s": 2
        },
        {
          "t": "GDPR baseline exists but no AI-specific privacy framework.",
          "s": 1
        },
        {
          "t": "No privacy framework exists for AI data processing.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Data Tokenization",
      "text": "Are you exploring the monetisation of tokenized data assets?",
      "opts": [
        {
          "t": "An active data monetisation strategy is in place with governance controls.",
          "s": 3
        },
        {
          "t": "A pilot or proof of concept is underway.",
          "s": 2
        },
        {
          "t": "Early-stage discussion is happening at leadership level.",
          "s": 1
        },
        {
          "t": "Data monetisation through tokenization is not on the agenda.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Process Tokenization",
      "text": "Have you mapped your business processes into discrete, agent-executable units?",
      "opts": [
        {
          "t": "A full process tokenization library exists with agent assignment logic.",
          "s": 3
        },
        {
          "t": "Key processes have been mapped into agent-executable task sequences.",
          "s": 2
        },
        {
          "t": "Some processes have been broken into steps informally.",
          "s": 1
        },
        {
          "t": "Processes have not been mapped for agent readiness.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Process Tokenization",
      "text": "Can your workflows be dynamically assembled from modular tokenized components?",
      "opts": [
        {
          "t": "Dynamic workflow orchestration from tokenized components is operational.",
          "s": 3
        },
        {
          "t": "Modular workflow design has been adopted for new process development.",
          "s": 2
        },
        {
          "t": "Some modular elements exist in current tooling.",
          "s": 1
        },
        {
          "t": "Workflows are monolithic and manually executed.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Process Tokenization",
      "text": "How do you handle exceptions and escalations in tokenized process flows?",
      "opts": [
        {
          "t": "Automated exception routing with human-in-the-loop approval gates is configured.",
          "s": 3
        },
        {
          "t": "Escalation logic is defined for key exception types.",
          "s": 2
        },
        {
          "t": "All exceptions are handled through manual escalation.",
          "s": 1
        },
        {
          "t": "No exception handling design exists for tokenized flows.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Strategic Positioning",
      "text": "Does your leadership team have a shared understanding of the tokenized economy?",
      "opts": [
        {
          "t": "A clear strategic position exists with board-level ownership.",
          "s": 3
        },
        {
          "t": "Strategic discussion is underway with external expert input.",
          "s": 2
        },
        {
          "t": "Awareness exists at senior level but no formal strategic response.",
          "s": 1
        },
        {
          "t": "The tokenized economy is not on the leadership agenda.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Strategic Positioning",
      "text": "How are you positioning your organisation competitively in the agent economy?",
      "opts": [
        {
          "t": "Active competitive positioning with tokenized service delivery in place.",
          "s": 3
        },
        {
          "t": "A differentiation strategy is forming around AI and tokenization capability.",
          "s": 2
        },
        {
          "t": "We are monitoring competitor AI and tokenization adoption.",
          "s": 1
        },
        {
          "t": "Competitive positioning in the agent economy is not being actively considered.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Strategic Positioning",
      "text": "How prepared is your organisation for regulatory developments around tokenization?",
      "opts": [
        {
          "t": "Compliance posture is defined and proactively managed.",
          "s": 3
        },
        {
          "t": "Regulatory tracking is embedded in the governance function.",
          "s": 2
        },
        {
          "t": "We are aware of emerging frameworks but have no formal response.",
          "s": 1
        },
        {
          "t": "No regulatory monitoring for tokenization is in place.",
          "s": 0
        }
      ]
    }
  ]
},
  finance:      {
  "id": "finance",
  "title": "AI Finance Assessment",
  "subtitle": "12 questions across four dimensions. Understand the financial readiness and investment requirements of your AI programme.",
  "cta_label": "Model your AI investment",
  "cta_url": "https://calendly.com/aigentia/discovery-call",
  "categories": [
    "Cost Awareness",
    "Budget & Funding",
    "ROI Readiness",
    "Financial Governance"
  ],
  "cat_colors": {
    "Cost Awareness": "#C8A96B",
    "Budget & Funding": "#2D7A5A",
    "ROI Readiness": "#5B6FA8",
    "Financial Governance": "#8B3A3A"
  },
  "scoring": [
    {
      "min": 0,
      "max": 12,
      "label": "Financial Blind Spot",
      "cls": "lvl-0",
      "msg": "AI costs are largely invisible in your organisation. At scale, this creates real financial risk and investment inefficiency."
    },
    {
      "min": 13,
      "max": 24,
      "label": "Financial Aware",
      "cls": "lvl-1",
      "msg": "Foundations exist. Structured cost modelling and ROI frameworks will protect your investment and accelerate returns."
    },
    {
      "min": 25,
      "max": 32,
      "label": "Financially Planned",
      "cls": "lvl-2",
      "msg": "Strong financial discipline in place. Governance controls and funding strategy will compound your returns."
    },
    {
      "min": 33,
      "max": 36,
      "label": "Financially Ready",
      "cls": "lvl-3",
      "msg": "Best-in-class financial discipline for AI transformation. Let us deploy with confidence and precision."
    }
  ],
  "questions": [
    {
      "cat": "Cost Awareness",
      "text": "How well does your organisation understand the total cost of deploying AI agents?",
      "opts": [
        {
          "t": "Full Total Cost of Agent Ownership (TCAO) has been modelled across all categories.",
          "s": 3
        },
        {
          "t": "A detailed cost breakdown exists for the initial deployment phase.",
          "s": 2
        },
        {
          "t": "High-level estimates have been produced but not formally documented.",
          "s": 1
        },
        {
          "t": "No cost modelling has been done.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Cost Awareness",
      "text": "Are ongoing model API costs accounted for in your financial planning?",
      "opts": [
        {
          "t": "API costs are budgeted and monitored in real time with usage thresholds.",
          "s": 3
        },
        {
          "t": "API costs are estimated and included in the annual budget.",
          "s": 2
        },
        {
          "t": "We are aware these costs exist but have not modelled them.",
          "s": 1
        },
        {
          "t": "We are not aware that model API costs are a significant ongoing expense.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Cost Awareness",
      "text": "Have you factored in human oversight costs alongside automation savings?",
      "opts": [
        {
          "t": "A full oversight cost model is in place including escalation handlers and reviewers.",
          "s": 3
        },
        {
          "t": "Oversight roles have been defined with associated cost estimates.",
          "s": 2
        },
        {
          "t": "Some oversight costs are anticipated but not formally modelled.",
          "s": 1
        },
        {
          "t": "We expect AI automation to eliminate human cost rather than supplement it.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Budget & Funding",
      "text": "Has a budget been allocated for AI transformation?",
      "opts": [
        {
          "t": "A multi-year transformation budget has been approved at board level.",
          "s": 3
        },
        {
          "t": "A programme budget has been approved for the next 12 months.",
          "s": 2
        },
        {
          "t": "An exploratory budget exists for pilots and proof of concept only.",
          "s": 1
        },
        {
          "t": "No budget has been allocated for AI transformation.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Budget & Funding",
      "text": "Are you aware of public funding options for AI transformation projects?",
      "opts": [
        {
          "t": "Funding has been secured or an application has been submitted.",
          "s": 3
        },
        {
          "t": "We are actively evaluating one or more public funding sources.",
          "s": 2
        },
        {
          "t": "We are aware of options but have not formally evaluated them.",
          "s": 1
        },
        {
          "t": "We are not aware of any public funding programmes for AI.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Budget & Funding",
      "text": "How is your AI investment structured financially?",
      "opts": [
        {
          "t": "An AI-as-a-Service model has been adopted to convert CapEx to recurring OpEx.",
          "s": 3
        },
        {
          "t": "A mix of CapEx and OpEx is being structured for the programme.",
          "s": 2
        },
        {
          "t": "A capital expenditure model is the only approach under consideration.",
          "s": 1
        },
        {
          "t": "No structured investment plan exists.",
          "s": 0
        }
      ]
    },
    {
      "cat": "ROI Readiness",
      "text": "Can you quantify the cost reduction potential of AI in your organisation?",
      "opts": [
        {
          "t": "A full cost reduction model exists with effort and impact mapping.",
          "s": 3
        },
        {
          "t": "A structured analysis has been completed across multiple business areas.",
          "s": 2
        },
        {
          "t": "High-level estimates exist for one or two processes.",
          "s": 1
        },
        {
          "t": "No cost reduction analysis has been done.",
          "s": 0
        }
      ]
    },
    {
      "cat": "ROI Readiness",
      "text": "Have you modelled revenue enhancement opportunities from AI adoption?",
      "opts": [
        {
          "t": "Quantified revenue uplift has been modelled with probability weighting.",
          "s": 3
        },
        {
          "t": "Revenue scenarios have been modelled for key business areas.",
          "s": 2
        },
        {
          "t": "Qualitative revenue benefits have been identified but not quantified.",
          "s": 1
        },
        {
          "t": "Revenue enhancement through AI has not been considered.",
          "s": 0
        }
      ]
    },
    {
      "cat": "ROI Readiness",
      "text": "What is your expected payback period for AI investment?",
      "opts": [
        {
          "t": "Under 24 months, supported by a detailed investment model.",
          "s": 3
        },
        {
          "t": "24 to 36 months based on structured estimates.",
          "s": 2
        },
        {
          "t": "Over 36 months or the payback period has not been calculated.",
          "s": 1
        },
        {
          "t": "No payback period has been calculated.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Financial Governance",
      "text": "Do you have cost controls in place for AI agent API and compute spend?",
      "opts": [
        {
          "t": "Automated cost controls with per-agent spend limits and circuit breakers.",
          "s": 3
        },
        {
          "t": "Budget alerts and usage thresholds are configured.",
          "s": 2
        },
        {
          "t": "Manual monitoring of costs is in place.",
          "s": 1
        },
        {
          "t": "No cost controls for AI spend are planned.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Financial Governance",
      "text": "Are AI costs included in your regulatory compliance and audit planning?",
      "opts": [
        {
          "t": "A full audit cost model exists with logging infrastructure budgeted.",
          "s": 3
        },
        {
          "t": "Compliance costs have been estimated and included in planning.",
          "s": 2
        },
        {
          "t": "AI costs are noted in the risk register but not formally costed.",
          "s": 1
        },
        {
          "t": "Regulatory and compliance costs for AI have not been considered.",
          "s": 0
        }
      ]
    },
    {
      "cat": "Financial Governance",
      "text": "How are AI transformation costs disclosed in your financial reporting?",
      "opts": [
        {
          "t": "Separately disclosed with ESG and sustainability cost breakdowns.",
          "s": 3
        },
        {
          "t": "Included in a digital transformation or innovation cost line.",
          "s": 2
        },
        {
          "t": "Noted informally within broader technology spend.",
          "s": 1
        },
        {
          "t": "AI transformation costs are not disclosed in financial reporting.",
          "s": 0
        }
      ]
    }
  ]
}
};

// ── Render an assessment into a container element ────────────────────────────
function renderAssessment(id, container) {
  const a = AIGENTIA_ASSESSMENTS[id];
  if (!a) return;
  let currentQ = 0;
  const answers = new Array(a.questions.length).fill(null);
  renderQ();

  function renderQ() {
    const q   = a.questions[currentQ];
    const pct = Math.round((currentQ / a.questions.length) * 100);
    container.innerHTML = `
      <div class="ag-assess">
        <div class="ag-assess-header">
          <div class="ag-assess-title">${a.title}</div>
          <div class="ag-assess-sub">${a.subtitle}</div>
        </div>
        <div class="ag-assess-progress-wrap">
          <div class="ag-assess-progress-meta">
            <span class="ag-assess-q-num">Question ${currentQ + 1} of ${a.questions.length}</span>
            <span class="ag-assess-cat">${q.cat}</span>
          </div>
          <div class="ag-assess-progress-bar">
            <div class="ag-assess-progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
        <div class="ag-assess-q">${q.text}</div>
        <div class="ag-assess-opts" id="ag-opts"></div>
        <div class="ag-assess-nav">
          <button class="ag-assess-btn-back" id="ag-back" ${currentQ === 0 ? 'style="visibility:hidden"' : ''}>← Back</button>
          ${currentQ === a.questions.length - 1
            ? `<button class="ag-assess-btn-next ag-assess-btn-submit" id="ag-next" ${answers[currentQ] === null ? 'disabled' : ''}>View Results →</button>`
            : `<button class="ag-assess-btn-next" id="ag-next" ${answers[currentQ] === null ? 'disabled' : ''}>Next →</button>`
          }
        </div>
      </div>`;

    // Render options
    const optsEl = container.querySelector('#ag-opts');
    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'ag-assess-opt' + (answers[currentQ] === i ? ' selected' : '');
      btn.innerHTML = `<span class="ag-assess-opt-dot"></span><span>${opt.t}</span>`;
      btn.addEventListener('click', () => selectOpt(i));
      optsEl.appendChild(btn);
    });

    // Nav bindings
    container.querySelector('#ag-next').addEventListener('click', () => {
      if (currentQ < a.questions.length - 1) { currentQ++; renderQ(); }
      else showResults();
    });
    const backBtn = container.querySelector('#ag-back');
    if (backBtn) backBtn.addEventListener('click', () => { if (currentQ > 0) { currentQ--; renderQ(); } });
  }

  function selectOpt(i) {
    answers[currentQ] = i;
    container.querySelectorAll('.ag-assess-opt').forEach((b, j) => b.classList.toggle('selected', j === i));
    const nextBtn = container.querySelector('#ag-next');
    if (nextBtn) nextBtn.disabled = false;
  }

  function showResults() {
    const total    = answers.reduce((s, v, i) => s + (v !== null ? a.questions[i].opts[v].s : 0), 0);
    const maxScore = a.questions.length * 3;
    const pct      = Math.round((total / maxScore) * 100);
    const level    = a.scoring.find(s => total >= s.min && total <= s.max) || a.scoring[a.scoring.length - 1];

    // Dimension scores
    const dimScores = a.categories.map(cat => {
      const qs  = a.questions.filter(q => q.cat === cat);
      const got = qs.reduce((s, q) => {
        const qi = a.questions.indexOf(q);
        return s + (answers[qi] !== null ? q.opts[answers[qi]].s : 0);
      }, 0);
      return { cat, pct: Math.round((got / (qs.length * 3)) * 100), color: a.cat_colors[cat] || '#5B6FA8' };
    });

    container.innerHTML = `
      <div class="ag-assess">
        <div class="ag-assess-result-header">
          <div class="ag-assess-result-label">Assessment Complete</div>
          <div class="ag-assess-result-title">${level.label}</div>
          <div class="ag-assess-result-score">${a.title} · Score ${total} / ${maxScore}</div>
        </div>
        <div class="ag-assess-result-body">
          <div class="ag-assess-result-msg">${level.msg}</div>
          <div class="ag-assess-dims">
            ${dimScores.map(d => `
              <div class="ag-assess-dim">
                <div class="ag-assess-dim-meta">
                  <span class="ag-assess-dim-name">${d.cat}</span>
                  <span class="ag-assess-dim-pct">${d.pct}%</span>
                </div>
                <div class="ag-assess-dim-track">
                  <div class="ag-assess-dim-fill" style="width:${d.pct}%"></div>
                </div>
              </div>`).join('')}
          </div>
          <a class="ag-assess-cta" href="${a.cta_url}" target="_blank">${a.cta_label} →</a>
        </div>
      </div>`;
  }
}
