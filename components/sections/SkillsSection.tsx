import { getSkills } from '@/serverActions/skills.action';
import SkillsSectionClient from './SkillsSectionClient';

export default async function SkillsSection() {
  const skills = await getSkills();

  return <SkillsSectionClient skills={skills} />;
}