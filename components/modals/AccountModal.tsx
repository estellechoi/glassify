import AnimatedModal, { type AnimatedModalProps } from '@/components/AnimatedModal';
import Button from '@/components/Button';
import AccountAddress from '@/components/AccountAddress';
import { useBalancesQuery, useEthBalanceQuery, useNFTsQuery } from '@/data/hooks';
import { formatNumber } from '@/utils/number';
import type { ConnectedWallet } from '@/types/wallet';
import LoadingRows from '@/components/LoadingRows';
import CoinAmount from '@/components/CoinAmount';
import NFT from '../NFT';
import OverlayGrid from '../OverlayGrid';
import { shortenAddress } from '@/utils/text';
import CaptionText from '../CaptionText';
import LabelText from '../LabelText';

type AccountModalProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  wallet: ConnectedWallet;
  onDisconnect?: () => void;
};

const AccountModal = (props: AccountModalProps) => {
  const { wallet, onDisconnect } = props;

  const { data: ethBalance } = useEthBalanceQuery({ wallet });
  const { data: balances, isLoading: isBalancesLoading } = useBalancesQuery({ wallet });
  const { data: ownedNFTs, isLoading: isOwnedNFTsLoading } = useNFTsQuery({ wallet });

  /**
   *
   * @description this is mock for UI test
   */
  const DUMMY_IMG_URLS = [
    'https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&dpr=1&w=136&h=136&fr=1',
    'https://i.seadn.io/gcs/files/9c43193f74ea66b47c19aa15edd62668.png?auto=format&dpr=1&w=3840',
    'https://i.seadn.io/gae/fOa919UJ6rfIVTCreSRflN5RvDb7S4dHK17-eX7vLPKYu5nZ2DInXKPp1M_81xiCaFKh7FWctu8jl8pySeQ4u0uRotvleUlzZGyr6kg?auto=format&dpr=1&w=3840',
    'https://i.seadn.io/gcs/files/190eaea1412f964a4db01360624011f7.png?auto=format&dpr=1&w=3840',
    'https://i.seadn.io/gcs/files/8b6d9173bd849dae165cfc2e5a38c0db.png?auto=format&dpr=1&w=3840',
    'https://i.seadn.io/gcs/files/fdad20a44c06012091e282337816eab0.png?auto=format&dpr=1&w=3840',
  ];

  return (
    <AnimatedModal ariaLabel="Connected wallet account" {...props} className="h-[80vh] Padding_modal">
      <div className="h-full flex flex-col items-stretch justify-between">
        <div className="space-y-3">
          <AccountAddress wallet={wallet} />

          <section className="px-1 py-3">
            <LabelText size="sm" text="NFTs" className="mb-3" />

            {isOwnedNFTsLoading ? (
              <LoadingRows rowsCnt={3} fontClassName="Font_data_20px_num" />
            ) : (
              <>
                <OverlayGrid xUnitPx={32}>
                  {ownedNFTs?.map((ownedNFT, index) => (
                    <OverlayGrid.Item key={ownedNFT.contract.address}>
                      <NFT
                        key={ownedNFT.contract.address}
                        name={ownedNFT.rawMetadata?.name}
                        mediaFormat={ownedNFT.media[0]?.format}
                        thumbnailURL={
                          index === 0 ? ownedNFT.media[0]?.thumbnail ?? ownedNFT.rawMetadata?.image : DUMMY_IMG_URLS[index - 1]
                        }
                      />
                    </OverlayGrid.Item>
                  ))}
                </OverlayGrid>

                {ownedNFTs?.[0] && (
                  <span className="inline-block align-baseline Font_caption_xs text-white truncate pl-0.5 mt-1">
                    <CaptionText
                      size="xs"
                      text={ownedNFTs[0].rawMetadata?.name ?? shortenAddress(ownedNFTs[0].contract.address, 4, 4)}
                      shadowText={ownedNFTs[1] ? `and ${ownedNFTs.length - 1} more` : undefined}
                    />
                  </span>
                )}
              </>
            )}
          </section>

          <section className="flex flex-col gap-y-3 px-1">
            <LabelText size="sm" text="Tokens" className="mb-1" />

            <CoinAmount
              size="lg"
              formattedAmount={formatNumber(ethBalance?.value, ethBalance?.decimals)}
              symbol={ethBalance?.symbol}
            />

            {isBalancesLoading ? (
              <LoadingRows rowsCnt={3} fontClassName="Font_data_20px_num" />
            ) : (
              balances?.map((balance) => (
                <CoinAmount
                  key={balance.symbol}
                  size="lg"
                  formattedAmount={formatNumber(balance?.value, balance?.decimals)}
                  symbol={balance.symbol}
                />
              ))
            )}
          </section>
        </div>

        <Button
          iconType="disconnect"
          label="Disconnect"
          type="outline"
          color="primary_inverted"
          size="sm"
          onClick={onDisconnect}
        />
      </div>
    </AnimatedModal>
  );
};

export default AccountModal;
