import { useState } from 'react';

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handlePress = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setEquation('');
      return;
    }
    
    if (val === '=') {
      try {
        const result = eval(equation + display);
        setDisplay(String(result));
        setEquation('');
      } catch (e) {
        setDisplay('Hata');
      }
      return;
    }

    if (['+', '-', '*', '/'].includes(val)) {
      setEquation(equation + display + val);
      setDisplay('0');
      return;
    }

    if (display === '0' || display === 'Hata') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const buttons = [
    'C', '/', '*', '-',
    '7', '8', '9', '+',
    '4', '5', '6', '=',
    '1', '2', '3', '0'
  ];

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white p-4 items-center justify-center font-mono">
      <div className="w-[300px] bg-black p-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="bg-[#e0e0e0] text-black text-right p-4 rounded mb-4 h-20 flex flex-col justify-end overflow-hidden">
          <div className="text-gray-500 text-sm h-6">{equation}</div>
          <div className="text-3xl font-bold">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map(btn => (
            <button
              key={btn}
              onClick={() => handlePress(btn)}
              className={`p-4 rounded text-xl font-bold transition-colors
                ${['C'].includes(btn) ? 'bg-red-500 hover:bg-red-400' : ''}
                ${['/', '*', '-', '+', '='].includes(btn) ? 'bg-orange-500 hover:bg-orange-400' : ''}
                ${!['C', '/', '*', '-', '+', '='].includes(btn) ? 'bg-gray-700 hover:bg-gray-600' : ''}
                ${btn === '=' ? 'row-span-2' : ''}
                ${btn === '0' ? 'col-span-3' : ''}
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
