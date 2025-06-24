"use client";

const CopyCodeButton = ({ code }: { code: string }) => {
  if (!code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Copied to clipboard");
  };

  return (
    <button
      type="button"
      className="bg-foreground px-4 py-2 text-background text-sm"
      onClick={handleCopy}
    >
      Copy code
    </button>
  );
};

export default CopyCodeButton;
