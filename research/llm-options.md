# LLM options for the voice apps (tested 2026-11-23)

Free access through Shubh's NVIDIA NIM key (env `NVIDIA_API_KEY_4`, endpoint https://integrate.api.nvidia.com/v1/chat/completions, OpenAI-compatible).

**Test.** One Tamil code-mixed fraud story: "என் SBI account-ல இருந்து ஐயாயிரம் ரூபாய் போச்சு … பத்து நிமிஷம் முன்னாடி, UPI ID rahul dot kyc at ybl". The models had to return JSON plus an English summary.

| Model | Latency | Amount (expected 5000) | UPI normalised | Verdict |
|---|---|---|---|---|
| nvidia/nemotron-3-ultra-550b-a55b | 3.6 s | ✅ 5000 | ✅ | best quality |
| nvidia/nemotron-3.5-bolt-e4b | 1.2 s | ✅ 5000 | ✅ | fast and right |
| minimaxai/minimax-m3.1-flash | 1.5 s | ❌ 50000 | ✅ | wrong number |
| nvidia/nemotron-3.5-lightning-30b-a3b | 1.2 s | ❌ 1000000 | ❌ | wrong number |
| mistral-large-4, gemma-4-31b, glm-5.3-flash, kimi-k3.1-pro | >120 s | — | — | timed out (queue) |

**Design rule (same lesson as the clip factory's "every number in a title must appear in the transcript").** Rules own facts. The LLM may only:
1. write the human summary or translation (for example Tamil speech to an English doctor summary);
2. propose values the rules missed. A proposed number or ID is accepted only if the rules can find the same value in the transcript; otherwise it is shown as "please confirm".

To do: score rules vs. bolt vs. ultra vs. a hybrid on the harness corpus, then decide.
