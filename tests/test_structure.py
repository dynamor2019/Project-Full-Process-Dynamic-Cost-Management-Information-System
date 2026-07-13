"""Validate the minimum course repository structure."""

from pathlib import Path


REQUIRED_PATHS = (
    "README.md",
    "frontend/index.html",
    "frontend/app.js",
    "frontend/styles.css",
    "frontend/src/README.md",
    "frontend/src/app.ts",
    "frontend/src/styles/global.css",
    "frontend/src/types/platform.ts",
    "frontend/src/config/task-topics.ts",
    "frontend/src/pages/dashboard-page.ts",
    "frontend/src/pages/showcase-page.ts",
    "frontend/src/services/README.md",
    "database/README.md",
    "database/schema.sql",
    "database/seed.sql",
    "docs/project-charter.md",
    "docs/data-dictionary.md",
    "docs/platform-architecture.md",
    "docs/task-topics.md",
    "docs/database-design.md",
    "docs/framework-rules.md",
    "docs/site-audit-2026-07-13.md",
    "docs/business-rules/README.md",
    "docs/task-cards/README.md",
    "docs/acceptance-tests/README.md",
    "data/sample/README.md",
    "src/common/README.md",
    "src/modules/boq/README.md",
    "src/modules/target-cost/README.md",
    "src/modules/payment/README.md",
    "src/modules/change-order/README.md",
    "src/modules/contract-risk/README.md",
    "src/modules/dashboard/README.md",
    ".github/ISSUE_TEMPLATE/task.yml",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/CODEOWNERS",
    ".github/workflows/structure-check.yml",
    ".github/workflows/course-quality.yml",
    ".github/workflows/student-scope.yml",
    ".github/workflows/pages.yml",
    ".github/ISSUE_TEMPLATE/config.yml",
    "docs/github-student-workflow.md",
    "scripts/check_student_scope.py",
    "tests/test_database_schema.py",
    ".env.example",
    "start.bat",
)


def main() -> int:
    """Return a nonzero exit code when required scaffold files are missing."""
    repository_root = Path(__file__).resolve().parents[1]
    missing_paths = [
        path for path in REQUIRED_PATHS if not (repository_root / path).exists()
    ]
    if missing_paths:
        print("Missing required paths:")
        for path in missing_paths:
            print(f"- {path}")
        return 1

    print(f"Structure check passed: {len(REQUIRED_PATHS)} required paths found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
