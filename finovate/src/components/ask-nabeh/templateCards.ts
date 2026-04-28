export const TEMPLATE_CARDS = [
  {
    id: "faq_bot",
    title: "FAQ Bot",
    description: "Answers questions directly from your documents",
    bullets: ["Finds exact answers", "Cites sources", "Handles follow-ups"],
    icon: "❓",
  },
  {
    id: "product_expert",
    title: "Product Expert",
    description: "Explains products, features, and pricing",
    bullets: [
      "Compares products",
      "Explains terms",
      "Handles ‘what is…’ questions",
    ],
    icon: "📦",
  },
  {
    id: "policy_guide",
    title: "Policy Guide",
    description: "Navigates compliance and policy documents",
    bullets: ["Finds specific rules", "Explains requirements", "Quotes policy text"],
    icon: "📋",
  },
  {
    id: "onboarding_assistant",
    title: "Onboarding Assistant",
    description: "Guides users through processes step by step",
    bullets: ["Step-by-step guidance", "Eligibility checks", "Next action suggestions"],
    icon: "🚀",
  },
  {
    id: "general_assistant",
    title: "General Assistant",
    description: "All-purpose assistant over your documents",
    bullets: ["Open-ended Q&A", "Summarization", "Key fact extraction"],
    icon: "💬",
  },
] as const;
