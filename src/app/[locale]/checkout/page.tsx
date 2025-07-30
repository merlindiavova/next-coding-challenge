import Checkout from "@/component/Checkout";
import { Locale } from "next-intl";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function CheckoutPage({ params }: Props) {
  const { locale } = await params;
  return <Checkout locale={locale} />;
}