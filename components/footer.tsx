import { GithubIcon } from "lucide-react";
import { Linkedin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-thirdBackground flex flex-col gap-5 p-6 text-white">
      <div className="uppercase"> On reste en contact</div>
      <div className="flex gap-6">
        <Link href="https://github.com/sabinesun/shopping" target="_blank">
          <GithubIcon className="hover:text-accent" />
        </Link>
        <Link href="https://www.linkedin.com/in/sabinesun/" target="_blank">
          <Linkedin className="hover:text-accent" />
        </Link>
      </div>
      <div className="flex justify-center text-sm">Made by Sabine Sun</div>
    </footer>
  );
};
