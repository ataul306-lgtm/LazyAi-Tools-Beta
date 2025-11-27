import {
  Mail, Search, Youtube, Globe, BarChart2, MessageSquare, 
  Code, Image as ImageIcon, Edit3, Terminal, Smile, 
  PieChart, Hash, FileText, PenTool, Share2, Box, 
  Shield, Key, RefreshCw, Palette, Layers, Cpu,
  Type, Video, Mic, Smartphone, Link, Database
} from 'lucide-react';
import { Tool, ToolCategory, InputType } from './types';

export const TOOLS: Tool[] = [
  // SEO & Marketing
  {
    id: 'bulk-email-checker',
    name: 'Bulk Email Validator',
    description: 'Analyze email addresses for syntax validity and likelihood of existence using AI pattern matching.',
    icon: Mail,
    category: ToolCategory.MARKETING,
    inputType: InputType.TEXTAREA,
    inputPlaceholder: 'Enter email addresses (one per line)...',
    outputLabel: 'Validation Report',
    systemPrompt: 'You are an email validation expert. Analyze the provided list of email addresses. For each email, determine if the syntax is valid and if the domain looks legitimate. Output a list with status (Valid/Invalid) and a brief reason. Do not actually send emails.'
  },
  {
    id: 'keyword-research',
    name: 'Keyword Research',
    description: 'Find related keywords with search intent analysis and content suggestions.',
    icon: Search,
    category: ToolCategory.SEO,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Enter a seed keyword (e.g., "vegan shoes")...',
    outputLabel: 'Keyword Strategy',
    systemPrompt: 'You are an SEO expert. Provide a list of 10 related keywords for the given seed keyword. For each, estimate "User Intent" (Informational, Transactional, etc.) and suggest a blog post title.'
  },
  {
    id: 'youtube-ideas',
    name: 'YouTube Idea Generator',
    description: 'Generate viral YouTube video ideas with titles and thumbnail concepts.',
    icon: Youtube,
    category: ToolCategory.SOCIAL,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Enter your channel niche (e.g., "Tech Reviews")...',
    outputLabel: 'Video Concepts',
    systemPrompt: 'You are a YouTube growth strategist. Generate 5 high-CTR video ideas for the provided niche. For each idea, provide: 1. Catchy Title, 2. Hook (first 10 seconds), 3. Thumbnail description.'
  },
  {
    id: 'subject-line-grader',
    name: 'Subject Line Grader',
    description: 'Analyze email subject lines with AI scoring for open rates and spam triggers.',
    icon: MessageSquare,
    category: ToolCategory.MARKETING,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Enter your email subject line...',
    outputLabel: 'Grade & Suggestions',
    systemPrompt: 'You are an email marketing copywriter. Grade the provided subject line on a scale of A to F. Explain the grade. List 3 specific improvements to increase open rates. Check for spam trigger words.'
  },

  // Developers
  {
    id: 'python-ide',
    name: 'Python Assistant',
    description: 'Generate Python scripts, debug code, or explain complex functions.',
    icon: Terminal,
    category: ToolCategory.DEVELOPER,
    inputType: InputType.TEXTAREA,
    inputPlaceholder: 'Describe the script you need (e.g., "Scrape a website for headers")...',
    outputLabel: 'Python Code',
    systemPrompt: 'You are a Senior Python Developer. Write clean, commented, and efficient Python code based on the user request. Wrap code in markdown blocks.'
  },
  {
    id: 'code-share',
    name: 'Code Refactor & Share',
    description: 'Beautify code snippets and get optimization suggestions.',
    icon: Code,
    category: ToolCategory.DEVELOPER,
    inputType: InputType.CODE,
    inputPlaceholder: 'Paste your code snippet here...',
    outputLabel: 'Refactored Code',
    systemPrompt: 'You are a Code Quality expert. Refactor the provided code to be cleaner, more efficient, and strictly typed. Explain the changes made.'
  },
  {
    id: 'json-compare',
    name: 'JSON Formatter & Fixer',
    description: 'Validate, format, and fix errors in JSON data objects.',
    icon: Database,
    category: ToolCategory.DEVELOPER,
    inputType: InputType.TEXTAREA,
    inputPlaceholder: 'Paste messy JSON here...',
    outputLabel: 'Clean JSON',
    systemPrompt: 'You are a data parser. Take the provided JSON string. If it is invalid, fix the errors (missing quotes, commas). Output the pretty-printed, valid JSON.'
  },
  {
    id: 'md5-generator',
    name: 'Regex Generator',
    description: 'Create complex Regular Expressions from plain English descriptions.',
    icon: Hash,
    category: ToolCategory.DEVELOPER,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Describe what you want to match (e.g. "valid US phone numbers")...',
    outputLabel: 'Regex Pattern',
    systemPrompt: 'You are a Regex expert. Generate a regular expression for the requested pattern. Explain how it works step-by-step. Provide examples of matches and non-matches.'
  },

  // Designers & Creative
  {
    id: 'bg-remover-code',
    name: 'Auto Background Remover',
    description: 'Generate a 100% working Python script to remove image backgrounds instantly.',
    icon: Layers,
    category: ToolCategory.DESIGNER,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Enter image filename (e.g., "photo.jpg")...',
    outputLabel: 'Python Script (Copy & Run)',
    systemPrompt: 'You are a Python Automation Expert. Write a complete, error-free Python script using the "rembg" and "PIL" (Pillow) libraries to remove the background from an image. Include: 1. A comment at the top with the exact pip install command (`pip install rembg pillow`). 2. The script should read the input file provided by the user, remove the background, and save it as "output_no_bg.png". 3. Wrap the code in a markdown block. This must be 100% working code.'
  },
  {
    id: 'ai-image-prompt',
    name: 'AI Image Prompt Gen',
    description: 'Transform short text prompts into stunning Midjourney/DALL-E descriptions.',
    icon: ImageIcon,
    category: ToolCategory.DESIGNER,
    inputType: InputType.TEXT,
    inputPlaceholder: 'A cat eating pizza...',
    outputLabel: 'Optimized Prompts',
    systemPrompt: 'You are an AI Art Prompt Engineer. Take the user simple idea and expand it into 3 distinct, highly detailed prompts suitable for high-end image generators (Midjourney v6). Include lighting, style, camera settings, and composition keywords.'
  },
  {
    id: 'palette-generator',
    name: 'Color Palette Gen',
    description: 'Generate accessible color palettes based on a mood or keyword.',
    icon: Palette,
    category: ToolCategory.DESIGNER,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Enter a mood (e.g., "Cyberpunk", "Organic Spa")...',
    outputLabel: 'Color Palette',
    systemPrompt: 'You are a color theorist. Generate a 5-color palette based on the user mood/theme. Provide Hex codes and a brief description of where to use each color (Background, Accent, Text).'
  },
  {
    id: 'font-pairer',
    name: 'Font Pairing Tool',
    description: 'Suggest font combinations for web and print projects.',
    icon: Type,
    category: ToolCategory.DESIGNER,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Project type (e.g., "Modern Tech Blog")...',
    outputLabel: 'Font Recommendations',
    systemPrompt: 'You are a typographer. Suggest 3 font pairings (Header + Body) for the project described. Explain why they work well together. Focus on Google Fonts.'
  },

  // Writing & Content
  {
    id: 'blog-title-gen',
    name: 'Blog Title Generator',
    description: 'Generate compelling blog titles using AI optimization patterns.',
    icon: Edit3,
    category: ToolCategory.WRITING,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Enter your blog topic...',
    outputLabel: 'Title Options',
    systemPrompt: 'Generate 10 catchy, SEO-friendly blog titles for the given topic. Include a mix of "How-to", "Listicles", and "Question-based" titles.'
  },
  {
    id: 'emoji-library',
    name: 'Emoji Translator',
    description: 'Translate sentences into emoji-rich text for social media.',
    icon: Smile,
    category: ToolCategory.SOCIAL,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Enter your sentence...',
    outputLabel: 'Emojified Text',
    systemPrompt: 'Rewrite the user text by adding relevant emojis to emphasize points. Make it engaging for Instagram/Twitter/LinkedIn.'
  },
  {
    id: 'poll-generator',
    name: 'Poll Generator',
    description: 'Generate engaging multiple-choice polls to uncover audience pain points.',
    icon: BarChart2,
    category: ToolCategory.SOCIAL,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Poll topic (e.g., "Remote Work Challenges")...',
    outputLabel: 'Poll Options',
    systemPrompt: 'Create a LinkedIn/Twitter poll about the topic. Provide the Question and 4 distinct, engaging voting options.'
  },
  {
    id: 'story-plot',
    name: 'Story Plot Generator',
    description: 'Overcome writer\'s block with unique plot twists and character arcs.',
    icon: FileText,
    category: ToolCategory.WRITING,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Genre (e.g., "Sci-Fi Mystery")...',
    outputLabel: 'Plot Outline',
    systemPrompt: 'You are a creative writing coach. Generate a unique story plot outline for the given genre. Include a Protagonist, an Inciting Incident, a Climax, and a Resolution.'
  },

  // Business & Misc
  {
    id: 'startup-ideas',
    name: 'Startup Idea Gen',
    description: 'Combine industries to create unique micro-SaaS business concepts.',
    icon: Cpu,
    category: ToolCategory.MARKETING,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Industry (e.g., "Pet Care")...',
    outputLabel: 'Business Concepts',
    systemPrompt: 'Generate 3 unique micro-SaaS startup ideas for the industry. For each, describe the Problem, the Solution, and the Revenue Model.'
  },
  {
    id: 'job-desc',
    name: 'Job Description Gen',
    description: 'Write professional job descriptions optimized for recruitment.',
    icon: Share2,
    category: ToolCategory.MARKETING,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Job Title (e.g., "Senior React Developer")...',
    outputLabel: 'Job Description',
    systemPrompt: 'Write a comprehensive job description for the title. Include Responsibilities, Requirements (Tech stack), and "Why join us". Keep it professional yet exciting.'
  },
  {
    id: 'domain-gen',
    name: 'AI Domain Generator',
    description: 'Generate creative domain name suggestions using AI branding logic.',
    icon: Globe,
    category: ToolCategory.SEO,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Project description (e.g., "Coffee subscription service")...',
    outputLabel: 'Domain Names',
    systemPrompt: 'Generate 15 creative, short, and brandable domain name ideas for the project. Avoid hyphens. Focus on modern startup naming trends (e.g., -ly, -ify, creative misspellings).'
  },
  {
    id: 'interview-prep',
    name: 'Interview Prep',
    description: 'Simulate interview questions for specific roles.',
    icon: MessageSquare,
    category: ToolCategory.DEVELOPER,
    inputType: InputType.TEXT,
    inputPlaceholder: 'Role (e.g., "Product Manager")...',
    outputLabel: 'Interview Questions',
    systemPrompt: 'List 5 technical and 5 behavioral interview questions for the role. For the toughest technical question, provide a model answer.'
  }
];

export const CATEGORIES = Object.values(ToolCategory);