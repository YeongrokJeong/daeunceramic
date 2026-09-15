import CollectionGrid from "@/components/CollectionGrid";
import { works } from "@/lib/works";

export const metadata = {
  title: "Shop | Daeun Ceramic",
};

export default function ShopPage() {
  return (
    <main className="flex-1 px-5 sm:px-8 py-8 sm:py-12 pb-24 max-w-5xl mx-auto w-full">
      <p className="font-display text-2xl sm:text-3xl">SHOP</p>
      <div className="mt-8">
        <CollectionGrid works={works} />
      </div>
    </main>
  );
}
