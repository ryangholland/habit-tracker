import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 w-full sticky bottom-0 z-10 mt-4">
      <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center space-x-2">
        <span>© 2025 Ryan Holland</span>
        <a
          href="https://github.com/ryangholland"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
        </a>
      </p>
    </footer>
  );
}

export default Footer;
