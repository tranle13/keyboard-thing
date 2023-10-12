import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex justify-center gap-5 m-5">
      <p className="text-xs text-gray-400">
        Copyright &copy; 2023. All Rights Reverved.
      </p>
      <a target="_blank" href="https://github.com/tranle13">
        <FaGithub />
      </a>
    </div>
  );
};

export default Footer;
