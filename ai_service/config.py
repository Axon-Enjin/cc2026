"""
Ciel AI Service Configuration
Manages environment variables and settings
Date: 2026-06-25
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Environment
    ENVIRONMENT: str = "development"
    
    # Supabase Configuration (defaults allow local dev/tests without .env)
    SUPABASE_URL: str = "http://127.0.0.1:54321"
    SUPABASE_SERVICE_KEY: str = "dev-service-key"

    # Microsoft Foundry Configuration (GPT-only runtime — see cr-ciel-002)
    FOUNDRY_ENDPOINT: str = "https://example.invalid"
    FOUNDRY_API_KEY: str = ""
    # Single GPT deployment powers every AI task (generation + critique).
    # The concrete deployment name is set in the Foundry portal; "gpt-5.4" is
    # the team default. Critique is a separate GPT pass, not a separate model.
    FOUNDRY_DEPLOYMENT_GPT: str = "gpt-5.4"
    # Azure OpenAI data-plane API version. The preview surface is required for
    # GPT-5 reasoning features (reasoning_effort / max_completion_tokens).
    FOUNDRY_API_VERSION: str = "2025-04-01-preview"

    # GPT-5.x are reasoning models: they reject temperature/top_p/max_tokens and
    # require max_completion_tokens. Set False for a classic (gpt-4o-class)
    # deployment that uses temperature + max_tokens instead.
    FOUNDRY_REASONING_MODEL: bool = True
    # Reasoning effort per task. Critique uses a higher effort for a deeper,
    # more focused adversarial pass (replaces the old "lower temperature" knob,
    # which reasoning models don't support).
    FOUNDRY_REASONING_EFFORT_GENERATION: str = "medium"
    FOUNDRY_REASONING_EFFORT_CRITIQUE: str = "high"

    # Model SDK client tuning (bounds latency when Foundry is slow/unreachable)
    FOUNDRY_TIMEOUT_SECONDS: float = 30.0
    FOUNDRY_MAX_RETRIES: int = 2
    EMBEDDING_TIMEOUT_SECONDS: float = 15.0
    EMBEDDING_MAX_RETRIES: int = 0
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    EMBEDDING_DIMENSIONS: int = 1536
    
    # API Configuration
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001"]
    
    # Token Budget (per SDD §8)
    MAX_TOKENS_TOC_GENERATION: int = 12000
    MAX_TOKENS_CRITIQUE: int = 10000
    MAX_TOKENS_GRANT_SECTION: int = 6000
    
    # Feature Flags
    ENABLE_TOC_CRITIQUE: bool = True
    ENABLE_STREAMING: bool = True
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

    # Placeholder values that must never count as real credentials.
    _PLACEHOLDER_KEYS = {"", "your_foundry_api_key_here", "your_foundry_key"}

    @property
    def ai_ready(self) -> bool:
        """Whether live Foundry model calls are configured.

        Single source of truth for "do we have real AI credentials?" — used to
        gate model generation, adversarial critique, and embedding-based
        retrieval. When False, the service degrades to deterministic template
        output and keyword search instead of making doomed network calls.
        """
        return self.FOUNDRY_API_KEY.strip() not in self._PLACEHOLDER_KEYS


# Global settings instance
settings = Settings()

# Made with Bob
