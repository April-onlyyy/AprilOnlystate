# LIN / 3D Artist Portfolio

这是一个可直接部署的单页 3D 作品集网站，当前使用程序化占位视觉，方便先验证布局与交互。

## 替换为你的内容

1. 打开 `index.html`，修改姓名、介绍、邮箱、项目名称与说明。
2. 打开 `script.js`，搜索 `drawGreenhouse`、`drawRoom` 和 `drawMoon`。
3. 如果已有场景渲染图或动画，建议把项目卡片中的 `<canvas class="project-canvas">` 替换为：

```html
<img src="assets/project-01.webp" alt="静默温室场景渲染">
```

动画可以替换为：

```html
<video src="assets/project-01.mp4" autoplay muted loop playsinline></video>
```

4. 将真实简历命名为 `resume.pdf` 放入 `assets` 文件夹，并把下载按钮改为：

```html
<a class="resume-link" href="assets/resume.pdf" download>下载简历 ↓</a>
```

## 本地预览

在项目目录运行：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 免费发布

可以将这个文件夹上传到 GitHub 仓库，再通过 GitHub Pages、Netlify 或 Vercel 发布。
