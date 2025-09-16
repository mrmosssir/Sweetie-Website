# Tailwind CSS 使用指南

## 安裝完成！

Tailwind CSS 已成功安裝並與 Bootstrap 並存。

## 配置說明

### 1. Prefix 配置
- 所有 Tailwind 類都需要加上 `tw-` 前綴
- 例如：`tw-bg-blue-500`、`tw-text-white`、`tw-p-4`

### 2. 避免衝突設定
- `preflight: false` - 禁用 Tailwind 的基礎樣式重置
- `prefix: 'tw-'` - 添加前綴避免與 Bootstrap 類名衝突

## 使用範例

### Bootstrap (無前綴)
```html
<div class="btn btn-primary">Bootstrap 按鈕</div>
<div class="container">Bootstrap 容器</div>
```

### Tailwind CSS (tw- 前綴)
```html
<div class="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded">Tailwind 按鈕</div>
<div class="tw-max-w-7xl tw-mx-auto">Tailwind 容器</div>
```

## 文件位置

- 配置文件: `tailwind.config.js`
- PostCSS 配置: `postcss.config.js`
- Tailwind 樣式: `src/styles/tailwind.css`

## 逐步遷移建議

1. **階段一**: 新功能使用 Tailwind CSS (tw- 前綴)
2. **階段二**: 逐步將現有組件的 Bootstrap 類替換為 Tailwind
3. **階段三**: 移除 Bootstrap 依賴

## 開發工具

建議安裝 VS Code 擴展：
- Tailwind CSS IntelliSense
- PostCSS Language Support
