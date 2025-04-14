'use client';

import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { savePrompt } from '../../lib/parser';

export default function CodeZIP() {
  const [input, setInput] = useState('');
  const [projectName, setProjectName] = useState('my-project');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const generateZip = async () => {
    const zip = new JSZip();
    let currentFile = '';
    let fileContent = '';
    let inCodeBlock = false;
    const lines = input.split('\n').map(line => line.trim());

    // Save prompt
    zip.file('prompt.txt', input);
    await savePrompt(input);

    // Parse input
    for (const line of lines) {
      console.log('Line:', line);
      if (line.match(/^\*\*[^\*]+\*\*$/)) {
        if (currentFile && fileContent.trim()) {
          console.log('Saving:', currentFile);
          zip.file(currentFile, fileContent.trim());
        }
        currentFile = line.slice(2, -2).trim();
        fileContent = '';
        inCodeBlock = false;
      } else if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
      } else if (inCodeBlock && line) {
        fileContent += line + '\n';
      }
    }
    if (currentFile && fileContent.trim()) {
      console.log('Saving final:', currentFile);
      zip.file(currentFile, fileContent.trim());
    }

    // Add VS Code settings
    zip.file('.vscode/settings.json', JSON.stringify({
      editor: { formatOnSave: true },
      python: { linting: { enabled: true, pylintEnabled: true } },
      'extensions.recommendations': ['ms-python.python', 'dbaeumer.vscode-eslint']
    }, null, 2));

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${projectName}.zip`);
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const newMessages = [...messages, { role: 'user', content: chatInput }];
    setMessages(newMessages);
    setChatInput('');

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=AIzaSyC9aAtOI9QCoKdVTZSr9EU4_xqoHVGeNsQ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Quark-Coder, a coding assistant. Use file block syntax for code (e.g., \`\`\`typescript name=filename.ts\ncode\n\`\`\`). Respond to: ${chatInput}`
            }]
          }],
        }),
      });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Quark-Coder error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Failed to connect to Quark-Coder. Try again later.' }]);
    }
  };

  return (
    <div className="min-h-screen text-white p-8">
      <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-500 glow">CodeZIP Studio</h1>
        <nav className="space-x-4">
          <a href="/" className="text-gray-300 hover:text-green-500 transition">Home</a>
          <span className="text-green-500">CodeZIP</span>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto space-y-8">
        <section className="bg-gray-800 p-6 rounded-lg border border-green-500 shadow-glow">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">Generate Your Project</h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name (e.g., portfolio-app)"
            className="w-full mb-4 input-glow"
          />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste project description (e.g., **index.html** ```html ... ```)"
            className="w-full h-64 mb-4 textarea-glow"
          />
          <button
            onClick={generateZip}
            className="px-6 py-3 bg-green-500 text-black font-semibold rounded glow hover:bg-green-600 transition"
          >
            Create ZIP
          </button>
        </section>
        <section className="bg-gray-800 p-6 rounded-lg border border-green-500 shadow-glow">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">Quark-Coder Assistant</h2>
          <div className="h-64 bg-black p-4 rounded border border-green-500 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 chat-message ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={msg.role === 'user' ? 'chat-user' : 'chat-assistant'}>
                  {msg.role === 'user' ? 'You' : 'Quark-Coder'}: {msg.content}
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask Quark-Coder for coding help..."
              className="flex-1 input-glow"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 bg-green-500 text-black font-semibold rounded-r glow hover:bg-green-600 transition"
            >
              Send
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}