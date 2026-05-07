import { thumbnailOptions } from '@/data';
import { ProjectDetail } from '@/layout';

export default function YesicaGutierrezPage() {
  const project = thumbnailOptions.find(
    item => item.slug === 'yesica-gutierrez',
  );
  if (!project) return null;
  return <ProjectDetail project={project} />;
}
