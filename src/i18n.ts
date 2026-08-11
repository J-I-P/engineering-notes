import type { TopicMetadata } from './data/topics';

export const LOCALES = ['en', 'zh-tw'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

const zhTopics: Record<string, Pick<TopicMetadata, 'title' | 'description'>> = {
  'asr-reliability': { title: 'ASR 可靠性', description: '語音辨識模型、評估方法與 production pipeline 的可靠性。' },
  'ai-agent-architecture': { title: 'AI Agent 架構', description: 'Chatbot 系統如何透過檢索、orchestration、可觀測性與受管理 Agent 平台持續演進。' },
  'event-driven-reliability': { title: '事件驅動可靠性', description: 'CDC、事件順序、重播、fan-out 與非同步傳遞之間的可靠性邊界。' },
  asr: { title: 'ASR', description: '自動語音辨識模型與系統。' },
  whisper: { title: 'Whisper', description: 'Whisper 系列語音辨識模型及其行為。' },
  reliability: { title: '可靠性', description: '打造可靠 production system 的工程實務。' },
  hallucination: { title: '幻覺', description: 'AI 模型產生看似肯定、實際缺乏依據的輸出。' },
  vad: { title: 'VAD', description: '語音活動偵測與 speech segmentation。' },
  evaluation: { title: '評估', description: '用來理解系統行為的方法與指標。' },
  'system-design': { title: '系統設計', description: '完整系統中的架構與取捨。' },
  'engineering-judgment': { title: '工程判斷', description: '可重複運用於工程決策的 reasoning。' },
  'ai-systems': { title: 'AI 系統', description: '以 AI 模型與 workflow 為核心的 production system。' },
  'side-project': { title: 'Side Project', description: '從學習延伸出的獨立產品實驗。' },
  metrics: { title: '指標', description: '用來理解品質與結果的量測方式。' },
};

export function localizeTopic<T extends TopicMetadata>(topic: T, locale: Locale): T {
  if (locale === 'en') return topic;
  return { ...topic, ...zhTopics[topic.slug] };
}

export const messages = {
  en: {
    htmlLang: 'en', languageName: '中文', home: 'Home', explore: 'Explore', knowledge: 'Knowledge', openQuestions: 'Open Questions', menu: 'Menu', skip: 'Skip to content',
    typeLabels: { case: 'Engineering Case', project: 'Project', research: 'Research', experiment: 'Experiment', learning: 'Learning', takeaway: 'Takeaway', question: 'Open Question' },
    statusLabels: { seed: 'Seed', exploring: 'Exploring', experimenting: 'Experimenting', completed: 'Completed', learned: 'Learned', applied: 'Applied', verified: 'Verified' },
    relationLabels: { derived_from: 'Derived from', investigates: 'Investigates', tested_by: 'Tested by', validates: 'Validates', contradicts: 'Contradicts', applies_to: 'Applies to', inspires: 'Inspired', supersedes: 'Supersedes', related_to: 'Related to' },
    evidenceLabels: { official_docs: 'Official docs', source_code: 'Source code', local_experiment: 'Local experiment', production_observation: 'Production observation', external_reference: 'External reference' },
    disclosureLabels: { public: 'public', anonymized: 'anonymized', private_source: 'private source' },
    homePage: {
      eyebrow: 'Engineering knowledge system', title1: 'Build things.', title2: 'Trace what you learn.', intro: 'Not a stream of isolated posts. A public map of engineering cases, research, experiments, and the reasoning that changes how I build software.', exploreGraph: 'Explore the graph →', readNodes: 'Read knowledge nodes', currently: 'Currently exploring', activeAreas: 'Active knowledge areas', recently: 'Recently formed', knowledgeNotPosts: 'Knowledge, not just posts', viewGraph: 'View graph →', origins: 'Real-world origins', cases: 'Engineering cases', uncertainty: 'Not pretending to know', questions: 'Open questions', node: 'node', nodes: 'nodes',
    },
    archive: { title: 'Knowledge — J-I-P', description: 'Browse every public engineering knowledge node by type and topic.', eyebrow: 'Knowledge archive', heading: 'Every node, still connected.', intro: 'Browse the complete public knowledge collection. Filter by what a node represents or by the engineering topic it contributes to.', filterLabel: 'Filter knowledge nodes', type: 'Type', topic: 'Topic', allTypes: 'All types', allTopics: 'All topics', empty: 'No knowledge nodes match these filters.', node: 'node', nodes: 'nodes' },
    explorePage: { title: 'Explore — J-I-P', description: 'Explore engineering knowledge by type, topic, and semantic relationship.', eyebrow: 'Explore', heading: 'Engineering knowledge graph', intro: 'Semantic relationships are explicit; topic proximity can be explored without changing the underlying knowledge graph.', filterLabel: 'Filter by topic', allTopics: 'All topics', connections: 'connections', edges: 'Semantic edges', relationships: 'Reasoning relationships', empty: 'No internal relationships are available for this view yet.' },
    article: { path: 'Knowledge path', formed: 'How this knowledge branch developed', node: 'node', nodes: 'nodes', connectedGraph: 'Connected knowledge', graphPosition: 'How this node fits the graph', incoming: 'Points to this node', outgoing: 'This node points to', currentNode: 'Current node', connections: 'connections', evidence: 'Evidence', confidence: 'Confidence anchors', sameTopic: 'Same topic', moreIn: 'More in', viewTopic: 'View topic →', realWorld: 'Real-world case' },
  },
  'zh-tw': {
    htmlLang: 'zh-TW', languageName: 'English', home: '首頁', explore: '探索', knowledge: '知識', openQuestions: '開放問題', menu: '選單', skip: '跳至主要內容',
    typeLabels: { case: '工程案例', project: '專案', research: '研究', experiment: '實驗', learning: '學習', takeaway: '工程啟示', question: '開放問題' },
    statusLabels: { seed: '種子', exploring: '探索中', experimenting: '實驗中', completed: '已完成', learned: '已學習', applied: '已應用', verified: '已驗證' },
    relationLabels: { derived_from: '衍生自', investigates: '探究', tested_by: '由此測試', validates: '驗證', contradicts: '反駁', applies_to: '應用於', inspires: '啟發', supersedes: '取代', related_to: '相關於' },
    evidenceLabels: { official_docs: '官方文件', source_code: '原始碼', local_experiment: '本地實驗', production_observation: 'Production 環境觀察', external_reference: '外部參考資料' },
    disclosureLabels: { public: '公開', anonymized: '已匿名化', private_source: '私人來源' },
    homePage: {
      eyebrow: '工程知識系統', title1: '動手建造。', title2: '追蹤你學到的事。', intro: '這裡不是一連串彼此孤立的文章，而是一張公開地圖，記錄工程案例、研究、實驗，以及改變我如何打造軟體的 reasoning。', exploreGraph: '探索知識圖譜 →', readNodes: '閱讀知識節點', currently: '目前探索中', activeAreas: '活躍的知識領域', recently: '近期形成', knowledgeNotPosts: '知識，而不只是文章', viewGraph: '查看圖譜 →', origins: '真實世界的起點', cases: '工程案例', uncertainty: '不假裝已經知道', questions: '開放問題', node: '個節點', nodes: '個節點',
    },
    archive: { title: '知識 — J-I-P', description: '依類型與主題瀏覽所有公開的工程知識節點。', eyebrow: '知識庫', heading: '每個節點，依然相互連結。', intro: '瀏覽完整的公開知識集合，依節點代表的內容或其貢獻的工程主題進行篩選。', filterLabel: '篩選知識節點', type: '類型', topic: '主題', allTypes: '所有類型', allTopics: '所有主題', empty: '沒有符合篩選條件的知識節點。', node: '個節點', nodes: '個節點' },
    explorePage: { title: '探索 — J-I-P', description: '依類型、主題與語意關係探索工程知識。', eyebrow: '探索', heading: '工程知識圖譜', intro: '語意關係被明確記錄；你可以探索主題上的接近程度，而不改變底層知識圖。', filterLabel: '依主題篩選', allTopics: '所有主題', connections: '個連結', edges: '語意邊', relationships: '推理關係', empty: '這個視圖目前沒有內部關係。' },
    article: { path: '知識路徑', formed: '這條知識分支如何發展', node: '個節點', nodes: '個節點', connectedGraph: '相連的知識', graphPosition: '這個節點在知識圖中的位置', incoming: '關係指向此節點', outgoing: '此節點指向', currentNode: '目前節點', connections: '個連結', evidence: '證據', confidence: '信心依據', sameTopic: '相同主題', moreIn: '更多內容：', viewTopic: '查看主題 →', realWorld: '真實世界案例' },
  },
} as const;

export function t(locale: Locale) {
  return messages[locale];
}
