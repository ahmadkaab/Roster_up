-- Allow team owners to update the status of applications for their recruitments
create policy "Team owners can update applications" on public.recruitment_applications
  for update using (
    exists (
      select 1 
      from public.recruitments r 
      join public.teams t on r.team_id = t.id 
      where r.id = recruitment_applications.recruitment_id 
      and t.owner_id = auth.uid()
    )
  );
