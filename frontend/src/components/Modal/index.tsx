import ReactDOM from "react-dom";
import styles from "./modal.module.css";

const portalElement = document.getElementById("overlays");

interface ModalProps {
	onClose: () => void;
	children: JSX.Element | React.ReactNode;
}

export function Modal({ onClose, children }: ModalProps) {
	if (!portalElement) return <></>;

	return (
		<>
			{ReactDOM.createPortal(<div className={styles.backdrop} onClick={onClose} />, portalElement)}
			{ReactDOM.createPortal(
				<div className={styles["modal-overlay"]}>
					<div>{children}</div>
				</div>,
				portalElement
			)}
		</>
	);
}
