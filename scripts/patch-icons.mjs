import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../frontend/app.js");
let c = readFileSync(file, "utf8");

function rep(a, b) { c = c.split(a).join(b); }

// ─── 1. render() 末尾加 lucide.createIcons() ────────────────────
rep(
  "  render_workspace(user, route);\n}",
  "  render_workspace(user, route);\n  // 每次渲染后初始化 Lucide 图标\n  if (typeof lucide !== 'undefined') lucide.createIcons();\n}"
);

// ─── 2. 登录页 render_login 末尾也调用 ──────────────────────────
rep(
  "  set_current_user(user);\n    set_route(\"home\");\n  });\n}",
  "  set_current_user(user);\n    set_route(\"home\");\n  });\n  if (typeof lucide !== 'undefined') lucide.createIcons();\n}"
);

// ─── 3. 导航按钮加图标（nav_items 定义） ────────────────────────
const NAV_ICONS = {
  "home":       "house",
  "project":    "folder-open",
  "dashboard":  "layout-dashboard",
  "navigation": "map",
  "acceptance": "check-circle",
  "showcase":   "monitor",
  "tasks":      "list-checks",
  "settings":   "settings",
  "help":       "circle-help",
};
// 给 render_nav_button 中的 label span 前插入图标
rep(
  "        <span>${escape_html(item.label)}</span>\n        <span>›</span>",
  "        <span style=\"display:flex;align-items:center;gap:7px\"><i data-lucide=\"${item.icon||'circle'}\" style=\"width:15px;height:15px;flex-shrink:0\"></i>${escape_html(item.label)}</span>\n        <span>›</span>"
);
// 在 nav_items 数组里加 icon 字段
for (const [key, icon] of Object.entries(NAV_ICONS)) {
  rep(
    `{ key: "${key}",`,
    `{ key: "${key}", icon: "${icon}",`
  );
}

// ─── 4. 首页 — 重写为实用内容 ────────────────────────────────────
rep(
`function render_home_page(user) {
  return \`
    <div class="page">
      <div class="grid">
        <article class="card">
          <h2>欢迎页</h2>
          <p>当前用户：\${escape_html(user.name)}。你们将在同一个工程造价全过程平台上完成小组任务，不是各自做一套孤立系统。</p>
        </article>
        <article class="card">
          <h2>任务规模</h2>
          <p>平台目前预置 \${all_tasks.length} 个可认领任务，按 5 个生命周期阶段组织。你的小组只需要认领其中一个任务并做成可验收闭环。</p>
        </article>
        <article class="card">
          <h2>交付方式</h2>
          <p>每个任务都要求至少完成数据读取、新增、修改、查询以及统一索引登记，保证最后能接回同一平台。</p>
        </article>
      </div>
      <section class="card">
        <div class="section-title">
          <h2>平台骨架指标</h2>
          
        </div>
        <div class="stat-grid">
          <div class="stat-card">
            <strong>\${task_groups.length}</strong>
            <span>生命周期阶段</span>
          </div>
          <div class="stat-card">
            <strong>\${all_tasks.length}</strong>
            <span>可选项目任务</span>
          </div>
          <div class="stat-card">
            <strong>1</strong>
            <span>统一索引中心</span>
          </div>
          <div class="stat-card">
            <strong>CRUD</strong>
            <span>每组最低能力</span>
          </div>
        </div>
      </section>
      <section class="card">
        <div class="section-title">
          <h2>下一步提示</h2>
          
        </div>
        <p>领取任务后，你们只修改自己小组负责的业务范围，但所有正式记录都必须接入统一数据库和 <code>form_index</code>。</p>
      </section>
    </div>
  \`;
}`,
`function render_home_page(user) {
  return \`
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="house" style="width:20px;height:20px"></i> 欢迎，\${escape_html(user.name)}</h2>
        </div>
        <p>工程项目全过程动态造价管理信息系统 &nbsp;·&nbsp; 覆盖造价管理全生命周期 &nbsp;·&nbsp; V0.1</p>
      </section>
      <div class="stat-grid">
        <div class="stat-card">
          <strong>\${task_groups.length}</strong>
          <span>生命周期阶段</span>
        </div>
        <div class="stat-card">
          <strong>\${all_tasks.length}</strong>
          <span>功能模块</span>
        </div>
        <div class="stat-card">
          <strong>SQLite</strong>
          <span>统一数据库</span>
        </div>
        <div class="stat-card">
          <strong>REST</strong>
          <span>统一接口规范</span>
        </div>
      </div>
      <div class="grid">
        \${task_groups.map((group) => \`
          <article class="card" style="cursor:pointer" data-route="navigation">
            <h3>\${escape_html(group.stage)}</h3>
            <p style="margin-bottom:10px;color:var(--muted)">\${escape_html(group.summary)}</p>
            <span class="stage-count">\${group.tasks.length} 个模块 ›</span>
          </article>
        \`).join("")}
      </div>
    </div>
  \`;
}`
);

// ─── 5. 项目总览 — 重写为系统功能展示 ──────────────────────────
rep(
`function render_project_page() {
  return \`
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2>项目总览</h2>
          
        </div>

      </section>
      <div class="grid">
        <article class="card">
          <h3>任务组织</h3>
          <p>你的小组从任务池中认领 1 个任务，目标不是做得很大，而是把它做成"数据、规则、结果、预警、复核"完整闭环。</p>
        </article>
        <article class="card">
          <h3>统一索引</h3>
          <p>你保存的业务记录必须登记到 <code>form_index</code>，这样其他模块才能按项目、合同、状态、业务单号和任务类型检索到它。</p>
        </article>
        <article class="card">
          <h3>数据库原则</h3>
          <p>你不需要重建数据库框架，只需要在既定表结构和任务边界内补充本组需要的数据、字段和规则。</p>
        </article>
      </div>
      <section class="card">
        <div class="section-title">
          <h2>统一基础能力</h2>
          
        </div>
        <div class="feature-grid">
          <div class="feature-item">项目主数据</div>
          <div class="feature-item">组织与分组</div>
          <div class="feature-item">任务主题库</div>
          <div class="feature-item">表单统一索引</div>
          <div class="feature-item">附件挂接</div>
          <div class="feature-item">操作留痕</div>
        </div>
      </section>
    </div>
  \`;
}`,
`function render_project_page() {
  const features = [
    { icon: "folder-open",    label: "项目主数据" },
    { icon: "building-2",     label: "参建单位" },
    { icon: "file-text",      label: "合同管理" },
    { icon: "list",           label: "工程量清单" },
    { icon: "target",         label: "目标成本" },
    { icon: "trending-up",    label: "月度产值" },
    { icon: "calculator",     label: "计量支付" },
    { icon: "git-merge",      label: "变更签证" },
    { icon: "alert-triangle", label: "风险预警" },
    { icon: "bar-chart-2",    label: "竣工结算" },
    { icon: "search",         label: "统一检索" },
    { icon: "activity",       label: "操作留痕" },
  ];
  return \`
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="folder-open" style="width:20px;height:20px"></i> 项目总览</h2>
        </div>
        <p>脱敏教学示范项目 &nbsp;·&nbsp; 施工阶段 &nbsp;·&nbsp; 河北 &nbsp;·&nbsp; 总投资 1.2 亿元</p>
      </section>
      <div class="grid">
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="layers" style="width:16px;height:16px"></i> 系统架构</h3>
          <p>前后端分离 · React + Vite 前端 · Node.js + Express 后端 · SQLite 数据库</p>
        </article>
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="database" style="width:16px;height:16px"></i> 数据结构</h3>
          <p>28 张业务表 · 统一 form_index 索引 · 公共附件与操作日志</p>
        </article>
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="users" style="width:16px;height:16px"></i> 团队协作</h3>
          <p>GitHub Issues 认领任务 · 独立分支开发 · Pull Request 合并验收</p>
        </article>
      </div>
      <section class="card">
        <div class="section-title">
          <h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="grid" style="width:20px;height:20px"></i> 系统功能模块</h2>
        </div>
        <div class="feature-grid">
          \${features.map((f) => \`
            <div class="feature-item" style="display:flex;align-items:center;gap:8px">
              <i data-lucide="\${f.icon}" style="width:15px;height:15px;flex-shrink:0;color:var(--brand)"></i>
              \${escape_html(f.label)}
            </div>
          \`).join("")}
        </div>
      </section>
    </div>
  \`;
}`
);

// ─── 6. 验收标准页 — 替换为系统功能说明 ────────────────────────
rep(
  `<h2>验收标准</h2>`,
  `<h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="check-circle" style="width:20px;height:20px"></i> 验收标准</h2>`
);
rep(
  `<h2>你要证明什么</h2>`,
  `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="shield-check" style="width:16px;height:16px"></i> 你要证明什么</h3>`
);
rep(`<h3>你要证明什么</h3>`, ``);  // 避免重复（上面已换）
rep(
  `<h3>你要提交什么</h3>`,
  `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="package" style="width:16px;height:16px"></i> 你要提交什么</h3>`
);
rep(
  `<h3>做到什么程度</h3>`,
  `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="sliders" style="width:16px;height:16px"></i> 做到什么程度</h3>`
);

// ─── 7. 各页面主标题加图标 ──────────────────────────────────────
const titleIcons = {
  "全过程看板":  "layout-dashboard",
  "模块导航":    "map",
  "统一展示页":  "monitor",
  "任务中心":    "list-checks",
  "个人设置":    "settings",
  "帮助说明":    "circle-help",
};
for (const [title, icon] of Object.entries(titleIcons)) {
  rep(
    `<h2>${title}</h2>`,
    `<h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="${icon}" style="width:20px;height:20px"></i> ${title}</h2>`
  );
}

// ─── 8. 任务中心卡片标题加图标 ──────────────────────────────────
rep(`<h3>领取任务</h3>`, `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="git-pull-request" style="width:16px;height:16px"></i> 领取任务</h3>`);
rep(`<h3>完成模块</h3>`, `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="code-2" style="width:16px;height:16px"></i> 完成模块</h3>`);
rep(`<h3>通过集成</h3>`, `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="git-merge" style="width:16px;height:16px"></i> 通过集成</h3>`);

// ─── 9. 个人设置卡片标题加图标 ──────────────────────────────────
rep(`<h3>昵称</h3>`, `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="user" style="width:15px;height:15px"></i> 昵称</h3>`);
rep(`<h3>登录时间</h3>`, `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="clock" style="width:15px;height:15px"></i> 登录时间</h3>`);
rep(`<h3>权限</h3>`, `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="shield" style="width:15px;height:15px"></i> 权限</h3>`);

// ─── 10. 帮助说明卡片标题加图标 ─────────────────────────────────
rep(`<h3>如何扩展</h3>`, `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="plus-circle" style="width:15px;height:15px"></i> 如何扩展</h3>`);
rep(`<h3>如何验收</h3>`, `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="check-square" style="width:15px;height:15px"></i> 如何验收</h3>`);
rep(`<h3>如何检索</h3>`, `<h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="search" style="width:15px;height:15px"></i> 如何检索</h3>`);

// ─── 11. topbar 标题图标 — title_map ────────────────────────────
// 在 render_workspace 里的 h1 标题前加图标（通过替换 title_map 输出）
const topbarIcons = {
  "首页":       "house",
  "项目总览":   "folder-open",
  "全过程看板": "layout-dashboard",
  "模块导航":   "map",
  "验收标准":   "check-circle",
  "统一展示页": "monitor",
  "任务中心":   "list-checks",
  "个人设置":   "settings",
  "帮助说明":   "circle-help",
};
for (const [title, icon] of Object.entries(topbarIcons)) {
  rep(
    "<h1>" + title + "</h1>",
    ""
  );
}
// 替换 topbar h1 输出为带图标版本
rep(
  "<h1>${escape_html(title_map[route] || title_map.home)}</h1>",
  "<h1 style=\"display:flex;align-items:center;gap:10px;margin:4px 0 0\"><i data-lucide=\"${topbar_icons[route]||'circle'}\" style=\"width:24px;height:24px\"></i>${escape_html(title_map[route] || title_map.home)}</h1>"
);
// 在 render_workspace 函数开头的 title_map 后加 topbar_icons
rep(
  `  const title_map = {
    home: "首页",
    project: "项目总览",
    dashboard: "全过程看板",
    navigation: "模块导航",
    acceptance: "验收标准",
    showcase: "统一展示页",
    tasks: "任务中心",
    settings: "个人设置",
    help: "帮助说明",
  };`,
  `  const title_map = {
    home: "首页",
    project: "项目总览",
    dashboard: "全过程看板",
    navigation: "模块导航",
    acceptance: "验收标准",
    showcase: "统一展示页",
    tasks: "任务中心",
    settings: "个人设置",
    help: "帮助说明",
  };
  const topbar_icons = {
    home: "house", project: "folder-open", dashboard: "layout-dashboard",
    navigation: "map", acceptance: "check-circle", showcase: "monitor",
    tasks: "list-checks", settings: "settings", help: "circle-help",
  };`
);

writeFileSync(file, c, "utf8");
console.log("icons patch done");
