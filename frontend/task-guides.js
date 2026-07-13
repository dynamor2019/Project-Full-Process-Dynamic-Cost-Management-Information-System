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
{
  code: "TP-02",
  title: "参建单位信息管理",
  background: "工程项目除了项目本身，还必须明确建设单位、设计单位、监理单位、施工单位和咨询单位等参建主体。本任务负责维护参建单位主数据，让后续合同、计量、变更和索赔单据都能按单位名称和角色快速检索，并通过统一索引表形成跨模块关联。",
  resources: [
    "搜索‘参建单位信息表’或‘工程项目参建单位台账’，理解常见字段结构",
    "阅读 database/schema.sql 中 organization 表与 form_index 的字段定义",
    "阅读 database/seed.sql，确认教师预置的单位示例数据",
    "整理本项目常见参建角色：建设单位、监理单位、设计单位、施工单位、咨询单位"
  ],
  steps: [
    "第1步【理解数据】：先梳理参建单位的角色、名称、联系人、联系电话、统一社会信用代码和关联项目编号，形成字段清单",
    "第2步【后端接口】：在 backend/src/modules/organization/ 下新建 organization.router.js，实现 GET /api/organization、GET /api/organization/:id、POST /api/organization 和 PUT /api/organization/:id",
    "第3步【条件查询】：实现按单位名称、单位角色和所属项目编号的组合筛选，返回可复用的单位列表",
    "第4步【前端页面】：在 frontend/src/modules/organization/ 下新建 OrganizationListPage.jsx，展示单位列表、角色标签和检索条件",
    "第5步【编辑表单】：新增/修改表单至少包含 organization_name、org_role、project_id、contact_person、contact_phone 五个字段",
    "第6步【统一索引】：在保存单位信息后，同步更新 form_index 中 source_table='organization' 的记录，保证跨模块检索能命中",
    "第7步【测试】：准备 2 条以上不同角色的单位数据，验证新增、修改、筛选和索引检索"
  ],
  apis: [
    "GET  /api/organization          — 读取单位列表",
    "GET  /api/organization/:id      — 读取单个单位详情",
    "POST /api/organization          — 新增单位信息",
    "PUT  /api/organization/:id      — 修改单位信息"
  ],
  pages: [
    "单位列表页：支持按名称、角色和项目编号筛选",
    "单位编辑表单：至少包含单位名称、角色、联系人、电话、关联项目四类信息"
  ],
  rule: "业务规则：参建单位名称不能为空，org_role 只能在建设单位 / 监理单位 / 设计单位 / 施工单位 / 咨询单位 中选择；同一项目下同一角色的单位名称不允许重复。不符合时前端提示错误，后端接口返回 400。",
  sample_data: [
    "单位名称：河北省建设发展有限公司，角色：建设单位，关联项目：P001，联系人：张三，电话：13800000001",
    "单位名称：华北工程监理有限公司，角色：监理单位，关联项目：P001，联系人：李四，电话：13800000002"
  ],
  acceptance: [
    "能按单位名称和角色筛选到对应记录",
    "能新增一条单位记录并同步写入 form_index",
    "修改单位角色后，列表页和索引检索结果同时更新",
    "输入重复角色+重复名称时，接口返回 400 并提示重复",
    "展示 2 条以上示例数据"
  ]
},
];

export { TASK_GUIDES };
