// src/app/github-stats/commits/[commitId]/page.js

async function getCommitDetails(commitId) {
  const apiUrl = `https://api.github.com/repos/13289528036/xuejuan/commits/${commitId}`;
  const res = await fetch(apiUrl); // 使用 apiUrl 变量

  if (!res.ok) {
    let errorBody = "";
    try {
      // 尝试读取错误响应体，可能包含来自API的有用信息
      errorBody = await res.text();
    } catch (e) {
      // 如果读取响应体失败，则忽略
      errorBody = "(无法读取响应体)";
    }
    throw new Error(
      `GitHub API 请求失败。状态: ${res.status} ${res.statusText}. ` +
      `URL: ${apiUrl}. ` +
      `响应: ${errorBody.substring(0, 300)}` // 显示部分响应内容
    );
  }
  return res.json();
}

export default async function CommitDetailPage({ params }) {
  const { commitId } = params;
  let commitDetails = null;
  let errorTitle = null; // 用于主要的错误标题
  let errorMessage = null; // 用于详细的错误信息

  try {
    commitDetails = await getCommitDetails(commitId);
  } catch (error) {
    console.error("获取 Commit 详情时发生错误:", error); // 在服务器端记录完整错误
    errorTitle = "获取 GitHub 提交数据失败"; // 用户友好的标题
    errorMessage = error.message; // 这将是 "fetch failed" 或来自 getCommitDetails 的更详细信息
  }

  if (errorTitle) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">{errorTitle}</h1>
        <p className="mb-2">尝试获取 Commit SHA: <span className="font-mono bg-gray-100 p-1 rounded">{commitId}</span></p>
        <div className="bg-red-50 border border-red-200 p-4 rounded-md">
          <p className="text-red-700 font-semibold">错误详情:</p>
          <p className="text-red-600 text-sm break-all">{errorMessage || "未能获取详细错误信息。"}</p>
        </div>
        <div className="mt-4 text-sm text-gray-700">
          <p className="font-semibold mb-1">可能的原因与排查建议:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>网络连接问题:</strong> 请检查运行此应用的服务器是否能正常访问互联网，特别是能否访问 `api.github.com`。
            </li>
            <li>
              <strong>仓库或提交无效:</strong> 确认仓库 
              <a 
                href={`https://github.com/13289528036/xuejuan`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                13289528036/xuejuan
              </a> 
              是公开的，并且提交ID 
              <a 
                href={`https://github.com/13289528036/xuejuan/commit/${commitId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-mono"
              >
                {commitId.substring(0,7)}...
              </a> 
              在该仓库中确实存在。
            </li>
            <li>
              <strong>API 限制:</strong> 如果请求过于频繁，GitHub API 可能会暂时限制访问。
            </li>
            <li>
              请查看服务器控制台的日志，获取更详细的技术错误信息。
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (!commitDetails) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">加载提交详情中...</h1>
        <p>Commit SHA: {commitId}</p>
      </div>
    );
  }

  const { commit, author, committer, html_url, files } = commitDetails;

  return (
    <div className="container mx-auto p-4">
      <a href="/github-stats" className="text-blue-500 hover:underline mb-4 inline-block">&larr; 返回提交列表</a>
      <h1 className="text-2xl font-bold mb-2 break-all">提交详情: {commitId.substring(0, 7)}</h1>
      <p className="text-lg mb-4 bg-gray-100 p-3 rounded">{commit.message}</p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="border p-3 rounded">
          <h2 className="text-md font-semibold mb-1">作者 (Author):</h2>
          <p>{commit.author.name} &lt;{commit.author.email}&gt;</p>
          <p>日期: {new Date(commit.author.date).toLocaleString()}</p>
          {author && <img src={author.avatar_url} alt={author.login} className="w-10 h-10 rounded-full mt-1" />}
        </div>
        <div className="border p-3 rounded">
          <h2 className="text-md font-semibold mb-1">提交者 (Committer):</h2>
          <p>{commit.committer.name} &lt;{commit.committer.email}&gt;</p>
          <p>日期: {new Date(commit.committer.date).toLocaleString()}</p>
          {committer && <img src={committer.avatar_url} alt={committer.login} className="w-10 h-10 rounded-full mt-1" />}
        </div>
      </div>

      <a href={html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-4 inline-block">
        在 GitHub 上查看提交 &rarr;
      </a>

      {files && files.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">变更的文件 ({files.length}):</h2>
          <ul className="list-disc pl-5 space-y-1">
            {files.map((file) => (
              <li key={file.sha || file.filename} className="text-sm">
                <a href={file.blob_url} target="_blank" rel="noopener noreferrer" className="hover:underline text-green-600">
                  {file.filename}
                </a>
                <span className="ml-2 text-gray-500">(+{file.additions} / -{file.deletions})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// 可选: 为动态路由生成元数据
export async function generateMetadata({ params }) {
  const { commitId } = params;
  return {
    title: `Commit ${commitId.substring(0,7)} - GitHub Stats`,
    description: `Details for commit ${commitId} from 13289528036/xuejuan`,
  };
}