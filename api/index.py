import logging
from fastapi import FastAPI, WebSocket
import datetime
import json

from vocode.streaming.models.agent import ChatGPTAgentConfig
from vocode.streaming.models.synthesizer import AzureSynthesizerConfig
from vocode.streaming.synthesizer.azure_synthesizer import AzureSynthesizer

from vocode.streaming.agent.chat_gpt_agent import ChatGPTAgent
from vocode.streaming.client_backend.conversation import ConversationRouter
from vocode.streaming.models.message import BaseMessage

from dotenv import load_dotenv

load_dotenv()

app = FastAPI(docs_url=None)

logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

conversation_router = ConversationRouter(
    agent_thunk=lambda: ChatGPTAgent(
        ChatGPTAgentConfig(
            initial_message=BaseMessage(text="Hello!"),
            prompt_preamble="Have a pleasant conversation about life",
        )
    ),
    synthesizer_thunk=lambda output_audio_config: AzureSynthesizer(
        AzureSynthesizerConfig.from_output_audio_config(
            output_audio_config, voice_name="en-US-SteffanNeural"
        )
    ),
    logger=logger,
    conversation_endpoint="/api/python/conversation",
)

app.include_router(conversation_router.get_router())

@app.websocket("/api/ping")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        message = json.loads(data)
        # Check if the message contains a 'ping' key
        if message.get("ping") == "ping":
            # Get the current time in UTC as the server receive time
            serverReceiveTime = datetime.datetime.now(datetime.timezone.utc).timestamp()
            # Get the current time in UTC as the server send time
            # Ideally this would be done right before sending
            serverSendTime = datetime.datetime.now(datetime.timezone.utc).timestamp()
            # Send a JSON response containing the server receive time, server send time,
            # and the client send time received from the frontend
            await websocket.send_json({
                "serverReceiveTime": serverReceiveTime,
                "serverSendTime": serverSendTime,
                "clientSendTime": message.get("clientSendTime")
            })