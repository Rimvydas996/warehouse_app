import { useState, type FormEvent } from "react";
import { SubmitButton } from "../../../common";

interface IWarehouseCreateFormProps {
  onCreate: (name: string) => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
  variant?: "card" | "inline";
  showTitle?: boolean;
}

export default function WarehouseCreateForm({
  onCreate,
  isSubmitting,
  error,
  variant = "card",
  showTitle = true,
}: IWarehouseCreateFormProps) {
  const [name, setName] = useState("");
  const isInline = variant === "inline";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    await onCreate(trimmed);
  };

  return (
    <div className={isInline ? "theme-card p-4 md:p-6" : "theme-card p-4 md:p-6"}>
      {showTitle && <h2 className="text-xl font-semibold theme-label mb-3">Create Warehouse</h2>}
      <form className="flex flex-col md:flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Warehouse name"
          className="w-full md:flex-1 px-3 py-2 rounded theme-input"
          disabled={isSubmitting}
        />
        <SubmitButton
          buttonText="Create"
          isLoading={isSubmitting}
          loadingText="Creating..."
          disabled={!name.trim()}
        />
      </form>
      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
    </div>
  );
}
