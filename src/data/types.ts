export interface SocialLink {
  label: string;
  href: string;
  icon: "email" | "linkedin" | "github";
}

export interface ProfileStat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  focus: string;
  location: string;
  avatar: string;
  cover: string;
  covers: string[];
  resume: string;
  availability: string;
  bio: string[];
  about: string;
  stats?: ProfileStat[];
}

export interface ExperienceProject {
  tag: string;
  description: string;
}

export interface Experience {
  /** URL slug: /experience/:slug */
  slug: string;
  company: string;
  role: string;
  location: string;
  period: string;
  projects: ExperienceProject[];
}

export interface ProjectLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface Project {
  /** URL slug: /projects/:slug */
  slug: string;
  name: string;
  tag: string;
  monogram: string;
  accent: string;
  image: string;
  imageAlt: string;
  metric: string;
  summary: string;
  problem: string;
  approach: string;
  architecture: string;
  results: string;
  stack: string[];
  links: ProjectLink[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  product: string;
  reviewedAt: string;
  reviewUrl: string;
}

export interface StackItem {
  name: string;
  icon: string;
}

export interface StackGroup {
  category: string;
  icon: string;
  accent: string;
  items: StackItem[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  current: boolean;
  highlight?: string;
}

export interface Portfolio {
  meta: { title: string; description: string; url: string; ogImage: string };
  profile: Profile;
  socials: SocialLink[];
  experience: Experience[];
  projects: Project[];
  testimonials: Testimonial[];
  stack: StackGroup[];
  education: Education[];
}
