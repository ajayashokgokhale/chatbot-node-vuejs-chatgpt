<template>
    <div class="page-layout">
        <!-- Left Column -->
        <div class="left-col">
            <img src="@/assets/logo.png" style="width: 50px;" alt="Image 1" />
            <img src="@/assets/7-obagi-normal_oily-skin-intervention_kit-037_1_.webp" alt="Image 2" />
            <img src="@/assets/obagi_nuderm_trial_normal_to_dry.webp" alt="Image 3" />
        </div>

        <!-- Right Column -->
        <div class="right-col">
            <div class="chat-bot">
                <p v-if="isLoading == false">Chat with Bot - for Obagi</p>
                <p v-else>Please wait, fetching data...</p>
                <div v-if="chats.length >= 1" class="chat-container">
                    <div v-for="(chat, index) in chats" :key="index" class="chat-item">
                        <p><strong>You:</strong> {{ chat.user }}</p>
                        <div class="bot-response">
                            <strong>Bot:</strong>
                            <div v-html="formatBotResponse(chat.bot)"></div>
                        </div>
                    </div>
                </div>
                <div class="input-container">
                    <input v-model="userMessage" type="text" placeholder="Type your message..."
                        @keyup.enter="sendMessage" />
                    <button @click="sendMessage">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ChatBot",
    data() {
        return {
            isLoading: false,
            userMessage: "", // Input field value
            chats: [], // Array to store chat history
            apiUrl: "http://localhost:3000/chat/", // Chatbot API endpoint
        };
    },
    methods: {
        // Function to convert \n\n to <br>
        formatBotResponse(response) {
            if (!response) return "<p>No response from bot.</p>";
            // Replace double newlines with <br> tags
            return response.replace(/\n\n/g, "<br>");
        },
        async sendMessage() {
            // Check if userMessage is not empty
            if (!this.userMessage.trim()) {
                alert("Please enter a message.");
                return;
            }

            this.isLoading = true;

            const message = this.userMessage.trim();

            try {
                // Send message to the chatbot API
                const response = await axios.post(this.apiUrl, { message });
                console.log(response.data.reply);

                // Update chat history with user message and bot response
                this.chats.push({
                    user: message,
                    bot: response.data.reply || "<p>No response from bot.</p>",
                });

                // Clear the input field
                this.userMessage = "";
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    // Display the error message from the server
                    alert(error.response.data.error || "An error occurred.");
                } else {
                    console.error("Error communicating with chatbot:", error);
                    alert("Failed to communicate with the chatbot. Please try again later.");
                }
            }

            this.isLoading = false;
        },
    },
};
</script>

<style scoped>
/* Page Layout */
.page-layout {
    display: flex;
    max-width: 100%;
    margin: 0 auto;
    height: 100vh;
}

/* Left Column */
.left-col {
    width: 40%;
    height: 100%;
    padding: 10px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.left-col img {
    width: 100%;
    max-width: 350px;
    height: auto;
    margin-bottom: 10px;
}

/* Right Column */
.right-col {
    width: 60%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: start;
    background-color: #ffffff;
}

/* Chat Bot Styles */
.chat-bot {
    max-width: 700px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.chat-container {
    max-height: 600px;
    overflow-y: auto;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    background-color: #fff;
    text-align: left;
}

.chat-item {
    margin-bottom: 10px;
}

.bot-response {
    margin-top: 5px;
}

.bot-response div {
    margin-top: 5px;
    line-height: 1.5;
}

.bot-response strong {
    display: inline;
}

/* Style for HTML-rendered content */
.bot-response div p {
    margin: 5px 0;
}

.bot-response div ul,
.bot-response div ol {
    margin: 5px 0;
    padding-left: 20px;
}

.bot-response div li {
    margin: 3px 0;
}

input {
    width: calc(100% - 90px);
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

/* Input Container */
.input-container {
    display: flex;
    gap: 10px;
    align-items: center;
}

.input-container input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.input-container button {
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
}

.input-container button:hover {
    background-color: #0056b3;
}
</style>