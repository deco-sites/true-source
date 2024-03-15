/**
 * @titleBy matcher
 */
interface O {
  matcher: string;
  title: string;
}

export interface ReturnCustomPLPTitle {
  titles: O[];
}

export interface CustomPLPTitle {
  titles: O[];
}

export default function PLPSectionsSEO(
  props: CustomPLPTitle,
): ReturnCustomPLPTitle {
  return props;
}
