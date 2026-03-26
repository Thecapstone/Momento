export const VisibilityCard = ({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-3 py-8 rounded-2xl border-2 transition-all ${
      isActive
        ? "bg-[#FDF2E3] border-[#344E41] text-[#344E41]"
        : "bg-[#FDF2E3] border-transparent text-neutral-400 grayscale"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);