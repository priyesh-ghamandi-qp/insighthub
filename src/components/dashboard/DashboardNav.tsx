'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const WuSidebarContent = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuSidebarContent })),
  { ssr: false }
);
const WuSidebarGroup = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuSidebarGroup })),
  { ssr: false }
);
const WuSidebarItem = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuSidebarItem })),
  { ssr: false }
);
const WuSidebarFooter = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuSidebarFooter })),
  { ssr: false }
);

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      <WuSidebarContent>
        <WuSidebarItem
          Icon={<span className="wc-ai" />}
          isActive={pathname.startsWith('/questionpro-ai')}
        >
          <Link href="/questionpro-ai">QuestionPro AI</Link>
        </WuSidebarItem>

        <WuSidebarGroup label="Knowledge Hub">
          <WuSidebarItem
            Icon={<span className="wm-folder" />}
            isActive={pathname.startsWith('/knowledge-hub/repositories')}
          >
            <Link href="/knowledge-hub/repositories">Repositories</Link>
          </WuSidebarItem>
          <WuSidebarItem
            Icon={<span className="wc-ai" />}
            isActive={pathname.startsWith('/knowledge-hub/repositories') && pathname.includes('aiLayers=1')}
          >
            <Link href="/knowledge-hub/repositories?aiLayers=1">AI Layers</Link>
          </WuSidebarItem>
        </WuSidebarGroup>

        <WuSidebarGroup label="Project Hub">
          <WuSidebarItem
            Icon={<span className="wc-analytics-4" />}
            isActive={pathname.startsWith('/project-hub/projects')}
          >
            <Link href="/project-hub/projects">Projects</Link>
          </WuSidebarItem>
          <WuSidebarItem
            Icon={<span className="wm-bar-chart" />}
            isActive={pathname.startsWith('/project-hub/analytics')}
          >
            <Link href="/project-hub/analytics">Analytics</Link>
          </WuSidebarItem>
        </WuSidebarGroup>
      </WuSidebarContent>

      <WuSidebarFooter>
        <WuSidebarItem
          Icon={<span className="wm-admin-panel-settings" />}
          isActive={pathname.startsWith('/admin')}
        >
          <Link href="/admin">Admin</Link>
        </WuSidebarItem>
        <WuSidebarItem
          Icon={<span className="wm-settings" />}
          isActive={pathname.startsWith('/settings')}
        >
          <Link href="/settings">Settings</Link>
        </WuSidebarItem>
      </WuSidebarFooter>
    </>
  );
}
