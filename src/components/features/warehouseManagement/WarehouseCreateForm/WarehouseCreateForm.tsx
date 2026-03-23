import { useState, type FormEvent } from "react";
import { SubmitButton } from "../../../common";

interface IWarehouseCreateFormProps {
  onCreate: (name: string) => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
}

export default function WarehouseCreateForm({
  onCreate,
  isSubmitting,
  error,
}: IWarehouseCreateFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    await onCreate(trimmed);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-amber-200">
      <h2 className="text-xl font-semibold text-amber-900 mb-3">Create Warehouse</h2>
      <form className="flex flex-col md:flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Warehouse name"
          className="w-full md:flex-1 px-3 py-2 border border-amber-300 rounded"
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
