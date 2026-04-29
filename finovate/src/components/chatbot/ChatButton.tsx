import robot from "../../assets/robot.png";

export function ChatButton({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 safe-area-bottom safe-area-right animate-float group">
      <button
        type="button"
        onClick={onClick}
        aria-label="Open Finovate AI Assistant"
        className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-xl focus:outline-none focus:ring-4 focus:ring-[#0066cc]/35"
      >
        <div className="absolute inset-0 rounded-full bg-[#d9ebff] opacity-50 animate-pulse" />
        <div className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 border-2 border-white rounded-full" />
        <div className="relative z-10 animate-bounce-gentle">
          <img
            src={robot}
            alt="AI Robot"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-sm"
          />
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-300 rounded-full animate-ping opacity-60" />
        {/* <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3b82f6] rounded-full animate-pulse opacity-50" /> */}
        <div className="absolute inset-0 rounded-full border border-[#93c5fd] opacity-30 animate-spin animation-duration-3000" />
      </button>

      <div className="pointer-events-none absolute bottom-full right-0 mb-3 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="relative rounded-full bg-[#182337] text-white text-xs sm:text-sm font-medium px-4 py-2 shadow-lg">
          Ask Nabeeh
          <span className="absolute right-5 -bottom-1 h-2 w-2 rotate-45 bg-slate-900/90" />
        </div>
      </div>

      {/*
			<div className="relative w-[240px] sm:w-[280px] md:w-[320px]">
				<div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-xl z-20">
					<div className="absolute inset-0 rounded-full bg-[#d9ebff] opacity-50 animate-pulse" />
					<div className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 border-2 border-white rounded-full" />
					<div className="relative z-10 animate-bounce-gentle">
						<img
							src={robot}
							alt="AI Robot"
							className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-sm"
						/>
					</div>
					<div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-300 rounded-full animate-ping opacity-60" />
					<div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3b82f6] rounded-full animate-pulse opacity-50" />
					<div className="absolute inset-0 rounded-full border border-[#93c5fd] opacity-30 animate-spin animation-duration-3000" />
				</div>

				<div className="relative bg-gradient-to-br from-[#0066cc] via-[#0052a3] to-[#003b7a] rounded-3xl shadow-2xl hover:shadow-[#0066cc]/35 transition-all duration-300">
					<button
						type="button"
						onClick={onClick}
						aria-label="Open Finovate AI Assistant"
						className="absolute inset-0 rounded-3xl focus:outline-none focus:ring-4 focus:ring-[#0066cc]/35"
					>
						<span className="sr-only">Open Finovate AI Assistant</span>
					</button>

					<button
						type="button"
						onClick={onClick}
						aria-label="Open Finovate AI Assistant"
						className="w-full relative pt-12 pb-4 px-6 text-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#0066cc]/35 rounded-t-3xl">
						<h3 className="font-bold text-white text-base sm:text-lg mb-1">
							<span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent animate-gradient-x">
								Nabeeh
							</span>{" "}
							The Bot
						</h3>
						<div className="absolute inset-0 rounded-t-3xl bg-[#60a5fa] opacity-10 animate-pulse pointer-events-none" />
						<div className="absolute inset-0 rounded-t-3xl bg-cyan-300 opacity-5 animate-ping animation-delay-1000 pointer-events-none" />
					</button>

					<div
						onClick={onClick}
						className="relative bg-white rounded-b-3xl shadow-lg p-4 sm:p-5 cursor-pointer hover:shadow-xl transition-all duration-300">
						<div className="absolute -top-2 left-1/2 -translate-x-1/2 rotate-45 w-4 h-4 bg-white" />
						<p className="text-sm sm:text-base text-slate-800 leading-relaxed relative z-10">
							Hello! I&apos;m{" "}
							<span className="font-bold bg-gradient-to-r from-[#0066cc] via-cyan-500 to-[#003b7a] bg-clip-text text-transparent animate-gradient-x">
								Nabeeh
							</span>
							, How can I assist you today as the Finovate Virtual Assistant?
						</p>
						<div className="absolute inset-0 rounded-b-3xl bg-gradient-to-br from-[#eff6ff]/80 to-cyan-50/60 -z-10 pointer-events-none" />
					</div>
				</div>
			</div>
			*/}
    </div>
  );
}
