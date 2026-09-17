# 🚀 Intelligent Agency Router

**Live Demo:** 
https://auxavia.me

An AI-powered omnichannel routing engine built to demonstrate advanced API integrations, webhook handling, and large language model (LLM) data extraction. 

This project simulates a business backend where unstructured, messy inbound messages (like angry emails or vague lead requests) are ingested, cleaned by AI, and instantly synchronized across a company's entire software stack.

## 🛠️ Tech Stack & Architecture

* **Frontend:** Vanilla JavaScript, HTML5, CSS3 (Zero frameworks, fully responsive)
* **Backend Pipeline:** Self-hosted n8n (Node-based workflow automation)
* **AI Engine:** Google Gemini 3.1 Flash-Lite (via LangChain)
* **Infrastructure:** Cloudflare Tunnels (Secure webhook routing), GitHub Pages
* **Integrations (11 Active APIs):** Airtable, Notion, ClickUp, Asana, Monday.com, Klaviyo, Telegram, Discord, Gmail, Google Sheets, and custom REST APIs.

## ✨ Key Features

* **Zero-Shot Data Extraction:** Uses Gemini to parse messy natural language into a strict, validated JSON schema (Lead Name, Company, Budget, Urgency, Sentiment, Due Date).
* **Parallel Execution:** Fans out data to 11+ destinations simultaneously.
* **Smart UI Auto-Refresh:** Uses Javascript to securely cache-bust and reload live CRM iframes (Airtable, ClickUp, etc.) the exact moment the backend confirms a successful database write.
* **Bidirectional Live Chat:** Features a serverless technical co-pilot chat that tunnels messages directly to a developer's Telegram account and polls for live replies.

## 💡 Why Vanilla JS?
This frontend was built entirely without React, Vue, or build tools to demonstrate a deep, fundamental understanding of the DOM, asynchronous JavaScript (Promises/Fetch), and native browser APIs.
