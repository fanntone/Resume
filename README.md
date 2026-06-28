# Fann Wu · 吳皇耀 — Portfolio Portal

一個入口網頁，整合個人履歷與 7 個線上 GitHub Pages 作品。設計風格參考
[david-hckh.com](https://david-hckh.com/)：暖色奶油／米色調、Urbanist + 像素字標籤、
橘色點綴、六角形字母徽章與卡片翻轉互動。

## 檔案

| 檔案 | 說明 |
| --- | --- |
| `index.html` | 頁面結構（preloader / hero / 作品 / 關於 / 經歷 / 聯絡） |
| `styles.css` | 設計系統與所有樣式 |
| `main.js` | preloader、scroll-reveal、header 狀態、行動版選單 |

純靜態、無建置步驟、無相依套件（字型走 Google Fonts CDN）。

## 本機預覽

```bash
# 任一方式皆可
python -m http.server 8080      # 然後開 http://localhost:8080
# 或直接用瀏覽器開啟 index.html
```

## 部署到 GitHub Pages

最推薦放在 **user page**，網址最乾淨（`https://fanntone.github.io/`）：

```bash
# 在 fanntone/fanntone.github.io repo 根目錄
git add index.html styles.css main.js README.md
git commit -m "feat: portfolio portal landing page"
git push
```

或建一個獨立 repo（例如 `portfolio`）後，到 repo Settings → Pages →
Source 選 `main` 分支根目錄，網址會是 `https://fanntone.github.io/portfolio/`。

## 自訂

- **七個作品連結**：在 `index.html` 的 `#work` 區塊，每張 `.card` 的 `href` 與
  `--brand` 顏色可自行調整。
- **真人大頭照（選用）**：目前用六角形 `FW` 徽章。若要改成照片，
  把圖片放進 `assets/profile.jpg`，再把 hero 的 `.hero__badge` SVG 換成
  `<img src="assets/profile.jpg" />` 並加上圓形/六角形裁切即可。
- **社群分享縮圖（選用）**：放一張 `assets/og-image.png`（建議 1200×630），
  並在 `<head>` 加 `<meta property="og:image" content="assets/og-image.png" />`。
- **配色**：所有顏色集中在 `styles.css` 最上方的 `:root` 變數。
