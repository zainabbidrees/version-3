import type { Metadata } from "next";
import { CustomStores } from "@/components/CustomStores";
import { ClosingCta } from "@/components/ClosingCta";

export const metadata: Metadata = {
  title: "Custom Online Stores for Businesses | Brand Fulfillment",
  description:
    "Give your team one place to order approved branded merchandise through a custom online store built around your business.",
};

export default function CustomOnlineStoresPage() {
  return (
    <>
      <CustomStores />
      <ClosingCta />
    </>
  );
}
