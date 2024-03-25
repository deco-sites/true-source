import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

export interface Props {
  content: HTML;
}

export default function TextInput({ content }: Props) {
  return (
    <>
      {content}
    </>
  );
}
