"""Verify that the shared SQLite schema and seed data load together."""

import sqlite3
from pathlib import Path


def main() -> int:
    """Load the SQL files into an isolated in-memory database."""
    repository_root = Path(__file__).resolve().parents[1]
    connection = sqlite3.connect(":memory:")
    try:
        for relative_path in ("database/schema.sql", "database/seed.sql"):
            sql = (repository_root / relative_path).read_text(encoding="utf-8")
            connection.executescript(sql)
    finally:
        connection.close()

    print("Database schema and seed check passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

