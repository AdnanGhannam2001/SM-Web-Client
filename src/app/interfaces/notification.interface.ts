export interface INotification {
    id: string;
    userId: string;
    isRead: boolean;
    content: string;
    link: string;
    createdAtUtc: Date;
    updatedAtUtc: Date;
};