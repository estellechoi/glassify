import { walletAtom } from '@/state/states';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Button from '../Button';
import Coin from '../Coin';
import Float from '../Float';

type AppProfileMenuProps = {
  open?: boolean;
  className?: string;
  onDisconnect?: () => void;
};

const AppProfileMenu = ({ open = false, className = '', onDisconnect }: AppProfileMenuProps) => {
  const [, setWallet] = useRecoilState(walletAtom);

  const onClickDisconnect = useCallback(() => {
    setWallet(undefined);
    onDisconnect?.();
  }, [setWallet, onDisconnect]);

  return (
    <Float
      className={`${className} w-[20rem] transition-all ease-in-out duration-[250ms] ${
        open ? 'visible translate-y-1' : 'invisible opacity-0 -z-[1]'
      }`}
    >
      <div className="space-y-4">
        <div className="w-full flex justify-between items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <Coin type="atom" pxSize={28} />
            <div className="Typeface_mono Font_body_lg">$234.76</div>
          </div>

          <div className="flex items-center gap-x-1 text-text_70">
            <div className="Typeface_mono Font_body_sm">21.490245</div>
            <div className="Font_body_xs">ATOM</div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button iconType="disconnect" label="Disconnect" size="sm" type="outline" color="neutral" onClick={onClickDisconnect} />
        </div>
      </div>
    </Float>
  );
};

export default AppProfileMenu;
