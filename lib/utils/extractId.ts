export function extractIdFromImageUrl(url: string): string | undefined {
  const fileName = url.split('/').pop(); 
  if (!fileName) return undefined;

  const withoutExt = fileName.replace(/\.[^/.]+$/, ""); 

  return withoutExt.split('-')[0]; 
}
