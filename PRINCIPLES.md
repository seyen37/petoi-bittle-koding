---
title: DogLab Coding — 共通性原則（PRINCIPLES）
purpose: 承接策略層（專案整體規劃建議書 §12）之下的戰術級原則、給 coding / repo 結構 / 交付紀律用
related:
  - ./DECISIONS.md（架構決策 ADR、單點決策）
  - ./WORKLOG.md（round 執行紀錄）
  - ./專案整體規劃建議書.md（策略層、12 個月方向）
---

# DogLab Coding — 共通性原則（PRINCIPLES）

> **文件層級**：戰略層（規劃建議書 §12）→ **戰術層（本檔）** → 決策層（DECISIONS）→ 執行層（WORKLOG）
>
> 本檔記錄從 27 rounds 累積出來的共通性原則、focus **coding style + repo 結構 + 交付紀律**。新版本 / 新機器人 / 新 contributor 加入時、先看本檔再動手。

---

## §1 三層文件分工

專案級文件分三層：

| 層 | 檔案 | 用途 | 修改頻率 |
|---|---|---|---|
| **戰略層** | `專案整體規劃建議書.md` | 12 個月方向 / 三方向策略 / roadmap / 執行原則 | 每 6 個月 / 大版本升級 |
| **戰術層** | `PRINCIPLES.md`（本檔）| coding / repo 結構 / 交付紀律 | 累積成熟後 append |
| **決策層** | `DECISIONS.md` | 單點架構決策 ADR、Michael Nygard 格式、immutable | 每架構決策 append |
| **執行層** | `WORKLOG.md` | 每 round 執行紀錄、倒序 | 每 round append |

**為什麼分四層而非合一**：分工清楚、cross-ref 引用不重疊、review 週期不同、fork 者按需求讀對應層。

**對位 ADR**：ADR-014（策略層文件體系）+ ADR-001（本 repo 結構起源）。

---

## §2 ADR 紀律

### §2.1 ADR 不可變（immutable）

每個 ADR 是**不可變的**、如要改變決定就寫新 ADR 並標註「Supersedes ADR-XXX」（依 DECISIONS.md 開頭紀律）。

**已有案例**：ADR-013 supersedes ADR-003 部分（移除 2D SVG、保留 3D）。

### §2.2 新 ADR 編號往後加

ADR-001 → ADR-014（本 round 加）→ ADR-015 起未來加。**編號不重排、不跳號**。

### §2.3 ADR 格式（Michael Nygard 標準）

- Status（Accepted / Superseded / Proposed）
- Context
- Options（優缺表格）
- Decision
- Rationale
- Consequences
- （可選）Supersedes / Implementation / 對位章節

### §2.4 何時寫新 ADR

依 DECISIONS.md 「未來新增 ADR 的時機」：
- 引入新依賴（如 Three.js、Blockly v10）
- 改變現有架構（如 v0.5 引入 React 元件化）
- 新增主要機器人（如 v0.7 Padog、v0.8 microbit）
- 改變部署方式（如 GitHub Pages → Cloudflare Pages）
- 改變授權（如 MIT → GPL）

---

## §3 Coding Style

### §3.1 純 Vanilla JS + 零 build（依 ADR-002）

- 不引入 npm / webpack / vite（除非新 ADR supersede ADR-002）
- 直接 script tag 載入、依賴透過 CDN（unpkg.com）
- 檔案結構：`js/<module-name>.js`、每個模組獨立檔

### §3.2 全域 namespace = `DogLabApp`（依 ADR-011）

- 所有全域物件掛 `window.DogLabApp.*`
- 子模組：`DogLabApp.runtime`, `DogLabApp.events`, `DogLabApp.simulator3D`, `DogLabApp.BITTLE_SKILLS`
- 檔內用 IIFE 保護、不污染全域

### §3.3 Metadata-driven 優先（依 ADR-008）

- 新增大量同型物件（如 51 個 skill）先寫 metadata array
- 用 loop 自動 register Blockly.Blocks / Generator / Toolbox / Animation
- SSOT（Single Source of Truth）= `bittle-skills-data.js`

### §3.4 中文 zh-hant 為主

- UI 文字、log 訊息、tooltip 用繁體中文
- 台灣詞彙優先（如「積木」而非「模組」）
- 未來多語系（v0.9+）用 Blockly i18n

### §3.5 命名慣例

| 類型 | 慣例 | 範例 |
|---|---|---|
| 檔名 | `kebab-case.js` / `.md` | `bittle-skills-data.js` / `專案整體規劃建議書.md` |
| 全域物件 | `PascalCase` | `DogLabApp`, `BITTLE_SKILLS` |
| 函式 | `camelCase` | `executeSkill`, `setLeg` |
| 常數 | `UPPER_SNAKE_CASE` | `BITTLE_SKILLS`（含 metadata）|
| Blockly block ID | `snake_case` prefix `bittle_` | `bittle_walk_forward` |

---

## §4 Repo 結構

### §4.1 根層級（strategic visibility）

必放 repo 根：
- `README.md`（fork 者第 1 眼）
- `LICENSE`（MIT）
- `.gitignore`
- **`專案整體規劃建議書.md`**（策略層文件、依 ADR-014）
- `PRINCIPLES.md`（本檔）
- `DECISIONS.md`（ADR 索引）
- `WORKLOG.md`（round 紀錄）
- `SESSION_SUMMARY.md`（session-level 總結）

### §4.2 docs/ 層級

技術細節、給接手者 deep-dive：
- `docs/architecture.md`（系統架構規格書）
- `docs/multi-robot-architecture.md`（IRobot 介面規範）
- `docs/roadmap.md`（版本 roadmap）
- `docs/examples.md`（教學範例）
- `docs/github-deploy-guide.md`（部署 SOP）
- `docs/dual-github-setup.md`（雙備份 SOP）

### §4.3 js/ 層級

- `js/main.js`（整合入口、UI 綁定）
- `js/blockly-config.js`（Toolbox XML + Blockly 設定）
- `js/bittle-blocks.js`（積木定義）
- `js/bittle-generators.js`（積木 → code 生成器）
- `js/bittle-skills-data.js`（metadata SSOT）
- `js/simulator-3d.js`（Three.js 3D 模擬）
- `js/simulator-svg.js`（保留檔案、未載入、依 ADR-013）
- `js/serial.js`（Web Serial API 包裝）
- `js/robots/IRobot.js`（介面規範）
- 未來：`js/robots/padog/`（v0.7）、`js/robots/microbit/`（v0.8）等

### §4.4 css/ 層級

- `css/style.css`（單檔、手寫 CSS + Variables + Flexbox）

---

## §5 交付紀律

### §5.1 每 round 收工三件事

1. **commit 變動的檔** — 使用 conventional commit prefix（`feat` / `fix` / `docs` / `refactor` / `chore`）
2. **WORKLOG.md append Round N entry** — 含目標 / 變更 / commit message / 下一步 / 學到的經驗
3. **push 雙 remote** — `git pa` alias（依 ADR-002）origin seyen37 + backup seyenbot 各推一次

### §5.2 里程碑收工加

1. **release tag** — `git tag v0.x.y`
2. **README 版本號更新** — `Status: **vX.Y.Z**`
3. **WORKLOG 里程碑條目加 ⭐ 標記**
4. **建議書 Roadmap 打勾** — Phase X Week Y ✅（若對應 phase 達成）
5. **push tag + main** — `git push origin --tags` + `git pa`

### §5.3 架構決策收工加

1. **DECISIONS.md append 新 ADR** — 依 §2.3 格式
2. **建議書 §附錄 A 對應項打勾** — 若是 ADR-015~021 之一
3. **WORKLOG 加 ADR 引用** — 「詳見 ADR-XXX」

### §5.4 三文件同步紀律（依 R37 觸發、依 personal-playbook R35 反面案例學到）

當累積：
- 5+ commits 未寫 §A 條目（協作電腦類 round）→ 補寫
- 大版本升級 → review 建議書 §12.5
- 每 3 個 round 對齊一次三文件（WORKLOG / DECISIONS 若動 / 建議書若動）

**反面案例（personal-playbook 5/24）**：協作電腦跨 3 天 12 commits 全跳過 §A entry sync = 5/25 R35 補錄 11 條、多 ~30 分鐘成本。

---

## §6 品牌與授權

### §6.1 品牌統一 = DogLab Coding（依 ADR-010）

- 產品名 = **DogLab Coding**（中文：動感小狗 編程實驗室）
- Repo 名 = **quadruped-koding**（seyen37 主 / seyenbot 備份）
- Emoji 標識 = 🐕‍🦺
- **Bittle / Petoi** 只在「支援硬體描述」場合使用、加免責聲明「本工具與 Petoi Camp 無附屬關係」

### §6.2 授權 = MIT + 真名（依 ADR-007）

- LICENSE 檔用真實姓名「許士彥 (Hsu Shih-Yen)」
- 保留 GitHub 連結作為 anchor
- 任何人 fork 都要保留 LICENSE + copyright notice
- 商用 OK / 衍生可閉源 / 但要保留版權宣告

### §6.3 雙備份 = seyen37 主 + seyenbot 備份（依 ADR-002）

- seyen37/quadruped-koding = **Public**（主 repo、GitHub Pages 來源）
- seyenbot/quadruped-koding = **Private**（backup remote、災難恢復）
- 每 commit `git pa` alias 推兩邊

---

## §7 教學設計原則（呼應建議書 §12.3）

### §7.1 零門檻優先

- **不裝軟體**：任何學習步驟不能要求裝任何軟體、只要 Chrome 就能開始
- **不需帳號**：使用不需註冊、學生不用管密碼
- **可離線**：模擬模式優先、實機模式為 optional

### §7.2 中文為主

- UI 預設 zh-hant
- 錯誤訊息、hint 用繁體中文
- 未來多語系（v0.9+）用 Blockly i18n

### §7.3 循序漸進

- 學習曲線：Blockly（拖曳）→ 觀看 3D 動畫 → 連實機 → 讀生成 code → 寫自訂積木
- Roadmap 各 Phase 對應學習程度：
  - Phase 1 = 新手（v0.6 IR 遙控 + examples）
  - Phase 2 = 中階（v0.7 Padog + 3 款教學卡）
  - Phase 3 = 進階（v0.9 AI 擴充 + v1.0 教學生態）

### §7.4 教學卡設計原則（v1.0 目標、Phase 2 起）

- 每張卡 3-10 步驟
- 每步驟含目標 / 積木清單 / 期望結果 / 驗證 hint
- 難度分級：⭐ 新手 / ⭐⭐ 中階 / ⭐⭐⭐ 進階

---

## §8 修訂觸發原則

### §8.1 本檔（PRINCIPLES.md）何時修訂

- 累積 3+ 個 supporting case 揭露新原則
- 新機器人加入時（v0.7 Padog / v0.8 microbit）發現介面盲區
- 大版本升級（v0.6 → v0.7 → v0.8 → v1.0）
- 每 6 個月強制 review 一次

### §8.2 修訂 SOP

1. 找對應 §（如 coding style 加 §3.6、新規則 §9.x）
2. 加 supporting case 註記（哪個 round 累積出來）
3. append、不改既有原則本體（依 §2.1 ADR-like immutability）
4. commit + push（依 §5）

---

## §9 交叉引用

| 引用 | 用途 |
|---|---|
| `專案整體規劃建議書.md` §12 執行原則 | 戰略級原則（架構決策 / 開發流程 / 教學設計 / 品牌授權 / 修訂觸發 5 類） |
| `DECISIONS.md` ADR-001~014 | 單點架構決策 |
| `WORKLOG.md` Round 0-27 | 執行歷史 |
| `docs/architecture.md` | 技術細節 |
| `docs/multi-robot-architecture.md` | IRobot 介面規範 |
| `../Petoi_程式研究筆記.md` | Bittle 硬體 / 韌體真相來源 |
| `../../personal-playbook/PROJECT_PLAYBOOK.md` | 通用工作紀律（跨專案）|

---

## §10 修訂歷史

| 日期 | 版本 | 修訂內容 |
|---|---|---|
| 2026-05-25 | v1.0 | 初版建立（Round 27 R37 收工三文件第六輪）從 27 rounds + 14 ADR + 建議書 §12 蒸餾 |

---

*本檔 v1.0 完成於 2026-05-25。依 §8.1 修訂觸發原則定期 review。*
