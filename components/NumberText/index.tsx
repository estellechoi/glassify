type NumberTextSize = 'md';

const SIZE_CLASS_DICT: Record<NumberTextSize, { number: string; unit: string }> = {
  md: { number: 'Font_data_16px_num', unit: 'Font_data_12px_unit' },
};

type NumberTextProps = {
  formattedNumber?: string;
  unit?: string;
  size?: NumberTextSize;
};

const NumberText = ({ formattedNumber, unit, size = 'md' }: NumberTextProps) => {
  const sizeClassNames = SIZE_CLASS_DICT[size];

  return (
    <span className="text-white flex items-baseline gap-x-1">
      {formattedNumber ? (
        <>
          <span className={sizeClassNames.number}>{formattedNumber}</span>
          <span className={sizeClassNames.unit}>{unit}</span>
        </>
      ) : (
        '-'
      )}
    </span>
  );
};

export default NumberText;
