window.SITE = {
  name: 'Shaswat Sharma',
  role: 'AI Engineer',
  line: ['I build production AI agents', ' and the controls around them: access, audit, evaluation and guardrails.'],
  open: 'Open to AI engineering and data roles. Open to relocation and remote.',
  about: [
    'I’m a Data Science graduate from San José State University, building production AI systems in regulated healthcare and enterprise settings. I ship full-stack Python services and LLM agents end to end: prototype, deployment, cost control and maintenance.',
    'So far that has meant a phone voice agent, research agents that check their own citations, and an MCP layer over legacy telecom systems. A lot of the work is evals, guardrails, access control and audit logging.'
  ],
  facts: [
    ['AI and agents', 'LLM APIs, MCP, agentic workflows, RAG, pgvector, LLM evaluation'],
    ['Cloud and DevOps', 'GCP (Vertex AI, GKE, Firestore, Pub/Sub), Kubernetes, AWS, Docker, GitHub Actions, OpenTelemetry, Linux'],
    ['Languages and data', 'Python, SQL, JavaScript, PostgreSQL, MySQL, BigQuery, FastAPI, PySpark, Pandas, scikit-learn, pytest, Git'],
    ['Education', 'B.S. Data Science, San José State University, Dec 2025'],
    ['Training', 'Hugging Face AI Agents Course; Kaggle 5-Day Generative AI Intensive; Google Data Analytics Professional Certificate'],
    ['Outside work', 'Bicycling, badminton, music, technology, games and cooking']
  ],
  jobs: [
    { org: 'Tech Mahindra', title: 'AI Engineering Intern', when: 'Sep 2026 – Present',
      what: 'Building an MCP adapter that lets AI agents safely use legacy telecom backends as stable, versioned tools.',
      tags: ['Python', 'MCP', 'PostgreSQL', 'OpenTelemetry', 'Docker'] },
    { org: 'EnsureCare.AI', title: 'AI and Data Engineering Intern', when: 'Apr 2026 – Present',
      what: 'Built the go-to-market engine, a no-code agent platform, the website assistant, a phone voice agent, research agents with citation checks, and a Google Chat task agent.',
      tags: ['Python', 'FastAPI', 'SQL', 'LLM APIs', 'GCP', 'Real-time voice'] },
    { org: 'CMC.AI', title: 'Machine Learning and Data Science Intern', when: 'Sep – Dec 2025',
      what: 'Built a Random Forest pipeline classifying pharmaceutical powder flow regimes at over 90 percent macro-F1, with automated batch prediction.',
      tags: ['scikit-learn', 'Feature engineering', 'Python'] },
    { org: 'NeoRobotics', title: 'Instructor', when: 'Jun 2024 – Aug 2025',
      what: 'Designed curriculum and led two Python and robotics programs for 35+ students, from ESP32 IoT boards to computer vision.',
      tags: ['Python', 'ESP32 / IoT', 'Computer vision'] }
  ],
  groups: [['now', 'In progress'], ['shipped', 'Shipped'], ['earlier', 'Earlier']],
  projects: [
    { id: 'mcp', group: 'now', name: 'MCP Adapter Layer', org: 'Tech Mahindra', year: '2026', code: 'company',
      desc: 'Lets AI agents use legacy telecom backends as stable, versioned tools.',
      points: [
        'Write actions are made safe to retry, and unclear outcomes go to a human instead of being guessed.',
        'Deny-by-default access control at both tool discovery and execution.',
        'End-to-end tracing and a tamper-evident audit log that reconstructs any agent decision from a single ID, with sensitive data redacted by default.',
        'CI gates block upstream changes that would break agents, and an LLM judge checks agent behaviour after tool or model changes.'
      ],
      stat: ['4/4', 'planted regressions caught by the golden suite'] },
    { id: 'streamdouble', group: 'shipped', name: 'streamdouble', org: 'Open source', year: '2026',
      desc: 'A Twilio Media Streams simulator that turns voice-agent testing from a manual, billed phone call into an automated CI check.',
      points: [
        'pip-installable CLI, Python API and pytest plugin that place simulated calls at full protocol fidelity.',
        'Gates on latency in CI with exit codes, JSON and JUnit reports; also ships as a GitHub Action.',
        'Caught a production bug no transcript-based tool could detect: the agent could not hear callers interrupt it for 8.7 seconds of every response.'
      ],
      stat: ['4.3 → 1.3 ms', 'mean frame-pacing lateness on Windows (v0.3.0)'],
      links: [['GitHub', 'https://github.com/shaswat28/streamdouble'], ['PyPI', 'https://pypi.org/project/streamdouble']] },
    { id: 'platform', group: 'shipped', name: 'No-Code Agent Platform', org: 'EnsureCare.AI', year: '2026', code: 'company',
      desc: 'A platform where non-engineers create, test and publish AI agents.',
      points: [
        'Automated evaluation is required before an agent can be published.',
        'Trial releases on a share of traffic, with one-click rollback.',
        'Security controls mapped to the OWASP LLM Top 10 and NIST AI guidance.'
      ],
      stat: null, tags: ['LLM evaluation', 'Guardrails', 'Python'] },
    { id: 'assistant', group: 'shipped', name: 'Website AI Assistant', org: 'EnsureCare.AI', year: '2026', code: 'company',
      desc: 'The company website’s assistant, running on GCP, extended into a live voice demo.',
      points: [
        'Prompt-injection screening and a guard against unapproved product claims.',
        'A human review loop feeds approved answers back into its knowledge.',
        'The voice demo safety-checks each sentence before any audio is generated.'
      ],
      stat: null, tags: ['GCP', 'GKE', 'Firestore', 'Guardrails'] },
    { id: 'voice', group: 'shipped', name: 'Outbound Voice Agent', org: 'EnsureCare.AI', year: '2026', code: 'company',
      desc: 'A real-time phone agent tuned for latency and hardened against the interruptions real callers make.',
      points: [
        'Cut time to first token through connection reuse.',
        'Fixed barge-in, turn cancellation and playback sync bugs that only showed up on live calls.',
        'Timezone-aware calling hours and a do-not-contact ledger checked before each action.'
      ],
      stat: ['0.3–0.6 s', 'time to first token, down from 2.1 s'] },
    { id: 'gtm', group: 'shipped', name: 'Go-to-Market Engine', org: 'EnsureCare.AI', year: '2026', code: 'company',
      desc: 'The company’s go-to-market engine end to end, from contact ingestion to a ranked pipeline.',
      points: [
        'Contact ingestion, automated account research and multichannel outreach.',
        'A 6-component priority score ranks contacts by fit, intent, engagement and deal stage.',
        'Human approval of AI-written messages and per-contact spend caps.'
      ],
      stat: ['1,300', 'contacts ranked'] },
    { id: 'research', group: 'shipped', name: 'Agentic Research Pipeline', org: 'EnsureCare.AI', year: '2026', code: 'company',
      desc: 'Research agents that verify their citations and drop fabricated sources before anyone reads the brief.',
      points: ['Citation verification and relevance filtering.', 'Evidence-based confidence caps.'],
      stat: null, tags: ['LLM agents', 'Citation verification'] },
    { id: 'chatagent', group: 'shipped', name: 'Google Chat Task Agent', org: 'EnsureCare.AI', year: '2026', code: 'company',
      desc: 'An operations agent in Google Chat that automates task capture, ticket creation and duplicate detection.',
      points: ['Task capture and ticket creation, driven by Pub/Sub.', 'Two-phase duplicate detection.'],
      stat: ['24 s', 'p99 on constrained hardware'] },
    { id: 'jobagent', group: 'shipped', name: 'Job Application Agent', org: 'Personal', year: '2026', code: 'private',
      desc: 'A full-stack agentic application that tailors a resume to a job description without inventing experience, skills or numbers.',
      points: [
        'The LLM can only select, reorder and lightly rephrase.',
        'A deterministic validator rejects any output that introduces an unverifiable claim.'
      ],
      stat: null, tags: ['Python', 'FastAPI', 'LLM APIs'] },
    { id: 'powder', group: 'earlier', name: 'Powder Flow Classifier', org: 'CMC.AI', year: '2025', code: 'company',
      desc: 'Random Forest models for pharmaceutical powder flow, extended from single materials to mixtures.',
      points: ['2, 3 and 5 class problems.', 'Mixture predictions by aggregating features on mass ratios.', 'Automated batch prediction with scikit-learn and Joblib.'],
      stat: ['90%+', 'macro-F1, simplified regimes'] },
    { id: 'etl', group: 'earlier', name: 'E-Commerce ETL Pipeline', org: 'Personal', year: '',
      desc: 'A PySpark pipeline over the Olist e-commerce dataset into a MySQL star schema, with automated business reports.',
      points: ['Extract, transform and load stages as separate modules.', 'Reports on category revenue, top-spending customers, shipping efficiency and hourly order trends.'],
      stat: ['100K+', 'records across 9 tables'],
      links: [['GitHub', 'https://github.com/shaswat28/olist-ecommerce-etl-pipeline']] },
    { id: 'heart', group: 'earlier', name: 'Heart Disease Survey Analysis', org: 'SJSU coursework, team of 4', year: '2025',
      desc: 'Exploratory analysis of the CDC’s BRFSS 2022 survey data on factors associated with heart disease.',
      points: ['Demographics, habits, medical history and preventive care against heart attack, angina and stroke.', 'Built with pandas, seaborn, plotly and scipy.'],
      stat: ['40', 'survey variables analysed'],
      links: [['GitHub', 'https://github.com/sjsu-cs133-f25/team6-healthdata']] },
    { id: 'habit75', group: 'earlier', name: 'Habit75', org: 'Personal, iOS', year: '',
      desc: 'An iOS tracker for the 75-day challenge that turns daily logs and HealthKit data into one dashboard.',
      points: ['Pulls steps, active energy and hydration from HealthKit.', 'Local-first storage with SwiftData, fully offline.', 'Apple Charts for heart rate and weekly consistency.'],
      stat: null, tags: ['Swift', 'SwiftData', 'HealthKit'],
      links: [['Case study', 'https://github.com/shaswat28/Habit75-Technical-Case-Study']] }
  ],
  contact: {
    blurb: 'I’m looking for AI engineering and data roles. Reach out about work, projects or open-source collaborations.',
    email: 'shaswatwork@gmail.com',
    github: 'https://github.com/shaswat28',
    linkedin: 'https://www.linkedin.com/in/shaswat-sharma28/'
  }
};
