import DisplacementCanvas from '@/components/DisplacementCanvas';
import StayEffortlessImg from '@/resources/images/tg_stay_effortless.png';
import StillEarningImg from '@/resources/images/tg_still_achieving.png';
// import DisplacementImg from '@/resources/textures/texture_water.jpeg';
import DisplacementImg from '@/resources/textures/texture_noise.jpg';

type AppSlogunDisplacingCanvasProps = {
  className?: string;
};

const AppSlogunDisplacingCanvas = ({ className = '' }: AppSlogunDisplacingCanvasProps) => {
  return (
    <DisplacementCanvas
      className={className}
      textureImage1={StayEffortlessImg}
      textureImage2={StillEarningImg}
      displacementImage={DisplacementImg}
    />
  );
};

export default AppSlogunDisplacingCanvas;
