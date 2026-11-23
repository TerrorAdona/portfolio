/**
 * Lucide React icon re-exports with correct naming
 * Provides consistent imports across the project
 * Includes brand icon substitutes
 */

// Navigation & Layout
export {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  ArrowRightFromLine,
  ArrowLeftFromLine,
  ArrowUpFromLine,
  ArrowDownFromLine,
} from "lucide-react";

// Actions
export {
  Send,
  Mail,
  MapPin,
  Phone,
  Download,
  Upload,
  Copy,
  Edit,
  Edit2,
  Edit3,
  Delete,
  Trash,
  Trash2,
  Save,
  Search,
  Filter,
  Settings,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Minus,
  PlusCircle,
  MinusCircle,
} from "lucide-react";

// Status & Feedback
export {
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader,
  Loader2,
  RefreshCw,
  RefreshCcw,
  AlertOctagon,
  Check,
  XCircle,
  HelpCircle,
  InfoCircle,
} from "lucide-react";

// Code & Development
export {
  Code,
  Code2,
  CodeXml,
  CodeSquare,
  Terminal,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  GitFork,
  GitCompare,
  Database,
  Server,
  Cloud,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
} from "lucide-react";

// Social & Communication (generic alternatives for brands)
export {
  MessageSquare,
  MessageCircle,
  Mail,
  Link,
  Link2,
  Share,
  Share2,
  Users,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  UserCog,
  Users2,
  Group,
} from "lucide-react";

// Brand icon substitutes (lucide doesn't have brand icons)
export const BrandIcons = {
  github: "git-branch",
  gitlab: "git-branch",
  bitbucket: "git-branch",
  linkedin: "users",
  twitter: "message-square",
  x: "message-square",
  facebook: "users",
  instagram: "camera",
  youtube: "video",
  discord: "message-square",
  slack: "message-square",
  email: "mail",
  website: "globe",
  portfolio: "briefcase",
  resume: "file-text",
  download: "download",
} as const;

/**
 * Get the correct lucide icon component for a brand
 */
export function getBrandIconComponent(brand: keyof typeof BrandIcons) {
  const iconName = BrandIcons[brand];
  // Return the icon name - the component will need to import it dynamically
  return iconName;
}

/**
 * Semantic icon mappings for consistent usage
 */
export const SemanticIcons = {
  // Navigation
  menu: "Menu",
  close: "X",
  chevronDown: "ChevronDown",
  chevronRight: "ChevronRight",
  chevronLeft: "ChevronLeft",
  arrowRight: "ArrowRight",
  arrowLeft: "ArrowLeft",
  externalLink: "ExternalLink",

  // Actions
  send: "Send",
  email: "Mail",
  location: "MapPin",
  phone: "Phone",
  download: "Download",
  upload: "Upload",
  copy: "Copy",
  edit: "Edit",
  delete: "Trash2",
  save: "Save",
  search: "Search",
  filter: "Filter",
  settings: "Settings",

  // Status
  success: "CheckCircle",
  error: "AlertCircle",
  warning: "AlertTriangle",
  info: "Info",
  loading: "Loader2",
  refresh: "RefreshCw",

  // Social (generic)
  github: "GitBranch",
  gitlab: "GitBranch",
  linkedin: "Users",
  twitter: "MessageSquare",
  email2: "Mail",

  // Code
  code: "Code",
  terminal: "Terminal",
  git: "GitBranch",
  database: "Database",
  server: "Server",
  cloud: "Cloud",

  // Time
  calendar: "Calendar",
  clock: "Clock",
  timer: "Timer",

  // UI
  sun: "Sun",
  moon: "Moon",
  star: "Star",
  heart: "Heart",
  award: "Award",
  sparkles: "Sparkles",
  zap: "Zap",
} as const;

export type SemanticIconKey = keyof typeof SemanticIcons;