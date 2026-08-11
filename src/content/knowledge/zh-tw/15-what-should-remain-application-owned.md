---
nodeId: what-should-remain-application-owned
title: "在受管理的 Agent 系統中，哪些責任應保留在應用程式端？"
description: "一個尚未解答的問題：模型驅動的 orchestration 與具確定性的應用程式行為之間，邊界應該放在哪裡？"
type: question
status: seed
publishedAt: 2026-08-10
topics: [ai-systems, system-design, engineering-judgment]
parent:
    target: managed-agent-system-boundary
    relation: derived_from
evidence: []
relations: []
locale: zh-tw
---

## 開放問題

將 orchestration 移入受管理的 Agent 平台，會產生一個實用但困難的邊界問題：

> **哪些責任應該由 Agent 負責，哪些又應該保留為具確定性的應用程式程式碼？**

有些責任顯然更適合由應用程式負責：

* 授權；
* 資料驗證；
* 安全邊界；
* 不可逆的操作；
* 嚴格的商業規則。

其他責任則沒那麼明確：

* 知識來源選擇；
* 重試；
* 對話狀態；
* 工具執行順序；
* fallback 行為；
* 輸出驗證；
* 決定何時需要向使用者釐清。

針對每一項責任，可能需要考量數個特性：

```text
它需要多高程度的確定性？
它需要多容易被解釋？
如果模型做出錯誤選擇，會發生什麼事？
這個行為可以被重播嗎？
它是否跨越安全邊界？
失敗造成的結果可以回復嗎？
```

## 為什麼這仍是開放問題

每一種 Agent 系統的邊界可能不會完全相同。

低風險的內部助理，與能夠改變應用程式狀態的系統，不一定應該賦予 Agent 相同的權限。

隨著 Agent 平台提供更完整的工作流程、policy、evaluation 與可觀測性能力，這條邊界也可能改變。

目前，我想讓這個問題持續保持可見：

> **哪些決策可以受益於模型的彈性，哪些決策又重要到不該變成機率性的選擇？**

未來的 Agent 架構決策應該由這個問題引導，而不是假設讓 Agent 擁有更多責任一定比較好。
