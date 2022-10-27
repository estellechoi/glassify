import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';

export const RADIO_DEFAULT_OPTION = { value: 'all', label: 'All' };

export type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  title?: string;
  defaultIndex?: number;
  options: RadioOption[];
  onSelect: (selected: RadioOption) => void;
  className?: string;
};

export default function RadioGroup({
  title = '',
  defaultIndex = 0,
  options,
  onSelect,
  className = '',
}: RadioGroupProps) {
  const radioOptions = useMemo(() => [RADIO_DEFAULT_OPTION].concat(options), [options]);

  const [selected, setSelected] = useState<RadioOption>(
    radioOptions[defaultIndex] ?? RADIO_DEFAULT_OPTION
  );

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  return (
    <div className={`${className}`}>
      <HeadlessRadioGroup value={selected} onChange={setSelected}>
        <HeadlessRadioGroup.Label className="sr-only">{title}</HeadlessRadioGroup.Label>

        <div className="flex space-x-2 p-[2px] overflow-x-auto overflow-y-hidden">
          {radioOptions.map((option) => (
            <HeadlessRadioGroup.Option
              key={option.value}
              value={option}
              className={({ active, checked }) =>
                `${
                  active
                    ? 'ring-2 ring-darkCRE dark:ring-neutral-600 ring-opacity-60 ring-offset-0 ring-offset-white'
                    : ''
                }
                  ${
                    checked
                      ? 'bg-darkCRE dark:bg-grayCRE-300 bg-opacity-75 text-white !font-medium'
                      : 'bg-grayCRE-200 dark:bg-neutral-700'
                  }
                    shrink-0 relative flex TYPO-BODY-S px-3 py-1 cursor-pointer rounded-xl focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="TYPO-BODY-S">
                        <HeadlessRadioGroup.Label
                          as="div"
                          className={`font-medium  ${
                            checked ? 'text-white' : 'text-gray-900 dark:text-grayCRE-200'
                          }`}
                        >
                          {option.label}
                        </HeadlessRadioGroup.Label>
                        {/* <HeadlessRadioGroup.Description
                            as="span"
                            className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'}`}
                          ></HeadlessRadioGroup.Description> */}
                      </div>
                    </div>
                    {/* {checked && (
                            <div className="shrink-0 text-white">
                              <CheckIcon className="h-6 w-6" />
                            </div>
                          )} */}
                  </div>
                </>
              )}
            </HeadlessRadioGroup.Option>
          ))}
        </div>
      </HeadlessRadioGroup>
    </div>
  );
}
