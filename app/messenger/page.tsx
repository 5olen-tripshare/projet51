"use client"
import { useState } from "react";
import { Send, User } from "lucide-react";
import ProtectedRoute from "@/src/components/ProtectedRoute";

const conversations = [
  { id: 1, name: "Nassim Doubli", lastMessage: "Merci pour votre réponse !" },
  { id: 2, name: "Jovan Subasic", lastMessage: "Je prépare le repas !" },
  { id: 3, name: "Arnod Toto", lastMessage: "Je reviens vers vous bientôt !" }
];

export default function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messages, setMessages] = useState([
    { sender: "other", text: "Bonjour, à quelle heure arrivez-vous ?" },
    { sender: "me", text: "Normalement, vers 11h15" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "me", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <ProtectedRoute>
    <div className="flex h-screen bg-gray-100">
      {/* Liste des conversations */}
      <div className="w-1/3 bg-white p-4 border-r">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        {conversations.map((chat) => (
          <div key={chat.id} onClick={() => setSelectedChat(chat)}
            className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 ${selectedChat.id === chat.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
            <User className="w-8 h-8 mr-3" />
            <div>
              <p className="font-medium">{chat.name}</p>
              <p className="text-sm text-gray-600 truncate w-60">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Zone de chat */}
      <div className="w-2/3 flex flex-col">
        <div className="bg-white p-4 border-b flex items-center">
          <User className="w-8 h-8 mr-3" />
          <h2 className="text-xl font-semibold">{selectedChat.name}</h2>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-3 flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 rounded-lg ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Champ de saisie */}
        <div className="p-4 bg-white border-t flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            placeholder="Écrire un message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
