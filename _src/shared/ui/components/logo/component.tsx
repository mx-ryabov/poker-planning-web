import Image from "next/image";
import LogoSvg from "@public/logo.svg";

export function Logo() {
	return <Image src={LogoSvg} alt="Logo" height={30} priority />;
}
