#!/usr/bin/env python3
"""
Ciel finals scoring tool — Final Round rubric (hackathon-guide.md §9).

Weights:
  - Theme relevance: 10%
  - Innovation and creativity: 30%
  - Impact: 10%
  - Execution and presentation quality: 30%
  - Relevance and feasibility: 20%

Usage:
  python scripts/score_finals.py --interactive
  python scripts/score_finals.py --team Ciel --judge Alice --theme 9 --innovation 28 ...
  python scripts/score_finals.py --csv scores.csv
"""

from __future__ import annotations

import argparse
import csv
import sys
from dataclasses import dataclass
from pathlib import Path

CRITERIA: tuple[tuple[str, str, float], ...] = (
    ("theme", "Theme relevance", 0.10),
    ("innovation", "Innovation and creativity", 0.30),
    ("impact", "Impact", 0.10),
    ("execution", "Execution and presentation quality", 0.30),
    ("feasibility", "Relevance and feasibility", 0.20),
)

CRITERION_KEYS = [key for key, _, _ in CRITERIA]


@dataclass(frozen=True)
class ScoreRow:
    team: str
    judge: str
    raw: dict[str, float]

    @property
    def weighted_total(self) -> float:
        return sum(self.raw[key] * weight for key, _, weight in CRITERIA)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Score Create & Conquer 2026 Final Round teams")
    parser.add_argument("--team", help="Team / project name")
    parser.add_argument("--judge", default="Judge", help="Judge name")
    parser.add_argument("--interactive", action="store_true", help="Prompt for scores")
    parser.add_argument("--csv", type=Path, help="CSV file: team,judge,theme,innovation,impact,execution,feasibility")
    for key, label, _ in CRITERIA:
        parser.add_argument(f"--{key}", type=float, help=f"{label} raw score (0-30 scale)")
    return parser.parse_args()


def prompt_score(label: str, weight: float) -> float:
    while True:
        raw = input(f"{label} [{weight:.0%} weight] (0-30): ").strip()
        try:
            value = float(raw)
        except ValueError:
            print("  Enter a number.", file=sys.stderr)
            continue
        if 0 <= value <= 30:
            return value
        print("  Score must be between 0 and 30.", file=sys.stderr)


def read_csv(path: Path) -> list[ScoreRow]:
    rows: list[ScoreRow] = []
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        required = {"team", "judge", *CRITERION_KEYS}
        if not required.issubset(set(reader.fieldnames or [])):
            missing = required - set(reader.fieldnames or [])
            raise ValueError(f"CSV missing columns: {', '.join(sorted(missing))}")
        for line in reader:
            raw = {key: float(line[key]) for key in CRITERION_KEYS}
            rows.append(ScoreRow(team=line["team"].strip(), judge=line["judge"].strip(), raw=raw))
    return rows


def build_row(args: argparse.Namespace) -> ScoreRow:
    if not args.team:
        raise SystemExit("--team is required unless using --csv or --interactive")
    raw: dict[str, float] = {}
    for key, label, _ in CRITERIA:
        value = getattr(args, key)
        if value is None:
            raise SystemExit(f"Missing --{key} ({label})")
        if not 0 <= value <= 30:
            raise SystemExit(f"--{key} must be between 0 and 30")
        raw[key] = value
    return ScoreRow(team=args.team, judge=args.judge, raw=raw)


def interactive_row(default_team: str | None = None) -> ScoreRow:
    team = input(f"Team name [{default_team or 'Ciel'}]: ").strip() or (default_team or "Ciel")
    judge = input("Judge name: ").strip() or "Judge"
    raw = {key: prompt_score(label, weight) for key, label, weight in CRITERIA}
    return ScoreRow(team=team, judge=judge, raw=raw)


def print_breakdown(row: ScoreRow) -> None:
    print(f"\n{row.team} — judge: {row.judge}")
    print("-" * 52)
    for key, label, weight in CRITERIA:
        raw = row.raw[key]
        weighted = raw * weight
        print(f"  {label:<40} {raw:5.1f}  × {weight:4.0%}  = {weighted:6.2f}")
    print("-" * 52)
    print(f"  {'Weighted total':<40}       {'':<8}   {row.weighted_total:6.2f} / 30.00")


def aggregate(rows: list[ScoreRow]) -> list[tuple[str, float, int]]:
    totals: dict[str, list[float]] = {}
    for row in rows:
        totals.setdefault(row.team, []).append(row.weighted_total)
    ranked = [
        (team, sum(scores) / len(scores), len(scores))
        for team, scores in totals.items()
    ]
    ranked.sort(key=lambda item: item[1], reverse=True)
    return ranked


def main() -> int:
    args = parse_args()
    rows: list[ScoreRow] = []

    if args.csv:
        rows.extend(read_csv(args.csv))
    elif args.interactive:
        while True:
            rows.append(interactive_row(default_team=args.team))
            again = input("\nScore another team? [y/N]: ").strip().lower()
            if again not in {"y", "yes"}:
                break
    else:
        rows.append(build_row(args))

    for row in rows:
        print_breakdown(row)

    if len({row.team for row in rows}) > 1 or any(
        len([r for r in rows if r.team == team]) > 1 for team in {row.team for row in rows}
    ):
        print("\n=== Ranking (average weighted total per team) ===")
        for rank, (team, avg, count) in enumerate(aggregate(rows), start=1):
            judges_note = f" ({count} judge{'s' if count != 1 else ''})"
            print(f"  {rank}. {team}: {avg:.2f}{judges_note}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
