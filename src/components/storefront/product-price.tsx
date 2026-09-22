import { formatPriceFromPaise } from "@/lib/utils";

export function ProductPriceRange({
  minPriceInPaise,
  maxPriceInPaise,
}: {
  minPriceInPaise: number;
  maxPriceInPaise: number;
}) {
  if (minPriceInPaise === maxPriceInPaise) {
    return <span>{formatPriceFromPaise(minPriceInPaise)}</span>;
  }
  return (
    <span>
      From {formatPriceFromPaise(minPriceInPaise)}
    </span>
  );
}
