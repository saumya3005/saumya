export async function fetchFrameUrls(): Promise<string[]> {
  try {
    const res = await fetch('/api/sequence');
    if (!res.ok) throw new Error('Failed to fetch sequence');
    return await res.json();
  } catch (err) {
    console.error('Error fetching sequence URLs:', err);
    return [];
  }
}

export function preloadImages(
  urls: string[],
  onProgress?: (progress: number) => void
): Promise<HTMLImageElement[]> {
  if (urls.length === 0) {
    return Promise.resolve([]);
  }

  let loadedCount = 0;
  const totalCount = urls.length;
  const images: HTMLImageElement[] = [];

  return new Promise((resolve) => {
    urls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (onProgress) {
          onProgress(Math.round((loadedCount / totalCount) * 100));
        }
        images[index] = img;
        if (loadedCount === totalCount) {
          resolve(images);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (onProgress) {
          onProgress(Math.round((loadedCount / totalCount) * 100));
        }
        // Place a transparent/empty image on error to prevent breaking the index mapping
        const errorImg = new Image();
        images[index] = errorImg;
        if (loadedCount === totalCount) {
          resolve(images);
        }
      };
    });
  });
}
