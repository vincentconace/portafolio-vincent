import { thumbnailOptions } from '@/data';
import { ProjectDetail } from '@/layout';

export default function GasGuardianPage() {
  const project = thumbnailOptions.find(item => item.slug === 'gas-guardian');
  if (!project) return null;
  return <ProjectDetail project={project} />;
}
