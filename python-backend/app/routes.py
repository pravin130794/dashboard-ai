from flask import Blueprint, request, jsonify
from app.chatbot import run_xlsx_agent

bp = Blueprint("routes", __name__)

@bp.route("/query", methods=["POST"])
def query():
    try:
        data = request.get_json()
        question = data.get("question")
        file_path = "app/docs/Analysis.xlsx"  # adjust as needed
        answer = run_xlsx_agent(file_path, question)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500