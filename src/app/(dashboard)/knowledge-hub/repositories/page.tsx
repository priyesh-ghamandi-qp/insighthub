'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useId, useState, type CSSProperties } from 'react';
import type { IWuTableColumnDef } from '@npm-questionpro/wick-ui-lib';
import { SelectableCard } from '@/components/ui/SelectableCard';

const WuButton = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuButton })),
  { ssr: false }
);
const WuTable = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuTable })),
  { ssr: false }
);
const WuInput = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuInput })),
  { ssr: false }
);
const WuTextarea = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuTextarea })),
  { ssr: false }
);

// ─── Types ────────────────────────────────────────────────────────────────────

type Repository = {
  id: number;
  name: string;
  starred: boolean;
  owner: string;
  lastModified: string;
  modifiedBy: string | null;
  totalSize: string | null;
  aiLayerCount: number;
  aiStatus: 'Idle' | 'Processing' | 'Failed';
  classification: 'Positive' | 'Neutral' | 'Negative' | '-';
  extraction: string;
  insight: string;
};

type LayerType = 'Classification' | 'Extraction' | 'Insight';

type Layer = {
  id: number;
  name: string;
  type: LayerType;
  description: string;
  usage: string;
  sample: string;
  lastActivity: string;
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const repositories: Repository[] = [
  { id: 1, name: 'QuestionPro Surveys', starred: true, owner: 'ME', lastModified: 'Apr 16, 2026', modifiedBy: 'ME', totalSize: null, aiLayerCount: 4, aiStatus: 'Processing', classification: 'Positive', extraction: 'Industry: SaaS', insight: 'Positive sentiment trends with setup friction in first run.' },
  { id: 2, name: 'PABs', starred: false, owner: 'ME', lastModified: 'May 8, 2026', modifiedBy: 'ME', totalSize: null, aiLayerCount: 3, aiStatus: 'Idle', classification: 'Neutral', extraction: 'Journey: Activation', insight: 'Mixed comments focus on onboarding clarity and speed.' },
  { id: 3, name: 'Interviews', starred: false, owner: 'ME', lastModified: 'Apr 23, 2026', modifiedBy: null, totalSize: null, aiLayerCount: 5, aiStatus: 'Idle', classification: 'Negative', extraction: 'Competitor: Lorem Ipsum', insight: 'Frequent pain point: navigation complexity for new users.' },
  { id: 4, name: '00 - Google Drive', starred: false, owner: 'ME', lastModified: 'Apr 22, 2026', modifiedBy: null, totalSize: null, aiLayerCount: 2, aiStatus: 'Processing', classification: '-', extraction: '-', insight: 'Enrichment in progress for recently synced files.' },
  { id: 5, name: 'New Test', starred: false, owner: 'ME', lastModified: 'Apr 16, 2026', modifiedBy: null, totalSize: null, aiLayerCount: 2, aiStatus: 'Failed', classification: '-', extraction: '-', insight: 'Last run failed due to malformed transcript block.' },
  { id: 6, name: 'Google Drive - IH Sync', starred: false, owner: 'ME', lastModified: 'Jun 19, 2025', modifiedBy: 'ME', totalSize: '8589934592.00 GB', aiLayerCount: 4, aiStatus: 'Idle', classification: 'Positive', extraction: 'Persona: Research Lead', insight: 'Insights indicate confidence in reporting depth.' },
  { id: 7, name: 'Google Drive - IH Sync', starred: false, owner: 'ME', lastModified: 'Jun 11, 2025', modifiedBy: 'ME', totalSize: '8589934592.00 GB', aiLayerCount: 4, aiStatus: 'Idle', classification: 'Neutral', extraction: 'Industry: Retail', insight: 'Comments are balanced; feature discoverability is moderate.' },
  { id: 8, name: 'Google Drive - IH Sync', starred: false, owner: 'ME', lastModified: 'Jun 11, 2025', modifiedBy: 'ME', totalSize: '8589934592.00 GB', aiLayerCount: 4, aiStatus: 'Idle', classification: 'Negative', extraction: 'Journey: Retention', insight: 'Users cite recurring export limitations.' },
  { id: 9, name: 'Google Drive - IH Sync', starred: false, owner: 'ME', lastModified: 'Jun 11, 2025', modifiedBy: 'ME', totalSize: '8589934592.00 GB', aiLayerCount: 4, aiStatus: 'Processing', classification: '-', extraction: '-', insight: 'AI layers are currently classifying newly synced files.' },
  { id: 10, name: 'SharePoint_Coke', starred: false, owner: 'ME', lastModified: 'Apr 1, 2025', modifiedBy: 'ME', totalSize: '29.52 MB', aiLayerCount: 5, aiStatus: 'Idle', classification: 'Positive', extraction: 'Industry: Beverage', insight: 'Strong positive signal for packaging and brand recall.' },
  { id: 11, name: 'My Repo', starred: false, owner: 'ME', lastModified: 'Jan 28, 2025', modifiedBy: 'ME', totalSize: null, aiLayerCount: 0, aiStatus: 'Idle', classification: '-', extraction: '-', insight: 'No AI layers configured for this repository yet.' },
  { id: 12, name: 'Test', starred: false, owner: 'ME', lastModified: 'Jan 23, 2025', modifiedBy: 'ME', totalSize: null, aiLayerCount: 1, aiStatus: 'Idle', classification: 'Neutral', extraction: 'Output: Short text', insight: 'Early signal quality is stable but needs richer instructions.' },
];

const layers: Layer[] = [
  { id: 1, name: 'Sentiment', type: 'Classification', description: 'Categorizes each file as Positive, Neutral, or Negative', usage: '1,042 files', sample: 'Positive', lastActivity: '2 min ago' },
  { id: 2, name: 'Industry', type: 'Extraction', description: 'Extracts the primary industry mentioned in the content', usage: '988 files', sample: 'SaaS', lastActivity: '5 min ago' },
  { id: 3, name: 'Main Pain Point', type: 'Insight', description: 'Generates a concise summary of the core customer frustration', usage: '965 files', sample: 'Onboarding complexity', lastActivity: '8 min ago' },
];

// ─── Layer type config ────────────────────────────────────────────────────────

const TYPE_BADGE: Record<LayerType, string> = {
  Classification: 'bg-purple-50 text-purple-700 border-purple-100',
  Extraction:     'bg-blue-50 text-blue-700 border-blue-100',
  Insight:        'bg-amber-50 text-amber-700 border-amber-100',
};

const LAYER_TYPE_OPTIONS: { value: LayerType; title: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'Classification',
    title: 'Classification',
    description: 'Assign a category or label to each file',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    value: 'Extraction',
    title: 'Extraction',
    description: 'Pull structured data points from content',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    value: 'Insight',
    title: 'Insight',
    description: 'Generate a natural language summary or analysis',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
      </svg>
    ),
  },
];

const PROMPT_SUGGESTIONS: Record<LayerType, string[]> = {
  Classification: [
    'Categorize sentiment as Positive, Neutral, or Negative',
    'Classify urgency as High, Medium, or Low',
    'Label by customer journey stage',
  ],
  Extraction: [
    'Extract mentioned competitors',
    'Pull out product names referenced',
    'Identify key dates or milestones',
  ],
  Insight: [
    'Summarize customer frustrations',
    'Identify onboarding pain points',
    'What are users saying about pricing?',
  ],
};

const SAMPLE_FILES = [
  'interview_transcript_01.pdf',
  'survey_responses_q1.csv',
  'usability_session_03.mp4',
  'customer_feedback_may.txt',
];

type SelectOption = { value: string; label: string };

const OUTPUT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'Short Text', label: 'Short Text' },
  { value: 'Number',     label: 'Number' },
  { value: 'Date',       label: 'Date' },
  { value: 'List',       label: 'List' },
];

const OUTPUT_LENGTH_OPTIONS: SelectOption[] = [
  { value: 'Short', label: 'Short' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Detailed', label: 'Detailed' },
];

const SAMPLE_FILE_OPTIONS: SelectOption[] = SAMPLE_FILES.map((f) => ({ value: f, label: f }));

const NATIVE_OUTLINED_SELECT_STYLE: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.5rem 0.75rem',
  border: '1px solid #e5e7eb',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  lineHeight: 1.25,
  backgroundColor: '#fff',
  color: '#374151',
  cursor: 'pointer',
};

const PREVIEW_RESULTS: Record<LayerType, (outputType: string, outputLength: string) => string> = {
  Classification: () => 'Neutral',
  Extraction: (outputType) =>
    outputType === 'List'
      ? 'Lorem Ipsum, Lorem Ipsum, Lorem Ipsum'
      : outputType === 'Number'
        ? '3'
        : outputType === 'Date'
          ? 'Jan 15, 2026'
          : 'Lorem Ipsum',
  Insight: (_, outputLength) =>
    outputLength === 'Short'
      ? 'Onboarding friction is a recurring barrier for new users.'
      : outputLength === 'Detailed'
        ? 'Users consistently identify onboarding complexity as a critical barrier. Key themes include unclear first-run instructions, navigation friction, and a steep learning curve for new accounts. Several respondents cited the branching setup as particularly confusing.'
        : 'Customers consistently struggle with onboarding complexity and unclear setup instructions.',
};

// ─── Repository table columns (unchanged) ─────────────────────────────────────

function StatusIndicator({ status }: { status: Repository['aiStatus'] }) {
  const dot =
    status === 'Idle'       ? 'bg-emerald-500' :
    status === 'Processing' ? 'bg-blue-500 animate-pulse' :
                              'bg-rose-500';
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
      <span>{status}</span>
    </div>
  );
}

function ClassificationChip({ value }: { value: Repository['classification'] }) {
  if (value === '-') return <span className="text-gray-300">-</span>;
  const tone =
    value === 'Positive' ? 'border-emerald-100 bg-emerald-50 text-emerald-700' :
    value === 'Neutral'  ? 'border-amber-100 bg-amber-50 text-amber-700' :
                           'border-rose-100 bg-rose-50 text-rose-700';
  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${tone}`}>{value}</span>;
}

const COLUMNS: IWuTableColumnDef<Repository>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <a href="#" className="text-blue-500 hover:text-blue-700 hover:underline font-medium">
          {row.original.name}
        </a>
        {row.original.starred && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b" className="shrink-0">
            <path d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.441L7 8.885l-3.09 1.625.59-3.441L2 4.632l3.455-.502L7 1z" />
          </svg>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'aiLayerCount',
    header: 'AI layers',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">{row.original.aiLayerCount}</span>
        {row.original.aiLayerCount > 0 && (
          <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs text-blue-700">AI enabled</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'aiStatus',
    header: 'AI activity',
    cell: ({ row }) => <span className="text-sm text-gray-600"><StatusIndicator status={row.original.aiStatus} /></span>,
  },
  {
    accessorKey: 'classification',
    header: 'Classification',
    cell: ({ row }) => <ClassificationChip value={row.original.classification} />,
  },
  {
    accessorKey: 'extraction',
    header: 'Extraction',
    cell: ({ row }) => (
      <span className="text-gray-600">
        {row.original.extraction === '-' ? <span className="text-gray-300">-</span> : row.original.extraction}
      </span>
    ),
  },
  {
    accessorKey: 'insight',
    header: 'Insight preview',
    cell: ({ row }) => <span className="text-gray-600 line-clamp-1 max-w-[260px]">{row.original.insight}</span>,
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0">PG</span>
        <span className="text-gray-600">{row.original.owner}</span>
      </div>
    ),
  },
  {
    accessorKey: 'lastModified',
    header: 'Last modified',
    cell: ({ row }) => (
      <span className="text-gray-600">
        {row.original.lastModified}
        {row.original.modifiedBy && <span className="ml-1.5 text-xs text-gray-400">{row.original.modifiedBy}</span>}
      </span>
    ),
  },
  {
    accessorKey: 'totalSize',
    header: 'Total size',
    cell: ({ row }) => (
      <span className="text-gray-500">
        {row.original.totalSize ?? <span className="text-gray-300">-</span>}
      </span>
    ),
  },
];

// ─── AI Layers table columns (enhanced) ──────────────────────────────────────

const LAYER_COLUMNS: IWuTableColumnDef<Layer>[] = [
  {
    accessorKey: 'name',
    header: 'Layer',
    cell: ({ row }) => (
      <span className="text-sm font-medium text-gray-900">{row.original.name}</span>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${TYPE_BADGE[row.original.type]}`}>
        {row.original.type}
      </span>
    ),
  },
  {
    accessorKey: 'usage',
    header: 'Usage',
    cell: ({ row }) => <span className="text-sm text-gray-600">{row.original.usage}</span>,
  },
  {
    accessorKey: 'lastActivity',
    header: 'Last activity',
    cell: ({ row }) => <span className="text-xs text-gray-400">{row.original.lastActivity}</span>,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInputValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const v = value as { target?: { value?: string }; detail?: { value?: string }; value?: string };
    return v.target?.value ?? v.detail?.value ?? v.value ?? '';
  }
  return '';
}

function StorageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="4" rx="6" ry="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2 4v4c0 1.105 2.686 2 6 2s6-.895 6-2V4" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2 8v4c0 1.105 2.686 2 6 2s6-.895 6-2V8" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function QuestionProIcon() {
  return <span className="wc-logo"></span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RepositoriesPage() {
  const [selectedRows, setSelectedRows] = useState<Repository[]>([]);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState<'overview' | 'create'>('overview');

  // Create form state
  const [layerName, setLayerName]       = useState('');
  const [layerType, setLayerType]       = useState<LayerType>('Classification');
  const [instructions, setInstructions] = useState('');
  const [allowedTags, setAllowedTags]   = useState<string[]>(['Positive', 'Neutral', 'Negative']);
  const [tagInput, setTagInput]         = useState('');
  const [outputType, setOutputType]     = useState('Short Text');
  const [outputLength, setOutputLength] = useState('Medium');
  const [selectedFile, setSelectedFile] = useState('');
  const [testState, setTestState]       = useState<'idle' | 'running' | 'done'>('idle');
  const [nameError, setNameError]       = useState(false);
  const allowedValuesShellId = `avs-${useId().replace(/:/g, '')}`;

  function openDrawer() {
    setDrawerView('overview');
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  function goToCreate() {
    setLayerName('');
    setLayerType('Classification');
    setInstructions('');
    setAllowedTags(['Positive', 'Neutral', 'Negative']);
    setTagInput('');
    setOutputType('Short Text');
    setOutputLength('Medium');
    setSelectedFile('');
    setTestState('idle');
    setNameError(false);
    setDrawerView('create');
  }

  function goToOverview() {
    setDrawerView('overview');
  }

  function commitTag() {
    const val = tagInput.trim().replace(/,+$/, '');
    if (val && !allowedTags.includes(val)) {
      setAllowedTags([...allowedTags, val]);
    }
    setTagInput('');
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commitTag();
    } else if (e.key === 'Backspace' && !tagInput && allowedTags.length > 0) {
      setAllowedTags(allowedTags.slice(0, -1));
    }
  }

  function runPreview() {
    setTestState('running');
    window.setTimeout(() => setTestState('done'), 1400);
  }

  function handleSave() {
    if (!layerName.trim()) {
      setNameError(true);
      return;
    }
    goToOverview();
  }

  return (
    <div className="flex flex-col h-full">

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <h3 style={{ fontSize: '24px', lineHeight: '44px', color: '#545e6b', fontWeight: 400, marginBottom: '15px' }}>
          Repositories
        </h3>

        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2.5 mb-4 text-sm text-blue-800 flex items-center justify-between">
          <span>AI enrichment is active. Changes to AI Layers apply only to newly added content.</span>
          <button className="text-blue-700 hover:underline font-medium" onClick={openDrawer}>
            Manage AI Layers
          </button>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <WuButton variant="primary" Icon={<PlusIcon />} iconPosition="left">
              New repository
            </WuButton>
            <WuButton variant="secondary" Icon={<QuestionProIcon />} iconPosition="left">
              Surveys connected
            </WuButton>
            <WuButton variant="secondary" onClick={openDrawer}>
              AI Layers
            </WuButton>
          </div>
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1.5">
              <span className="text-xs text-gray-500">Classification</span>
              <ClassificationChip value="Positive" />
              <ClassificationChip value="Neutral" />
              <ClassificationChip value="Negative" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-gray-700">42</span>
              <StorageIcon />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <WuTable
            data={repositories}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            columns={COLUMNS as any}
            sort={{ enabled: true }}
            stickyHeader
            rowSelection={{
              isEnabled: true,
              selectedRows,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onRowSelect: setSelectedRows as any,
              rowUniqueKey: 'id',
            }}
          />
        </div>

        {/* <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-800">File Detail AI Enrichment Preview</h4>
            <Link href="#" className="text-xs text-blue-600 hover:underline">Open full details</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_1fr] gap-3 text-sm">
            <div className="rounded-md border border-gray-200 p-3">
              <p className="text-xs text-gray-500 mb-1">Classification</p>
              <ClassificationChip value="Negative" />
            </div>
            <div className="rounded-md border border-gray-200 p-3">
              <p className="text-xs text-gray-500 mb-1">Extraction</p>
              <p className="text-gray-700">Industry: SaaS</p>
              <p className="text-gray-700">Journey Stage: Activation</p>
            </div>
            <div className="rounded-md border border-gray-200 p-3">
              <p className="text-xs text-gray-500 mb-1">Insight</p>
              <p className="text-gray-700">
                Customers value flexibility but report confusion in early setup. Evidence: "Branching took too long to configure."
              </p>
            </div>
          </div>
        </div> */}
      </div>

      {/* ── AI Layers drawer ──────────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={closeDrawer} />

          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-[720px] bg-white border-l border-gray-200 shadow-xl flex flex-col">

            {/* Header — switches based on view */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-start justify-between shrink-0">
              {drawerView === 'overview' ? (
                <>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">AI Layers</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Repository scoped. Applies to new content only.</p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <WuButton variant="primary" onClick={goToCreate}>
                      Create AI Layer
                    </WuButton>
                    <button
                      onClick={closeDrawer}
                      className="p-1.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <button
                      onClick={goToOverview}
                      className="mt-0.5 p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      aria-label="Back to overview"
                    >
                      <BackIcon />
                    </button>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">Create AI Layer</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Teach AI how to analyze incoming repository content.</p>
                    </div>
                  </div>
                  <button
                    onClick={closeDrawer}
                    className="p-1.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors mt-0.5"
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </button>
                </>
              )}
            </div>

            {/* ── STATE 1: AI Layers Overview ──────────────────────────── */}
            {drawerView === 'overview' && (
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <WuTable
                    data={layers}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    columns={LAYER_COLUMNS as any}
                    sort={{ enabled: true }}
                    stickyHeader
                  />
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  {layers.length} active layer{layers.length !== 1 ? 's' : ''}. New files added to this repository are automatically enriched.
                </p>
              </div>
            )}

            {/* ── STATE 2: Create AI Layer ──────────────────────────────── */}
            {drawerView === 'create' && (
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                  {/* 1. Layer Name */}
                  <div>
                    <label className="block text-base font-medium text-[#545e6b] mb-[10px]">Layer Name</label>
                    <WuInput
                      value={layerName}
                      onChange={(v: unknown) => { setLayerName(getInputValue(v)); setNameError(false); }}
                      placeholder="e.g. Journey Stage, Competitor, Urgency"
                    />
                    {nameError && (
                      <p className="text-xs text-rose-500 mt-1">Layer name is required.</p>
                    )}
                  </div>

                  {/* 2. Layer Type */}
                  <div>
                    <label className="block text-base font-medium text-[#545e6b] mb-[10px]">Layer Type</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                      {LAYER_TYPE_OPTIONS.map((option) => (
                        <SelectableCard
                          key={option.value}
                          title={option.title}
                          description={option.description}
                          icon={option.icon}
                          isSelected={layerType === option.value}
                          onClick={() => { setLayerType(option.value); setTestState('idle'); setSelectedFile(''); }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 3. AI Instructions */}
                  <div>
                    <label className="block text-base font-medium text-[#545e6b] mb-[10px]">AI Instructions</label>
                    {/* <p className="text-xs text-gray-400 mb-10">
                      Describe what the AI should do with each file. Or pick a starting point below.
                    </p> */}
                    {/* Prompt suggestion chips */}
                    {/* <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {PROMPT_SUGGESTIONS[layerType].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => setInstructions(prompt)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            instructions === prompt
                              ? 'border-blue-400 bg-blue-50 text-blue-700'
                              : 'border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div> */}
                    <WuTextarea
                      value={instructions}
                      onChange={(v: unknown) => setInstructions(getInputValue(v))}
                      rows={3}
                      placeholder="Describe how the AI should analyze each file..."
                    />
                  </div>

                  {/* 4a. Classification — allowed values */}
                  {layerType === 'Classification' && (
                    <div>
                      <label className="block text-base font-medium text-[#545e6b] mb-[10px]">Allowed Values</label>
                      <p className="text-xs text-gray-400 mb-2" style={{ marginBottom: '10px' }}>
                        Define valid outputs. Press Enter or comma to add a value.
                      </p>
                      <style>{`
                        #${allowedValuesShellId}:focus-within {
                          border-color: #60a5fa;
                          box-shadow: 0 0 0 1px #60a5fa;
                        }
                      `}</style>
                      <div
                        id={allowedValuesShellId}
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.375rem',
                          padding: '0.625rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.375rem',
                          minHeight: '42px',
                          cursor: 'text',
                          transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onClick={(e) => (e.currentTarget.querySelector('input') as HTMLInputElement | null)?.focus()}
                      >
                        {allowedTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border bg-purple-50 text-purple-700 border-purple-100"
                          >
                            {tag}
                            <button
                              onClick={() => setAllowedTags(allowedTags.filter((v) => v !== tag))}
                              className="text-purple-400 hover:text-purple-700 leading-none"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                        <input
                          className="flex-1 min-w-[80px] outline-none text-xs text-gray-700 bg-transparent placeholder-gray-300"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleTagKeyDown}
                          onBlur={commitTag}
                          placeholder={allowedTags.length === 0 ? 'e.g. Positive' : ''}
                        />
                      </div>
                      {/* {allowedTags.length > 0 && (
                        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs text-gray-400">Preview:</span>
                          {allowedTags.map((v) => (
                            <span key={v} className="inline-flex px-2 py-0.5 rounded-full text-xs border bg-purple-50 text-purple-700 border-purple-100">
                              {v}
                            </span>
                          ))}
                        </div>
                      )} */}
                    </div>
                  )}

                  {/* 4b. Extraction — output type */}
                  {layerType === 'Extraction' && (
                    <div>
                      <label className="block text-base font-medium text-[#545e6b] mb-[10px]">Output Type</label>
                      <select
                        value={outputType}
                        onChange={(e) => setOutputType(e.target.value)}
                        style={NATIVE_OUTLINED_SELECT_STYLE}
                        aria-label="Output type"
                      >
                        {OUTPUT_TYPE_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <div className="mt-2 flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                        <span className="text-gray-400">Sample output:</span>
                        <span className="font-mono text-gray-700">
                          {outputType === 'List'   ? 'Lorem Ipsum, Lorem Ipsum, Lorem Ipsum' :
                           outputType === 'Number' ? '3' :
                           outputType === 'Date'   ? 'Jan 15, 2026' : 'Lorem Ipsum'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 4c. Insight — output length */}
                  {layerType === 'Insight' && (
                    <div>
                      <label className="block text-base font-medium text-[#545e6b] mb-[10px]">Output Length</label>
                      <select
                        value={outputLength}
                        onChange={(e) =>
                          setOutputLength(e.target.value as 'Short' | 'Medium' | 'Detailed')
                        }
                        style={NATIVE_OUTLINED_SELECT_STYLE}
                        aria-label="Output length"
                      >
                        {OUTPUT_LENGTH_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <div className="mt-2 rounded-md border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-800 italic">
                        {outputLength === 'Short'
                          ? '"Onboarding friction is a recurring barrier for new users."'
                          : outputLength === 'Detailed'
                            ? '"Users consistently identify onboarding complexity as a critical barrier. Key themes include unclear first-run instructions and a steep learning curve for new accounts."'
                            : '"Customers consistently struggle with onboarding complexity and unclear setup instructions."'}
                      </div>
                    </div>
                  )}

                  {/* 5. Preview AI Output */}
                  <div className="rounded-lg border border-gray-200">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-gray-800">Preview AI Output</p>
                        <p className="text-xs text-gray-400 mt-0.5">Run this layer on a sample file before saving.</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {[1, 2, 3].map((step) => {
                          const active = step === 1 ? true : step === 2 ? testState !== 'idle' : testState === 'done';
                          return (
                            <span key={step} className={`flex items-center gap-1 ${active ? 'text-blue-600 font-medium' : 'text-gray-300'}`}>
                              {step > 1 && <span className="text-gray-200 font-normal">·</span>}
                              {step}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Step 1 */}
                      <div>
                        <p style={{ marginBottom: '10px' }} className="text-xs text-gray-500 mb-[10px]">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold mr-1.5">1</span>
                          Select sample file
                        </p>
                        <select
                          value={selectedFile}
                          onChange={(e) => {
                            setSelectedFile(e.target.value);
                            setTestState('idle');
                          }}
                          style={NATIVE_OUTLINED_SELECT_STYLE}
                          aria-label="Sample file"
                        >
                          <option value="">Choose a file from this repository...</option>
                          {SAMPLE_FILE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Step 2 */}
                      <div>
                        <p style={{ marginBottom: '10px' }} className="text-xs text-gray-500 my-8">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold mr-1.5">2</span>
                          Run preview
                        </p>
                        <WuButton
                          variant="secondary"
                          disabled={!selectedFile || testState === 'running'}
                          loading={testState === 'running'}
                          onClick={runPreview}
                        >
                          {testState === 'running' ? 'Analyzing...' : 'Run Preview'}
                        </WuButton>
                      </div>

                      {/* Step 3 — result */}
                      {testState === 'done' && (
                        <div>
                          {/* <p className="text-xs text-gray-500 mb-1.5">
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-bold mr-1.5">3</span>
                            Generated output
                          </p> */}
                          <div className="rounded-md border border-blue-100 bg-blue-50 p-3">
                            <div className="flex items-center gap-1.5 mb-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                              <span className="text-xs font-medium text-blue-700">AI Generated · {selectedFile}</span>
                            </div>
                            {layerType === 'Classification' && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-blue-600">{layerName || 'Output'}:</span>
                                <span className="inline-flex px-2 py-0.5 rounded-full text-xs border bg-purple-50 text-purple-700 border-purple-100">
                                  {PREVIEW_RESULTS.Classification(outputType, outputLength)}
                                </span>
                              </div>
                            )}
                            {layerType === 'Extraction' && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-blue-600">{layerName || 'Output'}:</span>
                                <span className="font-mono text-xs text-blue-900 bg-white border border-blue-100 rounded px-1.5 py-0.5">
                                  {PREVIEW_RESULTS.Extraction(outputType, outputLength)}
                                </span>
                              </div>
                            )}
                            {layerType === 'Insight' && (
                              <p className="text-sm text-blue-900 leading-relaxed">
                                {PREVIEW_RESULTS.Insight(outputType, outputLength)}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-1 pb-4">
                    <WuButton variant="secondary" onClick={goToOverview}>Cancel</WuButton>
                    <WuButton variant="primary" onClick={handleSave}>Save &amp; Activate</WuButton>
                  </div>

                </div>
            )}
          </div>
        </div>
      )}

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <div className="shrink-0 px-8 py-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">Partner License</span>
      </div>
    </div>
  );
}
