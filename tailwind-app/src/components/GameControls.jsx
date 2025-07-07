export default function GameControls({ onPause, gameStatus }) {
  return (
    <div className="mt-6 flex justify-center">
      <button 
        onClick={onPause}
        className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium transition-all"
      >
        {gameStatus === 'paused' ? '继续' : '暂停'}
      </button>
    </div>
  );
}