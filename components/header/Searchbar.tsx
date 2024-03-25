import { headerHeight } from "deco-sites/true-source/components/header/constants.ts";
import Searchbar, {
  type Props as SearchbarProps,
} from "deco-sites/true-source/components/search/Searchbar.tsx";
import Modal from "deco-sites/true-source/components/ui/Modal.tsx";
import { useUI } from "deco-sites/true-source/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  return <Searchbar {...searchbar} />;
}

export default SearchbarModal;
