"""Reject student pull requests that alter the shared course framework."""

from __future__ import annotations

import argparse
import re
import subprocess


TEACHER_ACCOUNTS = {"dynamor2019"}
ALLOWED_PREFIXES = (
    "frontend/src/modules/",
    "backend/src/modules/",
    "src/modules/",
    "tests/modules/",
    "docs/task-submissions/",
    "data/sample/student/",
)
BRANCH_PATTERN = re.compile(r"^team\d{2}/(feat|fix|docs)-[a-z0-9-]+$")


def parse_args() -> argparse.Namespace:
    """Read commit range and GitHub pull request metadata."""
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", required=True)
    parser.add_argument("--head", required=True)
    parser.add_argument("--actor", default="")
    parser.add_argument("--branch", default="")
    return parser.parse_args()


def changed_files(base: str, head: str) -> list[str]:
    """Return paths changed between two commits."""
    result = subprocess.run(
        ["git", "diff", "--name-only", f"{base}...{head}"],
        check=True,
        capture_output=True,
        text=True,
    )
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def main() -> int:
    """Validate branch naming and student-owned paths."""
    args = parse_args()
    if args.actor in TEACHER_ACCOUNTS:
        print(f"Teacher override accepted for {args.actor}.")
        return 0

    errors: list[str] = []
    if not BRANCH_PATTERN.fullmatch(args.branch):
        errors.append(
            "Branch must match teamXX/feat-name, teamXX/fix-name, or "
            "teamXX/docs-name."
        )

    try:
        files = changed_files(args.base, args.head)
    except subprocess.CalledProcessError as error:
        detail = error.stderr.strip() or "unknown Git comparison error"
        print(f"Unable to compare pull request commits: {detail}")
        return 1
    blocked = [
        path for path in files if not path.startswith(ALLOWED_PREFIXES)
    ]
    if blocked:
        errors.append("Files outside the student-owned directories:")
        errors.extend(f"- {path}" for path in blocked)

    if errors:
        print("\n".join(errors))
        return 1

    print(f"Student scope check passed for {len(files)} changed file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
