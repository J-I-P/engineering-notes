---
nodeId: measuring-asr-hallucination
locale: zh-tw
title: "該如何衡量 ASR Hallucination？"
description: "定性 VAD 實驗留下的測量缺口：該如何量化缺乏依據的轉錄減少了多少？"
type: question
status: seed
publishedAt: 2026-08-10
topics: [asr-reliability, evaluation, hallucination, metrics]
parent:
  target: vad-hallucination-evaluation
  relation: derived_from
evidence: []
relations: []
---

## 開放問題

在 [[vad-hallucination-evaluation]] 中，我觀察到加入 VAD 後，由靜音誘發且缺乏依據的轉錄變得較不明顯，改善程度也足以讓這項調整被保留。但當時並未記錄正式的定量 benchmark。

這留下了一個具體的測量缺口：實務改善是透過人工前後比較觀察得出，但效果大小、取捨與普遍性仍然未知。

Word error rate 適合用來比較轉錄結果與 reference，但它可能無法完整描述靜音或非語音區間中觀察到的可靠性問題。

我真正想衡量的失敗是：

> **系統產生的文字，有多常缺乏輸入中有意義語音的支持？**

可能的方向包括：

- false-positive transcription duration；
- unsupported token rate；
- segment-level hallucination incidence；
- 每分鐘非語音音訊所產生的 hallucinated output；
- 特定領域的 reliability rubric。

## 為什麼這仍是開放問題

目前沒有足夠證據判斷哪項 metric 最實用，原始實驗也沒有記錄能用來回溯量化改善幅度的資料。

理想的 metric 應該具備：

- 可重現性；
- 可解釋性；
- 能在不同轉錄執行結果之間比較；
- 對缺乏依據的文字足夠敏感；
- 不需依賴逐筆人工檢查所有結果。

在評估方法尚未以真實案例測試前，這仍是一個開放問題。
