export const tractTitleFilter = (title: string) => (track: any) =>
  track.name?.toLowerCase().includes(title.toLowerCase());
