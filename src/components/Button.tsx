import  {FC} from 'react';

interface ButtonProps {
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} type="button">Collapse</button>
    );
};

export default Button;