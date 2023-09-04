import DisplacementCanvas from '@/components/DisplacementCanvas';
import StayEffortlessImg from '@/resources/images/tg_stay_effortless.png';
import StillEarningImg from '@/resources/images/tg_still_achieving.png';
import DisplacementImg from '@/resources/textures/texture_blocks_random.jpg';
import { useCallback, useState } from 'react';
// import DisplacementImg from '@/resources/textures/texture_noise.jpg';

type AppSlogunDisplacingCanvasProps = {
  className?: string;
  onPointerFirstOut?: () => void;
};

const AppSlogunDisplacingCanvas = ({ className, onPointerFirstOut }: AppSlogunDisplacingCanvasProps) => {
  const [isPointerOutEver, setIsPointerOutEver] = useState<boolean>(false);

  const onPointerOut = useCallback(() => {
    if (!isPointerOutEver) onPointerFirstOut?.();

    setIsPointerOutEver(true);
  }, [isPointerOutEver, onPointerFirstOut]);

  return (
    <DisplacementCanvas
      role="img"
      ariaLabel='Animated typography design, which is from the app slogun "Stay Effortless, Still Earning"'
      className={className}
      textureImage1={StayEffortlessImg}
      textureImage2={StillEarningImg}
      displacementImage={DisplacementImg}
      onPointerOut={onPointerOut}
    />
  );
};

export default AppSlogunDisplacingCanvas;
