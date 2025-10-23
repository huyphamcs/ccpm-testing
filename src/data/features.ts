export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const features: Feature[] = [
  {
    id: "collaboration",
    title: "Real-time Collaboration",
    description:
      "Work together seamlessly with live updates, comments, and notifications that keep everyone in sync.",
    icon: "collaboration",
  },
  {
    id: "integrations",
    title: "Powerful Integrations",
    description:
      "Connect with 100+ tools you already use, from Slack to GitHub, to centralize your workflow.",
    icon: "integrations",
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description:
      "Make data-driven decisions with customizable dashboards and insights that track what matters.",
    icon: "analytics",
  },
  {
    id: "security",
    title: "Enterprise Security",
    description:
      "Bank-level encryption, SOC 2 compliance, and SSO ensure your data stays protected.",
    icon: "security",
  },
  {
    id: "automation",
    title: "Automation Engine",
    description:
      "Save hours every week by automating repetitive tasks with our no-code workflow builder.",
    icon: "automation",
  },
  {
    id: "mobile",
    title: "Mobile-First Design",
    description:
      "Stay productive anywhere with our native mobile apps for iOS and Android.",
    icon: "mobile",
  },
];
