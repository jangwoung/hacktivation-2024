import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  setModalOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ setModalOpen, children }) => {
  return (
    <div className="fixed top-0 left-0 z-10">
      <div
        className="w-screen h-screen bg-black opacity-60"
        onClick={() => setModalOpen(false)}
      ></div>

      <div className="absolute flex flex-col justify-center items-center top-[10vh] right-[18vw] bg-white w-[64vw] h-[80vh] rounded-3xl">
        <FontAwesomeIcon
          icon={faXmark}
          size="xl"
          className="absolute right-6 top-6 cursor-pointer"
          onClick={() => setModalOpen(false)}
        />
        {children}
      </div>
    </div>
  );
};
