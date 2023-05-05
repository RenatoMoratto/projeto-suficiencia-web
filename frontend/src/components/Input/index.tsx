import Message from "../Message";
import styles from "./input.module.css";

type InputProps = {
	id?: string;
	label?: string;
	errorMessage?: string;
	isInvalid?: boolean;
	type?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
	React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

function Input({ id, label, errorMessage, isInvalid = false, type, ...rest }: InputProps) {
	const classes = isInvalid ? styles.invalid : "";
	return (
		<div className={styles["input-group"]}>
			<label htmlFor={id}>{label}</label>
			{type === "textarea" ? (
				<textarea className={classes} id={id} name={id} {...rest} />
			) : (
				<input className={classes} id={id} name={id} type={type} {...rest} />
			)}
			{isInvalid && <Message>{errorMessage}</Message>}
		</div>
	);
}

export default Input;
