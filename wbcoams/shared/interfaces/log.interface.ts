export interface ILog {
    id: number;
    userId: number;
    action: string;
    description: string;
    targetId: number;
    timestamp: Date;
}
