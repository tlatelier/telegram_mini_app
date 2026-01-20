import './button.less';

interface IButton {
    text: string;
    active?: boolean;
    common?: boolean;
    auxClass?: string;
    callback?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const buttonClass = 'button';

const Button = (props: IButton) => {
    const {
        text,
        callback,
        active = false,
        common = false,
        auxClass,
    } = props;

    const cn = [
        auxClass,
        buttonClass,
        active ? `${buttonClass}--active` : null,
        common ? `${buttonClass}--common` : null,
    ].filter(Boolean).join(' ');

    return (
        <div
            className={cn}
            onClick={callback}
        >
            {text}
        </div>
    );
};

export {
    Button,
};
