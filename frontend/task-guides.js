// task-guides.js — 25个任务的详细学生引导内容
// 每个条目对应 task_groups 中的一个 task，用 code 匹配
// 结构：{ code, background, resources, steps, apis, pages, rule, sample_data, acceptance }

const TASK_GUIDES = [

/* ══════════════════════════════════════════════
   阶段一：前期策划与基础资料
══════════════════════════════════════════════ */

{
  code: "TP-01",
  title: "项目基础信息管理",
  background: "工程项目开工前，建设单位需要在系统中建立项目档案，记录项目名称、建设规模、总投资、建设地点和当前阶段。本任务负责维护这张‘项目身份证’，它是所有其他模块数据的根源——每张业务表单都要通过 project_id 关联到这里。",
  resources: [
    "搜索‘建设项目立项信息表’，了解项目基本信息的标准字段",
    "阅读 database/schema.sql 中 project 表的字段定义",
    "阅读 database/seed.sql，理解教师已预置的示例项目数据（P001）",
    "搜索‘招标投标法 项目立项条件’，理解 project_stage 字段的取值范围"
  ],
  steps: [
    "第1步【理解数据】：打开 seed.sql，记录 P001 项目的所有字段值，画出一张字段说明表格（字段名 / 中文含义 / 示例值）",
    "第2步【后端接口】：在 backend/src/modules/project/ 下新建 project.router.js，实现 GET /api/project/:id（读取单条）和 PUT /api/project/:id（修改）两个接口",
    "第3步【补充查询】：再实现 GET /api/project?keyword=关键词，支持按项目名称模糊搜索",
    "第4步【前端列表页】：在 frontend/src/modules/project/ 下新建 ProjectListPage.jsx，调用查询接口，用表格展示项目列表，每行右侧有‘编辑’按钮",
    "第5步【前端编辑表单】：点击编辑后弹出表单，包含 project_name、project_stage（下拉选择）、location、total_investment 四个字段，提交后调用 PUT 接口",
    "第6步【索引登记】：修改 PUT 接口，每次项目信息更新后，同步更新 form_index 中对应的 title 和 status 字段（source_table='project'）",
    "第7步【测试】：用 curl 或浏览器 F12 Network 面板验证每个接口的请求和响应"
  ],
  apis: [
    "GET  /api/project/:id          — 读取单个项目详情",
    "PUT  /api/project/:id          — 修改项目信息",
    "GET  /api/project?keyword=xxx  — 按名称搜索项目"
  ],
  pages: [
    "项目列表页：表格展示所有项目，支持关键词搜索，每行有编辑入口",
    "项目编辑表单：4个字段（名称、阶段、地点、总投资），提交后刷新列表"
  ],
  rule: "业务规则：total_investment（总投资）必须大于 0，project_stage 只能是以下值之一：策划阶段 / 设计阶段 / 招标阶段 / 施工阶段 / 竣工阶段。不符合时前端表单报错，后端接口返回 400。",
  sample_data: [
    "项目名称：脱敏教学示范项目A，阶段：施工阶段，地点：河北省，总投资：120000000",
    "项目名称：脱敏教学示范项目B，阶段：竣工阶段，地点：北京市，总投资：85000000"
  ],
  acceptance: [
    "能通过关键词搜索到项目，结果正确",
    "能修改项目阶段字段，页面刷新后显示新值",
    "输入负数总投资时，前端表单显示错误提示，接口返回 400",
    "修改项目后，form_index 中对应记录的 title 和 updated_at 已同步更新",
    "展示 2 条以上示例数据"
  ]
},
];

export { TASK_GUIDES };
