import { forwardRef} from 'react';
import classes from './Input.module.css'

type HTMLInputProps = {[key:string]:string}

interface InputProps {
  label: string;
  input: HTMLInputProps;
}

const Input = ({ label, input }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
        <div className={classes.input}>
            <label htmlFor={input.id}>{label}</label>
            <input ref={ref} {...input}></input>
        </div>
    );
};

export default forwardRef(Input);