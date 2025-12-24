interface PageHeaderProps {
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    };
}
export declare function PageHeader({ title, description, action }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
