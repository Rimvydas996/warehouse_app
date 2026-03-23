import { useState, type FormEvent } from "react";
import type { IWarehouseMember } from "../../../../types/models/IWarehouse";
import type { UserRole } from "../../../../types/models/IUser";

interface IWarehouseUsersManagerProps {
  members: IWarehouseMember[];
  currentUserId?: string;
  isAdmin: boolean;
  isUpdating: boolean;
  onAddUser: (email: string, role: UserRole) => void;
  onUpdateRole: (userId: string, role: UserRole) => void;
  onRemoveUser: (userId: string) => void;
}

export default function WarehouseUsersManager({
  members,
  currentUserId,
  isAdmin,
  isUpdating,
  onAddUser,
  onUpdateRole,
  onRemoveUser,
}: IWarehouseUsersManagerProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("member");

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    onAddUser(trimmed, role);
    setEmail("");
  };

  return (
    <section className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-amber-200">
      <h3 className="text-lg font-semibold text-amber-900 mb-3">Users</h3>

      {isAdmin && (
        <form className="flex flex-col md:flex-row gap-3 mb-4" onSubmit={handleAdd}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="User email"
            className="w-full md:flex-1 px-3 py-2 border border-amber-300 rounded"
            disabled={isUpdating}
          />
          <select
            value={role}
            onChange={(event) => setRole(event.target.value as UserRole)}
            className="w-full md:w-40 px-2 py-2 border border-amber-300 rounded bg-white"
            disabled={isUpdating}
          >
            <option value="member">Member</option>
            <option value="manager">Manager</option>
          </select>
          <button
            type="submit"
            className="
              bg-amber-200 px-3 py-2
              rounded-lg border border-amber-300
              hover:bg-amber-300 hover:shadow-md
              transition-all duration-200
              text-amber-900
              disabled:opacity-60 disabled:cursor-not-allowed
            "
            disabled={isUpdating || !email.trim()}
          >
            Add user
          </button>
        </form>
      )}

      <ul className="space-y-2">
        {members.map((member) => {
          const isSelf = currentUserId === member._id;

          return (
            <li
              key={member._id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-amber-50 border border-amber-200 px-3 py-2 rounded"
            >
              <div>
                <p className="text-amber-900 text-sm font-medium">{member.email}</p>
                <p className="text-amber-700 text-xs">Role: {member.role}</p>
              </div>
              {isAdmin && (
                <div className="flex flex-col md:flex-row gap-2">
                  <select
                    value={member.role}
                    onChange={(event) =>
                      onUpdateRole(member._id, event.target.value as UserRole)
                    }
                    className="w-full md:w-36 px-2 py-1 border border-amber-300 rounded bg-white"
                    disabled={isUpdating || isSelf}
                  >
                    <option value="member">Member</option>
                    <option value="manager">Manager</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => onRemoveUser(member._id)}
                    className="text-red-700 text-xs font-medium"
                    disabled={isUpdating || isSelf}
                  >
                    Remove
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
