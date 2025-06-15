from flask import Blueprint, request, jsonify
from app.chatbot import run_xlsx_agent

bp = Blueprint("routes", __name__)


# Optional: Define common small talk phrases and their responses
GREETINGS = {
    "hi": "Hello! 👋 Feel free to ask me about any stage or error code in the Excel file.",
    "hello": "Hi there! 😊 Ask me something like: 'What is the Error Code for stage X in sheet Y?'",
    "hey": "Hey! I'm here to help with your Excel queries.",
    "gm": "Good morning! ☀️",
    "good morning": "Good morning! 🌞",
    "gn": "Good night! 🌙",
    "good night": "Sleep well! 😴",
    "bye": "Goodbye! 👋 Hope to chat with you again.",
    "goodbye": "Take care! 👋",
    "thanks": "You're welcome! 🙏",
    "thank you": "Happy to help! 😊",
    "ok": "Got it! ✅ Let me know if you need anything else.",
    "okay": "Alright! 👍",
    "yo": "Yo! 👋 What's your query?",
    "sup": "All good here! Ask me anything from the Excel sheets.",
    "how are you": "I'm just code, but I'm doing great! 😄",
    "what's up": "Ready to help you query Excel files! 📊",
    "lol": "😂 Let me know if you have a real question though.",
    "idk": "No worries! Just ask anything about the Excel data.",
    "brb": "I'll be right here when you return! ⏳",
    "lmao": "Haha 😄 I’m serious about data though!",
    "yo!": "Hey! Let's dive into some Excel magic. ✨"
}

@bp.route("/query", methods=["POST"])
def query():
    try:
        data = request.get_json()
        question = data.get("question", "").strip().lower()

        # 1. Handle greetings
        if question in GREETINGS:
            return jsonify({"answer": GREETINGS[question]})

        # 2. Handle empty or very short input
        if len(question) < 3:
            return jsonify({"answer": "Can you please provide a more specific question?"})

        # 3. Try to run the agent
        file_path = "app/docs/Analysis.xlsx"
        answer = run_xlsx_agent(file_path, question)

        # 4. If no meaningful response is found
        if not answer or answer.strip() in ["N/A", "An output parsing error occurred. In order to pass this error back to the agent and have it try again, pass `handle_parsing_errors=True` to the AgentExecutor. This is the error: Could not parse LLM output: `I'm here to help with questions related to pandas dataframes in Python. If you have any specific questions, feel free to ask!` For troubleshooting, visit: https://python.langchain.com/docs/troubleshooting/errors/OUTPUT_PARSING_FAILURE"]:
            return jsonify({
                "answer": "🤔 I'm not sure how to answer that. Try rephrasing or ask something from the Excel sheet."
            })

        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"error": str(e)}), 500