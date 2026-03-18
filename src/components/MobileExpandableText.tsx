import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MobileExpandableTextProps {
  text: string;
  className?: string;
  lines?: number;
}

export default function MobileExpandableText({ 
  text, 
  className = "", 
  lines = 4 
}: MobileExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      // Only apply truncation logic on mobile speeds/screens (usually < 768px for md breakpoint)
      if (window.innerWidth >= 768) {
        setIsTruncated(false);
        return;
      }

      if (textRef.current) {
        // Compare the full scroll height of the text block with its visible client height
        // If scrollHeight > clientHeight, it means the text is overflowing its line-clamp
        const { scrollHeight, clientHeight } = textRef.current;
        setIsTruncated(scrollHeight > clientHeight);
      }
    };

    // Delay slightly to ensure fonts/layout have painted
    const timeoutId = setTimeout(checkTruncation, 100);
    
    // Check again on window resize
    window.addEventListener('resize', checkTruncation);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkTruncation);
    };
  }, [text, lines]);

  return (
    <div className="flex flex-col items-start w-full">
      <p 
        ref={textRef}
        className={`
          ${className} 
          ${!isExpanded ? 'md:line-clamp-none' : ''}
        `}
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          // Apply line clamp only on mobile AND if not expanded
          // Uses window width conditionally via css classes if possible, but fallback to inline style for clamp
          WebkitLineClamp: !isExpanded && typeof window !== 'undefined' && window.innerWidth < 768 ? lines : 'unset',
          overflow: !isExpanded && typeof window !== 'undefined' && window.innerWidth < 768 ? 'hidden' : 'visible'
        }}
      >
        {text}
      </p>
      
      {/* Show button ONLY if it's truncated (which implies mobile + overflows) */}
      {isTruncated && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 text-brand-600 dark:text-brand-400 font-medium text-sm flex items-center gap-1 hover:underline transition-all md:hidden z-20 relative"
        >
          {isExpanded ? (
            <>
              Esconder <ChevronUp size={16} />
            </>
          ) : (
            <>
              Leia Mais <ChevronDown size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
