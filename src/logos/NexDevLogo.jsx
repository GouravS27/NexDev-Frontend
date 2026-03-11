const NexDevLogo = ({ width = 200, height = 60 }) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 420 140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5f0fef" />
            <stop offset="100%" stopColor="#00b4d8" />
          </linearGradient>
        </defs>

        {/* Abstract N Shape */}
        <path
          d="M40 100 L40 40 L80 100 L80 40"
          stroke="url(#mainGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Network Nodes */}
        <circle cx="40" cy="40" r="6" fill="#5f0fef" />
        <circle cx="80" cy="40" r="6" fill="#00b4d8" />
        <circle cx="80" cy="100" r="6" fill="#5f0fef" />

        {/* Brand Name */}
        <text
          x="120"
          y="85"
          fontSize="48"
          fontFamily="Poppins, Arial, sans-serif"
          fontWeight="700"
          fill="url(#mainGradient)"
        >
          NexDev
        </text>
      </svg>
    </div>
  );
};

export default NexDevLogo;
