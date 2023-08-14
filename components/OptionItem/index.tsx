import Image from 'next/image';
import WaitingSymbol from '@/components/WaitingSymbol';
import Tag, { TagProps } from '@/components/Tag';
import { useMemo } from 'react';

type OptionItemProps = {
  imgURL: string;
  label: string;
  onClick: () => void;
  isProcessing?: boolean;
  disabled?: boolean;
  trailingTag?: TagProps;
};

const OptionItem = ({ imgURL, label, onClick, isProcessing = false, disabled, trailingTag }: OptionItemProps) => {
  const cursorClassName = useMemo<string>(
    () => (disabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'),
    [disabled]
  );
  const opacityClassName = useMemo<string>(() => (disabled ? 'opacity-40' : ''), [disabled]);

  const Content = (
    <span className="flex items-center gap-x-1.5 px-1 py-1.5">
      <Image src={imgURL} alt={label} width={28} height={28} quality={100} />

      {isProcessing ? (
        <WaitingSymbol />
      ) : (
        <span className="inline-flex items-center gap-x-1.5 Transition_500 transition-transform group-hover/option-item:translate-x-0.5 Font_button_lg text-white">
          {label}
          {trailingTag && <Tag {...trailingTag} />}
        </span>
      )}
    </span>
  );

  return (
    <button type="button" onClick={onClick} className={`Component group/option-item ${cursorClassName} ${opacityClassName}`}>
      {Content}
    </button>
  );
};

export default OptionItem;
