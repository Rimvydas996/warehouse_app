import { useState, type FormEvent } from "react";
import type { IHomeContainer } from "../../../../types/models/IWarehouse";

interface IWarehouseHomeContainersManagerProps {
  containers: IHomeContainer[];
  onAddContainer: (title: string, description: string, tasks: string) => void;
  onRemoveContainer: (containerId: string) => void;
  onUpdateTasks: (containerId: string, tasks: string) => void;
  isUpdating: boolean;
}

export default function WarehouseHomeContainersManager({
  containers,
  onAddContainer,
  onRemoveContainer,
  onUpdateTasks,
  isUpdating,
}: IWarehouseHomeContainersManagerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [taskDrafts, setTaskDrafts] = useState<Record<string, string>>({});

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedTasks = tasks.trim();
    if (!trimmedTitle || !trimmedDescription || !trimmedTasks) return;
    onAddContainer(trimmedTitle, trimmedDescription, trimmedTasks);
    setTitle("");
    setDescription("");
    setTasks("");
  };

  const startEdit = (container: IHomeContainer) => {
    setEditingId(container._id);
    setTaskDrafts((prev) => ({
      ...prev,
      [container._id]: container.tasks ?? "",
    }));
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveTasks = (containerId: string) => {
    const draft = (taskDrafts[containerId] ?? "").trim();
    if (!draft) return;
    onUpdateTasks(containerId, draft);
    setEditingId(null);
  };

  const handleDraftChange = (containerId: string, value: string) => {
    setTaskDrafts((prev) => ({ ...prev, [containerId]: value }));
  };

  return (
    <section className="theme-card p-4 md:p-6">
      <h3 className="text-lg font-semibold theme-label mb-3">Home info containers</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4" onSubmit={handleAdd}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Container title"
          className="w-full px-3 py-2 rounded theme-input"
          disabled={isUpdating}
        />
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Container description"
          className="w-full px-3 py-2 rounded theme-input"
          disabled={isUpdating}
        />
        <textarea
          value={tasks}
          onChange={(event) => setTasks(event.target.value)}
          placeholder="Tasks information"
          className="w-full md:col-span-2 px-3 py-2 rounded theme-input min-h-[96px]"
          disabled={isUpdating}
        />
        <button
          type="submit"
          className="theme-button px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed md:col-span-2"
          disabled={isUpdating || !title.trim() || !description.trim() || !tasks.trim()}
        >
          Add container
        </button>
      </form>

      {containers.length === 0 ? (
        <p className="theme-muted text-sm">No containers yet. Add one to show on the homepage.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {containers.map((container) => (
            <li key={container._id} className="theme-subtle flex flex-col gap-2 px-3 py-3">
              <div>
                <p className="theme-label text-sm font-semibold">{container.title}</p>
                <p className="theme-muted text-sm">{container.description}</p>
                {editingId === container._id ? (
                  <div className="mt-2 space-y-2">
                    <textarea
                      value={taskDrafts[container._id] ?? ""}
                      onChange={(event) => handleDraftChange(container._id, event.target.value)}
                      className="w-full px-3 py-2 rounded theme-input min-h-[96px]"
                      disabled={isUpdating}
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveTasks(container._id)}
                        className="theme-button px-3 py-2 rounded-lg transition-all duration-200"
                        disabled={isUpdating || !(taskDrafts[container._id] ?? "").trim()}
                      >
                        Save tasks
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="theme-button px-3 py-2 rounded-lg transition-all duration-200"
                        disabled={isUpdating}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 space-y-2">
                    <p className="theme-muted text-sm whitespace-pre-line">{container.tasks}</p>
                    <button
                      type="button"
                      onClick={() => startEdit(container)}
                      className="theme-button px-3 py-2 rounded-lg transition-all duration-200 w-fit"
                      disabled={isUpdating}
                    >
                      Edit tasks
                    </button>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemoveContainer(container._id)}
                className="text-red-700 text-xs font-medium self-start"
                disabled={isUpdating}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
