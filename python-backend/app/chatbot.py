import pandas as pd
from langchain_community.chat_models import ChatOpenAI
from langchain_experimental.agents import create_pandas_dataframe_agent

def run_xlsx_agent(file_path, question):
    xls = pd.read_excel(file_path, sheet_name=None)

    combined_data = []
    for sheet, df in xls.items():
        df.columns = df.columns.str.strip()
        df['__sheet__'] = sheet
        combined_data.append(df)

    combined_df = pd.concat(combined_data, ignore_index=True)

    llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
    
    agent = create_pandas_dataframe_agent(
        llm,
        combined_df,
        verbose=True,
        handle_parsing_errors=True,
        allow_dangerous_code=True  # Optional: Only needed if you're allowing code execution
    )

    return agent.run(question)