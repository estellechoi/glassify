import { CoinId } from '@/constants/coin';
import { ChainId } from '@/constants/connect';
import useBalance from '@/hooks/useBalance';
import { walletAtom } from '@/state/states';
import { BalanceDetail } from '@/types/account';
import { formatNumber } from '@/utils/number';
import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import Button from '../Button';
import Coin from '../Coin';
import Float from '../Float';
import Image from 'next/image';
import KeplrLogo from '@/resources/svgs/keplr_logo.svg';
import { getAbbrOf } from '@/utils/text';
import CopyHelper from '../CopyHelper';

type AppProfileMenuProps = {
  open?: boolean;
  className?: string;
  onDisconnect?: () => void;
};

const AppProfileMenu = ({ open = false, className = '', onDisconnect }: AppProfileMenuProps) => {
  const [wallet, setWallet] = useRecoilState(walletAtom);

  const onClickDisconnect = useCallback(() => {
    setWallet(undefined);
    onDisconnect?.();
  }, [setWallet, onDisconnect]);

  /** balance */
  const { totalBalanceUSD, getBalanceByCoinId } = useBalance(ChainId.COSMOS);

  const repBalance = useMemo<BalanceDetail | undefined>(() => getBalanceByCoinId(CoinId.ATOM), [getBalanceByCoinId]);

  if (wallet === undefined) return null;

  return (
    <Float
      className={`${className} w-[20rem] transition-all ease-in-out duration-[250ms] ${
        open ? 'visible translate-y-1' : 'invisible opacity-0 -z-[1]'
      }`}
    >
      <div className="space-y-8">
        <div className="space-y-5 px-4 py-5">
          <section className="space-y-2">
            <header className="Font_caption_sm text-gray500">Wallet</header>

            <CopyHelper toCopy={wallet.repAccount.bech32Address} iconPosition="right">
              <div className="inline-flex justify-start items-center gap-x-2">
                <Image src={KeplrLogo} alt="Keplr Wallet Logo" width={16} height={16} className="grow-0 shrink-0" />
                {/* <div>{getAbbrOf(wallet.repAccount.bech32Address, 10)}</div> */}
                <div className="Font_body_sm">
                  {wallet.repAccount.name} ({getAbbrOf(wallet.repAccount.bech32Address, 10)})
                </div>
              </div>
            </CopyHelper>
          </section>

          <section className="space-y-2">
            <header className="Font_caption_sm text-gray500">Balance</header>

            <div className="w-full flex justify-start items-center gap-x-2">
              <Coin coinId={repBalance?.coinGeckoId} pxSize={20} />

              <div className="grow shrink flex justify-between items-center gap-x-4">
                <div className="Typeface_mono Font_body_lg">
                  {formatNumber(totalBalanceUSD, { fiat: true, semiequate: true })}
                </div>
                <div className="flex items-center gap-x-1 text-text_70">
                  <div className="Typeface_mono Font_body_sm">{formatNumber(repBalance?.amount, { dp: 6 })}</div>
                  <div className="Font_body_xs">{repBalance?.ticker}</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-end px-4 py-5">
          <Button iconType="disconnect" label="Disconnect" size="sm" type="outline" color="neutral" onClick={onClickDisconnect} />
        </div>
      </div>
    </Float>
  );
};

export default AppProfileMenu;
