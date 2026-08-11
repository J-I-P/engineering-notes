---
nodeId: architecture-complexity-follows-workflow-complexity
title: "架構複雜度應該跟隨工作流程複雜度"
description: "檢索、orchestration、可觀測性與 Agent 抽象層，應該在工作流程產生具體需求時才被導入，而不是作為架構成熟度的象徵。"
type: takeaway
status: verified
publishedAt: 2026-08-10
topics: [engineering-judgment, system-design, ai-systems]
parent:
    target: chatbot-architecture-evolution
    relation: derived_from
evidence: [production_observation]
relations: []
locale: zh-tw
---

## 核心結論

AI 系統的演進看起來可能像是一道成熟度階梯：

```text
直接呼叫 LLM
    ↓
框架
    ↓
檢索
    ↓
圖狀 Orchestration
    ↓
Tracing
    ↓
受管理的 Agent
```

我不再認為這是最有用的解讀方式。

每一層處理的其實是不同類型的問題：

```text
需要外部知識
        → 檢索

需要明確的路由或狀態
        → Orchestration

需要理解隱藏的執行過程
        → 可觀測性

需要由平台管理模型與工具的協調
        → Agent 平台
```

後期的架構不一定就是正確的起始架構。

每個抽象層都會增加能力，但也會帶來額外的失敗模式、維運概念與除錯需求。

可以重複使用的問題是：

> **目前存在什麼需求，是較簡單的架構已無法乾淨滿足的？**

如果沒有具體答案，那麼新增的抽象層可能言之過早。

## 可重複使用的原則

> **架構複雜度應該跟隨工作流程複雜度，而不是走在它前面。**

目標不是讓系統永遠保持簡單。

而是讓每一次複雜度的增加，都能證明自己有存在的必要。
