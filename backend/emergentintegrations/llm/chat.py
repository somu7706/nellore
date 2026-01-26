import os
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

class UserMessage:
    def __init__(self, text, image_url=None):
        self.text = text
        self.image_url = image_url

class LlmChat:
    def __init__(self, api_key, session_id, system_message):
        self.api_key = api_key
        self.system_message = system_message
        self.model_name = "gemini-2.0-flash" 
        
        # Configure the API key
        if api_key:
            genai.configure(api_key=api_key)

    def with_model(self, provider, model):
        self.model_name = model
        return self

    async def send_message(self, message: UserMessage):
        try:
            # Create the model with system instruction
            model = genai.GenerativeModel(
                model_name=self.model_name,
                system_instruction=self.system_message
            )
            
            content = [message.text]
            
            # Handle Image (Data URL)
            if message.image_url and message.image_url.startswith("data:image"):
                try:
                    # Extract base64 data
                    import base64
                    header, encoded = message.image_url.split(",", 1)
                    data = base64.b64decode(encoded)
                    mime_type = header.split(";", 1)[0].split(":", 1)[1]
                    
                    image_part = {
                        "mime_type": mime_type,
                        "data": data
                    }
                    content.append(image_part)
                except Exception as img_err:
                    return f"Error processing image: {img_err}"

            # Safety settings to avoid blocking medical content
            safety_settings = {
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            }

            # Generate response (using await if running in async loop, but genai is sync wrapping? 
            # Actually genai.generate_content_async exists)
            response = await model.generate_content_async(
                content,
                safety_settings=safety_settings
            )
            
            return response.text
        except Exception as e:
            return f"Error processing AI request (Gemini): {str(e)}"
