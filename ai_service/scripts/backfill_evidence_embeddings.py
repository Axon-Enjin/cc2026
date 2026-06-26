"""
Backfill pgvector embeddings for evidence_sources rows missing an embedding.

Run after deploying an embedding model on Microsoft Foundry:
  python -m ai_service.scripts.backfill_evidence_embeddings
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from ai_service.services.evidence_retrieval import evidence_retriever
from ai_service.services.supabase_client import supabase_client


async def main() -> None:
    print("Checking database connection...")
    if not await supabase_client.health_check():
        print("Database connection failed. Check Supabase configuration.")
        return
    print("Database OK")

    stats = evidence_retriever.get_corpus_stats()
    print(f"Corpus: {stats['total_sources']} sources")

    print(f"Verifying embedding deployment ({evidence_retriever.embedding_model})...")
    try:
        evidence_retriever.verify_embedding_deployment()
    except Exception as exc:
        print(f"Embedding deployment not ready: {exc}")
        print(
            "\nDeploy text-embedding-3-small on ai-archon-resource in Microsoft Foundry,\n"
            "set EMBEDDING_MODEL in ai_service/.env to the deployment name, then re-run."
        )
        return
    print("Embedding deployment OK")

    print("Backfilling missing embeddings...")
    count = evidence_retriever.backfill_embeddings()
    print(f"Updated {count} source(s)")

    print("\nTesting vector retrieval...")
    chunks = evidence_retriever.retrieve_evidence(
        "youth employment skills training Philippines",
        top_k=3,
        min_relevance=0.3,
    )
    print(f"Retrieved {len(chunks)} chunk(s)")
    for i, chunk in enumerate(chunks, 1):
        print(f"  {i}. [{chunk.tier}] {chunk.citation[:70]}... ({chunk.relevance_score:.3f})")


if __name__ == "__main__":
    asyncio.run(main())
