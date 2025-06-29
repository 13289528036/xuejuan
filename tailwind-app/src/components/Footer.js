// src/components/Footer.js
"use client";

import React, { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [wakatimeText, setWakatimeText] = useState("");
  const [githubStats, setGithubStats] = useState({ public_repos: 0, followers: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [wakatimeRes, githubRes] = await Promise.all([
          fetch('/api/wakatime'),
          fetch('/api/github')
        ]);

        if (!wakatimeRes.ok || !githubRes.ok) {
          throw new Error('Failed to fetch data from one or more sources');
        }

        const wakatimeData = await wakatimeRes.json();
        const githubData = await githubRes.json();

        if (wakatimeData && wakatimeData.data && wakatimeData.data.text) {
          setWakatimeText(wakatimeData.data.text);
        } else {
          setWakatimeText("Data format error");
        }

        if (githubData) {
          setGithubStats(githubData);
        }

      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setError(err.message);
        setWakatimeText("Could not load stats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-slate-800 text-slate-300 py-8 mt-12 w-full">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} 《Web前端开发》课程练习平台. 保留所有权利.
        </p>
        <p className="text-xs mt-2">使用 Next.js 和 Tailwind CSS 构建</p>
        <div className="flex justify-center items-center space-x-6 mt-3 text-sm font-medium">
          <p className="bg-slate-700 px-4 py-2 rounded-lg">
            <span className="text-emerald-400">Wakatime</span>:{" "}
            <span className="text-amber-300">
              {isLoading ? "Loading..." : error ? `Error: ${error}` : wakatimeText}
            </span>
          </p>
          <p className="bg-slate-700 px-4 py-2 rounded-lg">
            <span className="text-emerald-400">GitHub Stats</span>:{" "}
            <span className="text-amber-300">
              {isLoading ? "Loading..." : error ? `Error: ${error}` : `Public Repos: ${githubStats.public_repos} | Followers: ${githubStats.followers}`}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
