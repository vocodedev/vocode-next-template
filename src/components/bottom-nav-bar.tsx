import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';

export const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 w-full border-t py-3 flex justify-around items-center">
      <a href="https://www.vocode.dev/" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
          <Image
                src="/vocode.svg"
                alt="Vocode Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
        </a>
        <a href="https://x.com/arpagon" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
              <FaXTwitter />
              <span> @arpagon</span>
        </a>
        <a href="https://x.com/vocodehq" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
              <FaXTwitter />
              <span> @vocodehq</span>
        </a>
        <a href="https://github.com/vocodedev/vocode-python" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center">
              <FaGithub />
              <span>vocode-python</span>
        </a>
    </div>
  );
};

export default BottomNavBar;