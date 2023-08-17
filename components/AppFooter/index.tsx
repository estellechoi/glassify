import TermsAndPolicyButton from './TermsAndPolicyButton';

const AppFooter = () => {
  return (
    <footer className="relative bg-primary text-ground px-page_x py-page_bottom">
      <div className="flex items-center justify-end gap-x-4">
        <TermsAndPolicyButton />
      </div>
    </footer>
  );
};

export default AppFooter;
