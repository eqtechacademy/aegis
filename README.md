# AGIES — Autonomous Voice AI Personal Assistant & Multi-Tenant SaaS Platform

> **"Powered and Developed by EQMax Tech Solutions."**

[![Vercel Deployment Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-00F0FF?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19.3.1-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Stitch UX/UI Project](https://img.shields.io/badge/Stitch_Project-13358164649773425082-A855F7?style=for-the-badge)](https://stitch.google.com/projects/13358164649773425082)

---

## 1. Project Overview

**AGIES** is an intelligent, voice-first personal AI agent platform inspired by JARVIS, built strictly as a **Multi-Tenant SaaS Application**. It incorporates high-fidelity screen designs from Stitch project `13358164649773425082` and adheres to the AGIES Master Architecture Blueprint.

### Key Capabilities
- **Voice-First Conversation Engine**: Natural two-way voice conversation with Speech-to-Text (STT) and Text-to-Speech (TTS), featuring **Barge-In (interruption)** capability (user speech instantly halts assistant audio).
- **Dual-Language Speech Interaction**: Full voice synthesis and recognition in **English (`en-US`)** and **Malayalam (`ml-IN`)**, plus Spanish, German, Japanese, and Hindi.
- **Clear Operational State Badges**: Visible real-time system states: `idle`, `listening`, `processing`, `speaking`, `interrupted`, `offline`, and `error`.
- **Personal Memory Center (`?view=memory`)**: User-controlled short- and long-term memory records (Preferences, Project Directives, Recurring Instructions, Workspace Context) with inline editing, deletion, retention controls, and pause options.
- **4-Tier Action Gatekeeper (`?view=activity`)**:
  - **Tier A (Low Risk)**: Auto-executed read/summarize tasks.
  - **Tier B (Reversible)**: Tentative actions with instant "Undo" windows.
  - **Tier C (External Side Effects)**: Mandatory confirmation dialog for email, form submissions, or webhooks.
  - **Tier D (High-Impact / Financial)**: Strict confirmation for billing mandate execution and data deletion.
- **Replaceable AI Model Adapters**: Dynamic model routing across Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, OpenAI GPT-4o, and Perplexity Sonar.
- **SaaS Multi-Tenant Isolation**: Role-based access control (Super Admin, Tenant CIO, End-User) with isolated tenant contexts (e.g. Kerala Bank HQ, EQTech Academy, Unnikrishnan Tech Studio).
- **Pricing & Monetization**: 14-Day Free Evaluation (₹0 upfront, zero credit card required) converting to ₹699 + 18% GST (₹824.82/month) via Razorpay UPI Autopay / card e-mandates.

---

## 2. Main Views & Navigation Query Routes

| View Route | Screen Title | Stitch Node Reference | Description |
| :--- | :--- | :--- | :--- |
| `?view=dashboard` | **Futuristic Command Center** | `node_11286417604693350236` | Central neural core orb, push-to-talk bar, live transcript HUD, 4 metric telemetry cards, project deliverables. |
| `?view=voice` | **Autonomous Voice Assistant** | `node_500571562363853453` | Audio equalizer simulator, continuous speech stream, autonomous Chromium browser proof box with tab scrapers. |
| `?view=activity` | **4-Tier Approvals & Audit** | Master Prompt Section 4 | 4-tier task execution queue, explicit confirmation modal for Tiers C & D, immutable audit trail ledger. |
| `?view=memory` | **Personal Memory Center** | Master Prompt Section 3 | User-controlled memory registry with retention duration, category filters, and pause toggles. |
| `?view=robot3d` | **3D Animated Robot Experience** | `node_10841982363335944622` | Three-perspective interactive 3D robot walk/sit/stand cycle with telemetry coordinates. |
| `?view=automations`| **Voice Automations & Recipes** | `node_11153249577712733273` | Visual node pipeline builder and live test execution simulator. |
| `?view=integrations`| **API Integrations Vault** | `node_13946514144423898076` | Latency testers for Claude, Gemini, GPT-4o, Perplexity, plus cloud storage and payment gateways. |
| `?view=admin` | **SaaS Super Admin Portal** | `node_908663606658776349` | Multi-tenant directory, trial countdowns, CSV export, and Provision New Tenant modal. |
| `?view=tenant` | **Tenant Workspace Settings** | `node_17103012817467328187` | Kerala Bank HQ workspace management, custom domain verification, wake-word sensitivity. |
| `?view=pricing` | **Subscription & Pricing** | `node_11788671024377863968` | 14-Day Free Trial (₹0) & ₹699+GST Pro tier checkout modal with Razorpay UPI Autopay. |

---

## 3. Tech Stack

- **Framework**: React 19.3.1 + TypeScript 7.0.2 + Vite 8.3.8
- **Styling**: Tailwind CSS v4 with custom glassmorphism, glowing gradients, and 3-way theme switching (Dark, Light, JARVIS HUD)
- **Icons**: Lucide React
- **Hosting & Edge Delivery**: Optimized for Vercel SPA (`vercel.json`)

---

## 4. Local Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation & Run
```bash
# 1. Clone repository
git clone https://github.com/eqtechacademy/aegis.git
cd aegis/aegis-1

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Type-check & Production Build
npm run build
npm run preview
```

---

## 5. Vercel Deployment

This project is pre-configured with a zero-config `vercel.json` file for single-command production deployment:

```bash
# Install Vercel CLI (optional)
npm install -g vercel

# Deploy to Vercel Production
vercel --prod
```

### Environment Variables on Vercel
Add the following variable names in your **Vercel Project Settings > Environment Variables** (do not commit secret values to Git):
- `ANTHROPIC_API_KEY`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `PERPLEXITY_API_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

---

## 6. License & Attribution

Developed by **EQMax Tech Solutions**.  
All rights reserved.

