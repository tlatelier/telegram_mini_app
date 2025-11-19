import './button.less';

interface IButton {
    text: string;
    callback?(): void;
    active?: boolean;
}

const buttonClass = 'button';

const Button = (props: IButton) => {
    const { text, callback, active = false } = props;

    return (
        <div
            onClick={callback}
            className={`${buttonClass}${active ? ` ${buttonClass}--active` : ''}`}
        >
            {text}
        </div>
    );
};

export {
    Button,
};
