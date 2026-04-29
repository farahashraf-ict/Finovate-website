import { useNavigate } from "react-router-dom";

const solutions = [
  {
    id: "core-banking-digital",
    title: "Core Banking & Digital Module",
    description:
      "Core banking solutions powered by FLEXCUBE, Sarraf, and modern payment systems.",
  },
  {
    id: "fraud-risk-intelligence",
    title: "Fraud Detection & Risk Intelligence",
    description:
      "Detect fraud and manage risk with real-time insights using Quantexa.",
  },
  {
    id: "process-workflow-automation",
    title: "Business Process & Workflow Automation",
    description:
      "Automate workflows with Nintex, OpenText, AppWorks, and UiPath.",
  },
  {
    id: "content-data-management",
    title: "Content & Data Management",
    description:
      "Manage and analyze data with OpenText, Postgres EDB, and Tableau.",
  },
  {
    id: "integration-api-management",
    title: "Integration & API Management",
    description: "Connect systems seamlessly with APIs and BPC integration.",
  },
  {
    id: "digital-collaboration-ai",
    title: "Collaboration & AI Assistant",
    description:
      "Boost teamwork with Slack integration and the Nabeeh AI assistant.",
  },
];

export function SolutionsMenu() {
  const navigate = useNavigate();

  return (
    <div className="relative group">
      {/* Trigger */}
      <div className="bg-transparent text-white text-sm px-4 py-2 rounded-full hover:bg-gray-500/20 cursor-pointer">
        Solutions
      </div>

      {/* Dropdown */}
      <div className="fixed inset-0 bg-black/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40 pointer-events-none" />

      <div className="fixed left-0 right-0 top-20 px-4 sm:px-6 lg:px-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="mx-auto w-full max-w-7xl bg-white shadow-lg border rounded-lg">
          <div className="px-5 sm:px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                onClick={() => navigate(`/solutions/${solution.id}`)}
                className="min-w-0 space-y-2 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900">
                  {solution.title}
                </h3>

                <p className="text-sm text-gray-500">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
