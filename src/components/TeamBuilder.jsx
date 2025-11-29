import React, { useState } from 'react';
import { players } from '../data/PlayerData';
import PlayerCard from './PlayerCard';

const TeamBuilder = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [notification, setNotification] = useState('');

  const totalPower = selectedPlayers.reduce((total, player) => total + player.rating, 0);
  const averageRating = selectedPlayers.length > 0 ? (totalPower / selectedPlayers.length).toFixed(1) : 0;

  // Fungsi untuk menambah pemain ke Tim Terpilih
  const handleSelect = (player) => {
    if (selectedPlayers.length >= 5) {
      setNotification('Tim sudah penuh! Maksimal 5 pemain');
      setTimeout(() => setNotification(''), 3000);
      return;
    }
    if (selectedPlayers.find(p => p.id === player.id)) {
      setNotification('Pemain sudah dipilih');
      setTimeout(() => setNotification(''), 3000);
      return;
    }
    setSelectedPlayers([...selectedPlayers, player]);
  };

  // Fungsi untuk menghapus pemain dari Tim Terpilih
  const handleRemove = (player) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
  };

  // FUNGSI BARU: Menghapus semua pemain sekaligus
  const handleRemoveAll = () => {
    if (selectedPlayers.length === 0) {
      setNotification('Tidak ada pemain untuk dihapus');
      setTimeout(() => setNotification(''), 3000);
      return;
    }
    setSelectedPlayers([]);
    setNotification('Semua pemain berhasil dihapus');
    setTimeout(() => setNotification(''), 3000);
  };

  const getTeamStatus = () => {
    if (selectedPlayers.length === 0) return { type: 'error', message: 'Belum ada pemain terpilih' };
    if (selectedPlayers.length < 5) return { type: 'warning', message: 'Tim belum lengkap' };
    if (totalPower >= 800) return { type: 'success', message: 'Tim Elite!' };
    if (totalPower >= 600) return { type: 'info', message: 'Tim Solid' };
    return { type: 'warning', message: 'Tim Perlu Perbaikan' };
  };

  const status = getTeamStatus();

  // PERBAIKAN: Hitung distribusi posisi dengan cara yang lebih sederhana dan akurat
  const calculatePositionDistribution = () => {
    if (selectedPlayers.length === 0) {
      return [
        { name: 'Pivot', count: 0, percentage: 0, color: 'bg-amber-500' },
        { name: 'Flank', count: 0, percentage: 0, color: 'bg-emerald-500' },
        { name: 'Anchor', count: 0, percentage: 0, color: 'bg-slate-600' },
        { name: 'Goalkeeper', count: 0, percentage: 0, color: 'bg-orange-500' }
      ];
    }

    // Hitung jumlah pemain per posisi
    const positionCount = {
      'Pivot': selectedPlayers.filter(p => p.position === 'Pivot').length,
      'Flank': selectedPlayers.filter(p => p.position === 'Flank').length,
      'Anchor': selectedPlayers.filter(p => p.position === 'Anchor').length,
      'Goalkeeper': selectedPlayers.filter(p => p.position === 'Goalkeeper').length
    };

    // Hitung persentase secara langsung
    const total = selectedPlayers.length;
    
    return [
      { 
        name: 'Pivot', 
        count: positionCount.Pivot,
        percentage: Math.round((positionCount.Pivot / total) * 100), 
        color: 'bg-amber-500' 
      },
      { 
        name: 'Flank', 
        count: positionCount.Flank,
        percentage: Math.round((positionCount.Flank / total) * 100), 
        color: 'bg-emerald-500' 
      },
      { 
        name: 'Anchor', 
        count: positionCount.Anchor,
        percentage: Math.round((positionCount.Anchor / total) * 100), 
        color: 'bg-slate-600' 
      },
      { 
        name: 'Goalkeeper', 
        count: positionCount.Goalkeeper,
        percentage: Math.round((positionCount.Goalkeeper / total) * 100), 
        color: 'bg-orange-500' 
      }
    ];
  };

  const positionStats = calculatePositionDistribution();

  // Hitung total persentase untuk verifikasi
  const totalPercentage = positionStats.reduce((sum, pos) => sum + pos.percentage, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Navigation Bar - Simplified */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-start py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
              <span className="text-xl font-bold text-gray-800">ASEM DREAM TEAM MANAGER</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Simplified */}
      <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Sistem Seleksi Tim Asem FC
            </h1>
            <p className="text-lg">Pilih 5 pemain terbaik untuk membentuk tim impian</p>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Player Position Distribution - FIXED */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Distribusi Posisi Tim Terpilih</h3>
            {selectedPlayers.length > 0 ? (
              <div className="space-y-4">
                {positionStats.map((position, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">
                        {position.name} 
                        <span className="text-xs text-gray-400 ml-2">
                          ({position.count} pemain)
                        </span>
                      </span>
                      <span className="font-semibold">{position.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className={`${position.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${position.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                {/* Debug info - bisa dihapus setelah testing */}
                <div className="pt-2 text-xs text-gray-400 text-center">
                  Total: {selectedPlayers.length} pemain | Total persentase: {totalPercentage}%
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Belum ada pemain terpilih</p>
                <p className="text-sm">Distribusi posisi akan muncul di sini</p>
              </div>
            )}
          </div>

          {/* Team Capacity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Kapasitas Tim</h3>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * (selectedPlayers.length / 5 * 100)) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">{selectedPlayers.length}/5</span>
                  <span className="text-gray-600 text-sm">Pemain</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-gray-700">Status: </span>
                <span className={`font-semibold ${
                  selectedPlayers.length === 5 ? 'text-emerald-600' : 
                  selectedPlayers.length >= 3 ? 'text-amber-600' : 'text-rose-600'
                }`}>
                  {selectedPlayers.length === 5 ? 'Tim Lengkap' : 
                   selectedPlayers.length >= 3 ? 'Sedang Dibentuk' : 'Perlu Pemain'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Building Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Available Players */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Pemain Tersedia</h2>
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm">
                {players.length} pemain
              </span>
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {players.map(player => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                  isSelected={false}
                />
              ))}
            </div>
          </div>

          {/* Selected Team */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            {/* HEADER DENGAN TOMBOL REMOVE ALL */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Tim Terpilih</h2>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedPlayers.length === 5 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {selectedPlayers.length}/5
                </span>
                {/* TOMBOL REMOVE ALL */}
                {selectedPlayers.length > 0 && (
                  <button
                    onClick={handleRemoveAll}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                  >
                    Remove All
                  </button>
                )}
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              {selectedPlayers.map(player => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                  isSelected={true}
                />
              ))}
              {selectedPlayers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>Belum ada pemain terpilih</p>
                  <p className="text-sm">Pilih pemain dari daftar di sebelah kiri</p>
                </div>
              )}
            </div>

            {/* Team Statistics */}
            <div className="mt-8 space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <div className="text-2xl font-bold text-amber-600">{selectedPlayers.length}</div>
                  <div className="text-xs text-gray-600">Pemain</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                  <div className="text-2xl font-bold text-emerald-600">{totalPower}</div>
                  <div className="text-xs text-gray-600">Total Power</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-2xl font-bold text-slate-600">{averageRating}</div>
                  <div className="text-xs text-gray-600">Rata-rata</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Performance Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Statistik Tim</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Kualitas Tim</span>
                <span className="font-semibold text-emerald-600">
                  {status.type === 'success' ? 'Elite' : status.type === 'info' ? 'Solid' : 'Perlu Improvement'}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    status.type === 'success' ? 'bg-emerald-500' :
                    status.type === 'info' ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${(totalPower / 1000) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-6 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{totalPower} Points</div>
                <div className="text-lg">Team Power Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-rose-500 text-white p-4 rounded-lg shadow-lg animate-pulse">
          {notification}
        </div>
      )}
    </div>
  );
};

export default TeamBuilder;