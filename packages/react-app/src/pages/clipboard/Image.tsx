import catImage from '@assets/cat.jpg';
import dogsImage from '@assets/dogs.jpg';
import { clipboard } from 'api';
import { useCallback, useMemo, useState } from 'react';
import { Button } from 'ui';

import styles from './clipboard.module.css';

interface ImageData {
  type: 'buffer' | 'base64';
  data: ArrayBuffer | string;
}

const Image = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const loadArrayBuffer = useCallback(async (image: string) => {
    const response = await fetch(image);
    return await response.arrayBuffer();
  }, []);

  const loadBase64 = useCallback(async (image: string) => {
    const response = await fetch(image);
    const blob = await response.blob();
    return new Promise<string>((resolve) => {
      const fr = new FileReader();
      fr.onloadend = () => resolve(fr.result as string);
      fr.readAsDataURL(blob);
    });
  }, []);

  const writeImage = useCallback(
    async (image: string) => {
      const buffer = await loadArrayBuffer(image);
      clipboard.writeImage(buffer);
    },
    [loadArrayBuffer],
  );

  const writeImageBase64 = useCallback(
    async (image: string) => {
      const data = await loadBase64(image);
      clipboard.writeImageBase64(data);
    },
    [loadBase64],
  );

  const readImage = useCallback(async () => {
    setImageData(null);
    const imageArray = await clipboard.readImage();
    setImageData({
      type: 'buffer',
      data: imageArray,
    });
  }, []);

  const readImageBase64 = useCallback(async () => {
    setImageData(null);
    const data = await clipboard.readImageBase64();
    setImageData({
      type: 'base64',
      data,
    });
  }, []);

  const imageSrc = useMemo(() => {
    if (!imageData) {
      return undefined;
    }

    if (imageData.type === 'base64') {
      return `data:image/png;base64,${imageData.data}`;
    }

    const blob = new Blob([imageData.data]);
    return URL.createObjectURL(blob);
  }, [imageData]);

  return (
    <div>
      <h2 className={styles.subtitle}>Image</h2>
      <img className={styles.image} src={catImage} alt="" />
      <img className={styles.image} src={dogsImage} alt="" />
      <p className={styles.property_name}>Clipboard image:</p>
      <img className={styles.image} alt="" src={imageSrc} />
      <div className={styles.button_container}>
        <Button
          label="Write image - cat"
          onClick={() => writeImage(catImage)}
        />
        <Button
          label="Write image - cat (base64)"
          onClick={() => writeImageBase64(catImage)}
        />
        <Button
          label="Write image - dogs"
          onClick={() => writeImage(dogsImage)}
        />
        <Button
          label="Write image - dogs (base64)"
          onClick={() => writeImageBase64(dogsImage)}
        />
      </div>
      <div className={styles.button_container}>
        <Button label="Read image" onClick={readImage} />
        <Button label="Read image (base64)" onClick={readImageBase64} />
      </div>
    </div>
  );
};

export default Image;
