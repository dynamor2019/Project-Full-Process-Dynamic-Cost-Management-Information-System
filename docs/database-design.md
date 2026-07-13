# 数据库初步设计

## 设计目标

数据库不是为某一组单独服务，而是为统一整合平台服务。设计时优先保证：

- 多组任务可以同时挂接到同一数据库
- 不同任务产生的表单可以互相检索
- 后续增加任务时不必重建数据库主干
- 能体现工程造价全过程的主要业务链路

## 三层结构

### 1. 公共基础层

- `project`
- `organization`
- `student_group`
- `task_topic`
- `dictionary_item`
- `attachment`
- `audit_log`

### 2. 业务主线层

- `contract`
- `contract_clause`
- `tender_control_price`
- `bid_comparison`
- `boq_header`
- `boq_item`
- `target_cost`
- `target_cost_item`
- `progress_report`
- `measurement`
- `measurement_review`
- `payment_request`
- `payment_record`
- `change_order`
- `site_visa`
- `change_cost_estimate`
- `material_price`
- `subcontract`
- `settlement`
- `risk_alert`

### 3. 统一索引层

- `form_index`

## 统一索引表说明

`form_index` 是整个平台最关键的公共表。任何正式表单新增记录时，都应同步登记一条索引记录。建议字段如下：

| 字段 | 说明 |
|---|---|
| `index_id` | 索引主键 |
| `project_id` | 所属项目 |
| `task_code` | 对应任务主题编号 |
| `task_name` | 对应任务名称 |
| `biz_type` | 业务类型 |
| `source_table` | 来源表 |
| `source_id` | 来源记录主键 |
| `biz_no` | 业务单号 |
| `title` | 记录标题 |
| `status` | 业务状态 |
| `related_contract_id` | 关联合同 |
| `related_boq_id` | 关联清单 |
| `related_cost_id` | 关联成本记录 |
| `created_by` | 创建人 |
| `created_at` | 创建时间 |
| `updated_at` | 更新时间 |

## 命名原则

- 主键统一使用 `*_id`
- 所有业务表必须包含 `project_id`
- 时间字段统一用 `TEXT` 存 `YYYY-MM-DD` 或 ISO 时间
- 金额字段统一使用 `NUMERIC`
- 状态字段统一命名为 `status`

## 分组开发约束

- 各组不得随意创建独立孤表
- 新表必须能说明它与 `project`、`task_topic`、`form_index` 的关系
- 需要附件的任务统一复用 `attachment`
- 需要留痕的任务统一复用 `audit_log`
- 学生只补本任务的数据输入、存储、读取、修改和筛选，不修改公共数据库连接框架
