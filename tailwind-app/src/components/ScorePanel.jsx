export default function ScorePanel({ score, level, moves }) {
  return (
    <div className="flex justify-between mb-6">
      <div className="bg-white/20 rounded-xl p-3 text-center w-24">
        <p className="text-xs text-white/70">分数</p>
        <p className="text-xl font-bold text-white">{score}</p>
      </div>
      
      <div className="bg-white/20 rounded-xl p-3 text-center w-24">
        <p className="text-xs text-white/70">关卡</p>
        <p className="text-xl font-bold text-white">{level}</p>
      </div>
      
      <div className="bg-white/20 rounded-xl p-3 text-center w-24">
        <p className="text-xs text-white/70">步数</p>
        <p className="text-xl font-bold text-white">{moves}</p>
      </div>
    </div>
  );
}