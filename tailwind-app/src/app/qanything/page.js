"use client";

import { useState } from 'react';
import Script from 'next/script';

export default function QAnythingPage() {
    const [kbName, setKbName] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateKb = async () => {
        if (!kbName) {
            setError('基金库');
            return;
        }
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('/api/qanything', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ kbName }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '创建失败');
            }

            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const [kbIdForUpload, setKbIdForUpload] = useState('KB379c823eaabf4820a7774539fd1a6b6f_240430');
    const [file, setFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const [uploading, setUploading] = useState(false);

    // New state for chat
    const [chatHistory, setChatHistory] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [chatting, setChatting] = useState(false);
    const [chatError, setChatError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUploadFile = async () => {
        if (!file || !kbIdForUpload) {
            setUploadError('');
            return;
        } KB379c823eaabf4820a7774539fd1a6b6f_240430
        setUploading(true);
        setUploadError('');
        setUploadResult(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('kbId', kbIdForUpload);

        try {
            const response = await fetch('/api/qanything/upload', { // We will create this new endpoint
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '上传失败');
            }

            setUploadResult(data);
        } catch (err) {
            setUploadError(err.message);
        } finally {
            setUploading(false);
        }
    };

    // New handler for sending chat messages
    const handleSendMessage = async () => {
        if (!userMessage || !kbIdForUpload) {
            setChatError('请输入您的问题并确保知识库ID不为空。');
            return;
        }
        setChatting(true);
        setChatError('');

        const newHistory = [...chatHistory, { role: 'user', content: userMessage }];
        setChatHistory(newHistory);
        setUserMessage('');

        try {
            const response = await fetch('/api/qanything/chat', { // We will create this new endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: userMessage, kbId: kbIdForUpload }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '发送消息失败');
            }

            setChatHistory([...newHistory, { role: 'assistant', content: data.answer }]);
        } catch (err) {
            setChatError(err.message);
            // Optionally remove the user message from history if sending failed
            // setChatHistory(chatHistory);
        } finally {
            setChatting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-8">
                <h1 className="text-2xl font-bold mb-6 text-center">QAnything 知识库创建</h1>
                <div className="mb-4">
                    <label htmlFor="kbName" className="block text-sm font-medium text-gray-700 mb-2">
                        知识库名称
                    </label>
                    <input
                        type="text"
                        id="kbName"
                        value={kbName}
                        onChange={(e) => setKbName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="例如：我的项目文档"
                    />
                </div>
                <button
                    onClick={handleCreateKb}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                >
                    {loading ? '创建中...' : '创建知识库'}
                </button>

                {error && <p className="text-red-500 mt-4 text-center">错误: {error}</p>}

                {result && (
                    <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                        <h2 className="font-bold">创建成功!</h2>
                        <p>知识库ID: {result.kbId}</p>
                        <p>知识库名称: {result.kbName}</p>
                    </div>
                )}
            </div>

            {/* Upload File Section */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">上传文档到知识库</h1>

                <div className="mb-4">
                    <label htmlFor="kbIdForUpload" className="block text-sm font-medium text-gray-700 mb-2">
                        知识库 ID
                    </label>
                    <input
                        type="text"
                        id="kbIdForUpload"
                        value={kbIdForUpload}
                        onChange={(e) => setKbIdForUpload(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="KB379c823eaabf4820a7774539fd1a6b6f_240430"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-2">
                        选择文件
                    </label>
                    <input
                        type="file"
                        id="fileUpload"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    />
                </div>

                <button
                    onClick={handleUploadFile}
                    disabled={uploading}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                >
                    {uploading ? '上传中...' : '上传文件'}
                </button>

                {uploadError && <p className="text-red-500 mt-4 text-center">错误: {uploadError}</p>}

                {uploadResult && (
                    <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                        <h2 className="font-bold">上传成功!</h2>
                        <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(uploadResult, null, 2)}</pre>
                    </div>
                )}
            </div>

            {/* Chat Section */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-8">
                <h1 className="text-2xl font-bold mb-6 text-center">与知识库对话</h1>
                
                <div className="mb-4">
                    <label htmlFor="kbIdForChat" className="block text-sm font-medium text-gray-700 mb-2">
                        知识库 ID (用于对话)
                    </label>
                    <input
                        type="text"
                        id="kbIdForChat"
                        value={kbIdForUpload} // Reusing the same state for convenience
                        onChange={(e) => setKbIdForUpload(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="请输入用于对话的知识库ID"
                    />
                </div>

                <div className="chat-window h-64 overflow-y-auto bg-gray-50 p-4 border rounded-md mb-4">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`chat-message mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                                {msg.content}
                            </span>
                        </div>
                    ))}
                    {chatting && <div className="text-left"><span className='inline-block p-2 rounded-lg bg-gray-300 text-black'>正在输入...</span></div>}
                </div>

                <div className="flex">
                    <input
                        type="text"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !chatting && handleSendMessage()}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="输入您的问题..."
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={chatting}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                    >
                        {chatting ? '...' : '发送'}
                    </button>
                </div>
                {chatError && <p className="text-red-500 mt-2 text-center">错误: {chatError}</p>}
            </div>
        </div>
    );
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">QAnything 智能体</h1>
                    <p className="text-center text-gray-600">
                        请在右侧的窗口与智能体进行对话。
                    </p>
                </div>
            </div>

            {/* Embedded Chat Iframe */}
            <div className="w-1/3 bg-white shadow-lg h-full">
                <iframe
                    src="https://ai.youdao.com/saas/qanything/#/bots/94D669760C284671/share"
                    className="w-full h-full border-none"
                    title="QAnything Chatbot"
                ></iframe>
            </div>
        </div>
    );
}