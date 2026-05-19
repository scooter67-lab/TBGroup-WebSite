export default function CrudTable({ columns, rows, onEdit, onDelete, extraActions }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="text-left px-4 py-3 font-semibold">
                {c.label}
              </th>
            ))}
            <th className="px-4 py-3 w-32">Действия</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-b hover:bg-gray-50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
              <td className="px-4 py-3 space-x-2">
                {extraActions?.(row)}
                <button type="button" onClick={() => onEdit(row)} className="text-admin-accent hover:underline">
                  Изм.
                </button>
                <button type="button" onClick={() => onDelete(row._id)} className="text-red-500 hover:underline">
                  Удал.
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
