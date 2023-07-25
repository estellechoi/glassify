import Image from 'next/image';

type OptionItemProps = {
  imgURL: string;
  label: string;
  onClick: () => void;
};

const OptionItem = ({ imgURL, label, onClick }: OptionItemProps) => {
  const Content = (
    <span className="flex items-center gap-x-1.5 px-1 py-1.5">
      <Image src={imgURL} alt={label} />
      <span className="Transition_500 transition-transform group-hover/option-item:translate-x-0.5 Font_button_md text-white">
        {label}
      </span>
    </span>
  );

  return (
    <button type="button" onClick={onClick} className="Component group/option-item">
      {Content}
    </button>
  );
};

export default OptionItem;
