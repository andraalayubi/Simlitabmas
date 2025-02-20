-- AddForeignKey
ALTER TABLE "lecturer_members" ADD CONSTRAINT "lecturer_members_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturer_members" ADD CONSTRAINT "lecturer_members_research_group_id_fkey" FOREIGN KEY ("research_group_id") REFERENCES "research_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturer_members" ADD CONSTRAINT "lecturer_members_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
