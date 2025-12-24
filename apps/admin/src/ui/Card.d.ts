interface CardProps {
    children: React.ReactNode;
    title?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}
export declare function Card({ children, title, action, className }: CardProps): import("react/jsx-runtime").JSX.Element;
export {};
