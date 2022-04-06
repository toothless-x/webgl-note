// 获取图像, Promise
export const loadImagePromise = (url: string): Promise<HTMLImageElement> => new Promise(
  (resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.addEventListener('error', () => {
      reject(new Error('image load Error'));
    });

    image.crossOrigin = 'anonymous';
    image.alt = '';
    image.src = url;
  },
);

// 获取图像, Async
export const loadImageAsync = async (url: string) => {
  const image = await loadImagePromise(url);
  return image;
};
