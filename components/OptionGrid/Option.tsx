import Image from 'next/image';

type OptionButtonProps = {
  type: 'button';
  onClick?: () => void;
};
type OptionLinkProps = {
  type: 'link';
  href?: string;
  target?: string;
};
type OptionPropsByType = OptionButtonProps | OptionLinkProps;
type OptionProps = OptionPropsByType & { label: string; imgUrl?: string; disabled?: boolean };

const Option = (props: OptionProps) => {
  const { type, label, imgUrl, disabled } = props;

  const Content = (
    <span className={`relative flex items-center justify-between gap-x-3 px-5 py-2 text-white`}>
      {imgUrl && <Image src={imgUrl} alt={label} width={64} height={64} className="w-12 h-12 md:w-16 md:h-16" />}

      <span className="Font_menu_xs md:Font_menu_sm Transition_1000 transition-transform origin-left group-enabled/option:group-hover/option:translate-x-2">
        {label}
      </span>
    </span>
  );

  const cursorClassName = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
  const commonArgs = {
    className: `group/option ${cursorClassName}`,
    disabled,
  };

  switch (type) {
    case 'button':
      return (
        <li>
          <button type="button" {...commonArgs} onClick={props.onClick}>
            {Content}
          </button>
        </li>
      );
    case 'link':
      return (
        <li>
          <a {...commonArgs} href={props.href} target={props.target}>
            {Content}
          </a>
        </li>
      );
  }
};

export default Option;
