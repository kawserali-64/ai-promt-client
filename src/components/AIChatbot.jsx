"use client";

import { useState } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch( PROCESS.ENV.NEXT_PUBLIC_API_URL +"/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmedMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to get AI response."
        );
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        text: data.message,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text:
            "Sorry, I couldn't process your request right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (text) => {
    setMessage(text);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 999999,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* ================= CHAT WINDOW ================= */}
      {isOpen && (
        <div
          style={{
            width: "360px",
            height: "520px",
            maxWidth: "calc(100vw - 40px)",
            background: "#0d0d0f",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "18px",
            marginBottom: "12px",
            overflow: "hidden",
            boxShadow:
              "0 20px 80px rgba(0,0,0,0.65)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ================= HEADER ================= */}
          <div
            style={{
              height: "64px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              background: "#111114",
              borderBottom:
                "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background:
                    "rgba(139,92,246,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles
                  size={21}
                  color="#a78bfa"
                />
              </div>

              <div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  AI Assistant
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "3px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#4ade80",
                    }}
                  />

                  <span
                    style={{
                      color: "#71717a",
                      fontSize: "11px",
                    }}
                  >
                    Online
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Assistant"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9px",
                background: "transparent",
                border: "none",
                color: "#71717a",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={19} />
            </button>
          </div>

          {/* ================= MESSAGES ================= */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
            }}
          >
            {/* Welcome */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  background:
                    "rgba(139,92,246,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bot
                  size={16}
                  color="#a78bfa"
                />
              </div>

              <div
                style={{
                  maxWidth: "82%",
                  background:
                    "rgba(255,255,255,0.05)",
                  borderRadius:
                    "4px 16px 16px 16px",
                  padding: "11px 14px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#d4d4d8",
                    fontSize: "13px",
                    lineHeight: "1.6",
                  }}
                >
                  Hi! 👋 I&apos;m your AI
                  Assistant. How can I help you
                  with prompts today?
                </p>
              </div>
            </div>

            {/* ================= CHAT HISTORY ================= */}
            {messages.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent:
                    item.type === "user"
                      ? "flex-end"
                      : "flex-start",
                  gap: "8px",
                  marginBottom: "14px",
                }}
              >
                {item.type === "ai" && (
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      flexShrink: 0,
                      borderRadius: "50%",
                      background:
                        "rgba(139,92,246,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Bot
                      size={16}
                      color="#a78bfa"
                    />
                  </div>
                )}

                <div
                  style={{
                    maxWidth:
                      item.type === "ai"
                        ? "84%"
                        : "80%",
                    background:
                      item.type === "user"
                        ? "#7c3aed"
                        : "rgba(255,255,255,0.05)",
                    color:
                      item.type === "user"
                        ? "#ffffff"
                        : "#d4d4d8",
                    borderRadius:
                      item.type === "user"
                        ? "16px 4px 16px 16px"
                        : "4px 16px 16px 16px",
                    padding: "11px 14px",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    overflowX: "auto",
                  }}
                >
                  {item.type === "ai" ? (
                    <div
                      style={{
                        color: "#d4d4d8",
                      }}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h1
                              style={{
                                color: "#ffffff",
                                fontSize: "18px",
                                fontWeight: "700",
                                margin:
                                  "0 0 10px 0",
                              }}
                            >
                              {children}
                            </h1>
                          ),

                          h2: ({ children }) => (
                            <h2
                              style={{
                                color: "#ffffff",
                                fontSize: "16px",
                                fontWeight: "700",
                                margin:
                                  "12px 0 8px 0",
                              }}
                            >
                              {children}
                            </h2>
                          ),

                          h3: ({ children }) => (
                            <h3
                              style={{
                                color: "#ffffff",
                                fontSize: "14px",
                                fontWeight: "700",
                                margin:
                                  "10px 0 6px 0",
                              }}
                            >
                              {children}
                            </h3>
                          ),

                          p: ({ children }) => (
                            <p
                              style={{
                                margin:
                                  "0 0 9px 0",
                                lineHeight: "1.65",
                              }}
                            >
                              {children}
                            </p>
                          ),

                          strong: ({ children }) => (
                            <strong
                              style={{
                                color: "#ffffff",
                                fontWeight: "700",
                              }}
                            >
                              {children}
                            </strong>
                          ),

                          ul: ({ children }) => (
                            <ul
                              style={{
                                margin:
                                  "6px 0 10px 18px",
                                padding: 0,
                              }}
                            >
                              {children}
                            </ul>
                          ),

                          ol: ({ children }) => (
                            <ol
                              style={{
                                margin:
                                  "6px 0 10px 18px",
                                padding: 0,
                              }}
                            >
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => (
                            <li
                              style={{
                                marginBottom: "5px",
                                paddingLeft: "2px",
                              }}
                            >
                              {children}
                            </li>
                          ),

                          blockquote: ({ children }) => (
                            <blockquote
                              style={{
                                margin:
                                  "8px 0",
                                padding:
                                  "8px 12px",
                                borderLeft:
                                  "3px solid #7c3aed",
                                background:
                                  "rgba(124,58,237,0.08)",
                                color: "#a1a1aa",
                              }}
                            >
                              {children}
                            </blockquote>
                          ),

                          code: ({
                            inline,
                            children,
                          }) => {
                            if (inline) {
                              return (
                                <code
                                  style={{
                                    background:
                                      "rgba(255,255,255,0.08)",
                                    color: "#c4b5fd",
                                    padding:
                                      "2px 5px",
                                    borderRadius:
                                      "5px",
                                    fontSize:
                                      "12px",
                                  }}
                                >
                                  {children}
                                </code>
                              );
                            }

                            return (
                              <code
                                style={{
                                  display: "block",
                                  background:
                                    "#09090b",
                                  color: "#d4d4d8",
                                  padding:
                                    "12px",
                                  borderRadius:
                                    "8px",
                                  overflowX:
                                    "auto",
                                  fontSize:
                                    "11px",
                                  lineHeight:
                                    "1.6",
                                }}
                              >
                                {children}
                              </code>
                            );
                          },

                          pre: ({ children }) => (
                            <pre
                              style={{
                                margin:
                                  "10px 0",
                                padding: 0,
                                background:
                                  "transparent",
                                overflowX:
                                  "auto",
                              }}
                            >
                              {children}
                            </pre>
                          ),

                          table: ({ children }) => (
                            <div
                              style={{
                                width: "100%",
                                overflowX:
                                  "auto",
                                margin:
                                  "10px 0",
                              }}
                            >
                              <table
                                style={{
                                  width: "100%",
                                  borderCollapse:
                                    "collapse",
                                  fontSize:
                                    "11px",
                                }}
                              >
                                {children}
                              </table>
                            </div>
                          ),

                          thead: ({ children }) => (
                            <thead
                              style={{
                                background:
                                  "rgba(124,58,237,0.15)",
                              }}
                            >
                              {children}
                            </thead>
                          ),

                          th: ({ children }) => (
                            <th
                              style={{
                                textAlign: "left",
                                padding: "7px",
                                border:
                                  "1px solid rgba(255,255,255,0.1)",
                                color:
                                  "#ffffff",
                                fontWeight:
                                  "600",
                              }}
                            >
                              {children}
                            </th>
                          ),

                          td: ({ children }) => (
                            <td
                              style={{
                                padding: "7px",
                                border:
                                  "1px solid rgba(255,255,255,0.08)",
                                color:
                                  "#d4d4d8",
                                verticalAlign:
                                  "top",
                              }}
                            >
                              {children}
                            </td>
                          ),

                          hr: () => (
                            <hr
                              style={{
                                border: 0,
                                borderTop:
                                  "1px solid rgba(255,255,255,0.08)",
                                margin:
                                  "12px 0",
                              }}
                            />
                          ),

                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#a78bfa",
                                textDecoration:
                                  "underline",
                              }}
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {item.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p
                      style={{
                        margin: 0,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {item.text}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* ================= LOADING ================= */}
            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    flexShrink: 0,
                    borderRadius: "50%",
                    background:
                      "rgba(139,92,246,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bot
                    size={16}
                    color="#a78bfa"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background:
                      "rgba(255,255,255,0.05)",
                    borderRadius:
                      "4px 16px 16px 16px",
                    padding: "11px 14px",
                  }}
                >
                  <Loader2
                    size={15}
                    color="#a78bfa"
                    className="animate-spin"
                  />

                  <span
                    style={{
                      color: "#71717a",
                      fontSize: "12px",
                    }}
                  >
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            {/* ================= SUGGESTIONS ================= */}
            {messages.length === 0 && !loading && (
              <div style={{ marginTop: "8px" }}>
                <p
                  style={{
                    margin:
                      "0 0 9px 0",
                    color: "#52525b",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  Try asking:
                </p>

                {[
                  "How can I create a good AI prompt?",
                  "What is prompt engineering?",
                  "How can I improve my prompts for ChatGPT?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      handleSuggestion(suggestion)
                    }
                    style={{
                      display: "block",
                      width: "100%",
                      marginBottom: "8px",
                      padding: "10px 12px",
                      textAlign: "left",
                      borderRadius: "11px",
                      border:
                        "1px solid rgba(255,255,255,0.06)",
                      background:
                        "rgba(255,255,255,0.025)",
                      color: "#a1a1aa",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= INPUT ================= */}
          <div
            style={{
              flexShrink: 0,
              padding: "12px",
              background: "#111114",
              borderTop:
                "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px",
                borderRadius: "12px",
                background: "#18181b",
                border:
                  "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                disabled={loading}
                placeholder={
                  loading
                    ? "AI is thinking..."
                    : "Ask anything..."
                }
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "8px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#ffffff",
                  fontSize: "13px",
                }}
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={
                  !message.trim() || loading
                }
                aria-label="Send message"
                style={{
                  width: "36px",
                  height: "36px",
                  flexShrink: 0,
                  borderRadius: "9px",
                  border: "none",
                  background:
                    message.trim() && !loading
                      ? "#7c3aed"
                      : "#27272a",
                  color: "#ffffff",
                  cursor:
                    message.trim() && !loading
                      ? "pointer"
                      : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity:
                    message.trim() && !loading
                      ? 1
                      : 0.5,
                }}
              >
                {loading ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING BUBBLE ================= */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={
          isOpen
            ? "Close AI Assistant"
            : "Open AI Assistant"
        }
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#7c3aed",
          color: "#ffffff",
          border:
            "1px solid rgba(167,139,250,0.3)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
          boxShadow:
            "0 0 30px rgba(124,58,237,0.45)",
        }}
      >
        {isOpen ? (
          <X size={27} />
        ) : (
          <Bot size={27} />
        )}

        {!isOpen && (
          <span
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              border: "2px solid #050505",
              background: "#4ade80",
            }}
          />
        )}
      </button>
    </div>
  );
};

export default AIChatbot;