import { useEffect, useRef, useState } from "react";

function TooltipGlobal() {
  const [tooltip, setTooltip] = useState({ text: null, x: 0, y: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const target = e.target.closest("[data-tooltip]");
      
      if (target) {
        const text = target.getAttribute("data-tooltip");
        let x = e.clientX + 10;
        let y = e.clientY + 10;

        // Ajustar si se sale de la pantalla
        if (tooltipRef.current) {
          const rect = tooltipRef.current.getBoundingClientRect();
          if (x + rect.width > window.innerWidth) x = e.clientX - rect.width - 10;
          if (y + rect.height > window.innerHeight) y = e.clientY - rect.height - 10;
        }

        setTooltip({ text, x, y });
      } else {
        setTooltip({ text: null, x: 0, y: 0 });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!tooltip.text) return null;

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 px-2 py-1 text-sm text-white bg-gray-800 rounded shadow pointer-events-none"
      style={{ top: tooltip.y, left: tooltip.x }}
    >
      {tooltip.text}
    </div>
  );
}

export default TooltipGlobal;
