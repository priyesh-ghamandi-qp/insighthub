const repositories = [
  { id: 1, name: "QuestionPro Surveys", starred: true, owner: "ME", lastModified: "Apr 16, 2026", modifiedBy: "ME", totalSize: null },
  { id: 2, name: "PABs", starred: false, owner: "ME", lastModified: "May 8, 2026", modifiedBy: "ME", totalSize: null },
  { id: 3, name: "Interviews", starred: false, owner: "ME", lastModified: "Apr 23, 2026", modifiedBy: null, totalSize: null },
  { id: 4, name: "00 - Google Drive", starred: false, owner: "ME", lastModified: "Apr 22, 2026", modifiedBy: null, totalSize: null },
  { id: 5, name: "New Test", starred: false, owner: "ME", lastModified: "Apr 16, 2026", modifiedBy: null, totalSize: null },
  { id: 6, name: "Google Drive - IH Sync", starred: false, owner: "ME", lastModified: "Jun 19, 2025", modifiedBy: "ME", totalSize: "8589934592.00 GB" },
  { id: 7, name: "Google Drive - IH Sync", starred: false, owner: "ME", lastModified: "Jun 11, 2025", modifiedBy: "ME", totalSize: "8589934592.00 GB" },
  { id: 8, name: "Google Drive - IH Sync", starred: false, owner: "ME", lastModified: "Jun 11, 2025", modifiedBy: "ME", totalSize: "8589934592.00 GB" },
  { id: 9, name: "Google Drive - IH Sync", starred: false, owner: "ME", lastModified: "Jun 11, 2025", modifiedBy: "ME", totalSize: "8589934592.00 GB" },
  { id: 10, name: "SharePoint_Coke", starred: false, owner: "ME", lastModified: "Apr 1, 2025", modifiedBy: "ME", totalSize: "29.52 MB" },
  { id: 11, name: "My Repo", starred: false, owner: "ME", lastModified: "Jan 28, 2025", modifiedBy: "ME", totalSize: null },
  { id: 12, name: "Test", starred: false, owner: "ME", lastModified: "Jan 23, 2025", modifiedBy: "ME", totalSize: null },
];

function SortIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline ml-1 text-gray-400">
      <path d="M7 2l2.5 3.5h-5L7 2zM7 12l-2.5-3.5h5L7 12z" fill="currentColor"/>
    </svg>
  );
}

function StorageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="4" rx="6" ry="2" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M2 4v4c0 1.105 2.686 2 6 2s6-.895 6-2V4" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M2 8v4c0 1.105 2.686 2 6 2s6-.895 6-2V8" stroke="currentColor" strokeWidth="1.25"/>
    </svg>
  );
}

function QuestionProIcon() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold">
      P
    </span>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline ml-1.5 shrink-0">
      <path
        d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.441L7 8.885l-3.09 1.625.59-3.441L2 4.632l3.455-.502L7 1z"
        fill={filled ? "#f59e0b" : "none"}
        stroke={filled ? "#f59e0b" : "#d1d5db"}
        strokeWidth="1"
      />
    </svg>
  );
}

export default function RepositoriesPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-5">Repositories</h1>

        {/* Action bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3.5 py-2 rounded transition-colors">
              <PlusIcon />
              New repository
            </button>
            <button className="flex items-center gap-1.5 text-blue-500 hover:text-blue-600 text-sm font-medium px-1 py-2 transition-colors">
              <QuestionProIcon />
              Surveys connected
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <span className="font-medium text-gray-700">42</span>
            <StorageIcon />
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="w-10 px-3 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-3 py-3 text-left font-medium text-gray-600">
                  Name <SortIcon />
                </th>
                <th className="px-3 py-3 text-left font-medium text-gray-600">
                  Owner <SortIcon />
                </th>
                <th className="px-3 py-3 text-left font-medium text-gray-600">
                  Last modified <SortIcon />
                </th>
                <th className="px-3 py-3 text-left font-medium text-gray-600">
                  Total size
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {repositories.map((repo) => (
                <tr key={repo.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center">
                      <a href="#" className="text-blue-500 hover:text-blue-700 hover:underline font-medium">
                        {repo.name}
                      </a>
                      {repo.starred && <StarIcon filled />}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold">
                        PG
                      </span>
                      <span className="text-gray-600">{repo.owner}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-gray-600">
                    <span>{repo.lastModified}</span>
                    {repo.modifiedBy && (
                      <span className="ml-1.5 text-xs text-gray-400">{repo.modifiedBy}</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-gray-500">
                    {repo.totalSize ?? <span className="text-gray-300">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 px-8 py-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">Partner License</span>
      </div>
    </div>
  );
}
