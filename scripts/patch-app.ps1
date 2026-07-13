$file = Join-Path $PSScriptRoot "..\frontend\app.js"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# ── 登录页：hero-panel 内容 ──────────────────────────────
$content = $content -replace '(?s)<div class="eyebrow">Course Base / Login</div>.*?</div>\s*</div>\s*</div>', @'
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
        </div>
        </div>
'@

# ── 登录页：form-panel 标题+提示 ────────────────────────
$content = $content.Replace('<h2 class="panel-title">进入课程基座</h2>', '<h2 class="panel-title">进入系统</h2>')
$content = $content.Replace(
  "请输入你的演示身份，进入后先看"模块导航"和"验收标准"，确认自己要交什么、做到什么程度才算通过。",
  "请输入姓名并选择身份后登录。")
$content = $content.Replace('id="demo-fill">使用演示值</button>', 'id="demo-fill">演示账号</button>')

# ── 登录页：删除 hint 块 ────────────────────────────────
$content = $content -replace '(?s)\s*<div class="hint">.*?</div>\s*(?=</form>|</div>\s*</div>\s*</section>)', ''

# ── 侧边栏副标题 ─────────────────────────────────────────
$content = $content.Replace('课程基座 / 页面骨架', '工程造价管理平台')

# ── topbar chips ────────────────────────────────────────
$content = $content.Replace(
  '<span class="chip">骨架页面</span>' + "`n" + '            <span class="chip">后续可扩展</span>',
  '<span class="chip">V0.1</span>')
$content = $content.Replace(
  '<span class="chip">骨架页面</span>
            <span class="chip">后续可扩展</span>',
  '<span class="chip">V0.1</span>')

# ── 用户信息栏 ───────────────────────────────────────────
$content = $content.Replace('仅演示身份', '')

# ── 各页面 <small> 内部标注 ──────────────────────────────
$smalls = @(
  '<small>V0.1 base</small>',
  '<small>Base first</small>',
  '<small>平台定位</small>',
  '<small>module-ready</small>',
  '<small>25 tasks / 5 stages</small>',
  '<small>acceptance gate</small>',
  '<small>required package</small>',
  '<small>minimum gate</small>',
  '<small>scope control</small>',
  '<small>title showcase</small>',
  '<small>分组分配规则</small>',
  '<small>group checklist</small>',
  '<small>演示身份</small>',
  '<small>文档导航</small>',
  '<small>process board</small>',
  '<small>board flow</small>'
)
foreach ($s in $smalls) { $content = $content.Replace($s, '') }

# ── 各页面冗余说明文字 ───────────────────────────────────
$content = $content.Replace(
  '        <p>请把本系统理解为一个全过程工程造价整合平台，而不是 25 套独立作业。你们的模块要能接回统一项目、统一索引和统一数据。</p>',
  '')
$content = $content.Replace(
  '        <p>点击左侧"模块导航"下面的生命周期子菜单，可以快速跳到对应阶段。每个阶段下方列出你可以认领的小组任务和对应数据表。</p>',
  '')
$content = $content.Replace(
  '        <p>该看板是全过程控制的统一入口。你的小组完成任务后，数据会通过统一索引进入看板，形成全班共同的工程管理系统。</p>',
  '')
$content = $content.Replace(
  '        <p>这个页面展示统一平台的标题、模块入口和演示信息。你们开发时只补充自己任务需要的内容，不改公共框架、导航结构和全局样式。</p>',
  '')
$content = $content.Replace(
  '        <p>按每组 4 人认领 1 个任务设计，允许部分任务不被选择，但每个任务都必须体现读取、新增、修改、查询和跨表检索能力。</p>',
  '')
$content = $content.Replace(
  '        <p>当前登录身份：${escape_html(user.role)}。后续可以接入真实账户、角色权限和个人资料。</p>',
  '')
$content = $content.Replace(
  '        <p>仅骨架演示，无实际权限控制。</p>',
  '')
$content = $content.Replace(
  '        <p>开始开发前，请先阅读平台规则、25 个任务清单、数据库设计和统一索引机制。不要直接让 AI 写代码。</p>',
  '')
$content = $content.Replace(
  '        <p>所有小组在同一平台上开发，不允许改公共结构，不允许拆散公共查询，不允许绕过统一数据库各自保存孤立数据。</p>',
  '')

# ── showcase-hero 里的约束说明 ───────────────────────────
$content = $content.Replace(
  '学生只补内容',
  '全过程索引检索')

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Output "patch done"
