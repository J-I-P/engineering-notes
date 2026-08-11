export type TopicMetadata = {
  slug: string;
  title: string;
  description: string;
  featured: boolean;
  order: number;
};

export const TOPICS = [
  {
    slug: 'asr-reliability',
    title: 'ASR Reliability',
    description: 'Reliability across speech recognition models, evaluation, and production pipelines.',
    featured: true,
    order: 1,
  },
  {
    slug: 'ai-agent-architecture',
    title: 'AI Agent Architecture',
    description: 'How chatbot systems evolve through retrieval, orchestration, observability, and managed agent platforms.',
    featured: true,
    order: 2,
  },
  {
    slug: 'event-driven-reliability',
    title: 'Event-Driven Reliability',
    description: 'Reliability boundaries across CDC, event ordering, replay, fan-out, and asynchronous delivery.',
    featured: true,
    order: 3,
  },
  {
    slug: 'asr',
    title: 'ASR',
    description: 'Automatic speech recognition models and systems.',
    featured: false,
    order: 10,
  },
  {
    slug: 'whisper',
    title: 'Whisper',
    description: 'Whisper-family speech recognition models and behavior.',
    featured: false,
    order: 20,
  },
  {
    slug: 'reliability',
    title: 'Reliability',
    description: 'Engineering practices for dependable production systems.',
    featured: false,
    order: 30,
  },
  {
    slug: 'hallucination',
    title: 'Hallucination',
    description: 'Confident but unsupported output produced by AI models.',
    featured: false,
    order: 40,
  },
  {
    slug: 'vad',
    title: 'VAD',
    description: 'Voice activity detection and speech segmentation.',
    featured: false,
    order: 50,
  },
  {
    slug: 'evaluation',
    title: 'Evaluation',
    description: 'Methods and metrics for assessing system behavior.',
    featured: false,
    order: 60,
  },
  {
    slug: 'system-design',
    title: 'System Design',
    description: 'Architecture and tradeoffs across complete systems.',
    featured: false,
    order: 70,
  },
  {
    slug: 'engineering-judgment',
    title: 'Engineering Judgment',
    description: 'Reusable reasoning for making engineering decisions.',
    featured: false,
    order: 80,
  },
  {
    slug: 'ai-systems',
    title: 'AI Systems',
    description: 'Production systems built around AI models and workflows.',
    featured: false,
    order: 90,
  },
  {
    slug: 'side-project',
    title: 'Side Project',
    description: 'Independent product experiments derived from learning.',
    featured: false,
    order: 100,
  },
  {
    slug: 'metrics',
    title: 'Metrics',
    description: 'Measurements used to understand quality and outcomes.',
    featured: false,
    order: 110,
  },
] as const satisfies readonly TopicMetadata[];

export type TopicSlug = (typeof TOPICS)[number]['slug'];

export const FEATURED_TOPICS = TOPICS
  .filter((topic) => topic.featured)
  .sort((a, b) => a.order - b.order);

export function topicBySlug(slug: string) {
  return TOPICS.find((topic) => topic.slug === slug);
}
