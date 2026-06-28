# Fann Wu · 吳皇耀 — Portfolio Portal

一個入口網頁，整合個人履歷與 7 個線上 GitHub Pages 作品。設計風格參考
[david-hckh.com](https://david-hckh.com/)：暖色奶油／米色調、Urbanist + 像素字標籤、
橘色點綴、六角形徽章、像素人物載入轉場，以及圖片優先的作品卡片。

## 檔案

| 檔案 | 說明 |
| --- | --- |
| `index.html` | 頁面結構（轉場 / hero / 作品 / 關於 / 經歷 / 聯絡） |
| `styles.css` | 設計系統與所有樣式 |
| `main.js` | 載入轉場、scroll-reveal、header 狀態、行動版選單 |
| `assets/hero-scene.svg` | 首頁主視覺：插畫「開發者在書桌前」（可編輯色塊） |
| `assets/avatar.svg` | 像素風人物（載入轉場用，含揮手動畫） |
| `assets/profile.jpg` | 你的大頭照（**需自行放入**，見下方） |
| `assets/shots/*.png` | 7 個作品的預覽截圖（卡片縮圖） |

純靜態、無建置步驟、無相依套件（字型走 Google Fonts CDN）。

## ⚠️ 請放入你的大頭照

首頁主視覺改用插畫人物（呼應參考站的 3D 角色）；你的**真人大頭照**改放在
「Profile & Stack（關於我）」區塊的個人卡片，目前顯示 `FW` 六角形作為 fallback。
把照片存成 **`assets/profile.jpg`**（建議直式、臉部置中，約 800×900 以上）即可自動套用，
會被裁切成六角形並加上橘色外框。臉的位置可在 `styles.css` 的
`.portrait__img { object-position: center 18%; }` 微調。

> 想把大頭照放回首頁主視覺（取代插畫）也可以，跟我說即可。

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
git add index.html styles.css main.js README.md assets
git commit -m "feat: portfolio portal landing page"
git push
```

或建一個獨立 repo（例如 `portfolio`）後，到 repo Settings → Pages →
Source 選 `main` 分支根目錄，網址會是 `https://fanntone.github.io/portfolio/`。

## 自訂

- **七個作品連結**：在 `index.html` 的 `#work` 區塊，每張 `.card` 的 `href`、
  `--brand`（品牌色）、預覽圖 `assets/shots/*.png` 可自行調整。
- **更新作品截圖**：用無頭瀏覽器重拍即可，例如
  `chrome --headless=new --screenshot=assets/shots/dice.png --window-size=1000,625 <url>`。
- **載入轉場人物**：`assets/avatar.svg` 是像素風 SVG，可直接改色塊；
  揮手動畫與時間在 `main.js`（`reveal` 的延遲）與 `styles.css`（`.preloader*`）。
- **社群分享縮圖（選用）**：放一張 `assets/og-image.png`（建議 1200×630），
  並在 `<head>` 加 `<meta property="og:image" content="assets/og-image.png" />`。
- **配色**：所有顏色集中在 `styles.css` 最上方的 `:root` 變數。
