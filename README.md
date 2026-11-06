# 今晚，来家里吃饭

川粤融合好友私宴。手机打开封面，点一下开席，按顺序浏览 14 道菜。支持左右轻滑、上一道和下一道、顶部分类以及完整菜单目录。

GitHub Pages 发布完成后，网页地址可在仓库的 **Settings → Pages** 查看。

## 本地预览

解压源码后，在 `index.html` 所在目录运行 `python3 -m http.server 8080`，再用浏览器打开 `http://localhost:8080/`。

## 发布到 GitHub Pages

将与 `index.html` 同级的网页文件和 `assets` 目录上传到 GitHub 仓库根目录。在仓库的 **Settings → Pages** 中选择 **Deploy from a branch**，分支选 `main`，目录选 **/(root)**。发布后可从同一页面复制 GitHub Pages 网址。如需分享预览指向新站点，把 `index.html` 中的 `og:url` 和 `og:image` 更新为新的部署地址。

## 菜图维护

`assets/food/01.webp` 到 `14.webp` 与菜单序号一一对应。第 6 至 14 道按实拍参考重新制图，发布图片为 1448 × 1086。各图的底图、参考与署名记录见 [配图来源](assets/food/IMAGE-SOURCES.md)。菜单顺序和介绍在 `app.js` 的 `dishes` 数组中，封面图是 `assets/cover.webp`。实际摆盘以当晚出品为准。
