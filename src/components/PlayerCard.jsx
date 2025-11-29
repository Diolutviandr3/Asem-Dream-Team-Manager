import React from 'react';

const PlayerCard = ({ player, onSelect, onRemove, isSelected }) => {
  const getRatingColor = (rating) => {
    if (rating >= 90) return 'text-emerald-600';
    if (rating >= 80) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getPositionColor = (position) => {
    switch(position) {
      case 'Pivot': return 'bg-amber-100 text-amber-800';
      case 'Flank': return 'bg-emerald-100 text-emerald-800';
      case 'Anchor': return 'bg-slate-100 text-slate-800';
      case 'Goalkeeper': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${
      isSelected ? 'bg-amber-50 border-amber-500' : 'bg-white border-gray-200'
    } shadow-sm hover:shadow transition-all duration-300`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
            {player.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{player.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <p className={`font-bold ${getRatingColor(player.rating)}`}>
                Rating: {player.rating}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full ${getPositionColor(player.position)}`}>
                {player.position}
              </span>
            </div>
          </div>
        </div>
        {isSelected ? (
          <button
            onClick={() => onRemove(player)}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => onSelect(player)}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;