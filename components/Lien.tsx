import { vers } from "@/lib/site";

/*
 * Un lien vers le site officiel.
 *
 * Le menu de ces pages est celui du site : ses adresses sont écrites
 * comme là-bas — « /robes/uma/ ». Celui-ci les préfixe du domaine
 * officiel. Lien ordinaire, donc même onglet.
 */

type Props = Omit<React.ComponentProps<"a">, "href"> & { href: string };

export default function Lien({ href, ...reste }: Props) {
  return <a href={vers(href)} {...reste} />;
}
