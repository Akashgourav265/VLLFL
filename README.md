# VLLFL - Vision-Language Federated Learning

Empowering farms with privacy-preserving AI technology. Deploy advanced vision-language models across agricultural operations with minimal bandwidth and maximum security.

## Project Overview

VLLFL (Vision-Language Federated Learning) allows for distributed training and inference of AI models on edge devices (farms) while keeping data local and secure. This project integrates a Flask backend for model management and aggregation with a React frontend for user interaction.

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Firebase Auth
- **Backend:** Flask, PyTorch, Transformers
- **Communication:** REST API

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- NPM

### Installation

1. **Clone the repository** (if not already done)

2. **Backend Setup**
   ```bash
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

You need to run both the backend and frontend servers simultaneously.

### 1. Start Backend
In the root directory:
```bash
python app.py
```
*Runs on http://127.0.0.1:5000*

### 2. Start Frontend
In the `frontend` directory:
```bash
npm run dev
```
*Runs on http://localhost:5173* (or similar port)

## Project Structure

- `app.py`: Main Flask application entry point.
- `frontend/`: React frontend application.
- `federated_main.py`: Core logic for federated learning processes.
