import './webapp-button.less';

interface IWebAppButton {
    text: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

const WebAppButton = ({ text, icon, onClick }: IWebAppButton) => {
    return (
        <button
            className="webapp-button"
            onClick={onClick}
            type="button"
        >
            {icon && <span className="webapp-button__icon">{icon}</span>}
            <span className="webapp-button__text">{text}</span>
        </button>
    );
};

export {
    WebAppButton,
};
