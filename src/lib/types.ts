export type PolicyType = "privacy" | "terms" | "cookies" | "refund" | "dmca";

export interface QuestionnaireData {
  appName: string;
  appUrl: string;
  appDescription: string;
  contactEmail: string;
  jurisdiction: string;
  dataCollected: string[];
  thirdPartyServices: string[];
  hasUserAccounts: boolean;
  acceptsPayments: boolean;
  hasRefundPolicy: boolean;
  cookieTypes: string[];
  minimumAge: string;
}

export interface Policy {
  id: string;
  user_id: string | null;
  anonymous_token: string | null;
  short_code: string;
  policy_type: PolicyType;
  app_name: string;
  app_url: string | null;
  content: string;
  questionnaire: QuestionnaireData | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const POLICY_TYPE_LABELS: Record<PolicyType, string> = {
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  cookies: "Cookie Policy",
  refund: "Refund Policy",
  dmca: "DMCA Policy",
};

export const DATA_COLLECTION_OPTIONS = [
  "Name",
  "Email address",
  "Phone number",
  "Billing address",
  "IP address",
  "Browser/device info",
  "Cookies",
  "Usage analytics",
  "Location data",
  "Payment information",
  "Social media profiles",
  "User-generated content",
];

export const THIRD_PARTY_OPTIONS = [
  "Google Analytics",
  "Stripe",
  "PayPal",
  "Mailchimp",
  "SendGrid",
  "AWS",
  "Cloudflare",
  "Facebook Pixel",
  "Intercom",
  "Sentry",
  "Mixpanel",
  "Hotjar",
];

export const COOKIE_TYPE_OPTIONS = [
  "Essential/Functional",
  "Analytics/Performance",
  "Advertising/Marketing",
  "Social Media",
  "Preference/Settings",
];

export const JURISDICTION_OPTIONS = [
  "United States",
  "European Union (GDPR)",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "Global / Multiple",
];
