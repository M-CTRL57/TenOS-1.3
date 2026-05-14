import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const LOG_MESSAGES = [
  "[    0.000000] Linux version 6.5.0-tenos (root@build) (gcc 13.2.1) #1 SMP PREEMPT_DYNAMIC",
  "[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-linux root=UUID=... ro quiet splash",
  "[    0.432123] kernel: ACPI: Core revision 20230628",
  "[    1.123456] systemd[1]: Inserted module 'autofs4'",
  "[    1.543210] tenos-core: Initializing display manager...",
  "[    2.001234] [OK] Reached target Graphical Interface.",
  "[    2.345678] NetworkManager[654]: <info>  [1685000000.1234] NetworkManager (version 1.44.2) is starting...",
  "[    3.102938] kernel: eth0: link up, 1000Mbps, full-duplex",
  "[    4.555555] tenos-auth: User authentication successful for 'admin'",
  "[    5.666666] apparmor=\"STATUS\" current=\"enforce\" profile=\"unconfined\"",
  "[    6.123321] tenos-wm: Window Manager started on display :0",
];

export default function DebugConsoleApp() {
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < LOG_MESSAGES.length) {
        setLogs(prev => [...prev, LOG_MESSAGES[currentIndex]]);
        currentIndex++;
      } else {
        setLogs(prev => [...prev, `[${(Date.now()%100000/1000).toFixed(6)}] tenos-daemon: heartbeat OK`]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-black text-[#00ff00] font-mono text-sm leading-relaxed p-2">
      <div className="flex-1 overflow-y-auto whitespace-pre-wrap px-2">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
