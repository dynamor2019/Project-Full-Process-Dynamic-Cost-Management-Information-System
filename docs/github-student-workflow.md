# GitHub 学生协作与基座保护流程

## 推荐组织方式

教师仓库是唯一公共基座，`main` 只保存验收通过的版本。25 个小组不直接修改教师仓库的 `main`，每组从教师仓库创建任务分支并通过 Pull Request 提交。

如果学校已使用 GitHub Classroom，可把教师仓库设为模板仓库，并为每个小组自动创建独立的私有作业仓库；未使用 Classroom 时，采用同一仓库的受保护分支模式。

## 学生操作流程

1. 教师为小组创建或分配一个带任务编号的 Issue。
2. 学生 Clone 仓库，先同步最新 `main`。
3. 按 Issue 指定名称创建分支，例如 `team03/feat-project-register`。
4. 学生只在以下目录增加任务内容：
   - `frontend/src/modules/`
   - `backend/src/modules/`
   - `src/modules/`
   - `tests/modules/`
   - `docs/task-submissions/`
   - `data/sample/student/`
5. Push 分支并创建 Pull Request，完整填写测试、截图、人工复核和 AI 使用说明。
6. 自动检查通过后，由教师审核并合并；学生不得自行合并。

## GitHub 仓库设置

在仓库 `Settings -> Branches -> Add branch protection rule` 中为 `main` 配置：

- Require a pull request before merging。
- Require approvals：1。
- Require review from Code Owners。
- Dismiss stale pull request approvals when new commits are pushed。
- Require status checks to pass before merging。
- 必选检查：`quality`、`validate-scope`、`validate-structure`。
- Require conversation resolution before merging。
- Block force pushes。
- Do not allow bypassing the above settings；教师确需维护框架时使用教师账号提交。

在 `Settings -> Actions -> General` 中把 Workflow permissions 设为 `Read repository contents permission`。在 `Settings -> Pages` 中将 Source 设为 `GitHub Actions`，即可发布 `frontend/` 静态预览。

## 保护机制

- `CODEOWNERS`：公共框架、数据库、治理文件必须由教师审核。
- `Student scope guard`：学生 PR 只能修改任务目录，越界立即失败。
- `Course quality gate`：检查 JavaScript 语法、仓库结构及 SQLite 结构和种子数据。
- `Structure check`：防止删除课程必需文件。
- `main` 分支保护：禁止学生直接推送、强制 PR 和教师批准。

## 教师发布顺序

1. 先完成公共基座并在本地通过全部检查。
2. 推送到 GitHub 的 `main`。
3. 设置 `main` 分支保护和 GitHub Pages。
4. 将仓库设为 Template repository；如使用 Classroom，再创建 Group assignment。
5. 建立 25 个任务 Issue，并为 25 个小组分配任务和分支名。
6. 先让所有学生完成 `ENV-CHECK`，通过后再开放正式任务。

