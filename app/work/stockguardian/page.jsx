import { thumbnailOptions } from '@/data';
import { ProjectDetail } from '@/layout';

export default function StockGuardianPage() {
  const project = thumbnailOptions.find(item => item.slug === 'stockguardian');
  if (!project) return null;
  return <ProjectDetail project={project} />;
}
