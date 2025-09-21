// components/EmptyState.jsx
import React from 'react';

const EmptyState = () => (
  <div className="flex-1 flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-6">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">🤖</span>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI SQL Assistant</h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Tanyakan apa saja tentang database buku Anda. Saya dapat membantu Anda membuat query SQL, 
        menganalisis data, atau memberikan insights tentang koleksi buku Anda.
      </p>
      <div className="grid grid-cols-1 gap-3 text-sm">
        <div className="bg-gray-50 p-3 rounded-lg text-left">
          <strong className="text-gray-900">💡 Contoh pertanyaan:</strong>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li>• "Berapa buku yang tersedia untuk dipinjam?"</li>
            <li>• "Tampilkan buku yang diterbitkan tahun 2023"</li>
            <li>• "Buku apa saja yang sedang dipinjam?"</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default EmptyState;