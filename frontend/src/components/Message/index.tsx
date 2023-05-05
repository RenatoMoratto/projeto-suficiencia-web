import styles from "./message.module.css";

interface MessageProps {
	children?: JSX.Element | string;
	error?: boolean;
}

export default function Message({ children, error = true }: MessageProps) {
	const style = error ? styles.error : styles.success;
	return <p className={style}>{children}</p>;
}
