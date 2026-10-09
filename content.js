window.SITE = {
  name: 'Shaswat Sharma',
  role: 'AI Engineer · Data Scientist',
  loc: 'Open to relocation & remote',
  rotating: ['LLM agents', 'real-time voice agents', 'data pipelines', 'evals and guardrails'],
  heroLead: 'Right now at EnsureCare.AI and Tech Mahindra: a GTM copilot, an MCP layer connecting agents to legacy telecom systems, research agents that verify their citations, and real-time voice agents.',
  heroLine: 'for healthcare and enterprise teams, from prototype through deployment, built so they stay trustworthy once real users arrive.',
  status: { now: 'EnsureCare.AI · Tech Mahindra', open: 'Open to AI engineering & data roles' },
  stats: [
    { value: '0.3s', label: 'voice agent first token, down from 2.1s' },
    { value: '1,300+', label: 'contacts ranked by a GTM engine I built' }
  ],
  latest: [
    { tag: 'Now', text: 'MCP adapter: Phase 1 reliability shipped, golden suite live', open: 'mcp' },
    { tag: 'Shipped', text: 'streamdouble 0.3.0: trace inspector, JUnit reports, steadier Windows timing', open: 'streamdouble' },
    { tag: 'In use', text: 'My GTM engine is now part of an EnsureCare product', open: 'gtm' }
  ],
  about: [
    'I’m a Data Science graduate from San José State University, building production AI systems in regulated healthcare and enterprise settings. I ship full-stack Python services and LLM agents end to end: prototype, deployment, cost control and maintenance.',
    'Most of my work sits where language models meet messy real systems: live phone calls, legacy telecom backends, and healthcare data that must not leak. Much of it is the part that decides whether an agent can be trusted: evals, guardrails and the checks around them.'
  ],
  facts: [
    ['Location', 'Open to relocation & remote'],
    ['Education', 'Bachelor’s in Data Science, SJSU (Dec 2025)'],
    ['Focus', 'LLM agents, evals, data pipelines'],
    ['Currently', 'EnsureCare.AI and Tech Mahindra'],
    ['Open to', 'AI engineering & data roles']
  ],
  journey: [
    { when: 'Jun 2024', where: 'NeoRobotics', tag: 'Teaching', title: 'Python & robotics instructor',
      what: 'Designed curriculum and led two Python and robotics programs for 35+ students, from ESP32 IoT boards to computer vision.', links: [] },
    { when: 'Sep 2025', where: 'CMC.AI', tag: 'First ML role', title: 'ML & Data Science Intern',
      what: 'Random Forest pipelines classifying pharmaceutical powder flow, reaching 90%+ macro F1 in simplified regimes, then extended to mixtures.', links: ['powder'] },
    { when: 'Fall 2025', where: 'SJSU', tag: 'Coursework', title: 'Heart disease survey analysis',
      what: 'A four-person team project exploring the CDC’s BRFSS 2022 data in pandas, seaborn and plotly.', links: ['heart'] },
    { when: 'Dec 2025', where: 'SJSU', tag: 'Graduated', title: 'Bachelor’s in Data Science',
      what: 'Graduated from San José State University with a Bachelor’s in Data Science.', links: [] },
    { when: 'Apr 2026', where: 'EnsureCare.AI', tag: 'AI engineering', title: 'AI & Data Engineering Intern',
      what: 'Built the GTM engine, a real-time voice agent, research agents with citation checks, and a Google Chat task agent.', links: ['voice', 'gtm', 'research', 'chatagent'] },
    { when: 'Sep 2026', where: 'streamdouble', tag: 'Open source', title: 'Shipped a voice-agent test tool',
      what: 'Open-sourced a Twilio Media Streams simulator that tests voice agents without placing real calls. It found a real bug in a production agent.', links: ['streamdouble'] },
    { when: 'Sep 2026', where: 'Tech Mahindra', tag: 'Now', title: 'AI Engineering Intern',
      what: 'Co-designing an MCP adapter layer between AI agents and legacy telecom systems, and owning its Phase 1 reliability.', links: ['mcp'] }
  ],
  jobs: [
    {
      org: 'EnsureCare.AI', title: 'AI & Data Engineering Intern', when: 'Apr 2026 – Present', where: 'Remote',
      skills: ['LLM agents', 'Real-time voice', 'Evals & guardrails', 'Citation verification', 'Python', 'FastAPI', 'SQL databases', 'Pub/Sub'],
      bullets: [
        'Built the go-to-market engine end to end (Python, FastAPI, SQLite, LLM APIs): contact ingestion, automated account research, multi-channel outreach, an opportunity pipeline and a 6-component priority score ranking 1,300+ contacts. It now feeds an EnsureCare product.',
        'Engineered a low-latency outbound voice agent on raw provider APIs (Twilio, Deepgram, Groq, ElevenLabs), cutting time to first token from 2.1s to 0.3–0.6s and fixing barge-in, turn cancellation and playback sync bugs that only showed up on live calls.',
        'Designed an agentic research pipeline with citation verification, relevance filtering and evidence-based confidence caps that drop fabricated sources before a brief reaches a user.',
        'Architected a Google Chat agent for task capture, ticket creation and two-phase duplicate detection at 24s p99 on constrained hardware.',
        'Enforced compliance and cost controls in code rather than prompts: an append-only do-not-contact ledger, timezone-aware calling hours, per-contact and per-day spend caps, and vendor data provenance for full purge on request.'
      ]
    },
    {
      org: 'Tech Mahindra', title: 'AI Engineering Intern', when: 'Sep 2026 – Present', where: 'Remote',
      skills: ['MCP', 'LLM agents', 'Testing & CI'],
      bullets: [
        'Co-designing an MCP adapter layer from scratch that connects AI agents to legacy telecom backends (inventory, service and order management) through versioned MCP tools.',
        'Own the reliability side of Phase 1 and authored its low-level design. Shipped contract testing in CI, exactly-once retries for mutating calls, correlation-ID logging with a tamper-evident audit trail, and deny-by-default access control.',
        'Built a golden-task regression suite with a reference agent and an LLM judge. Its first live run passed 5/5 tasks and caught all 4 planted regressions.'
      ]
    },
    {
      org: 'CMC.AI', title: 'ML & Data Science Intern', when: 'Sep – Dec 2025', where: 'Remote',
      skills: ['scikit-learn', 'Feature engineering', 'Python'],
      bullets: [
        'Developed Random Forest pipelines classifying pharmaceutical powder flow regimes across 2, 3 and 5 class problems, reaching 90%+ macro F1 in simplified regimes.',
        'Built an algorithm extending single-material predictions to multi-component mixtures by aggregating features on mass ratios, and automated batch prediction with scikit-learn and Joblib.'
      ]
    },
    {
      org: 'NeoRobotics', title: 'Instructor', when: 'Jun 2024 – Aug 2025', where: 'In person',
      skills: ['Python', 'ESP32 / IoT', 'Computer vision'],
      bullets: ['Designed curriculum and led two Python and robotics programs for 35+ students, covering ESP32 IoT development and computer vision.']
    }
  ],
  recent: ['mcp', 'harness', 'streamdouble', 'voice', 'gtm', 'jobagent'],
  cats: { agents: 'AI agents', reliability: 'Reliability & evals', data: 'Data & ML', apps: 'Apps & tools' },
  projects: [
    { id: 'voice', name: 'Outbound Voice Agent', org: 'EnsureCare.AI', year: '2026', cats: ['agents'], private: true,
      desc: 'A real-time phone agent tuned for latency and hardened against the interruptions real callers make.',
      stat: ['0.3–0.6s', 'time to first token, was 2.1s'],
      points: ['Built on raw provider APIs: Twilio, Deepgram, Groq and ElevenLabs.', 'Fixed barge-in, turn cancellation and playback sync bugs that only showed up on live calls.'],
      skills: ['LLM agents', 'Real-time voice', 'Python'] },
    { id: 'streamdouble', name: 'streamdouble', org: 'Open source', year: '2026', cats: ['reliability', 'apps'],
      desc: 'A Twilio Media Streams simulator. Test a voice agent’s WebSocket endpoint locally, at full protocol fidelity, without placing a real call.',
      stat: ['4.3 → 1.3 ms', 'mean frame-pacing lateness on Windows (v0.3.0)'],
      points: ['pip-installable CLI, Python API and pytest plugin that place simulated calls and record the agent’s reply.', 'Simulates bad networks, runs scripted scenarios, and gates on latency in CI with exit codes, JSON and JUnit reports (also ships as a GitHub Action).', 'An inspect command reads a recorded frame trace back as untrusted input: when the agent spoke, marks, clears, gaps and sequence breaks.', 'Validated against a production voice agent, where it found a real bug.'],
      skills: ['Real-time voice', 'Python', 'Testing & CI'],
      link: 'https://github.com/shaswat28/streamdouble' },
    { id: 'gtm', name: 'Go-to-Market Engine', org: 'EnsureCare.AI', year: '2026', cats: ['agents', 'data'], private: true,
      desc: 'The company’s outreach system end to end, from contact ingestion to a ranked opportunity pipeline.',
      stat: ['1,300+', 'contacts ranked by a 6-part score'],
      points: ['Contact ingestion, automated account research, multi-channel outreach and an opportunity pipeline.', 'Now feeds an EnsureCare product.', 'Compliance and spend caps enforced in code, not prompts.'],
      skills: ['LLM agents', 'Python', 'FastAPI', 'SQL databases'] },
    { id: 'mcp', name: 'MCP Adapter Layer', org: 'Tech Mahindra', year: '2026', cats: ['agents', 'reliability'], private: true,
      desc: 'Versioned MCP tools that let AI agents work with legacy inventory, service and order systems.',
      stat: ['4/4', 'planted regressions caught by the golden suite'],
      points: ['Co-designing the adapter layer from scratch; authored the Phase 1 low-level design.', 'Shipped Phase 1 reliability: contract tests in CI, exactly-once retries, correlation-ID logging with a tamper-evident audit trail, and deny-by-default access control.', 'Golden-task suite with a reference agent and an LLM judge; first live run passed 5/5 tasks.'],
      skills: ['MCP', 'LLM agents', 'Testing & CI'] },
    { id: 'chatagent', name: 'Google Chat Task Agent', org: 'EnsureCare.AI', year: '2026', cats: ['agents', 'reliability'], private: true,
      desc: 'A Google Chat agent that captures tasks, files tickets and catches duplicates, with PHI guardrails.',
      stat: ['24s', 'p99 on constrained hardware'],
      points: ['Task capture and ticket creation through the Plane API, driven by Pub/Sub.', 'Two-phase duplicate detection.'],
      skills: ['LLM agents', 'Evals & guardrails', 'Pub/Sub'] },
    { id: 'research', name: 'Agentic Research Pipeline', org: 'EnsureCare.AI', year: '2026', cats: ['agents', 'reliability'], private: true,
      desc: 'Research agents that verify their citations and drop fabricated sources before anyone reads the brief.',
      stat: null,
      points: ['Citation verification and relevance filtering.', 'Evidence-based confidence caps.'],
      skills: ['LLM agents', 'Citation verification', 'Evals & guardrails'] },
    { id: 'jobagent', name: 'Job Application Agent', org: 'Open source', year: '2026', cats: ['agents', 'apps'],
      desc: 'A local tool that tailors a resume to a job description without ever inventing experience, skills or numbers.',
      stat: null,
      points: ['The LLM can only select, reorder and lightly rephrase; a deterministic validator reverts any rewrite that adds a number or term not in the original.', 'Job discovery agent that pulls entry-level postings from public boards (Greenhouse, Lever, Ashby and more) and scores them against the active resume.', 'Application tracker, multiple resume workspaces, and free-tier LLM routing with automatic fallback.'],
      skills: ['LLM agents', 'Evals & guardrails', 'Python', 'FastAPI'],
      link: 'https://github.com/shaswat28/job_apps_agent1' },
    { id: 'powder', name: 'Powder Flow Classifier', org: 'CMC.AI', year: '2025', cats: ['data'], private: true,
      desc: 'Random Forest models for pharmaceutical powder flow, extended from single materials to mixtures.',
      stat: ['90%+', 'macro F1, simplified regimes'],
      points: ['2, 3 and 5 class problems.', 'Mixture predictions by aggregating features on mass ratios.', 'Automated batch prediction with scikit-learn and Joblib.'],
      skills: ['scikit-learn', 'Feature engineering', 'Python'] },
    { id: 'etl', name: 'E-Commerce ETL Pipeline', org: 'Personal', year: '', cats: ['data'],
      desc: 'A PySpark pipeline over the Olist e-commerce dataset into a MySQL star schema, with automated business reports.',
      stat: ['100K+', 'records across 9 tables'],
      points: ['Extract, transform and load stages as separate modules.', 'Builds a sales fact table plus reports on category revenue, top-spending customers, shipping efficiency by state and hourly order trends.'],
      skills: ['PySpark & ETL', 'SQL databases', 'Python'],
      link: 'https://github.com/shaswat28/olist-ecommerce-etl-pipeline' },
    { id: 'heart', name: 'Heart Disease Survey Analysis', org: 'SJSU coursework · team of 4', year: '2025', cats: ['data'],
      desc: 'Exploratory analysis of the CDC’s BRFSS 2022 survey data, exploring which health factors are associated with heart disease.',
      stat: ['40', 'survey variables analysed'],
      points: ['Demographics, habits, medical history and preventive care against heart attack, angina and stroke.', 'Built in Colab with pandas, seaborn, plotly and scipy.'],
      skills: ['pandas & visualization', 'Python'],
      link: 'https://github.com/sjsu-cs133-f25/team6-healthdata' },
    { id: 'habit75', name: 'Habit75', org: 'Personal · iOS', year: '', cats: ['apps', 'data'],
      desc: 'An iOS tracker for the 75-day challenge that turns daily logs and HealthKit data into one dashboard.',
      stat: null,
      points: ['Pulls steps, active energy and hydration from HealthKit.', 'Local-first storage with SwiftData, fully offline.', 'Apple Charts for heart rate and weekly consistency; Hard, Medium and Soft challenge tiers.'],
      skills: ['Swift & iOS'],
      link: 'https://github.com/shaswat28/Habit75-Technical-Case-Study' },
    { id: 'harness', name: 'Agent Harness + Site Chatbot', org: 'EnsureCare.AI', year: 'In progress', cats: ['agents'], private: true,
      desc: 'An internal harness for spinning up new company agents, plus the customer-facing website chatbot.',
      stat: null,
      points: ['Currently being built.'],
      skills: ['LLM agents'] }
  ],
  skills: [
    { group: 'AI engineering', key: 'ai', items: ['LLM agents', 'MCP', 'Evals & guardrails', 'Citation verification', 'Real-time voice'] },
    { group: 'Engineering', key: 'eng', items: ['Python', 'FastAPI', 'SQL databases', 'Pub/Sub', 'Testing & CI', 'Swift & iOS'] },
    { group: 'Data & ML', key: 'data', items: ['scikit-learn', 'Feature engineering', 'PySpark & ETL', 'pandas & visualization'] }
  ],
  beyond: [
    { title: 'Outside of work', text: 'In my free time I love bicycling and badminton. I’m also into music, technology, games and cooking.',
      interests: [['bike', 'Bicycling'], ['shuttle', 'Badminton'], ['music', 'Music'], ['chip', 'Technology'], ['pad', 'Games'], ['pan', 'Cooking']] },
    { title: 'Side projects', text: 'My side projects are tools with a real user in mind: an iOS habit tracker, a Twilio call simulator for testing voice agents, and a personal job-application agent.' },
    { title: 'Teaching', text: 'From June 2024 to August 2025 I designed and taught two Python and robotics programs for 35+ students, from ESP32 boards to computer vision.' }
  ],
  contact: {
    blurb: 'I’m looking for AI engineering and data roles. Reach out about work, projects, open-source collaborations, or anything you think I could help build.',
    email: 'shaswatwork@gmail.com',
    github: 'https://github.com/shaswat28',
    linkedin: 'https://www.linkedin.com/in/shaswat-sharma28/'
  }
};
