const app = document.getElementById("app");

const STORAGE_KEY = "course_base_current_user";

const nav_items = [
  { key: "home", icon: "house", label: "首页" },
  { key: "project", icon: "folder-open", label: "项目总览" },
  { key: "dashboard", icon: "layout-dashboard", label: "全过程看板" },
  { key: "navigation", icon: "map", label: "模块导航" },
  { key: "acceptance", icon: "check-circle", label: "验收标准" },
  { key: "showcase", icon: "monitor", label: "统一展示页" },
  { key: "tasks", icon: "list-checks", label: "任务中心" },
  { key: "settings", icon: "settings", label: "个人设置" },
  { key: "help", icon: "circle-help", label: "帮助说明" },
];

const task_groups = [
  {
    stage: "前期策划与基础资料",
    summary: "覆盖立项、参建方、招标控制价和投标对比等前期造价准备工作。",
    tasks: [
      { code: "TP-01", title: "项目基础信息管理", table: "project", form: "项目登记表", note: "维护项目编号、项目概况、建设规模与投资口径。" },
      { code: "TP-02", title: "参建单位信息管理", table: "organization", form: "参建单位信息表", note: "维护建设、监理、设计、施工等组织信息并支持检索。" },
      { code: "TP-03", title: "招标控制价登记", table: "tender_control_price", form: "招标控制价登记表", note: "录入控制价版本、编制依据和审批状态。" },
      { code: "TP-04", title: "投标报价对比分析", table: "bid_comparison", form: "报价对比分析表", note: "读取多家投标报价并形成差异对比。" },
      { code: "TP-05", title: "合同基础信息登记", table: "contract", form: "合同基础信息表", note: "建立合同主数据并关联项目、单位和合同类型。" },
    ],
  },
  {
    stage: "合同与清单管理",
    summary: "围绕合同条款、清单导入和综合单价分析建立成本控制基础。",
    tasks: [
      { code: "TC-01", title: "合同价款条款管理", table: "contract_clause", form: "合同价款条款表", note: "支持读取、修改付款条款、调价条款和索赔条款。" },
      { code: "TC-02", title: "工程量清单导入", table: "boq_header / boq_item", form: "工程量清单导入表", note: "完成清单主表与明细表的导入和保存。" },
      { code: "TC-03", title: "清单项校验与异常检查", table: "boq_item", form: "清单异常检查表", note: "识别缺项、重复项、单位异常和工程量异常。" },
      { code: "TC-04", title: "清单综合单价分析", table: "boq_rate_analysis", form: "综合单价分析表", note: "支持清单项与单价构成的联动检索。" },
      { code: "TC-05", title: "合同清单关联检索", table: "form_index", form: "合同-清单索引表", note: "通过统一索引查询合同与清单之间的映射关系。" },
    ],
  },
  {
    stage: "目标成本与动态控制",
    summary: "把目标成本、产值、进度和材料价格放到同一条动态控制链路里。",
    tasks: [
      { code: "TD-01", title: "目标成本编制", table: "target_cost", form: "目标成本编制表", note: "录入目标成本主表、成本版本和审批状态。" },
      { code: "TD-02", title: "成本科目分解", table: "target_cost_item", form: "成本分解明细表", note: "支持成本分解、归类、修改与回查。" },
      { code: "TD-03", title: "月度产值填报", table: "progress_report", form: "月度产值填报表", note: "登记计划产值、实际产值和填报月份。" },
      { code: "TD-04", title: "施工进度与产值对比", table: "progress_comparison", form: "进度产值对比表", note: "读取进度和产值数据，形成偏差结果。" },
      { code: "TD-05", title: "材料价格信息管理", table: "material_price", form: "材料价格信息表", note: "维护价格来源、价格区间和生效日期。" },
    ],
  },
  {
    stage: "计量支付与过程结算",
    summary: "覆盖月度计量、支付申请、审批记录和分包结算等过程结算场景。",
    tasks: [
      { code: "TM-01", title: "月度计量申报", table: "measurement", form: "月度计量申报表", note: "实现计量申报的新增、查询和状态流转。" },
      { code: "TM-02", title: "计量审核记录", table: "measurement_review", form: "计量审核记录表", note: "记录审核意见、调整金额和审核结果。" },
      { code: "TM-03", title: "工程款支付申请", table: "payment_request", form: "支付申请表", note: "发起支付申请并关联计量记录和合同信息。" },
      { code: "TM-04", title: "支付审批与支付台账", table: "payment_record", form: "支付审批台账表", note: "维护审批节点、支付状态和支付时间。" },
      { code: "TM-05", title: "分包合同与结算管理", table: "subcontract", form: "分包合同结算表", note: "支持分包合同数据维护和结算联查。" },
    ],
  },
  {
    stage: "变更签证与收尾分析",
    summary: "将变更、签证、风险、竣工结算和驾驶舱整合到项目收尾阶段。",
    tasks: [
      { code: "TF-01", title: "设计变更登记", table: "change_order", form: "设计变更登记表", note: "维护变更编号、原因、估算金额和审批状态。" },
      { code: "TF-02", title: "现场签证登记", table: "site_visa", form: "现场签证表", note: "实现签证台账的新增、修改和按项目检索。" },
      { code: "TF-03", title: "变更签证费用测算", table: "change_cost_estimate", form: "变更费用测算表", note: "读取变更与签证数据形成费用测算结果。" },
      { code: "TF-04", title: "风险事件与预警管理", table: "risk_alert", form: "风险预警表", note: "基于合同、支付、变更等数据形成预警记录。" },
      { code: "TF-05", title: "竣工结算与综合驾驶舱", table: "settlement", form: "竣工结算表 / 驾驶舱索引表", note: "实现结算汇总、全过程检索和综合展示。" },
    ],
  },
];

const all_tasks = task_groups.flatMap((group) => group.tasks);

// 每个任务的看板状态（progress 0-100，status: pending / active / done）
// 后续接入真实后端后由接口返回；骨架阶段用静态演示数据占位。
const task_status_map = {
  "TP-01": { status: "done",    progress: 100, group: "1班 第1组" },
  "TP-02": { status: "done",    progress: 100, group: "1班 第2组" },
  "TP-03": { status: "active",  progress: 60,  group: "1班 第3组" },
  "TP-04": { status: "active",  progress: 40,  group: "2班 第1组" },
  "TP-05": { status: "pending", progress: 0,   group: "待认领" },
  "TC-01": { status: "active",  progress: 75,  group: "1班 第4组" },
  "TC-02": { status: "active",  progress: 50,  group: "2班 第2组" },
  "TC-03": { status: "pending", progress: 0,   group: "待认领" },
  "TC-04": { status: "pending", progress: 0,   group: "待认领" },
  "TC-05": { status: "pending", progress: 0,   group: "待认领" },
  "TD-01": { status: "active",  progress: 30,  group: "1班 第5组" },
  "TD-02": { status: "pending", progress: 0,   group: "待认领" },
  "TD-03": { status: "pending", progress: 0,   group: "待认领" },
  "TD-04": { status: "pending", progress: 0,   group: "待认领" },
  "TD-05": { status: "pending", progress: 0,   group: "待认领" },
  "TM-01": { status: "pending", progress: 0,   group: "待认领" },
  "TM-02": { status: "pending", progress: 0,   group: "待认领" },
  "TM-03": { status: "pending", progress: 0,   group: "待认领" },
  "TM-04": { status: "pending", progress: 0,   group: "待认领" },
  "TM-05": { status: "pending", progress: 0,   group: "待认领" },
  "TF-01": { status: "pending", progress: 0,   group: "待认领" },
  "TF-02": { status: "pending", progress: 0,   group: "待认领" },
  "TF-03": { status: "pending", progress: 0,   group: "待认领" },
  "TF-04": { status: "pending", progress: 0,   group: "待认领" },
  "TF-05": { status: "pending", progress: 0,   group: "待认领" },
};

const board_metrics = [
  { label: "生命周期阶段", value: `${task_groups.length}`, note: "从前期策划到收尾分析" },
  { label: "任务主题池", value: `${all_tasks.length}`, note: "支持分组认领" },
  { label: "统一数据库", value: "1", note: "所有任务共用" },
  { label: "统一索引表", value: "form_index", note: "全过程互检索" },
];

const module_deliverables = [
  "模块需求说明",
  "数据字段说明",
  "业务规则说明",
  "前端页面",
  "后端接口",
  "验收材料",
];

const acceptance_standards = [
  "至少有 1 个真实工程造价或工程管理业务场景。",
  "至少有 5 条正常样例数据和 2 条异常样例数据。",
  "至少实现数据读取、新增、修改和条件查询。",
  "至少实现 1 条核心计算规则和 1 条风险预警规则。",
  "正式业务数据保存后必须同步写入或更新 form_index。",
  "模块结果必须能够用人工标准答案复核。",
  "Pull Request 必须填写测试过程、截图、影响范围和已知问题。",
  "学生现场能够讲清输入、规则、输出、风险提示和工程管理价值。",
];

const delivery_levels = [
  { name: "必达层", summary: "录入、查询、修改、保存、1 条业务规则、1 条预警规则和验收截图。" },
  { name: "标准层", summary: "分类统计、偏差计算、风险清单、人工验算表和模块说明。" },
  { name: "挑战层", summary: "趋势图、跨模块联动、自动报告、AI 辅助风险说明和更完整测试。" },
];

function get_current_user() {
  const raw_user = window.localStorage.getItem(STORAGE_KEY);
  if (!raw_user) {
    return null;
  }

  try {
    return JSON.parse(raw_user);
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function set_current_user(user) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function clear_current_user() {
  window.localStorage.removeItem(STORAGE_KEY);
}

function get_route() {
  const route = window.location.hash.replace(/^#\/?/, "");
  return route || "home";
}

function set_route(route) {
  window.location.hash = `#/${route}`;
}

function escape_html(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function get_stage_id(index) {
  return `stage-${index + 1}`;
}

function render_login() {
  app.innerHTML = `
    <main class="shell">
      <section class="login-card" aria-label="登录界面">
        <div class="hero-panel">
          <div class="eyebrow">工程造价管理信息系统</div>
          <h1 class="hero-title">工程项目全过程动态造价管理信息系统</h1>
          <p class="hero-copy">
            覆盖前期策划、合同清单、目标成本、计量支付、变更签证全生命周期的造价管理平台。
          </p>
          <div class="hero-metrics">
            <div class="metric">
              <strong>5</strong>
              <span>生命周期阶段</span>
            </div>
            <div class="metric">
              <strong>25</strong>
              <span>功能模块</span>
            </div>
            <div class="metric">
              <strong>V0.1</strong>
              <span>当前版本</span>
            </div>
          </div>
        </div>

        <div class="form-panel">
          <h2 class="panel-title">进入系统</h2>
          <p class="panel-copy">
            请输入姓名并选择身份后登录。
          </p>

          <form class="form" id="login-form">
            <div class="field">
              <label for="name">姓名 / 昵称</label>
              <input id="name" name="name" type="text" value="学生演示账号" maxlength="20" required />
            </div>

            <div class="field">
              <label for="role">身份</label>
              <select id="role" name="role">
                <option value="student">学生</option>
                <option value="teacher">教师</option>
                <option value="integration">集成组</option>
              </select>
            </div>

            <div class="actions">
              <button class="button button-primary" type="submit">进入系统</button>
              <button class="button button-ghost" type="button" id="demo-fill">使用演示值</button>
            </div>
          </form>

        </div>
      </section>
    </main>
  `;

  const login_form = document.getElementById("login-form");
  const demo_fill = document.getElementById("demo-fill");
  const name_input = login_form.elements.namedItem("name");
  const role_select = login_form.elements.namedItem("role");

  demo_fill.addEventListener("click", () => {
    name_input.value = "学生演示账号";
    role_select.value = "student";
    name_input.focus();
  });

  login_form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form_data = new FormData(login_form);
    const name = String(form_data.get("name") || "").trim();
    const role = String(form_data.get("role") || "student");

    if (!name) {
      name_input.focus();
      return;
    }

    const user = {
      name,
      role,
      loginAt: new Date().toISOString(),
    };

    set_current_user(user);
    set_route("home");
  });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function render_nav_button(route, item) {
  const active_class = route === item.key ? "active" : "";
  const submenu =
    item.key === "navigation"
      ? `
        <div class="nav-submenu ${route === "navigation" ? "expanded" : ""}" aria-label="模块导航子菜单">
          ${task_groups
            .map(
              (group, index) => `
                <button class="nav-submenu-item" data-stage-target="${get_stage_id(index)}" type="button">
                  <span>${index + 1}</span>
                  <strong>${escape_html(group.stage)}</strong>
                  <small>${group.tasks.length} 项</small>
                </button>
              `
            )
            .join("")}
        </div>
      `
      : "";
  return `
    <div class="nav-group">
      <button class="${active_class}" data-route="${item.key}" type="button">
        <span style="display:flex;align-items:center;gap:7px"><i data-lucide="${item.icon||'circle'}" style="width:15px;height:15px;flex-shrink:0"></i>${escape_html(item.label)}</span>
        <span>›</span>
      </button>
      ${submenu}
    </div>
  `;
}

function render_home_page(user) {
  return `
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="house" style="width:20px;height:20px"></i> 欢迎，${escape_html(user.name)}</h2>
        </div>
        <p>工程项目全过程动态造价管理信息系统 &nbsp;·&nbsp; 覆盖造价管理全生命周期 &nbsp;·&nbsp; V0.1</p>
      </section>
      <div class="stat-grid">
        <div class="stat-card">
          <strong>${task_groups.length}</strong>
          <span>生命周期阶段</span>
        </div>
        <div class="stat-card">
          <strong>${all_tasks.length}</strong>
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
        ${task_groups.map((group) => `
          <article class="card" style="cursor:pointer" data-route="navigation">
            <h3>${escape_html(group.stage)}</h3>
            <p style="margin-bottom:10px;color:var(--muted)">${escape_html(group.summary)}</p>
            <span class="stage-count">${group.tasks.length} 个模块 ›</span>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function render_project_page() {
  return `
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2>项目总览</h2>
          
        </div>

      </section>
      <div class="grid">
        <article class="card">
          <h3>任务组织</h3>
          <p>你的小组从任务池中认领 1 个任务，目标不是做得很大，而是把它做成“数据、规则、结果、预警、复核”完整闭环。</p>
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
  `;
}

function render_dashboard_page() {
  const done_count   = all_tasks.filter((t) => (task_status_map[t.code] || {}).status === "done").length;
  const active_count = all_tasks.filter((t) => (task_status_map[t.code] || {}).status === "active").length;
  const overall_pct  = Math.round(
    all_tasks.reduce((sum, t) => sum + ((task_status_map[t.code] || {}).progress || 0), 0) / all_tasks.length
  );

  return `
    <div class="page">

      <div class="kboard-summary">
        <div class="kboard-metric">
          <strong>${task_groups.length}</strong>
          <span>生命周期阶段</span>
        </div>
        <div class="kboard-metric">
          <strong>${all_tasks.length}</strong>
          <span>全部模块</span>
        </div>
        <div class="kboard-metric kboard-metric--done">
          <strong>${done_count}</strong>
          <span>已完成</span>
        </div>
        <div class="kboard-metric kboard-metric--active">
          <strong>${active_count}</strong>
          <span>开发中</span>
        </div>
        <div class="kboard-metric kboard-metric--pending">
          <strong>${all_tasks.length - done_count - active_count}</strong>
          <span>待建设</span>
        </div>
        <div class="kboard-metric kboard-metric--pct">
          <strong>${overall_pct}%</strong>
          <span>整体完成度</span>
        </div>
      </div>

      <div class="kboard-overall-bar" role="progressbar"
           aria-valuenow="${overall_pct}" aria-valuemin="0" aria-valuemax="100">
        <div class="kboard-overall-bar__fill" style="width:${overall_pct}%"></div>
      </div>

      <div class="kboard-lanes">
        ${task_groups.map((group, gi) => {
          const stage_done = group.tasks.filter((t) => (task_status_map[t.code] || {}).status === "done").length;
          const stage_pct  = Math.round(
            group.tasks.reduce((s, t) => s + ((task_status_map[t.code] || {}).progress || 0), 0) / group.tasks.length
          );
          return `
            <section class="kboard-lane">
              <div class="kboard-lane__header">
                <div class="kboard-lane__num">${gi + 1}</div>
                <div class="kboard-lane__title">
                  <h3>${escape_html(group.stage)}</h3>
                  <span>${stage_done}/${group.tasks.length} 完成 &middot; ${stage_pct}%</span>
                </div>
              </div>
              <div class="kboard-lane__bar">
                <div class="kboard-lane__bar-fill" style="width:${stage_pct}%"></div>
              </div>
              <div class="kboard-lane__cards">
                ${group.tasks.map((task) => {
                  const st = task_status_map[task.code] || { status: "pending", progress: 0, group: "待认领" };
                  const badge_map = {
                    done:    ["badge-done",    "已完成"],
                    active:  ["badge-active",  "开发中"],
                    pending: ["badge-pending", "待建设"],
                  };
                  const [badge_cls, badge_txt] = badge_map[st.status] || badge_map.pending;
                  return `
                    <article class="kboard-card kboard-card--${st.status}"
                             data-route="navigation"
                             role="button" tabindex="0"
                             aria-label="进入 ${escape_html(task.title)}">
                      <div class="kboard-card__head">
                        <span class="kboard-card__code">${escape_html(task.code)}</span>
                        <span class="kboard-badge ${badge_cls}">${badge_txt}</span>
                      </div>
                      <strong class="kboard-card__title">${escape_html(task.title)}</strong>
                      <div class="kboard-card__group">${escape_html(st.group)}</div>
                      <div class="kboard-card__bar" title="${st.progress}%">
                        <div class="kboard-card__bar-fill" style="width:${st.progress}%"></div>
                      </div>
                      <div class="kboard-card__footer">
                        <span class="kboard-card__pct">${st.progress}%</span>
                        <span class="kboard-card__action">进入模块 ›</span>
                      </div>
                    </article>
                  `;
                }).join("")}
              </div>
            </section>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function render_navigation_page() {
  return `
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="map" style="width:20px;height:20px"></i> 模块导航</h2>
          
        </div>

      </section>
      <div class="stage-grid">
        ${task_groups
          .map(
            (group, index) => `
              <section class="stage-card" id="${get_stage_id(index)}">
                <div class="stage-header">
                  <div>
                    <h3>${escape_html(group.stage)}</h3>
                    <p>${escape_html(group.summary)}</p>
                  </div>
                  <span class="stage-count">${group.tasks.length} 项</span>
                </div>
                <div class="task-grid">
                  ${group.tasks
                    .map(
                      (task) => `
                        <article class="task-card">
                          <div class="task-code">${escape_html(task.code)}</div>
                          <strong>${escape_html(task.title)}</strong>
                          <span>${escape_html(task.note)}</span>
                          <div class="task-meta">
                            <b>表</b>${escape_html(task.table)}
                          </div>
                          <div class="task-meta">
                            <b>表单</b>${escape_html(task.form)}
                          </div>
                        </article>
                      `
                    )
                    .join("")}
                </div>
              </section>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function render_acceptance_page() {
  return `
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="check-circle" style="width:20px;height:20px"></i> 验收标准</h2>
          
        </div>

      </section>
      <div class="grid">
        <article class="card">
          
          <p>你要证明自己做的是工程管理闭环，不只是网页样式。AI 可以帮你写代码，但业务逻辑、计算依据和复核方法必须由你讲清楚。</p>
        </article>
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="package" style="width:16px;height:16px"></i> 你要提交什么</h3>
          <p>你的小组需要提交测试数据、预期结果、运行截图、PR 链接、已知问题和小组分工。</p>
        </article>
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="sliders" style="width:16px;height:16px"></i> 做到什么程度</h3>
          <p>先完成必达层，确保模块能运行、能计算、能预警、能复核；进度快的小组再继续做标准层和挑战层。</p>
        </article>
      </div>
      <section class="card">
        <div class="section-title">
          <h2>模块通用 6 件套</h2>
          
        </div>
        <div class="feature-grid">
          ${module_deliverables
            .map((item) => `<div class="feature-item">${escape_html(item)}</div>`)
            .join("")}
        </div>
      </section>
      <section class="card">
        <div class="section-title">
          <h2>通用验收门槛</h2>
          
        </div>
        <ol class="standard-list">
          ${acceptance_standards
            .map((item) => `<li>${escape_html(item)}</li>`)
            .join("")}
        </ol>
      </section>
      <section class="card">
        <div class="section-title">
          <h2>弹性交付层级</h2>
          
        </div>
        <div class="level-grid">
          ${delivery_levels
            .map(
              (level) => `
                <article class="level-card">
                  <strong>${escape_html(level.name)}</strong>
                  <p>${escape_html(level.summary)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function render_showcase_page() {
  return `
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="monitor" style="width:20px;height:20px"></i> 统一展示页</h2>
          
        </div>

      </section>
      <div class="showcase-stack">
        <article class="showcase-hero">
          <div>
            <small>工程项目全过程动态造价管理信息系统</small>
            <h2>统一数据库 · 统一索引 · 统一样式 · 统一任务分发</h2>
    
          </div>
        </article>
        <div class="feature-grid">
          <div class="feature-item">统一数据库连接</div>
          <div class="feature-item">统一业务接口</div>
          <div class="feature-item">统一全局 CSS</div>
          <div class="feature-item">统一表单索引</div>
          <div class="feature-item">统一标题展示规范</div>
          <div class="feature-item">全过程索引检索</div>
        </div>
      </div>
    </div>
  `;
}

function render_tasks_page() {
  return `
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="list-checks" style="width:20px;height:20px"></i> 任务中心</h2>
          
        </div>

      </section>
      <div class="grid">
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="git-pull-request" style="width:16px;height:16px"></i> 领取任务</h3>
          <p>你先确认 Issue、可修改目录、标准答案和统一索引规则，再开始让 AI 辅助开发。</p>
        </article>
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="code-2" style="width:16px;height:16px"></i> 完成模块</h3>
          <p>你的小组完成 1 个任务的列表页、表单页、接口、种子数据、规则说明和验收测试。</p>
        </article>
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="git-merge" style="width:16px;height:16px"></i> 通过集成</h3>
          <p>你的模块要符合命名规范、数据库规则、统一筛选条件和跨模块检索要求，才能合并到主项目。</p>
        </article>
      </div>
      <section class="card">
        <div class="section-title">
          <h2>任务最低交付</h2>
          
        </div>
        <div class="feature-grid">
          <div class="feature-item">1 个主表</div>
          <div class="feature-item">1 个明细或关联表</div>
          <div class="feature-item">1 个查询页面</div>
          <div class="feature-item">1 个新增/编辑表单</div>
          <div class="feature-item">1 条业务规则</div>
          <div class="feature-item">1 条索引记录</div>
        </div>
      </section>
    </div>
  `;
}

function render_settings_page(user) {
  return `
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="settings" style="width:20px;height:20px"></i> 个人设置</h2>
          
        </div>
        <p></p>
      </section>
      <div class="grid">
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="user" style="width:15px;height:15px"></i> 昵称</h3>
          <p>${escape_html(user.name)}</p>
        </article>
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="clock" style="width:15px;height:15px"></i> 登录时间</h3>
          <p>${escape_html(new Date(user.loginAt).toLocaleString("zh-CN"))}</p>
        </article>
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="shield" style="width:15px;height:15px"></i> 权限</h3>
  
        </article>
      </div>
    </div>
  `;
}

function render_help_page() {
  return `
    <div class="page">
      <section class="card">
        <div class="section-title">
          <h2 style="display:flex;align-items:center;gap:8px"><i data-lucide="circle-help" style="width:20px;height:20px"></i> 帮助说明</h2>
          
        </div>

      </section>
      <div class="grid">
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="plus-circle" style="width:15px;height:15px"></i> 如何扩展</h3>
          <p>优先在统一基础表、统一索引和本组业务目录范围内扩展，不要各组自己另起一套字段体系。</p>
        </article>
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="check-square" style="width:15px;height:15px"></i> 如何验收</h3>
          <p>你的任务至少要提供 1 份示例数据、1 组验收用例和 1 条人工标准答案，不能只凭页面显示通过。</p>
        </article>
        <article class="card">
          <h3 style="display:flex;align-items:center;gap:6px"><i data-lucide="search" style="width:15px;height:15px"></i> 如何检索</h3>
          <p>你保存的业务单据必须在 <code>form_index</code> 登记，平台才能按项目、合同、状态和业务类型综合检索。</p>
        </article>
      </div>
    </div>
  `;
}

function render_workspace(user, route) {
  const page_map = {
    home: render_home_page(user),
    project: render_project_page(),
    dashboard: render_dashboard_page(),
    navigation: render_navigation_page(),
    acceptance: render_acceptance_page(),
    showcase: render_showcase_page(),
    tasks: render_tasks_page(),
    settings: render_settings_page(user),
    help: render_help_page(),
  };

  const page_content = page_map[route] || page_map.home;
  const title_map = {
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
  };

  app.innerHTML = `
    <main class="workspace">
      <aside class="sidebar">
        <div class="brand">
          <h2 class="brand-title">工程项目全过程动态造价管理信息系统</h2>
          <p class="brand-subtitle">工程造价管理平台</p>
        </div>

        <nav class="nav" aria-label="主导航">
          ${nav_items.map((item) => render_nav_button(route, item)).join("")}
        </nav>

        <div class="sidebar-card">
          <strong>${escape_html(user.name)}</strong>
          <p class="brand-subtitle" style="margin-bottom: 12px;">${escape_html(user.role)}</p>
          <button class="button button-primary" id="logout-btn" type="button" style="width: 100%;">退出登录</button>
        </div>
      </aside>

      <section class="main">
        <header class="topbar">
          <div>
            <p>当前页面</p>
            <h1 style="display:flex;align-items:center;gap:10px;margin:4px 0 0"><i data-lucide="${topbar_icons[route]||'circle'}" style="width:24px;height:24px"></i>${escape_html(title_map[route] || title_map.home)}</h1>
          </div>
          <div class="topbar-actions">
            <span class="chip">V0.1</span>
          </div>
        </header>

        <div class="workspace-body">
          ${page_content}
        </div>
      </section>

      <footer class="page-footer">
        <span>北华航天工业学院 工程造价专业 工程项目管理系统课程项目</span>
      </footer>
    </main>
  `;

  document.getElementById("logout-btn").addEventListener("click", () => {
    clear_current_user();
    window.location.hash = "";
    render();
  });

  app.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      set_route(button.dataset.route);
    });
  });

  app.querySelectorAll("[data-stage-target]").forEach((button) => {
    button.addEventListener("click", () => {
      if (get_route() !== "navigation") {
        set_route("navigation");
        return;
      }

      document.getElementById(button.dataset.stageTarget)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // 看板模块卡片点击 — 跳转到模块导航
  app.querySelectorAll(".kboard-card[data-route]").forEach((card) => {
    const go = () => set_route(card.dataset.route);
    card.addEventListener("click", go);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
  });
}

function render() {
  const user = get_current_user();
  const route = get_route();

  if (!user) {
    render_login();
    return;
  }

  render_workspace(user, route);
  // 每次渲染后初始化 Lucide 图标
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
