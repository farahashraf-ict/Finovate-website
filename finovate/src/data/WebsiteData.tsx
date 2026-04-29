import type { ComponentType } from "react";

import {
	BarChart3,
	Brain,
	Building2,
	Cloud,
	CreditCard,
	Globe,
	Layers,
	Lock,
	Shield,
	TrendingUp,
	Users,
	Workflow,
	Zap
} from "lucide-react";

type Benefit = {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
};

type ProcessStep = {
	step: number;
	title: string;
	description: string;
};

type SubSolution = {
	id: string;
	name: string;
	tagline: string;
	description: string;
	logo: string;
	features: string[];
	benefits: Benefit[];
	process: ProcessStep[];
};

type SolutionDetailData = {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	icon: ComponentType<{ className?: string }>;
	gradient: string;
	accentColor: string;
	subSolutions: SubSolution[];
};

const solutionDetails: Record<string, SolutionDetailData> = {
	"core-banking-digital": {
		id: "core-banking-digital",
		title: "Core Banking & Digital Module",
		subtitle:
			"Modernize your financial institution with next-generation banking infrastructure",
		description:
			"Finovate delivers advanced core banking solutions designed to modernize financial institutions and support their digital transformation journey. Our offerings enable seamless operations, regulatory compliance, and enhanced customer experiences across various banking models.",
		icon: Building2,
		gradient: "from-blue-500 to-cyan-500",
		accentColor: "blue",
		subSolutions: [
			{
				id: "flexcube",
				name: "Oracle FLEXCUBE",
				tagline: "AI-Powered Core Banking Platform",
				description:
					"An AI-powered core banking solution designed to support banks in their digital transformation journey. It enables institutions to streamline core operations such as accounts, loans, payments, trade finance, and treasury within a unified, real-time platform.",
				logo: "🏦",
				features: [
					"Unified real-time platform for accounts, loans, payments, trade finance & treasury",
					"Supports retail, corporate, and microfinance banking models",
					"Multi-entity and multi-currency capabilities",
					"Full regulatory compliance and audit-ready reporting",
					"AI-powered analytics for smarter decision-making",
					"Omni-channel digital banking across web and mobile",
					"Rapid new product launch framework",
					"Seamless core-to-channel integration"
				],
				benefits: [
					{
						icon: Zap,
						title: "Faster Time-to-Market",
						description:
							"Launch new banking products in days, not months, with pre-built product templates and configurability."
					},
					{
						icon: Shield,
						title: "Regulatory Confidence",
						description:
							"Built-in compliance tools ensure you stay ahead of evolving regulations with minimal manual effort."
					},
					{
						icon: TrendingUp,
						title: "Scalable Operations",
						description:
							"Handle growing transaction volumes without compromising performance or reliability."
					},
					{
						icon: Globe,
						title: "Digital-First Experience",
						description:
							"Deliver seamless customer experiences across all digital channels from a single platform."
					}
				],
				process: [
					{
						step: 1,
						title: "Assessment & Discovery",
						description:
							"Analyze current infrastructure, identify gaps, and define transformation goals aligned with business strategy."
					},
					{
						step: 2,
						title: "Architecture & Design",
						description:
							"Design a tailored FLEXCUBE architecture including modules, integrations, and data migration strategy."
					},
					{
						step: 3,
						title: "Implementation & Configuration",
						description:
							"Deploy and configure the platform, customize workflows, and integrate with existing enterprise systems."
					},
					{
						step: 4,
						title: "Testing & Validation",
						description:
							"Conduct rigorous UAT, performance testing, and regulatory validation across all banking scenarios."
					},
					{
						step: 5,
						title: "Go-Live & Hypercare",
						description:
							"Managed go-live with dedicated hypercare support to ensure operational stability from day one."
					},
					{
						step: 6,
						title: "Continuous Optimization",
						description:
							"Ongoing monitoring, upgrades, and feature enhancements to maximize platform value."
					}
				]
			},
			{
				id: "sarraf",
				name: "Sarraf Mobile App",
				tagline: "Next-Gen Fintech Banking Application",
				description:
					"A comprehensive mobile banking application built for modern financial institutions. Sarraf delivers an intuitive, secure, and feature-rich digital banking experience that empowers customers to manage their finances anytime, anywhere.",
				logo: "📱",
				features: [
					"Biometric authentication (Face ID / Fingerprint)",
					"Real-time account balance and transaction history",
					"Instant fund transfers and bill payments",
					"Digital onboarding and e-KYC",
					"Push notifications and smart alerts",
					"In-app customer support and chatbot",
					"Multi-account and multi-currency management",
					"Investment and savings product access"
				],
				benefits: [
					{
						icon: Users,
						title: "Superior Customer Experience",
						description:
							"Intuitive design and frictionless flows that delight customers and reduce branch dependency."
					},
					{
						icon: Lock,
						title: "Bank-Grade Security",
						description:
							"Multi-layered security with encryption, biometrics, and real-time fraud monitoring."
					},
					{
						icon: TrendingUp,
						title: "Revenue Growth",
						description:
							"Enable cross-selling and upselling through personalized product recommendations inside the app."
					},
					{
						icon: Zap,
						title: "Rapid Deployment",
						description:
							"Modular architecture allows quick deployment and easy customization for your brand identity."
					}
				],
				process: [
					{
						step: 1,
						title: "Requirements Gathering",
						description:
							"Define customer journeys, feature scope, and integration requirements with your core banking system."
					},
					{
						step: 2,
						title: "UX/UI Design",
						description:
							"Create branded, accessible, and user-tested designs for all mobile touchpoints."
					},
					{
						step: 3,
						title: "Development & Integration",
						description:
							"Build and integrate the app with your core banking APIs, payment gateways, and third-party services."
					},
					{
						step: 4,
						title: "Security & Compliance Review",
						description:
							"Penetration testing, security audits, and regulatory compliance validation."
					},
					{
						step: 5,
						title: "App Store Deployment",
						description:
							"Submit and publish to iOS App Store and Google Play with full configuration."
					},
					{
						step: 6,
						title: "Support & Evolution",
						description:
							"Continuous feature releases, performance monitoring, and customer feedback integration."
					}
				]
			}
		]
	},
	"fraud-risk-intelligence": {
		id: "fraud-risk-intelligence",
		title: "Fraud Detection & Risk Intelligence",
		subtitle:
			"Detect, prevent, and respond to financial crime with AI-driven decision intelligence",
		description:
			"Finovate provides intelligent AI-powered risk and fraud detection solutions that help financial institutions build a 360° view of their customers and detect financial crime earlier and more accurately than traditional rule-based systems.",
		icon: Brain,
		gradient: "from-red-500 to-rose-600",
		accentColor: "red",
		subSolutions: [
			{
				id: "quantexa",
				name: "Quantexa",
				tagline: "AI-Driven Decision Intelligence Platform",
				description:
					"Quantexa is an AI-powered decision intelligence platform that transforms how financial institutions detect risk, fight fraud, and ensure regulatory compliance through contextual data analytics. It connects data from multiple systems to create a holistic 360° contextual view of customers and entities.",
				logo: "🔍",
				features: [
					"360° contextual view of customers, entities, and relationships",
					"Graph analytics to uncover hidden networks and suspicious patterns",
					"Machine learning models for proactive risk monitoring",
					"AML (Anti-Money Laundering) workflow automation",
					"KYC (Know Your Customer) process enhancement",
					"Real-time fraud detection across the customer lifecycle",
					"Credit risk assessment and smarter onboarding",
					"Regulatory compliance reporting and audit trails"
				],
				benefits: [
					{
						icon: Shield,
						title: "Proactive Risk Prevention",
						description:
							"Move from reactive rule-based detection to proactive AI-driven monitoring that catches threats before they escalate."
					},
					{
						icon: Brain,
						title: "Deeper Intelligence",
						description:
							"Graph analytics surface hidden relationships and complex fraud networks invisible to traditional systems."
					},
					{
						icon: TrendingUp,
						title: "Reduced False Positives",
						description:
							"Contextual intelligence dramatically reduces alert noise, freeing investigators to focus on genuine threats."
					},
					{
						icon: BarChart3,
						title: "Regulatory Readiness",
						description:
							"Automated compliance workflows and audit-ready documentation support regulators' demands with confidence."
					}
				],
				process: [
					{
						step: 1,
						title: "Data Landscape Assessment",
						description:
							"Map all existing data sources including transactions, customers, third-party feeds, and behavioral signals."
					},
					{
						step: 2,
						title: "Entity Resolution & Linking",
						description:
							"Connect disparate data points to form a unified, enriched view of every customer and entity."
					},
					{
						step: 3,
						title: "Model Configuration",
						description:
							"Configure graph analytics and ML models tailored to your institution's risk appetite and typologies."
					},
					{
						step: 4,
						title: "Workflow Integration",
						description:
							"Integrate Quantexa decisioning into AML, KYC, fraud, and credit workflows for real-time action."
					},
					{
						step: 5,
						title: "Validation & Tuning",
						description:
							"Backtesting on historical data and threshold tuning to optimize detection rates and reduce noise."
					},
					{
						step: 6,
						title: "Monitoring & Evolution",
						description:
							"Continuous model retraining, emerging typology updates, and performance reporting."
					}
				]
			}
		]
	},
	"process-workflow-automation": {
		id: "process-workflow-automation",
		title: "Process Automation & Workflow Optimization",
		subtitle:
			"Eliminate manual effort and drive efficiency with intelligent automation",
		description:
			"Finovate provides intelligent automation solutions that help organizations streamline workflows, reduce manual effort, and improve efficiency. With low-code/no-code platforms and RPA tools, businesses can digitize processes, integrate systems, and achieve faster, more streamlined operations.",
		icon: Workflow,
		gradient: "from-purple-500 to-pink-500",
		accentColor: "purple",
		subSolutions: [
			{
				id: "uipath",
				name: "UiPath RPA & Agentic AI",
				tagline: "Robotic Process Automation & AI-Powered Workflows",
				description:
					"The UiPath RPA platform enables organizations to automate repetitive, rule-based tasks across departments. Software robots mimic human actions—logging into systems, extracting data, filling forms, and moving files—without altering existing IT infrastructure. UiPath Agentic AI extends this by embedding AI into workflows to handle unstructured data and make intelligent decisions.",
				logo: "🤖",
				features: [
					"Software robots that mimic human desktop interactions",
					"Attended and unattended automation scenarios",
					"Agentic AI for unstructured data and natural language processing",
					"Predictive decision-making within automated workflows",
					"Pre-built automation connectors for banking systems",
					"Real-time process monitoring and analytics dashboard",
					"Exception handling and human-in-the-loop escalation",
					"Compliance-friendly audit logs for all automated actions"
				],
				benefits: [
					{
						icon: Zap,
						title: "Dramatic Efficiency Gains",
						description:
							"Robots work 24/7 without errors, completing tasks in seconds that take humans hours."
					},
					{
						icon: Shield,
						title: "Zero-Error Compliance",
						description:
							"Automated processes eliminate human error and create complete audit trails for every transaction."
					},
					{
						icon: Users,
						title: "Employee Empowerment",
						description:
							"Free your teams from repetitive work to focus on high-value strategic and customer-facing tasks."
					},
					{
						icon: TrendingUp,
						title: "Rapid ROI",
						description:
							"Most UiPath implementations achieve positive ROI within the first quarter of deployment."
					}
				],
				process: [
					{
						step: 1,
						title: "Process Discovery",
						description:
							"Use UiPath Process Mining and task capture tools to identify and prioritize automation candidates."
					},
					{
						step: 2,
						title: "Automation Design",
						description:
							"Design robot workflows with UiPath Studio, mapping every step, decision, and exception path."
					},
					{
						step: 3,
						title: "Development & Testing",
						description:
							"Build, unit test, and QA each automation bot in a sandbox environment."
					},
					{
						step: 4,
						title: "Infrastructure Setup",
						description:
							"Configure UiPath Orchestrator for robot deployment, scheduling, and centralized management."
					},
					{
						step: 5,
						title: "Production Deployment",
						description:
							"Go-live with phased rollout, monitoring dashboards, and immediate exception escalation paths."
					},
					{
						step: 6,
						title: "Scale & Optimize",
						description:
							"Expand automation coverage, add AI capabilities, and continuously optimize based on performance data."
					}
				]
			},
			{
				id: "nintex-k2",
				name: "Nintex K2 BPM",
				tagline: "Low-Code Business Process Management",
				description:
					"Nintex K2 is a powerful low-code business process automation platform that helps businesses design, manage, and optimize complex workflows with minimal coding. It allows users to build custom applications, digital forms, and approval processes that span multiple systems.",
				logo: "⚙️",
				features: [
					"Visual drag-and-drop workflow designer",
					"Digital forms and dynamic approval workflows",
					"Cross-system process orchestration",
					"Role-based access and delegation management",
					"Real-time process tracking and SLA monitoring",
					"Integration with SAP, Oracle, Salesforce, and more",
					"Mobile-first workflow participation",
					"Advanced reporting and process analytics"
				],
				benefits: [
					{
						icon: Zap,
						title: "Accelerated Process Digitization",
						description:
							"Business analysts build production-grade workflows without relying on IT backlogs."
					},
					{
						icon: Layers,
						title: "Full Process Visibility",
						description:
							"Real-time dashboards give management complete visibility into where every process stands."
					},
					{
						icon: Shield,
						title: "Governance & Compliance",
						description:
							"Enforce approval hierarchies, policy controls, and compliance checkpoints automatically."
					},
					{
						icon: Globe,
						title: "System Agnostic",
						description:
							"Connect workflows across any combination of enterprise systems without custom development."
					}
				],
				process: [
					{
						step: 1,
						title: "Process Workshop",
						description:
							"Collaborative workshops with business teams to document current processes and define optimized future-state flows."
					},
					{
						step: 2,
						title: "Form & Workflow Design",
						description:
							"Design digital forms and workflow logic using K2's low-code visual tooling."
					},
					{
						step: 3,
						title: "Integration Configuration",
						description:
							"Configure SmartObjects to connect K2 workflows with your existing enterprise systems."
					},
					{
						step: 4,
						title: "UAT with Business Users",
						description:
							"Business-led testing to validate that workflows match operational requirements."
					},
					{
						step: 5,
						title: "Training & Change Management",
						description:
							"Train process owners and participants; manage organizational adoption."
					},
					{
						step: 6,
						title: "Continuous Improvement",
						description:
							"Use process analytics to identify bottlenecks and iteratively optimize workflows."
					}
				]
			},
			{
				id: "opentext-appworks",
				name: "OpenText AppWorks",
				tagline: "Enterprise Workflow & Case Management",
				description:
					"OpenText AppWorks is a comprehensive enterprise information management platform that captures, manages, and governs structured and unstructured information across the enterprise. It integrates content, process, customer experience, and analytics to enhance agility and turn information into a strategic asset.",
				logo: "🗂️",
				features: [
					"End-to-end process and case management",
					"Intelligent content capture and classification",
					"Integration with SAP, Oracle, and Microsoft ecosystems",
					"Low-code application development environment",
					"Advanced analytics and operational reporting",
					"Role-based security and access governance",
					"Mobile and web process participation",
					"Regulatory compliance and retention policy management"
				],
				benefits: [
					{
						icon: Layers,
						title: "Unified Information Governance",
						description:
							"Centralize content and process management to eliminate information silos across departments."
					},
					{
						icon: Shield,
						title: "Risk & Compliance Reduction",
						description:
							"Automated governance policies reduce compliance risk and prepare for audits with minimal effort."
					},
					{
						icon: TrendingUp,
						title: "Operational Agility",
						description:
							"Quickly adapt and redesign processes as business needs change without expensive custom development."
					},
					{
						icon: BarChart3,
						title: "Data-Driven Operations",
						description:
							"Actionable analytics on every process provide the insights needed to drive continuous improvement."
					}
				],
				process: [
					{
						step: 1,
						title: "Information Architecture Design",
						description:
							"Define content models, metadata schemas, and process taxonomies aligned with business requirements."
					},
					{
						step: 2,

						title: "Platform Configuration",
						description:
							"Configure AppWorks environment, security policies, and integration connectors."
					},
					{
						step: 3,
						title: "Process & Application Build",
						description:
							"Develop workflows, case management applications, and forms using low-code tooling."
					},
					{
						step: 4,
						title: "Data Migration",
						description:
							"Migrate existing content and process data with full validation and quality assurance."
					},
					{
						step: 5,
						title: "Testing & Compliance Validation",
						description:
							"Test all workflows, governance rules, and retention policies against business and regulatory requirements."
					},
					{
						step: 6,
						title: "Go-Live & Support",
						description:
							"Phased rollout with user training and dedicated post-go-live support."
					}
				]
			}
		]
	},
	"content-data-management": {
		id: "content-data-management",
		title: "Enterprise Content & Data Management",
		subtitle:
			"Unify, govern, and unlock the value of your enterprise data and content",
		description:
			"Efficient content and document management is critical for organizations handling large volumes of information and strict compliance requirements. Finovate provides scalable enterprise solutions that help businesses capture, store, manage, and secure their content across departments and systems.",
		icon: Cloud,
		gradient: "from-green-500 to-emerald-500",
		accentColor: "green",
		subSolutions: [
			{
				id: "opentext-ecm",
				name: "OpenText ECM",
				tagline: "Enterprise Content Management Platform",
				description:
					"A robust enterprise content management platform that centralizes the storage, access, and lifecycle control of documents and unstructured data. OpenText ECM enhances collaboration, ensures regulatory compliance, supports audit readiness, and reduces operational risk.",
				logo: "📋",
				features: [
					"Centralized document repository with version control",
					"Automated records management and retention policies",
					"Workflow-driven review, approval, and distribution",
					"Seamless integration with SAP, Oracle, and Microsoft 365",
					"Full-text search and intelligent content discovery",
					"Role-based access control and security classification",
					"Digital and physical content lifecycle management",
					"Audit trails and regulatory compliance reporting"
				],
				benefits: [
					{
						icon: Shield,
						title: "Compliance & Audit Readiness",
						description:
							"Automated retention and disposition policies keep you compliant with minimal manual oversight."
					},
					{
						icon: Users,
						title: "Enhanced Collaboration",
						description:
							"Centralized access to the latest document versions eliminates confusion and speeds up teamwork."
					},
					{
						icon: Lock,
						title: "Reduced Operational Risk",
						description:
							"Controlled access and complete audit trails protect sensitive content and reduce breach risk."
					},
					{
						icon: TrendingUp,
						title: "Cost Efficiency",
						description:
							"Consolidate disparate document silos into one platform and reduce storage and management costs."
					}
				],
				process: [
					{
						step: 1,
						title: "Content Audit",
						description:
							"Inventory all existing content repositories and assess volumes, formats, and governance gaps."
					},
					{
						step: 2,
						title: "Information Architecture",
						description:
							"Design the folder structure, metadata schema, retention schedules, and access model."
					},
					{
						step: 3,
						title: "Platform Deployment",
						description:
							"Install, configure, and integrate OpenText ECM with your enterprise applications."
					},
					{
						step: 4,
						title: "Content Migration",
						description:
							"Migrate documents from legacy systems with full metadata mapping and quality validation."
					},
					{
						step: 5,
						title: "User Training",
						description:
							"Role-based training for administrators, power users, and end users."
					},
					{
						step: 6,
						title: "Ongoing Governance",
						description:
							"Regular audits, policy updates, and platform health monitoring."
					}
				]
			},
			{
				id: "infoarchive",
				name: "OpenText InfoArchive",
				tagline: "Intelligent Enterprise Archiving",
				description:
					"OpenText InfoArchive is a high-performance archiving solution that helps organizations retire legacy systems, reduce storage costs, and maintain access to historical data for compliance and business continuity.",
				logo: "🗃️",
				features: [
					"Legacy system decommissioning and data retirement",
					"Structured and unstructured data archiving",
					"Long-term retention with legal hold capabilities",
					"High-performance search and retrieval on archived data",
					"Integration with active enterprise applications",
					"Regulatory compliance for GDPR, Basel III, and more",
					"Automated tiered storage management",
					"Chain of custody and tamper-evident audit trails"
				],
				benefits: [
					{
						icon: TrendingUp,
						title: "Significant Cost Savings",
						description:
							"Decommission expensive legacy applications while retaining full access to historical data."
					},
					{
						icon: Shield,
						title: "Legal & Regulatory Compliance",
						description:
							"Meet long-term retention and e-discovery obligations with confidence."
					},
					{
						icon: Zap,
						title: "Accelerated Retrieval",
						description:
							"Instant search across billions of archived records for audits, investigations, and reporting."
					},
					{
						icon: Layers,
						title: "IT Simplification",
						description:
							"Reduce your application portfolio and infrastructure complexity dramatically."
					}
				],
				process: [
					{
						step: 1,
						title: "Legacy System Discovery",
						description:
							"Identify candidate systems for decommissioning and document all data types and access requirements."
					},
					{
						step: 2,
						title: "Archive Schema Design",
						description:
							"Design archive structures that preserve all necessary context and metadata."
					},
					{
						step: 3,
						title: "Data Extraction & Validation",
						description:
							"Extract data from legacy systems and validate completeness and integrity."
					},
					{
						step: 4,
						title: "Archive Loading",
						description:
							"Load data into InfoArchive with full indexing for fast retrieval."
					},
					{
						step: 5,
						title: "Access Testing",
						description:
							"Validate all retrieval scenarios before legacy system shutdown."
					},
					{
						step: 6,
						title: "Legacy Decommission",
						description:
							"Safely shut down legacy systems with full rollback capability maintained during transition."
					}
				]
			},
			{
				id: "postgres-edb",
				name: "EDB Postgres AI",
				tagline: "AI-Powered Database Management",
				description:
					"EDB Postgres AI delivers intelligent data solutions that combine the power of PostgreSQL with advanced AI-driven automation. Their platform enables enterprises to optimize database performance, streamline data management, and unlock deeper insights through predictive analytics and adaptive learning.",
				logo: "🐘",
				features: [
					"AI-driven query optimization and auto-tuning",
					"Predictive analytics and adaptive learning engine",
					"Enterprise-grade PostgreSQL with high availability",
					"Automated backup, recovery, and failover",
					"Advanced security including encryption and row-level access",
					"Real-time monitoring and intelligent alerting",
					"Seamless migration tools from Oracle and other databases",
					"Hybrid and multi-cloud deployment support"
				],
				benefits: [
					{
						icon: Zap,
						title: "Peak Database Performance",
						description:
							"AI continuously tunes your database to deliver optimal performance under any workload."
					},
					{
						icon: TrendingUp,
						title: "Innovation Acceleration",
						description:
							"Integrated AI capabilities let developers build intelligent data-driven features faster."
					},
					{
						icon: Shield,
						title: "Enterprise Reliability",
						description:
							"High availability and automated failover ensure your data is always accessible."
					},
					{
						icon: BarChart3,
						title: "Deeper Data Insights",
						description:
							"Predictive analytics surface trends and anomalies that traditional databases miss."
					}
				],
				process: [
					{
						step: 1,
						title: "Database Assessment",
						description:
							"Evaluate current database infrastructure, workloads, and performance bottlenecks."
					},
					{
						step: 2,
						title: "Migration Planning",
						description:
							"Design migration strategy including schema conversion, data mapping, and rollback plan."
					},
					{
						step: 3,
						title: "Environment Setup",
						description:
							"Deploy EDB Postgres AI in your target environment with HA configuration."
					},
					{
						step: 4,
						title: "Migration Execution",
						description:
							"Execute phased data migration with continuous validation."
					},
					{
						step: 5,
						title: "AI Tuning Activation",
						description:
							"Enable AI optimization features and establish monitoring baselines."
					},
					{
						step: 6,
						title: "Handover & Support",
						description:
							"DBA training, documentation handover, and ongoing managed support."
					}
				]
			},
			{
				id: "tableau",
				name: "Tableau",
				tagline: "Visual Analytics & Business Intelligence",
				description:
					"Tableau is a leading visual analytics platform that helps users see and understand data through interactive dashboards and real-time insights. It connects to a wide range of data sources and transforms complex datasets into intuitive, shareable visualizations that empower data-informed decision-making.",
				logo: "📊",
				features: [
					"Drag-and-drop interactive dashboard builder",
					"Real-time data connections to 100+ sources",
					"AI-powered analytical suggestions (Ask Data & Explain Data)",
					"Mobile-optimized dashboards for on-the-go insights",
					"Row-level security and data governance controls",
					"Embedded analytics for custom applications",
					"Automated scheduled reporting and alerts",
					"Tableau Prep for self-service data cleaning and shaping"
				],
				benefits: [
					{
						icon: BarChart3,
						title: "Data-Driven Culture",
						description:
							"Empower every employee to make confident decisions backed by real data, not gut instinct."
					},
					{
						icon: Zap,
						title: "Faster Insights",
						description:
							"What used to take days in spreadsheets takes minutes with Tableau's visual exploration."
					},
					{
						icon: Users,
						title: "Democratized Analytics",
						description:
							"Non-technical users can explore data independently, reducing reliance on IT and data teams."
					},
					{
						icon: Globe,
						title: "Enterprise Scalability",
						description:
							"From departmental dashboards to enterprise-wide BI, Tableau scales with your needs."
					}
				],
				process: [
					{
						step: 1,
						title: "Analytics Requirements",
						description:
							"Define KPIs, reporting needs, and data sources across business units."
					},
					{
						step: 2,
						title: "Data Source Connection",
						description:
							"Connect Tableau to all relevant data sources and establish live or extract connections."
					},
					{
						step: 3,
						title: "Dashboard Development",
						description:
							"Build role-specific dashboards and reports with your team's visual and analytical requirements."
					},
					{
						step: 4,
						title: "Governance Configuration",
						description:
							"Set up user roles, data access policies, and content governance on Tableau Server/Cloud."
					},
					{
						step: 5,
						title: "Training & Enablement",
						description:
							"Author training for power users and viewer training for business consumers."
					},
					{
						step: 6,
						title: "Adoption & Expansion",
						description:
							"Monitor usage, expand data sources, and continuously enrich the analytics environment."
					}
				]
			}
		]
	},
	"integration-api-management": {
		id: "integration-api-management",
		title: "Integration & API Management",
		subtitle:
			"Connect your enterprise ecosystem with seamless, secure, real-time integration",
		description:
			"Seamless system integration is the backbone of modern financial services. Finovate leverages leading integration platforms to connect enterprise systems, data sources, and applications—enabling real-time data exchange and unified customer experiences.",
		icon: CreditCard,
		gradient: "from-indigo-500 to-blue-500",
		accentColor: "indigo",
		subSolutions: [
			{
				id: "bpc",
				name: "BPC SmartVista",
				tagline: "Digital Banking & Payment Platform",
				description:
					"The BPC SmartVista solution provides a robust, secure, and scalable backend for transaction processing, switching, authorization, routing, clearing, and settlement. It integrates seamlessly with card schemes, digital wallets, and third-party services, ensuring compliance with industry standards. Finovate delivers the frontend channels (web and mobile) that consume SmartVista functionalities and acts as first-line support.",
				logo: "💳",
				features: [
					"Real-time transaction processing and authorization",
					"Multi-scheme card switching and routing (Visa, Mastercard, local schemes)",
					"Clearing and settlement engine",
					"Digital wallet integration",
					"Frontend web and mobile channel implementation",
					"Third-party payment service integration",
					"Industry-standard compliance (PCI-DSS, EMV)",
					"First-line operational support and issue resolution"
				],
				benefits: [
					{
						icon: Zap,
						title: "Real-Time Processing",
						description:
							"Authorize, route, and settle transactions in milliseconds with carrier-grade reliability."
					},
					{
						icon: Shield,
						title: "PCI-DSS Compliance",
						description:
							"Built-in compliance with payment card industry standards protects you and your customers."
					},
					{
						icon: Globe,
						title: "Multi-Scheme Support",
						description:
							"One platform to connect all major card schemes, wallets, and local payment methods."
					},
					{
						icon: Users,
						title: "Branded Customer Experience",
						description:
							"Finovate's frontend delivery ensures your digital payment channels reflect your brand identity."
					}
				],
				process: [
					{
						step: 1,
						title: "Payment Landscape Analysis",
						description:
							"Document all payment flows, card schemes, wallet integrations, and compliance requirements."
					},
					{
						step: 2,
						title: "SmartVista Configuration",
						description:
							"Configure the backend switching, routing rules, and settlement parameters."
					},
					{
						step: 3,
						title: "Frontend Channel Development",
						description:
							"Build and brand the web and mobile frontend channels consuming SmartVista APIs."
					},
					{
						step: 4,
						title: "Integration & Certification",
						description:
							"Certify connections with card schemes and test all payment scenarios end-to-end."
					},
					{
						step: 5,
						title: "Compliance & Security Audit",
						description:
							"PCI-DSS assessment and penetration testing before go-live."
					},
					{
						step: 6,
						title: "Operations & Support",
						description:
							"Finovate acts as first-line support for daily operations, enhancements, and client coordination."
					}
				]
			},
			{
				id: "mulesoft",
				name: "MuleSoft",
				tagline: "API-Led Connectivity & Integration Platform",
				description:
					"MuleSoft is an integration platform that connects applications, data, and systems through API-led connectivity. It enables secure, scalable, and real-time data exchange between enterprise systems, empowering organizations to unify their customer journeys and improve operational agility.",
				logo: "🔗",
				features: [
					"API-led connectivity framework (System, Process, Experience layers)",
					"Pre-built connectors for 500+ enterprise systems",
					"Real-time and batch data integration patterns",
					"API lifecycle management: design, publish, secure, monitor",
					"Event-driven architecture support",
					"Enterprise-grade security and data masking",
					"Anypoint Platform for centralized integration governance",
					"Reusable API assets and integration templates"
				],
				benefits: [
					{
						icon: Globe,
						title: "Unified Enterprise Ecosystem",
						description:
							"Connect every application and data source into a cohesive, integrated enterprise platform."
					},
					{
						icon: Zap,
						title: "Accelerated Integration Delivery",
						description:
							"Reusable API building blocks reduce integration effort by up to 3x for new projects."
					},
					{
						icon: Shield,
						title: "Secure Data Exchange",
						description:
							"Centralized policy enforcement ensures consistent security across every integration."
					},
					{
						icon: TrendingUp,
						title: "Business Agility",
						description:
							"Modular integrations let you rapidly adapt to new systems, partners, and market demands."
					}
				],
				process: [
					{
						step: 1,
						title: "Integration Architecture Design",
						description:
							"Define the API-led connectivity blueprint: system, process, and experience API layers."
					},
					{
						step: 2,
						title: "API Design & Specification",
						description:
							"Design APIs using RAML or OAS standards on Anypoint Design Center."
					},
					{
						step: 3,
						title: "Integration Development",
						description:
							"Build integration flows using Anypoint Studio with pre-built connectors and templates."
					},
					{
						step: 4,
						title: "Testing & Security Hardening",
						description:
							"Unit, integration, and security testing for all APIs and flows."
					},
					{
						step: 5,
						title: "Deployment to Anypoint Platform",
						description:
							"Deploy to CloudHub or on-premises runtime with monitoring and alerting configured."
					},
					{
						step: 6,
						title: "API Governance & Evolution",
						description:
							"Manage the API lifecycle, onboard consumers, and evolve integrations as business grows."
					}
				]
			}
		]
	},
	"digital-collaboration-ai": {
		id: "digital-collaboration-ai",
		title: "Digital Collaboration & AI Assistant",
		subtitle:
			"Transform how your teams work and how your bank serves customers",
		description:
			"Finovate provides AI-powered collaboration and intelligent assistant solutions that enhance communication, automate real actions, and improve productivity across your entire organization—both internally and in customer-facing channels.",
		icon: Brain,
		gradient: "from-orange-500 to-yellow-500",
		accentColor: "orange",
		subSolutions: [
			{
				id: "slack",
				name: "Slack",
				tagline: "Intelligent Team Collaboration Platform",
				description:
					"Slack is a powerful collaboration platform designed to streamline communication and boost productivity within teams. It offers organized channels, direct messaging, file sharing, and integration with hundreds of third-party tools, enabling seamless workflows in real time.",
				logo: "💬",

				features: [
					"Organized channels by team, project, or topic",
					"Direct and group messaging with rich media",
					"File sharing and collaborative document editing",
					"Workflow Builder for automated routine processes",
					"Integration with 2,400+ apps (Salesforce, Jira, Google Workspace)",
					"Searchable message and file history",
					"Huddles: lightweight voice and video calls",
					"Enterprise-grade security and compliance (EKM, DLP, eDiscovery)"
				],
				benefits: [
					{
						icon: Zap,
						title: "Faster Decision-Making",
						description:
							"Replace slow email chains with real-time channel discussions that keep teams aligned and moving."
					},
					{
						icon: Users,
						title: "Stronger Team Culture",
						description:
							"Channels and communities break down silos and foster transparency across the organization."
					},
					{
						icon: TrendingUp,
						title: "Productivity Boost",
						description:
							"Automated workflows in Slack eliminate repetitive coordination tasks and status updates."
					},
					{
						icon: Globe,
						title: "Connected Ecosystem",
						description:
							"Bring data from your key business tools directly into Slack so teams never lose context."
					}
				],
				process: [
					{
						step: 1,
						title: "Workspace Architecture",
						description:
							"Design your channel structure, naming conventions, and governance policies for the organization."
					},
					{
						step: 2,
						title: "Enterprise Deployment",
						description:
							"Configure Slack Enterprise Grid with security, SSO, and compliance settings."
					},
					{
						step: 3,
						title: "Integration Setup",
						description:
							"Connect Slack with your existing tools—CRM, ticketing, banking systems, and monitoring."
					},
					{
						step: 4,
						title: "Workflow Automation",
						description:
							"Build Slack workflows to automate approvals, notifications, and repetitive communication tasks."
					},
					{
						step: 5,
						title: "User Onboarding",
						description:
							"Structured onboarding program to drive fast adoption across all teams."
					},
					{
						step: 6,
						title: "Governance & Optimization",
						description:
							"Ongoing channel management, retention policies, and usage analytics."
					}
				]
			},
			{
				id: "nabeeh",
				name: "Nabeeh AI Banking Assistant",
				tagline: "Agentic Generative AI for Banking",
				description:
					"Finovate's next-generation Agentic Generative AI Banking Assistant transforms how banks engage, serve, and scale. Powered by advanced RAG architecture, it securely leverages your institution's internal data to deliver highly accurate, context-aware responses. Built with agentic capabilities, Nabeeh doesn't just answer questions—it completes real banking actions in real time.",
				logo: "🤖",
				features: [
					"Retrieval-Augmented Generation (RAG) on internal banking data",
					"Agentic AI: executes real actions, not just answers",
					"Account opening, deposit renewal, and service request processing",
					"Complex multi-step transaction execution",
					"Context-aware, personalized customer interactions",
					"Arabic and English language support",
					"Integration with core banking and CRM systems",
					"Full compliance, security, and audit trail on every interaction"
				],
				benefits: [
					{
						icon: Zap,
						title: "Instant Service Delivery",
						description:
							"Customers complete banking transactions in seconds through natural conversation—no branch or call center needed."
					},
					{
						icon: Brain,
						title: "Truly Intelligent Responses",
						description:
							"RAG architecture ensures every answer is grounded in your institution's actual data and policies."
					},
					{
						icon: Shield,
						title: "Secure & Compliant",
						description:
							"Every action is authorized, logged, and auditable, meeting the highest banking security standards."
					},
					{
						icon: TrendingUp,
						title: "Scalable Customer Engagement",
						description:
							"Handle thousands of simultaneous customer interactions without adding headcount."
					}
				],
				process: [
					{
						step: 1,
						title: "Knowledge Base Design",
						description:
							"Map all internal knowledge sources: policies, product catalogs, FAQs, and transaction documentation."
					},
					{
						step: 2,
						title: "RAG Pipeline Setup",
						description:
							"Build and configure the retrieval-augmented generation pipeline on your secured infrastructure."
					},
					{
						step: 3,
						title: "Agentic Action Configuration",
						description:
							"Define and secure the banking actions the AI can execute, with appropriate authorization controls."
					},
					{
						step: 4,
						title: "Core Banking Integration",
						description:
							"Integrate Nabeeh with your core banking, CRM, and customer data platforms."
					},
					{
						step: 5,
						title: "Testing & Safety Validation",
						description:
							"Extensive testing of all conversational flows, actions, and edge cases before customer exposure."
					},
					{
						step: 6,
						title: "Launch & Continuous Learning",
						description:
							"Phased rollout with ongoing conversation analytics and model improvement cycles."
					}
				]
			}
		]
	}
};

export default solutionDetails;
